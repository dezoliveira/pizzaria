"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
// routes
const routes_1 = require("./routes");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
// express
const app = (0, express_1.default)();
app.use(express_1.default.json());
// cors
app.use((0, cors_1.default)());
// file upload
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 50 * 1024 * 1024 } // No max 50MB
}));
// router
app.use(routes_1.router);
app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '..', 'tmp')));
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    });
});
// server watch
app.listen(process.env.PORT, () => console.table(['Listen on http://localhost:3333']));
