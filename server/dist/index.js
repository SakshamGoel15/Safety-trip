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
oracledb_1.default.initOracleClient({
    libDir: process.env.ORACLE_CLIENT_PATH,
});
const port = 8080;
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
    res.send({ number_accidents: "We don't have that yet" });
}));
app.post("/process", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send([]);
    const { polypaths } = req.body;
    console.log(polypaths);
}));
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map