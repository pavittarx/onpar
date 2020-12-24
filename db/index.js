const mongo = require("mongodb");

require("dotenv").config();

const options = {
  useUnifiedTopology: true,
};

const client = new mongo.MongoClient(process.env.MONGO_DATASOURCE, options);

process.on("exit", async () => {
  await client.close();
});

async function connect() {
  return await client.connect();
}

const db = (async () => {
  return (await connect()).db('onpar');
})();

module.exports = {
  mongo,
  client: connect(),
  db,
};
