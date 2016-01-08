'use strict';
var ejs = require('ejs');
var fs = require('fs');
var _ = require('lodash');
var mkdirp = require('mkdirp');

module.exports = function(modelData) {

	_(modelData.models).forEach(function(model) {
		
		if(model.generateResource) {
			model.filename = __dirname + '/templates/controllerTemplate.ejs';
			fs.readFile(model.filename, 'utf8', function (err, template) {
				var content = ejs.render(template, model);
				var date = new Date();
				var fileName = process.cwd() + '/app/Http/Controllers/' + model.name + 'Controller.php';
				mkdirp(process.cwd() + '/app/Http/Controllers/', function(e) {
					if(e) 
						return console.log(e);
					fs.writeFile( fileName, content, function (err) {
						if(err && err.code == 'ENOENT') 
						return console.log('Please make sure that your project directory contains this path: app/Http/Controllers');
					});
				});
			});
		}
	});
	
};