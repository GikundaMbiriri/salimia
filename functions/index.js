const functions = require('firebase-functions');
//const {getDepartments,getAuthenticatedUser}=require('./handlers/departments')
//const { db } = require("./util/admin");

const {signUp}=require('./handlers/users')
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());



app.post('/signUp',signUp)
//app.post("/signup", signUp);

//app.get("/departments",  getDepartments);
exports.api = functions.https.onRequest(app);
