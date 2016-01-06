'use strict';

var _ = require('lodash');
var compareArrays = require(__dirname + '/../compareArrays');
module.exports = function(newData, oldData) {
	var diff = {
		modelsDiff: {},
		relationshipsDiff: {}
	};

	diff.modelsDiff = compareArrays(newData.models, oldData.models, 'models', function(type, newObject, oldObject, diff, indexes){

		switch(type) {
			case 'added':
				return newObject;
				break;

			case 'removed':
				return oldObject;
				break;

			case 'updated':
				return {
					diff: diff,
					oldModel: oldObject,
					newModel: newObject,
					columns: compareArrays(newObject.columns, oldObject.columns, 'columns', function(type, newObject, oldObject, diff){
						switch(type) {
							case 'added':
								return newObject;
								break;

							case 'removed':
								return oldObject;
								break;

							case 'updated':
								return {
									diff: diff,
									oldColumn: oldObject,
									newColumn: newObject,
								}
								break;
						}
					}),
					indexes: indexes,
					foreignKeys: compareArrays(newObject.configuration.foreignKeys, oldObject.configuration.foreignKeys, 'foreignKeys')

				};
				break;
		}

	});

	return diff;
}