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

        const MONTHS = {
            Dec: 12,
            Jan: 1,
            Feb: 2,
            Mar: 3,
            Apr: 4,
            May: 5,
            Jun: 6,
            Jul: 7,
            Aug: 8,
            Sep: 9,
            Oct: 10,
            Nov: 11,
        }
        let response = [];
        var Arr = [[]];
        for (let r of result) {
            var a = []
            var rows = r.rows
            for (let row of rows) {
                a.push(row[2])
            }
            Arr.push(a)
        }
        console.log(Arr)
        // const accidents = result.rows;
        for (let arr of Arr) {
            var distYear: number[] = [];
            var distMonth: number[] = [];
            var distWeek: number[] = [];
            var yearCount = 0;
            var monthCount = 0;
            var weekCount = 0;
            var date = "" + arr[0]
            var month = date.substring(5, 7)
            var currentYear = date.substring(0, 4) + "/" + MONTHS[month] + "/" + date.substring(8, 10)
            var currentMonth = currentYear
            var currentWeek = currentYear
            for (let a of arr) {
                date = "" + a
                month = date.substring(4, 7)
                var thisDate = date.substring(0, 4) + "/" + MONTHS[month] + "/" + date.substring(8, 10)
                var diffYear = Math.abs(new Date(thisDate).getTime() - new Date(currentYear).getTime());
                var diffWeek = Math.abs(new Date(thisDate).getTime() - new Date(currentWeek).getTime());
                var diffMonth = Math.abs(new Date(thisDate).getTime() - new Date(currentMonth).getTime());
                if (diffYear < 31104000000) {
                    yearCount++;
                } else {
                    if (yearCount > 0) {
                        distYear.push(yearCount);
                    };

                    yearCount = 0;
                    currentYear = thisDate
                }
                if (diffWeek < 604800000) {
                    weekCount++;
                } else {
                    if (weekCount > 0) {
                        distWeek.push(weekCount);
                    };
                    weekCount = 0;
                    currentWeek = thisDate
                }
                if (diffMonth < 2202000000) {
                    monthCount++;
                } else {
                    if (monthCount > 0) {
                        distMonth.push(monthCount)
                    };
                    monthCount = 0;
                    currentMonth = thisDate
                }
            }
            distYear.push(yearCount);
            distWeek.push(weekCount);
            distMonth.push(monthCount);
            response.push({
                recent_accidents: {
                    avg_weekly: 1,
                    avg_monthly: 1,
                    avg_yearly: 1,
                },
                danger_index: 6,
                distribution_weekly: distWeek,
                distribution_monthly: distMonth,
                distribution_yearly: distYear
            })

        }
        // console.log(result);
        res.send(response);
    });

    // start the Express server
    app.listen(PORT, () => {
        console.log(`server started at http://localhost:${PORT}`);
    });
};

main();
