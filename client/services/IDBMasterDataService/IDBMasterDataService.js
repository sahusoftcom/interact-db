'use strict';

angular.module('interactDbApp')
  .factory('IDBMasterDataService', function ($rootScope, $modal) {

    return {

      storageEngines: [
        "MyISAM",
        "InnoDB",
        "Memory",
        "Merge",
        "Archive",
        "Federated",
        "NDB",
        "CSV",
        "Blackhole",
        "Example"
      ],

      dataTypes: [
          {
            name: "bigIncrements",
            hasLength: false,
            hasUnsigned: false
          },
          {
            name: "bigInteger",
            hasLength: false,
            hasUnsigned: true
          },
          {
            name: "binary",
            hasLength: false,
            hasUnsigned: false,
            noDefault: true
          },
          {
            name: "boolean",
            hasLength: false,
            hasUnsigned: false
          },
          {
            name: "char",
            hasLength: true,
            hasUnsigned: false,
            defaultLength: 255
          },
          {
            name: "date",
            hasLength: false,
            hasUnsigned: false
          },
          {
            name: "dateTime",
            hasLength: false,
            hasUnsigned: false
          },
          {
            name: "decimal",
            hasLength: true,
            hasUnsigned: true,
            defaultLength: "5, 2"
          },
          {
            name: "double",
            hasLength: true,
            hasUnsigned: true,
            defaultLength: "15, 8"
          },
          {
            name: "enum",
            hasLength: true,
            hasUnsigned: false,
            defaultLength: "['value1', 'value2']"
          },
          {
            name: "float",
            hasLength: false,
            hasUnsigned: true
          },
          {
            name: "increments",
            hasLength: false,
            hasUnsigned: false
          },
          {
            name: "integer",
            hasLength: false,
            hasUnsigned: true
          },
          {
            name: "json",
            hasLength: false,
            hasUnsigned: false
          },
          {
            name: "jsonb",
            hasLength: false,
            hasUnsigned: false
          },
          {
            name: "longText",
            hasLength: false,
            hasUnsigned: false,
            noDefault: true
          },
          {
            name: "mediumInteger",
            hasLength: false,
            hasUnsigned: true
          },
          {
            name: "mediumText",
            hasLength: false,
            hasUnsigned: false,
            noDefault: true
          },
          {
            name: "morphs",
            hasLength: false,
            hasUnsigned: false
          },
          {
            name: "nullableTimestamps",
            hasLength: false,
            hasUnsigned: false
          },
          {
            name: "smallInteger",
            hasLength: false,
            hasUnsigned: true
          },
          {
            name: "tinyInteger",
            hasLength: false,
            hasUnsigned: true
          },
          {
            name: "string",
            hasLength: true,
            hasUnsigned: false,
            defaultLength: 255
          },
          {
            name: "text",
            hasLength: false,
            hasUnsigned: false,
            noDefault: true
          },
          {
            name: "time",
            hasLength: false,
            hasUnsigned: false
          },
          {
            name: "timestamp",
            hasLength: false,
            hasUnsigned: false
          }

      ],

      relationships: [
        "hasOne",
        "hasMany",
        "belongsToMany",
        "morphMany",
        "morphTo"
      ],

      indexes: [
        "index",
        "unique"
      ],

      FKOptions: [
        "cascade",
        "set null",
        "no action"
      ]

    };

  });
