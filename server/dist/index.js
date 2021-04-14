"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const oracledb_1 = __importDefault(require("oracledb"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const axios_1 = __importDefault(require("axios"));
const main = () => {
    oracledb_1.default.initOracleClient({
        libDir: process.env.ORACLE_CLIENT_PATH,
    });
    const PORT = 8080;
    const app = express_1.default();
    app.use(express_1.default.json());
    app.use(cors_1.default({ origin: true }));
    app.get("/", (req, res) => {
        res.send("Hello world!");
    });
    app.get("/connect", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let connection;
        try {
            connection = yield oracledb_1.default.getConnection({
                user: process.env.ORACLE_USER,
                password: process.env.ORACLE_PASSWD,
                connectString: "oracle.cise.ufl.edu/orcl",
            });
            res.send("Successfully connected to Oracle!");
        }
        catch (err) {
            res.send("Error: " + err);
        }
        finally {
            if (connection) {
                try {
                    yield connection.close();
                }
                catch (err) {
                    res.send("Error when closing the database connection: " + err);
                }
            }
        }
    }));
    app.get("/table-size", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.withDb(res, (db) => __awaiter(void 0, void 0, void 0, function* () { return yield db.execute(`SELECT COUNT(ID) FROM ${db_1.AccidentsTable}`); }));
        res.send({ number_accidents: result.rows[0][0] });
    }));
    app.post("/process", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { polypaths } = req.body;
        const url = (lat, lng) => `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_API_KEY}`;
        const simplifiedPolypaths = polypaths.map((e) => {
            let lastAdded = e[0];
            return e.filter((_, i) => {
                if (i == 0)
                    return true;
                if (Math.abs(lastAdded.lat - e[i].lat) +
                    Math.abs(lastAdded.lng - e[i].lng) >
                    0.02) {
                    lastAdded = e[i];
                    return true;
                }
                return false;
            });
        });
        console.log(simplifiedPolypaths);
        const routes = yield Promise.all(simplifiedPolypaths.map((e) => Promise.all(e.map((el) => axios_1.default.get(url(el.lat, el.lng))))));
        const codes = [];
        routes.forEach((e) => {
            const codeSet = new Set();
            e.forEach((el) => {
                el.data.results.forEach((ele) => {
                    if (ele.address_components.slice(-1)[0].types.includes("postal_code"))
                        codeSet.add(ele.address_components.slice(-1)[0].long_name);
                });
            });
            codes.push([...codeSet]);
        });
        console.log(codes);
        const queries = simplifiedPolypaths.map((_, i) => db_1.OptimizedQuery(simplifiedPolypaths[i], codes[i]));
        const result = yield db_1.withDb(res, (db) => __awaiter(void 0, void 0, void 0, function* () { return yield Promise.all(queries.map((e) => db.execute(e))); }));
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
        };
        let response = [];
        var Arr = [[]];
        for (let r of result) {
            var a = [];
            var rows = r.rows;
            for (let row of rows) {
                a.push(row[2]);
            }
            Arr.push(a);
        }
        console.log(Arr);
        for (let arr of Arr) {
            var distYear = [];
            var distMonth = [];
            var distWeek = [];
            var yearCount = 0;
            var monthCount = 0;
            var weekCount = 0;
            var date = "" + arr[0];
            var month = date.substring(5, 7);
            var currentYear = date.substring(0, 4) +
                "/" +
                MONTHS[month] +
                "/" +
                date.substring(8, 10);
            var currentMonth = currentYear;
            var currentWeek = currentYear;
            for (let a of arr) {
                date = "" + a;
                month = date.substring(4, 7);
                var thisDate = date.substring(0, 4) +
                    "/" +
                    MONTHS[month] +
                    "/" +
                    date.substring(8, 10);
                var diffYear = Math.abs(new Date(thisDate).getTime() - new Date(currentYear).getTime());
                var diffWeek = Math.abs(new Date(thisDate).getTime() - new Date(currentWeek).getTime());
                var diffMonth = Math.abs(new Date(thisDate).getTime() - new Date(currentMonth).getTime());
                if (diffYear < 31104000000) {
                    yearCount++;
                }
                else {
                    if (yearCount > 0) {
                        distYear.push(yearCount);
                    }
                    yearCount = 0;
                    currentYear = thisDate;
                }
                if (diffWeek < 604800000) {
                    weekCount++;
                }
                else {
                    if (weekCount > 0) {
                        distWeek.push(weekCount);
                    }
                    weekCount = 0;
                    currentWeek = thisDate;
                }
                if (diffMonth < 2202000000) {
                    monthCount++;
                }
                else {
                    if (monthCount > 0) {
                        distMonth.push(monthCount);
                    }
                    monthCount = 0;
                    currentMonth = thisDate;
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
                distribution_yearly: distYear,
            });
        }
        res.send(response);
    }));
    app.listen(PORT, () => {
        console.log(`server started at http://localhost:${PORT}`);
    });
};
main();
//# sourceMappingURL=index.js.map