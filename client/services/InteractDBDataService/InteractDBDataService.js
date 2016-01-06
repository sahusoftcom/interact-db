'use strict';

angular.module('interactDbApp')
  .factory('InteractDBDataService', function ($rootScope, $modal) {

    return {
      version: 0,

      meta: {
        name: 'AwesomeProject',
        version: '0.0.1',
        database: 'MySQL',
        framework: 'Laravel 5.1'
      },

      models: [
        {
          name: 'User',

          configuration: {
            softDeletes: true,
            timestamps: true,
            engine: 'InnoDB',
            primaryKey: ['id'],
            indexes: {
                unique: ['name'],
                index: ['date_of_birth']
            },
            foreignKeys: [
              {
                column: "bio",
                referenceModel: "new",
                referenceColumn: "newCol"
              }
            ]
          },

          columns: [
            {
              name: 'id',
              dataType: 'bigInteger',
              allowNull: true,
              unsigned: true,
              length: ''
            },
            {
              name: 'name',
              dataType: 'string',
              defaultVal: 'myName',
              length: true
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
      ],

      relationships: [
        {
          model1: "User",
          relation: "hasMany",
          model2: ""
        }
      ]

    };

  });
