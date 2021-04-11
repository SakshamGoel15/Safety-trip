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
exports.AccidentsTable = exports.withDb = void 0;
const oracledb_1 = __importDefault(require("oracledb"));
const withDb = (res, fn) => __awaiter(void 0, void 0, void 0, function* () {
    let connection;
    let output;
    try {
        connection = yield oracledb_1.default.getConnection({
            user: process.env.ORACLE_USER,
            password: process.env.ORACLE_PASSWD,
            connectString: "oracle.cise.ufl.edu/orcl",
        });
        console.log("Successfully connected to OracleDB!");
        output = yield fn(connection);
    }
    catch (err) {
        console.log("Error while trying to connect to OracleDB");
        console.log(err);
        res.status(500);
        res.send("Error Connecting to the Database");
    }
    finally {
        if (connection) {
            try {
                yield connection.close();
                console.log("Successfully closed the connection.");
            }
            catch (err) {
                console.log("Error while trying to close OracleDB Connection");
                console.log(err);
            }
            finally {
                return output;
            }
        }
    }
});
exports.withDb = withDb;
exports.AccidentsTable = "adolago.US_TRAFFIC_ACCIDENTS";
//# sourceMappingURL=db.js.map