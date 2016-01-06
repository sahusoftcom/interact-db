'use strict';
var _ = require('lodash');
var uuid = require('node-uuid');
//var twoWayRel = require(__dirname + '/../twoWayRel');

var getManyToManyTableName = function(model1, model2) {
	model1 = model1.toLowerCase();
	model2 = mode2.toLowerCase();
	if(model2<model1)
		return model2 + '_' + model1;
	else 
		return model1 + '_' + model2;
};

module.exports = function(newData) {
	//var relationships = twoWayRel(newData.relationships);
	var relationships = newData.relationships;

	_(relationships).forEach(function(relationship) {

		if(relationship.relation == 'hasOne' || relationship.relation == 'hasMany') {
			var model2 = _.find(newData.models, function(model) {
				return model.name == relationship.model2;
			});
			
			model2.columns.push(
				{
					id: uuid.v4(),
					name: relationship.model1.toLowerCase() + '_id',
					dataType: 'bigInteger',
					unsigned: true
				}
			);

			model2.configuration.foreignKeys.push(
				{
					id: uuid.v4(),
					column: relationship.model1.toLowerCase() + '_id',
					referenceModel: relationship.model1,
					referenceColumn: 'id'
				}
			);
		}

		if(relationship.relation == 'belongsToMany') {

			newData.models.push(
				{
					id: uuid.v4(),
					name: getManyToManyTableName(relationship.model1, relationship.model2),
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
			            		id: uuid.v4(),
			            		column: relationship.model1.toLowerCase() + '_id',
			            		referenceModel: relationship.model1,
			            		referenceColumn: 'id'
			            	},
			            	{
			            		id: uuid.v4(),
			            		column: relationship.model2.toLowerCase() + '_id',
			            		referenceModel: relationship.model2,
			            		referenceColumn: 'id'
			            	}
			            ]
			        },

			        columns: [
			        	{
			        		name: relationship.model1.toLowerCase() + '_id',
			                dataType: 'bigInteger',
			                unsigned: true,
			                id: uuid.v4()
			        	},
			        	{
			        		name: relationship.model2.toLowerCase() + '_id',
			                dataType: 'bigInteger',
			                unsigned: true,
			                id: uuid.v4()
			        	}
			        ]
				}
			);
		}

		if(relationship.relation == 'morphTo') {

			
		}


	});
};