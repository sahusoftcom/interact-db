'use strict';
var ejs = require('ejs');
var fs = require('fs');
var _ = require('lodash');
var mkdirp = require('mkdirp');
var pluralize = require('pluralize');

var computeDiff = require(__dirname + '/../../computeDiff');

var zeroFill = function(number, width) {
	width -= number.toString().length;
	if ( width > 0 ) {
		return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
	}

	return number + ""; // always return a string
};

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

var createMigration = function(type, migObject) {
	if(migObject.hidden)
		migObject.tableName = migObject.name;
	else if(type == 'alter')
		migObject.tableName = pluralize(migObject.oldModel.name).toLowerCase();
	else
		migObject.tableName = pluralize(migObject.name).toLowerCase();

	if(migObject.hidden)
		migObject.className = capitalizeFirstLetter(type) + capitalizeFirstLetter(migObject.name.split('_')[0]) + capitalizeFirstLetter(migObject.name.split('_')[1]) + 'Table';
	else
		migObject.className = capitalizeFirstLetter(type) + capitalizeFirstLetter(migObject.tableName) + 'Table';
	migObject.filename = __dirname + '/templates/migrationTemplate.ejs';
	migObject.todo = type;
	migObject.pluralize = pluralize;
	fs.readFile(migObject.filename, 'utf8', function (err, template) {
		var content = ejs.render(template, migObject);
		var date = new Date();
		var migName = process.cwd() + '/database/migrations/' + date.getUTCFullYear() + '_' + zeroFill(date.getUTCMonth()+1, 2) 
					+ '_' + zeroFill(date.getUTCDate(), 2) + '_' + zeroFill(date.getUTCHours(), 2) 
					+ zeroFill(date.getUTCMinutes(), 2) + zeroFill(date.getUTCSeconds(), 2) + '_' + type + '_' 
					+ migObject.tableName + '_table.php';

		mkdirp(process.cwd() + '/database/migrations/', function(e) {
			if(e) 
				return console.log(e);
			fs.writeFile( migName, content, function (err) {
				if(err && err.code == 'ENOENT') 
					return console.log('Please make sure that your project directory contains this path: database/migrations');
			});
		});
	});
}

module.exports = function(newData, oldData) {
	var diff = computeDiff(newData, oldData);
	/* //Write the created diff object to a file
	fs.writeFile( process.cwd() + '/diffObject.json', JSON.stringify(diff), function (err) {
		if(err) 
			return console.log(err);
	});
	*/
	
	_(diff.modelsDiff.added).forEach(function(newModel) {
		createMigration('create', newModel);
	});

	_(diff.modelsDiff.removed).forEach(function(oldModel) {
		createMigration('drop', oldModel);
	});

	_(diff.modelsDiff.updated).forEach(function(updatedModel) {
		createMigration('alter', updatedModel);
	});
}