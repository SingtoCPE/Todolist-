'use strict';                                                                                                                                      

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'singto11442525'
});

connection.query(
    'SELECT "foo" AS first_field, "bar" AS second_field',
    function(err, results, fields) {
        console.log(err);
        console.log(results);
        connection.end();
    }
);