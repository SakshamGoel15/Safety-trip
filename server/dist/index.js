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
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
oracledb_1.default.initOracleClient({ libDir: "/Users/mikhailbudko/Desktop/instantclient_19_8" });
const app = express_1.default();
app.use(cors_1.default({
    origin: "*",
}));
const port = 8080;
app.use(cors_1.default({ origin: true }));
app.use("/directions", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get("/", (req, res) => {
    res.send("Hello world!");
});
app.get("/connect", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection({
            user: 'mbudko',
            password: 'Qr1Mz3Ph',
            connectString: 'oracle.cise.ufl.edu/orcl'
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
app.get("/directions/:origin&:destination", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const origin = req.params.origin;
    const destination = req.params.destination;
    const url = "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin + "&destination=" + destination + "&key=AIzaSyAcX2r43s91XPX5Wi2AFGFuPawqk9k74uw";
    const response = yield axios_1.default.get(url);
    res.send({
        directions: response.data
    });
}));
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map