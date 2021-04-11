import express from "express";
import oracledb from "oracledb";
import cors from "cors";

oracledb.initOracleClient({
  libDir: process.env.ORACLE_CLIENT_PATH,
});
const port = 8080; // default port to listen

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/connect", async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWD,
      connectString: "oracle.cise.ufl.edu/orcl",
    });
    res.send("Successfully connected to Oracle!");
  } catch (err) {
    res.send("Error: " + err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        res.send("Error when closing the database connection: " + err);
      }
    }
  }
});

app.get("/table-size", async (req, res) => {
  res.send({ number_accidents: "We don't have that yet" });
});

app.post("/process", async (req, res) => {
  res.send([]);

  const { polypaths } = req.body;
  // console.log(polypaths);
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
