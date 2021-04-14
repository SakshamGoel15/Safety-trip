import oracledb from "oracledb";
import { Response } from "express";

export const withDb = async (
  res: Response,
  fn: (c: Readonly<oracledb.Connection>) => any
) => {
  let connection: Readonly<oracledb.Connection> | undefined;
  let output;
  try {
    connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWD,
      connectString: "oracle.cise.ufl.edu/orcl",
    });
    console.log("Successfully connected to OracleDB!");

    output = await fn(connection); // bubble connection downwards
  } catch (err) {
    console.log("Error while trying to connect to OracleDB");
    console.log(err);

    res.status(500);
    res.send("Error Connecting to the Database");
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log("Successfully closed the connection.");
      } catch (err) {
        console.log("Error while trying to close OracleDB Connection");
        console.log(err);
      } finally {
        return output;
      }
    }
  }
};

export const AccidentsTable = "adolago.US_TRAFFIC_ACCIDENTS";

export const boundingBoxRange = 10;

export const boundingBoxQuery = `SELECT *
FROM ${AccidentsTable}
WHERE ${AccidentsTable}.START_LAT
   BETWEEN :lat  - (${boundingBoxRange} / 111.045)
       AND :lat + (${boundingBoxRange} / 111.045)
  AND ${AccidentsTable}.START_LNG
   BETWEEN :lng - (${boundingBoxRange} / (111.045* COS( :lat /57.29577951308232087679815481410517033235)))
       AND :lng + (${boundingBoxRange} / (111.045 * COS( :lat /57.29577951308232087679815481410517033235)))`;

export const NaiveQuery = (geo: GeoPair, tableName: string = AccidentsTable) =>
  `(SELECT * FROM ${tableName} WHERE ABS(${tableName}.START_LAT - (${geo.lat})) < 0.001 AND ABS(${tableName}.START_LNG - (${geo.lng})) < 0.001)`;

export const composeQuery = (
  path: GeoPair[],
  tableName: string = AccidentsTable
) => {
  const header = "SELECT START_LAT, START_LNG, START_TIME, SEVERITY FROM (";
  const footer = ")";
  const body = path
    .map((geo) => NaiveQuery(geo, AccidentsTable))
    .join(" UNION ");
  return [header, body, footer].join("");
};

export const ZipcodeQuery = (zip: string[]) =>
  `SELECT * FROM ${AccidentsTable} WHERE ZIPCODE IN (${zip
    .map((e) => `('${e}')`)
    .join()})`;

export const OptimizedQuery = (path: GeoPair[], zip: string[]) =>
  `WITH NARROWED_DOWN AS (${ZipcodeQuery(zip)}) ${composeQuery(
    path,
    "NARROWED_DOWN"
  )}`;

export interface GeoPair {
  lat: number;
  lng: number;
}

export const boundingBoxQueryOptions = {
  bindDefs: {
    lat: {
      type: oracledb.NUMBER,
    },
    lng: {
      type: oracledb.NUMBER,
    },
  },
};
