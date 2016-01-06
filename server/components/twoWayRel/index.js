'use strict';
var _ = require('lodash');


module.exports = function(relationships) {

	_.forEach(relationships, function(relationshipArr, relModel) {
		_(relationshipArr).forEach(function(relationship) {
			if(relationship.relation == 'hasOne' || relationship.relation == 'hasMany') {
				if(!relationships[relationship.withModel]) {
					relationships[relationship.withModel] = [
						{
							id: relationship.id,
							relation: 'belongsTo',
							withModel: relModel
						}
					];
				}

				else {
					relationships[relationship.withModel].push(
						{
							id: relationship.id,
							relation: 'belongsTo',
							withModel: relModel
						}
					);
				}
			}

			if(relationship.relation == 'belongsToMany') {
				if(!relationships[relationship.withModel]) {
					relationships[relationship.withModel] = [
						{
							id: relationship.id,
							relation: 'belongsToMany',
							withModel: relModel
						}
					];
				}

				else {
					relationships[relationship.withModel].push(
						{
							id: relationship.id,
							relation: 'belongsToMany',
							withModel: relModel
						}
					);
				}
			}

			if(relationship.relation == 'morphMany') {
				if(!relationships[relationship.withModel]) {
					relationships[relationship.withModel] = [
						{
							id: relationship.id,
							relation: 'morphTo',
						}
					];
				}

				else {
					var rel = _.find(relationships[relationship.withModel], function(rel) {
						return rel.relation == 'morphTo';
					});
					if(!rel) {
						relationships[relationship.withModel].push(
							{
								id: relationship.id,
								relation: 'morphTo',
							}
						);
					}
				}
			}

			if(relationship.relation == 'morphToMany') {
				if(!relationships[relationship.withModel]) {
					relationships[relationship.withModel] = [
						{
							id: relationship.id,
							relation: 'morphedByMany',
							withModel: relModel
						}
					];
				}

				else {
					relationships[relationship.withModel].push(
						{
							id: relationship.id,
							relation: 'morphedByMany',
							withModel: relModel
						}
					);
				}
			}


		});


	});

	return relationships;

};