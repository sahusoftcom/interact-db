'use strict';

angular.module('interactDbApp')
  .factory('InteractDBDataService', function ($rootScope, $modal) {

    return {

      meta: {
        name: 'AwesomeProject',
        version: '0.0.1',
        database: 'MySQL',
        framework: 'Laravel 5.1'
      },

      models: [
        {
          name: 'User',
          softDeletes: true,
          timestamps: true,

          database: {
            tableName: 'users',
            engine: 'InnoDB'
          },

          relations: [
            {
              type: 'hasMany',
              relatedModelIndex: 2
            }
          ],

          columns: [
            {
              primaryKey: true,
              autoIncrement: true,
              name: 'id',
              dataType: 'bigInteger'
            },
            {
              name: 'name',
              dataType: 'string'
            },
            {
              name: 'date_of_birth',
              dataType: 'date'
            },
            {
              name: 'bio',
              dataType: 'longText'
            }
          ]
        }
      ]

    };

  });
