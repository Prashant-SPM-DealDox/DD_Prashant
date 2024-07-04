const MongoClient = require('mongodb').MongoClient;
const collection_list = require("../config/db.config.js");
createDB = async (db_Name) => {
    const client = new MongoClient(process.env.MONGO_PARENT_URI);

    await client.connect(function(err, db) {
      if (err) throw err;
    
      const database = db.db(db_Name);
    let collection_data = collection_list.DEFAULT_COLLECTIONS;
    collection_data.forEach(async (collection_name) => {
      await database.createCollection(collection_name);
    })
    //   database.createCollection('dd_unapproved_users', function(err, collection) {
    //     if (err) throw err;
    
    //     console.log('Database created!',collection);
    //   });
      
    });
}


module.exports = { createDB };