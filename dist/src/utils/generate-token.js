"use strict";
/**
 * Utility script to generate JWT tokens for testing
 * Run: npx ts-node src/utils/generate-token.ts
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const configPath = path.join(process.cwd(), 'src', 'config', 'routes.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
// Generate a test token
const payload = {
    userId: '123',
    email: 'test@example.com',
    name: 'Test User'
};
const token = jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
});
console.log('\n=== JWT Token Generated ===');
console.log(token);
console.log('\n=== Usage ===');
console.log('Add this header to your requests:');
console.log(`Authorization: Bearer ${token}`);
console.log('\n');
//# sourceMappingURL=generate-token.js.map