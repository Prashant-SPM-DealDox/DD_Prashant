var db = require('../models/mongodb.js');
var connection = require('./connectDB.js');

const GetDocument = async (model, query, projection, extension, DB) => {
    // console.log("GetDocument==>",model, query, projection, extension, "DB-->",DB);
    if(DB){
        var database = connection.getDatabaseConnection(DB);
        var query =await db(database)[model].find(query, projection, extension.options).exec();
        return query;
    } else {
        var query =await db()[model].find(query, projection, extension.options).exec();
        return query;
    }
}



const  GetOneDocument = async (model, query, projection, extension, DB) => {
    // console.log("GetOneDocument==>",model, query, projection, extension);
    if(DB){
        var database = connection.getDatabaseConnection(DB);
        var query =await db(database)[model].findOne(query, projection, extension.options).exec();
        return query;
    } else {
        var query =await db()[model].findOne(query, projection, extension.options).exec();
        return query;
    }
}

const findAllDocument = async (model, query, projection, extension, DB) => {
    // console.log("findAllDocument==>",model, query, projection, extension, "DB-->",DB);
    if(DB){
        var database = connection.getDatabaseConnection(DB);
        var query =await db(database)[model].findAll(query, projection, extension.options).exec();
        return query;
    } else {
        var query =await db()[model].findAll(query, projection, extension.options).exec();
        return query;
    }
}

const GetAggregation = async (model, query, DB) => {
    if(DB){
        var database = connection.getDatabaseConnection(DB);
        var query =await db(database)[model].aggregate(query).exec();
        return query;
    } else {
        var query =await db()[model].aggregate(query).exec();
        return query;
    }
}

const InsertDocument = async (model, docs, DB) => {
    // console.log("InsertDocument-->",model, docs, DB);
    if(DB){
        var database = connection.getDatabaseConnection(DB);
        var query =await db(database)[model].create(docs);

        return query;
    } else {
        var query =await db()[model].create(docs);
        return query;
    }
}

const DeleteDocument = async (model, criteria ,DB) => {
    if(DB){
        var database = connection.getDatabaseConnection(DB);
        var query =await db(database)[model].deleteOne( criteria);
        return query;
    } else {
        var query =await db()[model].deleteOne( criteria);
        return query;
    }
}

const DeleteManyDocument = async (model, criteria ,DB) => {
    if(DB){
        var database = connection.getDatabaseConnection(DB);
        var query =await db(database)[model].deleteMany( criteria, doc);
        return query;
    } else {
        var query =await db()[model].deleteMany( criteria, doc);
        return query;
    }
}


const UpdateDocument = async (model, criteria, doc, DB) => {
    if(DB){
        var database = connection.getDatabaseConnection(DB);
        var query =await db(database)[model].updateOne( criteria, doc);
        return query;
    } else {
        var query =await db()[model].updateOne( criteria, doc);
        return query;
    }
}

const findOneAndUpdateDocument = async (model,id, criteria, doc, DB) => {
    if(DB){
        var database = connection.getDatabaseConnection(DB);
        var query =await db(database)[model].findOneAndUpdate( id,criteria, doc);
        return query;
    } else {
        var query =await db()[model].findOneAndUpdate(id, criteria, doc);
        return query;
    }
}

const findByIdAndUpdateDocument = async (model, id, criteria, doc, DB) => {
    if(DB){
        var database = connection.getDatabaseConnection(DB);
        var query =await db(database)[model].findByIdAndUpdate( id, criteria, doc);
        return query;
    } else {
        var query =await db()[model].findByIdAndUpdate( id, criteria, doc);
        return query;
    }
}
const findByIdDocument = async (model, criteria, doc, DB) => {
    if(DB){
        var database = connection.getDatabaseConnection(DB);
        var query =await db(database)[model].findById( criteria);
        return query;
    } else {
        var query =await db()[model].findById( criteria );
        return query;
    }
}
const findByIdAndDeleteDocument = async (model, criteria,  DB) => {
    if(DB){
        var database = connection.getDatabaseConnection(DB);
        var query =await db(database)[model].findByIdAndDelete( criteria );
        return query;
    } else {
        var query =await db()[model].findByIdAndDelete( criteria);
        return query;
    }

}

function GetCount(model, conditions, callback){
    db[model].count(conditions, function(err, count){
        callback(err, count);
    });
}


function PopulateDocument(model, docs, options, callback){
    db[model].populate(docs, options, function(err, docs) {
        callback(err, docs);
    });
}

module.exports  = {
    "GetDocument"        :   GetDocument,
    "GetOneDocument"	 :	 GetOneDocument,
    "InsertDocument"     :   InsertDocument,
    "DeleteDocument"     :   DeleteDocument,
    "UpdateDocument"     :   UpdateDocument,
    "findOneAndUpdateDocument" : findOneAndUpdateDocument,
    "GetAggregation"     :   GetAggregation,
    "PopulateDocument"   :   PopulateDocument,
    "GetCount"	 		 :   GetCount,
    "findByIdAndUpdateDocument": findByIdAndUpdateDocument,
    "findAllDocument" : findAllDocument,
    "findByIdAndDeleteDocument": findByIdAndDeleteDocument,
    "DeleteManyDocument" : DeleteManyDocument,
    "findByIdDocument" :findByIdDocument
};
