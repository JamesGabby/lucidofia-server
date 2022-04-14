const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database.')
    }

    const db = client.db(databaseName)

    db.collection('tasks').deleteOne({
        _id: ObjectId("62233aab5dbb7aa2320865cb")
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

})