const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express")
const cors = require('cors')

admin.initializeApp({
})
const db = admin.firestore();
const app = express();
app.use(cors({ origin: true }))
app.use(express.json())

app.get("/hello", (req, res) => {
    res.status(200).send("Hello")
})

app.get("/testdb", async (req, res) => {
    const test_collection = db.collection('test')
    const snapshot = await test_collection.get();
    var output = ""
    snapshot.forEach(doc => {
        output += doc.id + "=>" + JSON.stringify(doc.data())
    })
    res.status(200).send(output)
})

app.post("/testdb", async(req, res) => {
    await db.collection('test').doc('QZAWWxvx5uHbZVE8uyEP').set(req.body)
    res.status(200).send("OK")
})

app.post("/auth/authenticated", async(req, res) => {
    var token = req.body.token;
    try {
        const userData = await admin.auth().verifyIdToken(token);
        res.status(200).send("Authorization OK");
        console.log(userData.email)
    } catch (err) {
        res.status(401).send("Unauthorized");
        console.log("ERR: invalid token");
    }
})

//todo isAuthorized

exports.api = functions.https.onRequest(app)

