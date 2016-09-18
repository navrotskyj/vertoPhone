/**
 * Created by igor on 18.09.16.
 */

"use strict";

const dbName = "vertoPhone";

function getVertoDB() {

    var request = indexedDB.open(dbName, 2),
        contactObjectStore,
        favoritesObjectStore,
        historyObjectStore;

    console.debug('init db');

    request.onerror = function(event) {
        console.error(event)
    };
    request.onupgradeneeded = function(event) {
        var db = event.target.result;

        console.debug('onupgradeneeded');

        var contacts = [{
            name: "name",
            unique: false
        },{
            name: "email",
            unique: true
        },{
            name: "number",
            unique: true
        }];

        initTable('contacts', contacts, (store) => {
            contactObjectStore = store;
            console.debug('on init contacts table');
        });

        function initTable(tableName, columns, cb) {
            var objectStore = db.createObjectStore(tableName, { keyPath: "ssn" });

            // Create an index to search customers by name. We may have duplicates
            // so we can't use a unique index.
            // Create an index to search customers by email. We want to ensure that
            // no two customers have the same email, so use a unique index.

            for (var col of columns) {
                objectStore.createIndex(col.name, col.name, { unique: col.unique == true });
            }

            // Use transaction oncomplete to make sure the objectStore creation is
            // finished before adding data into it.
            objectStore.transaction.oncomplete = function(event) {
                // Store values in the newly created objectStore.
                var tableObjectStore = db.transaction(tableName, "readwrite").objectStore(tableName);

                return cb(tableObjectStore);
            };
        }
    };



    return {
        addContact: 1
    }
}