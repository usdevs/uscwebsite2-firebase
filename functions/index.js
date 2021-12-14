const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express")
const cors = require('cors')

admin.initializeApp({
})
const db = admin.firestore();
const app = express();
app.use(cors({ origin: true }))

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

async function isAuthenticated(token) {
    const userData = await admin.auth().verifyIdToken(token);
    console.log(userData.uid)
}

//todo isAuthorized

exports.api = functions.https.onRequest(app)

