const { MongoClient } = require("mongodb")

const db_url = "mongodb://localhost:27017"
const db_name = "diff"

MongoClient.connect(db_url, function (err, client) {
    const db = client.db(db_name)
    db.collection("stocks").deleteMany({})
    client.close()
})
