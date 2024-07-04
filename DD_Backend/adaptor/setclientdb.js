var mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
// const people = require('../models/peopleModel');
// const admin = require('../models/adminModel');
//var dynamicConnection = require('../models/dynamicMongoose');
function  setclientdb() {
    return async function(req, res, next){
        
        //check if client has an existing db connection                                                               /*** Check if client db is connected and pooled *****/
    // if(/*typeof global.App.clientdbconn === 'undefined' && */ typeof(req?.user?.company) !== 'undefined' && req?.user?.company !== req.headers?.company)
    // {
        //check if client session, matches current client if it matches, establish new connection for client
        // if(req?.user?.company && req.user?.company === req.headers?.company )
        if(req?.user?.company  )
        {
            // console.log('setting db for client ' + req.headers?.company+ ' and '+ req?.user?.company);
            client = mongoose.createConnection(process.env.MONGO_PARENT_URI+req.headers?.company /*, dbconfigoptions*/);


            client.on('connected', function () {
                // console.log('Mongoose default connection open to  ' + req?.user?.company);
            });
            // When the connection is disconnected
            client.on('disconnected', function () {
                // console.log('Mongoose '+ req?.user?.company +' connection disconnected');
            });

            // If the Node process ends, close the Mongoose connection
            process.on('SIGINT', function() {
                client.close(function () {
                    // console.log(req?.user?.company +' connection disconnected through app termination');
                    process.exit(0);
                });
            });

            //If pool has not been created, create it and Add new connection to the pool and set it as active connection

            if(typeof(req?.user?.company) === 'undefined' || typeof(global.App.clients[req?.user?.company]) === 'undefined' && typeof(global.App.clientdbconn[req?.user?.company]) === 'undefined')
            {
                clientname = req?.user?.company;
                global.App.clients[clientname] = req?.user?.company;// Store name of client in the global clients array
                activedb = global.App.clientdbconn[clientname] = client; //Store connection in the global connection array
                // console.log('I am now in the list of active clients  ' + global.App.clients[clientname]);
            }
            global.App.activdb = activedb;
            // console.log('client connection established, and saved ' + req?.user?.company);
            next();
        }
        //if current client, does not match session client, then do not establish connection
        // else
        // {
        //     delete req?.user?.company;
        //     client = false;
        //     next();
        // }
    // }
    // else
    // {
    //     if(typeof(req?.user?.company) === 'undefined')
    //     {
    //         console.log("setclientdb--->",global.user);
    //         // verify user is authenticated
    //         const { authorization } = req.headers
            

    //         if (authorization !== undefined) {
    //             // return res.status(401).json({error: 'Authorization token required'})
            

    //             console.log("TOKEN 1",authorization);
    //             const token = authorization.split(' ')[1]
    //             console.log("TOKEN 2",token,authorization);

    //         try {
    //             const { _id } = jwt.verify(token, process.env.SECRET)

    //             const adminResult = await admin.findOne({ _id: _id });

    //             // if (!adminResult) {
    //             // const peopleResult = await people.findOne({ _id: _id });
    //             // req.user = peopleResult;
    //             // } else {
    //             // req.user = adminResult;
    //             // }

    //             if(req.user){
    //             next()
    //             }
    //             // else{
    //             // res.status(401).json({error: 'Request is not authorized'})
    //             // }

    //         } catch (error) {
    //             console.log(error)
    //             // res.status(401).json({error: 'Request is not authorized'})
    //         }
    //         }
    //        next();
    //     }
    //     //if client already has a connection make it active
    //     else{
    //         // global.App.activdb = global.App.clientdbconn[req?.user?.company];
    //         console.log('did not make new connection for ' , req?.user?.company);
    //         return next();
    //     }

    // }
    }
}

module.exports = setclientdb;
