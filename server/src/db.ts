import oracledb from "oracledb";
import { Response } from "express";

export const withDb = async (
  res: Response,
  fn: (c: Readonly<oracledb.Connection>) => any
) => {
  oracledb.initOracleClient({
    libDir: process.env.ORACLE_CLIENT_PATH,
  });

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
