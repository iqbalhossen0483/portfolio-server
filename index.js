const express = require("express");
const mongoDb = require("./mongoDb");
const cors = require("cors");
const { ObjectId } = require("mongodb");

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;
const client = mongoDb();


app.get("/", (req, res) => {
    res.send("porfolio server is running")
});

const run = async () => {
    try {
        await client.connect();
        const database = client.db("porfolio");
        const users = database.collection("contacts");

        app.post("/users", async (req, res) => {
            const user = req.body;
            const result = await users.insertOne(user);
            res.send(result);
        });
        app.get("/users", async (req, res) => {
            const result = await users.find({}).toArray();
            res.send(result);
        });
        app.delete("/users/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await users.deleteOne(query);
            res.send(result);
        });
        app.put("/users", async (req, res) => {
            const data = req.body;
            const query = { _id: ObjectId(data.id) };
            const update = {
                $set: {
                    status: data.status
                }
            }
            const result = await users.updateOne(query, update);
            res.send(result);
        })


    } finally {

    }
};
run().catch(console.dir);

app.listen(port, () => {
    console.log("server is running")
});