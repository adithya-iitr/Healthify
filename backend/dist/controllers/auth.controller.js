"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.refreshToken = void 0;
const jwt_utils_1 = require("../utils/jwt.utils");
// Simulate a user database (Replace with actual DB in a real project)
let refreshTokens = []; // Store refresh tokens in memory (use a database in production)
// Refresh Access Token using Refresh Token
const refreshToken = (req, res) => {
    const { token } = req.body;
    if (!token || !refreshTokens.includes(token)) {
        return res.status(403).json({ message: 'Refresh token not found, login again' });
    }
    try {
        const decoded = (0, jwt_utils_1.verifyRefreshToken)(token);
        const newAccessToken = (0, jwt_utils_1.generateAccessToken)(decoded.userId);
        res.json({ accessToken: newAccessToken });
    }
    catch (err) {
        return res.status(403).json({ message: 'Invalid or expired refresh token' });
    }
};
exports.refreshToken = refreshToken;
// Logout (Invalidate Refresh Token)
const logout = (req, res) => {
    const { token } = req.body;
    // Remove refresh token from store
    refreshTokens = refreshTokens.filter((t) => t !== token);
    res.json({ message: 'Logged out' });
};
exports.logout = logout;
