const mongo = require('mongodb');
require('dotenv').config();

const options = {
  useUnifiedTopology: true
}

const client = new mongo.MongoClient(process.env.MONGO_DATASOURCE, options);

async function connect(){
  try{
    await client.connect();
    return client;
  }finally{
    await client.close();
  }
}

module.exports = {
  client: connect(),
}