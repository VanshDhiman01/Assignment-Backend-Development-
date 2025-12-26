import { GatewayServer } from './gateway/server.js';

const gateway = new GatewayServer();
gateway.start();

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  gateway.stop();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  gateway.stop();
  process.exit(0);
});

