const { MongoClient} = require('mongodb')

const client = new MongoClient('mongodb://localhost:27017')

const clientFunc = async (c) => {
  await client.connect()
  console.log('连接成功')
  const db = client.db('mytest')
  return db.collection(c)
}

const main = async () => {
  const cc = await clientFunc('cc')
  // 查询d
  const d = await cc.find()

  // 插入
  // const d = await cc.insertOne({name: 'cc', age: 18})
  // const d = await cc.insertMany([
  //   {name: 'dd', age: 22},
  //   {name: 'ee', age: 33},
  // ])

  // 更新
  // const d = await cc.updateOne({name: 'cc'}, {$set: {age: 22}})

  // 删除
  // const d = await cc.deleteOne({k: 4})

  console.log(await d.toArray())
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());