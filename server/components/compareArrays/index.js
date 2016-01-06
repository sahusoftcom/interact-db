'use strict';

var _ = require('lodash');

module.exports = function(newArray, oldArray, objType, callbackFn) {

	var newOnes = [], removedOnes = [], updatedOnes = [];

	var getModelDiff = function(newModel, oldModel) {
		if(_.isEqual(newModel.name, oldModel.name) && _.isEqual(newModel.configuration, oldModel.configuration) && _.isEqual(newModel.columns, oldModel.columns))
			return false;
		else {
			var diff = {};
			
			if(newModel.name != oldModel.name) {
				diff.name = newModel.name;
			}
			if(newModel.configuration.engine != oldModel.configuration.engine) {
				diff.engine = newModel.configuration.engine;
			}
			if(newModel.configuration.softDeletes != oldModel.configuration.softDeletes) {
				diff.softDeletes = newModel.configuration.softDeletes;
			}
			if(newModel.configuration.timestamps != oldModel.configuration.timestamps) {
				diff.timestamps = newModel.configuration.timestamps;
			}
			var diffPK = _.difference(newModel.configuration.primaryKey, oldModel.configuration.primaryKey);
			if(diffPK.length > 0) {
				diff.primaryKey = newModel.configuration.primaryKey;
			}
			return diff;
		}
	};

	var getIndexes = function(newModel, oldModel) {
		var indexes = {
			unique: {
				added: [],
				removed: []
			},
			index: {
				added: [],
				removed: []
			}
		};

		indexes.unique.added = _.difference(newModel.configuration.indexes.unique, oldModel.configuration.indexes.unique);
		indexes.unique.removed = _.difference(oldModel.configuration.indexes.unique, newModel.configuration.indexes.unique);

		indexes.index.added = _.difference(newModel.configuration.indexes.index, oldModel.configuration.indexes.index);
		indexes.index.removed = _.difference(oldModel.configuration.indexes.index, newModel.configuration.indexes.index);

		return indexes;
	};

	var getColumnDiff = function(newColumn, oldColumn) {
		if(_.isEqual(newColumn, oldColumn))
			return false;
		else {
			var diff = {};

			if(newColumn.name != oldColumn.name) {
				diff.name = newColumn.name;
			}

			if(newColumn.dataType != oldColumn.dataType) {
				diff.dataType = newColumn.dataType;
			}

			if(newColumn.allowNull != oldColumn.allowNull) {
				diff.allowNull = newColumn.allowNull;
			}

			if(newColumn.defaultVal != oldColumn.defaultVal) {
				diff.defaultVal = newColumn.defaultVal;
			}

			if(newColumn.length != oldColumn.length) {
				diff.length = newColumn.length;
			}

			if(newColumn.unsigned != oldColumn.unsigned) {
				diff.unsigned = newColumn.unsigned;
			}
			return diff;
		}
	};

	_(newArray).forEach(function(newObj) {
		var oldObj = _.find(oldArray, function(matchedObj) {
			return matchedObj.id == newObj.id;
		});

		if(!oldObj) {
			if(callbackFn && typeof callbackFn == 'function')
				newOnes.push(callbackFn('added', newObj, null, null));
			else
				newOnes.push(newObj);
		}
		else {
				
			if(callbackFn && typeof callbackFn == 'function' && objType == 'models') {
				var diff = getModelDiff(newObj, oldObj);
				var indexes = getIndexes(newObj, oldObj);
				if(diff)
					updatedOnes.push(callbackFn('updated', newObj, oldObj, diff, indexes));
			}
			else if(callbackFn && typeof callbackFn == 'function' && objType == 'columns') {
				var diff = getColumnDiff(newObj, oldObj);
				if(diff)
					updatedOnes.push(callbackFn('updated', newObj, oldObj, diff));
			}
			else if(objType == 'foreignKeys') {
				if(!_.isEqual(newObj, oldObj)) {
					newOnes.push(newObj);
					removedOnes.push(oldObj);
				}
			}
		}
	});

	_(oldArray).forEach(function(oldObj) {
		var newObj = _.find(newArray, function(matchedObj) {
			return matchedObj.id == oldObj.id;
		});

		if(!newObj) {
			if(callbackFn && typeof callbackFn == 'function')
				removedOnes.push(callbackFn('removed', null, oldObj, null));
			else
				removedOnes.push(oldObj);
		}
	});

	if(objType == 'foreignKeys')
		return {
			added: newOnes,
			removed: removedOnes
		};
	else
		return {
			added: newOnes,
			removed: removedOnes,
			updated: updatedOnes
		};
};