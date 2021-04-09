import express from "express";
import oracledb from "oracledb";
import axios from "axios";
import cors from "cors";
oracledb.initOracleClient({ libDir: "/Users/mikhailbudko/Desktop/instantclient_19_8" })

const app = express();
const port = 8080; // default port to listen

//setup CORS
app.use(cors({ origin: true }));
app.use("/directions", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.get("/connect", async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: 'mbudko',
            password: 'Qr1Mz3Ph',
            connectString: 'oracle.cise.ufl.edu/orcl'
        });
        res.send("Successfully connected to Oracle!")
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

})

app.get("/directions/:origin&:destination", async (req, res) => {
    const origin = req.params.origin;
    const destination = req.params.destination;
    const url = "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin + "&destination=" + destination + "&key=AIzaSyAcX2r43s91XPX5Wi2AFGFuPawqk9k74uw"
    const response = await axios.get(url)
    res.send({
        directions: response.data
    })
})


// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});