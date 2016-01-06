'use strict';
var _ = require('lodash');
var uuid = require('node-uuid');
var twoWayRel = require(__dirname + '/../twoWayRel');
var fs = require('fs');

var getManyToManyTableName = function(model1, model2) {
	model1 = model1.toLowerCase();
	model2 = model2.toLowerCase();
	if(model2<model1)
		return model2 + '_' + model1;
	else 
		return model1 + '_' + model2;
};

module.exports = function(newData) {
	/*
	var index = 0;
	_(newData.models).forEach(function(model) {
		if(model.hidden) {
			newData.models.splice(index, 1);
		}
		else {
			var colIndex = 0;
			_(model.columns).forEach(function(column){
				if(column.hidden) {
					newData.models[index].columns.splice(colIndex, 1);
				}
				else {
					colIndex++;
				}
			});

			var FKIndex = 0;
			_(model.configuration.foreignKeys).forEach(function(foreignKey) {
				if(foreignKey.hidden) {
					newData.models[index].configuration.foreignKeys.splice(FKIndex, 1);
				}
				else {
					FKIndex++;
				}
			});

			index++;
		}
	});

	_.forEach(newData.relationships, function(relationshipArr, relModel) {
		var relIndex = 0;
		_(relationshipArr).forEach(function(relationship) {
			if(relationship.hidden) {
				newData.relationships[relModel].splice(relIndex, 1);
			}
			else {
				relIndex++;
			}
		});
	});
*/

	var relationships = twoWayRel(newData.relationships);

	_.forEach(relationships, function(relationshipArr, relModel) {
		_(relationshipArr).forEach(function(relationship) {
			var newId = uuid.parse(relationship.id);
			newId[0]++;
			newId = uuid.unparse(newId);

			if(relationship.relation == 'hasOne' || relationship.relation == 'hasMany') {
				var withModel = _.find(newData.models, function(model) {
					return model.name == relationship.withModel;
				});

				withModel.columns.push(
					{
						id: relationship.id,
						name: relModel.toLowerCase() + '_id',
						dataType: 'bigInteger',
						unsigned: true,
						hidden: true
					}
				);

				withModel.configuration.foreignKeys.push(
					{
						id: relationship.id,
					    column: relModel.toLowerCase() + '_id',
					    referenceModel: relModel,
					    referenceColumn: 'id',
					    hidden: true
					}
				);
			}

			if(relationship.relation == 'belongsToMany') {
				var manyToManyModel = _.find(newData.models, function(model) {
					return model.name == getManyToManyTableName(relModel, relationship.withModel);
				});

				if(!manyToManyModel) {
					newData.models.push(
						{
							hidden: true,
							id: relationship.id,
							name: getManyToManyTableName(relModel, relationship.withModel),
							configuration: {
					        	softDeletes: false,
					            timestamps: false,
					            engine: 'InnoDB',
					            primaryKey: [],
					            indexes: {
					                unique: [],
					                index: []
					            },
					            foreignKeys: [
					            	{
					            		id: relationship.id,
					            		column: relModel.toLowerCase() + '_id',
					            		referenceModel: relModel,
					            		referenceColumn: 'id',
					            		hidden: true
					            	},
					            	{
					            		id: newId,
					            		column: relationship.withModel.toLowerCase() + '_id',
					            		referenceModel: relationship.withModel,
					            		referenceColumn: 'id',
					            		hidden: true
					            	}
					            ]
					        },

					        columns: [
					        	{
					        		name: relModel.toLowerCase() + '_id',
					                dataType: 'bigInteger',
					                unsigned: true,
					                id: relationship.id,
					                hidden: true
					        	},
					        	{
					        		name: relationship.withModel.toLowerCase() + '_id',
					                dataType: 'bigInteger',
					                unsigned: true,
					                id: newId,
					                hidden: true
					        	}
					        ]
						}
					);
				}
			}

			if(relationship.relation == 'morphMany') {
				var withModel = _.find(newData.models, function(model) {
					return model.name == relationship.withModel;
				});

				var relColumns = _.find(withModel.columns, function(column) {
					return column.name == relationship.withModel.toLowerCase() + 'able_id';
				});

				if(!relColumns) {
					withModel.columns.push(
						{
							id: relationship.id,
							name: relationship.withModel.toLowerCase() + 'able_id',
							dataType: 'bigInteger',
							unsigned: true,
							hidden: true
						},
						{
							id: newId,
							name: relationship.withModel.toLowerCase() + 'able_type',
							dataType: 'string',
							length: 255,
							hidden: true
						}
					);
				}
			}
		});
	});
};