import express from "express";
import oracledb from "oracledb";
import cors from "cors";
import { withDb, AccidentsTable, OptimizedQuery } from "./db";
import axios from "axios";

const main = () => {
  oracledb.initOracleClient({
    libDir: process.env.ORACLE_CLIENT_PATH,
  });

  const PORT = 8080; // default port to listen

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
    const result = await withDb(
      res,
      async (db) => await db.execute(`SELECT COUNT(ID) FROM ${AccidentsTable}`)
    );

    res.send({ number_accidents: result.rows[0][0] });
  });

  app.post("/process", async (req, res) => {
    const { polypaths } = req.body;
    const url = (lat: number, lng: number) =>
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_API_KEY}`;

    // console.log(polypaths);

    const simplifiedPolypaths = polypaths.map((e: any) => {
      let lastAdded = e[0];
      return e.filter((_: any, i: number) => {
        if (i == 0) return true;

        if (
          Math.abs(lastAdded.lat - e[i].lat) +
            Math.abs(lastAdded.lng - e[i].lng) >
          0.02
        ) {
          lastAdded = e[i];
          return true;
        }
        return false;
      });
    });

    console.log(simplifiedPolypaths);

    const routes = await Promise.all(
      simplifiedPolypaths.map((e: any) =>
        Promise.all(e.map((el: any) => axios.get(url(el.lat, el.lng))))
      )
    );

    const codes: string[][] = [];
    routes.forEach((e: any) => {
      const codeSet = new Set<string>();
      e.forEach((el: any) => {
        el.data.results.forEach((ele: any) => {
          if (ele.address_components.slice(-1)[0].types.includes("postal_code"))
            codeSet.add(ele.address_components.slice(-1)[0].long_name);
        });
      });

      codes.push([...codeSet]);
    });

    console.log(codes);

    // console.log(ZipcodeQuery(codes[0]));

    const queries = simplifiedPolypaths.map((_: any, i: number) =>
      OptimizedQuery(simplifiedPolypaths[i], codes[i])
    );

    const result = await withDb(
      res,
      async (db) => await Promise.all(queries.map((e: string) => db.execute(e)))
    );

    // console.log(result);
    res.send(result.map((e: any) => e.rows));
  });

  // start the Express server
  app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
  });
};

main();
