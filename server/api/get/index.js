'use strict';
var fs = require('fs');

module.exports = function(request, response){

	fs.readFile( process.cwd() + '/InteractDBData.json', 'utf8', function (err, data) {
  		if((err && err.code == 'ENOENT') || data == '') {
            fs.writeFileSync( process.cwd() + '/InteractDBData.json', '{"dataArray":[]}');
            data = '{"dataArray":[]}';
      }

  		var savedData = JSON.parse(data);
  		if(savedData.dataArray.length > 0)
  			response.send(savedData.dataArray[savedData.dataArray.length-1].data);
  		else {
  			var newObj = {
  				version: 0,

			    meta: {
			        name: 'AwesomeProject',
			        version: '0.0.1',
			        database: 'MySQL',
			        framework: 'Laravel 5.1'
			    },

			    models: [],

			    relationships: {}
  			};

  			response.send(newObj);
  		}
	});
    
};