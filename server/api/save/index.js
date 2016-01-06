'use strict';
var fs = require('fs'); 

module.exports = function(request, response){
    //deep copy of received data
    var newData = JSON.parse(JSON.stringify(request.body));

    require(__dirname + '/../../components/mergeRel')(newData);

	fs.readFile( process.cwd() + '/InteractDBData.json', 'utf8', function (err, data) {
        if(err && err.code == 'ENOENT') {
            fs.writeFileSync( process.cwd() + '/InteractDBData.json', '{"dataArray":[]}');
            data = '{"dataArray":[]}';
        }
  		
        var savedData = JSON.parse(data);
        if(savedData.dataArray.length > 0) {
            var oldObj = savedData.dataArray[savedData.dataArray.length-1].data;
            var oldData = JSON.parse(JSON.stringify(oldObj));
            require(__dirname + '/../../components/mergeRel')(oldData);
    		require(__dirname + '/../../components/generator/migrationGenerator')(newData, oldData);
        }
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
            require(__dirname + '/../../components/generator/migrationGenerator')(newData, newObj);
        }



  		savedData.dataArray.push({
  			version: savedData.dataArray.length,
  			timestamp: Date.now(),
  			data: request.body
  		});

  		savedData = JSON.stringify(savedData);

		fs.writeFile( process.cwd() + '/InteractDBData.json', savedData, function(err){
            if(err)
                console.log(err);
        });

    
	});

    var modelData = JSON.parse(JSON.stringify(request.body));
	require(__dirname + '/../../components/generator/modelGenerator')(modelData, newData.relationships);

    response.send('successfully completed');
};