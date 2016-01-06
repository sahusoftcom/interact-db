'use strict';
var ejs = require('ejs');
var fs = require('fs');
var _ = require('lodash');
var mkdirp = require('mkdirp');
var pluralize = require('pluralize');

module.exports = function(modelData, relationships) {

	_(modelData.models).forEach(function(model) {
		model.relationshipArr = [];
		if(_.has(relationships, model.name))
			model.relationshipArr = relationships[model.name];

		model.filename = __dirname + '/templates/modelTemplate.ejs';
		model.pluralize = pluralize;
		fs.readFile(model.filename, 'utf8', function (err, template) {
			var content = ejs.render(template, model);
			var date = new Date();
			var migName = process.cwd() + '/app/Models/' + model.name + '.php';
			mkdirp(process.cwd() + '/app/Models/', function(e) {
				if(e) 
					return console.log(e);
				fs.writeFile( migName, content, function (err) {
					if(err && err.code == 'ENOENT') 
					return console.log('Please make sure that your project directory contains this path: app/Models');
				});
			});
		});
	});
	
};