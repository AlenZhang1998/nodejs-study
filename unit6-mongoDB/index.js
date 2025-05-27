const { MongoClient} = require('mongodb')

const client = new MongoClient('mongodb://localhost:27017')

const main = async () => {
  await client.connect()
  const db = client.db('mytest')
  const cc = db.collection('cc')
  const d = await cc.find()
  console.log(await d.toArray())
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());