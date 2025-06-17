"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const cors_1 = __importDefault(require("cors"));
const payment_1 = __importDefault(require("./routes/payment"));
const gemini_1 = __importDefault(require("./routes/gemini"));
const jwt_utils_1 = require("./utils/jwt.utils");
const chatcontroller_1 = require("./controllers/chatcontroller");
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post('/', (req, res) => {
    res.send("Hello from the server");
});
app.use('/auth', auth_1.default);
app.use('/api/payment', payment_1.default);
app.use('/api/gemini', gemini_1.default);
app.get('/chat/token', chatcontroller_1.getStreamToken);
const verificationHandler = (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ valid: false });
        return;
    }
    try {
        const verified = (0, jwt_utils_1.verifyAccessToken)(token);
        res.json({ valid: true });
    }
    catch (err) {
        res.status(401).json({ valid: false });
    }
};
app.get('/api/auth/verify', verificationHandler);
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
