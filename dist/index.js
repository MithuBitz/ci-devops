"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const express_1 = __importDefault(require("express"));
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
const utils_1 = require("./utils");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
let dbUser = process.env.DB_USER;
let dbPassword = process.env.DB_PASSWORD;
if (!dbUser && process.env.DB_USER_FILE) {
    dbUser = node_fs_1.default.readFileSync(process.env.DB_USER_FILE, 'utf-8').trim();
}
if (!dbPassword && process.env.DB_PASSWORD_FILE) {
    dbPassword = node_fs_1.default.readFileSync(process.env.DB_PASSWORD_FILE, 'utf-8').trim();
}
const pool = promise_1.default.createPool({
    host: process.env.DB_HOST,
    user: dbUser,
    password: dbPassword,
    database: process.env.DB_NAME,
});
app.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT title, description FROM blogs');
        res.render('index', {
            blogs: rows,
            version: (0, utils_1.getVersion)(),
            host: process.env.NODE_HOST || (0, utils_1.getHostName)(),
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving blog posts');
    }
});
app.get('/health', (req, res) => {
    console.log('Checking health through endpoint...');
    res.json({ alive: true });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
