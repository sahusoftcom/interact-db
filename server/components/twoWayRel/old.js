'use strict';
var _ = require('lodash');

var oneWayRelationships = [
	{
		model1: 'Tag',
		relation: 'morphedByMany',
		model2: 'Post'
	},
	{
		model1: 'Tag',
		relation: 'morphedByMany',
		model2: 'Video'
	},
	{
		model1: 'Tag',
		relation: 'morphedByMany',
		model2: 'Tcbs'
	}
];

//module.exports = function(oneWayRelationships) {
	var twoWayRelationships = [];

	_(oneWayRelationships).forEach(function(relationship) {
		if(relationship.relation == 'hasOne' || relationship.relation == 'hasMany') {
			twoWayRelationships.push(
				{
					forward: {
						model1: relationship.model1,
						relation: relationship.relation,
						model2: relationship.model2
					},
					reverse: {
						model1: relationship.model2,
						relation: 'belongsTo',
						model2: relationship.model1
					}
				}
			);
		}

		if(relationship.relation == 'morphMany') {
			var twoWayRel = _.find(twoWayRelationships, function(rel) {
				return rel.reverse.model1 == relationship.model2 && rel.reverse.relation == 'morphTo';
			});
			if(twoWayRel) {
				twoWayRel['forward' + Object.keys(twoWayRel).length] = {
					model1: relationship.model1,
					relation: relationship.relation,
					model2: relationship.model2
				}
			}

			else {
				twoWayRelationships.push(
					{
						reverse: {
							model1: relationship.model2,
							relation: 'morphTo'
						},
						forward1: {
							model1: relationship.model1,
							relation: relationship.relation,
							model2: relationship.model2
						}
					}
				);
			}
		}

		if(relationship.relation == 'morphedByMany') {
			var twoWayRel = _.find(twoWayRelationships, function(rel) {
				return rel.forward1.model1 == relationship.model1;
			});

			if(twoWayRel) {
				var i = Object.keys(twoWayRel).length / 2 + 1;
				twoWayRel['forward' + i] = {
					model1: relationship.model1,
					relation: relationship.relation,
					model2: relationship.model2
				}

				twoWayRel['reverse' + i] = {
					model1: relationship.model2,
					relation: 'morphToMany',
					model2: relationship.model1
				}
			}

			else {
				twoWayRelationships.push(
					{
						reverse1: {
							model1: relationship.model2,
							relation: 'morphToMany',
							model2: relationship.model1
						},
						forward1: {
							model1: relationship.model1,
							relation: relationship.relation,
							model2: relationship.model2
						}
					}
				);
			}
		}


	});

	console.log(twoWayRelationships);
//};