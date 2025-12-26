import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';

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

