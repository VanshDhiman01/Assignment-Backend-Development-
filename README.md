A **dynamic API Gateway** built with **Node.js + Express + TypeScript** that routes incoming requests to multiple backend services based on a configurable routing table. The gateway includes authentication, rate-limiting, validation, and hot-reload configuration support.



# Running the Services

# Option 1: Run All Services Together

Run all three services (Service 1, Service 2, and Gateway) concurrently:
npm run dev:all


# Option 2: Run Services Separately

Open three terminal windows:

**Terminal 1 - Backend Service 1 (Users & Profiles):**
npm run dev:service1

Service runs on: `http://localhost:3001`

**Terminal 2 - Backend Service 2 (Tasks & Projects):**
npm run dev:service2

Service runs on: `http://localhost:3002`

**Terminal 3 - API Gateway:**
npm run dev:gateway

Gateway runs on: `http://localhost:3000`

##  Configuration

The routing configuration is stored in `src/config/routes.json`. This file defines:

- **Routes**: Path patterns and target backend services
- **HTTP Methods**: Allowed methods per route (GET, POST, PUT, DELETE)
- **Authentication**: Whether authentication is required
- **Rate Limiting**: Per-route rate limit settings
- **Validation**: Request validation rules (optional)



##  Authentication

The gateway uses JWT-based authentication. All routes marked with `"authRequired": true` require a valid JWT token in the `Authorization` header.

### Generating a Test Token

Generate a JWT token for testing:
npx ts-node src/utils/generate-token.ts

This will output a token that you can use in your requests.

### Using the Token

Include the token in your request headers:
Authorization: Bearer <your-token-here>


### Gateway Endpoints

- `GET /health` - Gateway health check
- `GET /gateway/info` - Gateway information and configured routes

### Backend Service 1 

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create a new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `GET /profiles` - Get all profiles
- `GET /profiles/:id` - Get profile by ID
- `POST /profiles` - Create a new profile
- `PUT /profiles/:id` - Update profile
- `DELETE /profiles/:id` - Delete profile

### Backend Service 2

- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get task by ID
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task
- `GET /projects` - Get all projects
- `GET /projects/:id` - Get project by ID
- `POST /projects` - Create a new project
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

## Example Requests

### 1. Health Check (No Auth Required)

curl http://localhost:3000/health
**Response:**
```json
{
  "status": "ok",
  "service": "API Gateway",
  "timestamp": "2024-01-15T10:30:00.000Z"
}

### 2. Get Gateway Info
curl http://localhost:3000/gateway/info

### 3. Get Users (Auth Required)

First, generate a token:
npx ts-node src/utils/generate-token.ts

Then use it:
curl -H "Authorization: Bearer <your-token>" http://localhost:3000/users
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com"
    }
  ],
  "service": "Service 1",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 4. Create a User (Auth Required)
curl -X POST \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice Johnson", "email": "alice@example.com"}' \
  http://localhost:3000/users

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 123,
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  "service": "Service 1",
  "message": "User created successfully",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 5. Get Tasks (Auth Required)
curl -H "Authorization: Bearer <your-token>" http://localhost:3000/tasks

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Complete API Gateway",
      "status": "in-progress",
      "projectId": 1
    }
  ],
  "service": "Service 2",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 6. Create a Task (Auth Required)
curl -X POST \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{"title": "Write Tests", "status": "pending", "projectId": 1}' \
  http://localhost:3000/tasks

## 🔧 Features

### Dynamic Routing
- Routes are configured via JSON file
- Supports wildcard patterns (`/users/*`)
- Method-specific routing (GET, POST, PUT, DELETE)
- Hot-reload configuration without restart

###  Authentication
- JWT-based authentication
- Configurable per route
- Token validation and user context

###  Rate Limiting
- Per-route rate limiting
- Configurable window and max requests
- IP-based or user-based limiting
- Default rate limits

### Request Validation
- Body validation
- Query parameter validation
- Header validation
- Configurable validation rules

### Error Handling
- Graceful error handling
- Backend service error propagation
- Detailed error messages
- Proper HTTP status codes

### Logging
- Request logging
- Error logging
- Debug logging (when enabled)
- Timestamped logs

## Configuration Details

### Route Configuration Schema

```typescript
{
  path: string;              // Route path (supports wildcards with /*)
  target: string;            // Backend service URL
  methods: HttpMethod[];     // Allowed HTTP methods
  authRequired?: boolean;    // Require authentication (default: false)
  rateLimit?: {             // Per-route rate limit
    windowMs: number;        // Time window in milliseconds
    max: number;             // Max requests per window
  };
  validation?: {            // Request validation (optional)
    body?: Record<string, any>;
    query?: Record<string, any>;
    headers?: Record<string, any>;
  };
}
```

### JWT Configuration

```json
{
  "jwt": {
    "secret": "your-secret-key-change-in-production",
    "expiresIn": "24h"
  }
}
```

**⚠️ Important:** Change the JWT secret in production!

## 🛠️ Development

### Project Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev:gateway` - Run gateway in development mode
- `npm run dev:service1` - Run service 1 in development mode
- `npm run dev:service2` - Run service 2 in development mode
- `npm run dev:all` - Run all services concurrently
- `npm run start:service1` - Run service 1 in production mode
- `npm run start:service2` - Run service 2 in production mode

### Adding a New Backend Service

1. Create a new service in `src/backend-services/service3/`
2. Add routes to `src/config/routes.json` pointing to the new service
3. The gateway will automatically pick up the new routes (hot-reload)

### Extending Validation

Add validation rules to routes in `routes.json`:

```json
{
  "validation": {
    "body": {
      "name": {
        "type": "string",
        "required": true,
        "minLength": 3,
        "maxLength": 100
      },
      "email": {
        "type": "string",
        "required": true,
        "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
      }
    }
  }
}

##  Production Deployment

1. Build the project:
npm run build

2. Set environment variables:
export NODE_ENV=production
export JWT_SECRET=your-production-secret

3. Run services:
npm run start:service1 &
npm run start:service2 &
npm run start:gateway
