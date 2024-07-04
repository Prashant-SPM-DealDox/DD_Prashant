var mongoose = require('mongoose');

//Object holding all your connection strings
var connections = {};

exports.getDatabaseConnection = function(dbName) {

    if(connections[dbName]) {
        //database connection already exist. Return connection object
        return connections[dbName];
    } else {
        connections[dbName] = mongoose.createConnection(process.env.MONGO_PARENT_URI +'/'+ dbName);
        // console.log("new connection established here",connections);
        return connections[dbName];
    }       
}