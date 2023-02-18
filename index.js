const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const { MongoClient, ServerApiVersion } = require('mongodb');
const { query } = require('express');
const uri = `mongodb+srv://${process.env.NAME}:${process.env.PASS}@cluster0.d1gdkts.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

async function run() {
  try {

    const jobCollection = client.db("jobend").collection("allJobs");
    const companyCollection = client.db("jobend").collection("companies");
    const categoryCollection = client.db("jobend").collection("jobcategory");

    app.get("/jobs/:for", async (req, res) => {
      const posFor = req.params.for;
      console.log(posFor);
      const query = { "JobsFor": `${posFor}` }
      const data = await jobCollection.find(query).toArray();
      res.json({
        status: "success",
        data: data,
      })
    })

    app.get("/companies", async (req, res) => {
      const companies = await companyCollection.find().toArray();
      res.json({
        status: "success",
        data: companies,
      })
    })

    app.get("/categories", async (req, res) => {
      const category = await categoryCollection.find().toArray();
      res.json({
        status: "success",
        data: category,
      })
    })

  }
  finally {

  }
}

run().catch(error => console.error(error))

app.get("/", async (req, res) => {
  res.send("Jobend Running")
})

app.listen(port, () => {
  console.log(`Jobend app listening on port ${port}`)
})
