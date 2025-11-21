// Backend API Contract for Hotel Reservation System
// This document describes the exact API endpoints the frontend expects

/**
 * BASE_URL: http://localhost:8080/api
 * Authentication: JWT Bearer Token in Authorization header
 * Content-Type: application/json
 */

// ============================================================================
// AUTHENTICATION ENDPOINTS
// ============================================================================

/**
 * POST /auth/register
 * Register a new user
 * 
 * Request Body:
 * {
 *   "name": "John Doe",
 *   "email": "john@example.com",
 *   "password": "secure_password",
 *   "phone": "+1-555-0123" (optional)
 * }
 * 
 * Response (200):
 * {
 *   "user": {
 *     "id": 1,
 *     "name": "John Doe",
 *     "email": "john@example.com",
 *     "phone": "+1-555-0123"
 *   },
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * }
 * 
 * Response (400):
 * { "error": "Email already registered" }
 */

/**
 * POST /auth/login
 * User login with email and password
 * 
 * Request Body:
 * {
 *   "email": "john@example.com",
 *   "password": "secure_password"
 * }
 * 
 * Response (200):
 * {
 *   "user": {
 *     "id": 1,
 *     "name": "John Doe",
 *     "email": "john@example.com"
 *   },
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * }
 * 
 * Response (401):
 * { "error": "Invalid credentials" }
 */

// ============================================================================
// ROOM ENDPOINTS
// ============================================================================

/**
 * GET /rooms
 * Get all available rooms
 * 
 * Headers:
 * - Authorization: Bearer {token} (optional, but recommended)
 * 
 * Response (200):
 * [
 *   {
 *     "id": "r1",
 *     "name": "City View Deluxe",
 *     "type": "deluxe",
 *     "price": 129.99,
 *     "beds": 2,
 *     "guests": 3,
 *     "image": "https://...",
 *     "description": "Beautiful room with city view",
 *     "availability": "Available"
 *   },
 *   ...
 * ]
 */

/**
 * GET /rooms/{roomId}
 * Get details of a specific room
 * 
 * URL Parameters:
 * - roomId: string or integer (required)
 * 
 * Headers:
 * - Authorization: Bearer {token} (optional)
 * 
 * Response (200):
 * {
 *   "id": "r1",
 *   "name": "City View Deluxe",
 *   "type": "deluxe",
 *   "price": 129.99,
 *   "beds": 2,
 *   "guests": 3,
 *   "image": "https://...",
 *   "description": "Beautiful room with city view",
 *   "amenities": ["WiFi", "TV", "AC"],
 *   "availability": "Available"
 * }
 * 
 * Response (404):
 * { "error": "Room not found" }
 */

/**
 * GET /rooms/search
 * Search and filter rooms
 * 
 * Query Parameters:
 * - guests: number (optional) - minimum guests the room can accommodate
 * - type: string (optional) - room type (e.g., "deluxe", "suite", "single")
 * - checkIn: date string (optional) - format: YYYY-MM-DD
 * - checkOut: date string (optional) - format: YYYY-MM-DD
 * 
 * Example:
 * GET /rooms/search?guests=2&type=deluxe&checkIn=2024-12-01&checkOut=2024-12-05
 * 
 * Headers:
 * - Authorization: Bearer {token} (optional)
 * 
 * Response (200):
 * [
 *   {
 *     "id": "r1",
 *     "name": "City View Deluxe",
 *     "type": "deluxe",
 *     "price": 129.99,
 *     "beds": 2,
 *     "guests": 3,
 *     "image": "https://...",
 *     "availability": "Available"
 *   },
 *   ...
 * ]
 */

// ============================================================================
// USER ENDPOINTS
// ============================================================================

/**
 * GET /users/{userId}
 * Get user profile information
 * 
 * URL Parameters:
 * - userId: integer or string (required)
 * 
 * Headers:
 * - Authorization: Bearer {token} (REQUIRED)
 * 
 * Response (200):
 * {
 *   "id": 1,
 *   "name": "John Doe",
 *   "email": "john@example.com",
 *   "phone": "+1-555-0123",
 *   "joinDate": "2023-05-15",
 *   "lastLogin": "2024-11-19"
 * }
 * 
 * Response (401):
 * { "error": "Unauthorized" }
 * 
 * Response (404):
 * { "error": "User not found" }
 */

/**
 * GET /users/{userId}/reservations
 * Get all reservations for a specific user
 * 
 * URL Parameters:
 * - userId: integer or string (required)
 * 
 * Headers:
 * - Authorization: Bearer {token} (REQUIRED)
 * 
 * Response (200):
 * [
 *   {
 *     "id": "res1",
 *     "userId": 1,
 *     "roomId": "r1",
 *     "roomName": "City View Deluxe",
 *     "checkInDate": "2024-12-01",
 *     "checkOutDate": "2024-12-05",
 *     "nights": 4,
 *     "totalPrice": 519.96,
 *     "status": "confirmed",
 *     "createdAt": "2024-11-19T10:30:00Z"
 *   },
 *   ...
 * ]
 */

// ============================================================================
// RESERVATION ENDPOINTS
// ============================================================================

/**
 * POST /reservations
 * Create a new reservation
 * 
 * Headers:
 * - Authorization: Bearer {token} (REQUIRED)
 * - Content-Type: application/json
 * 
 * Request Body:
 * {
 *   "roomId": "r1",
 *   "checkInDate": "2024-12-01",
 *   "checkOutDate": "2024-12-05",
 *   "userName": "John Doe",
 *   "userEmail": "john@example.com",
 *   "userPhone": "+1-555-0123",
 *   "notes": "Late check-in" (optional)
 * }
 * 
 * Response (201):
 * {
 *   "id": "res1",
 *   "roomId": "r1",
 *   "roomName": "City View Deluxe",
 *   "checkInDate": "2024-12-01",
 *   "checkOutDate": "2024-12-05",
 *   "nights": 4,
 *   "pricePerNight": 129.99,
 *   "totalPrice": 519.96,
 *   "status": "pending",
 *   "createdAt": "2024-11-19T10:30:00Z"
 * }
 * 
 * Response (400):
 * { "error": "Invalid reservation data" }
 * 
 * Response (401):
 * { "error": "Unauthorized" }
 */

/**
 * GET /reservations
 * Get all reservations (admin only)
 * 
 * Headers:
 * - Authorization: Bearer {token} (REQUIRED - admin token)
 * 
 * Response (200):
 * [
 *   {
 *     "id": "res1",
 *     "userId": 1,
 *     "roomId": "r1",
 *     "guestName": "John Doe",
 *     "room": "City View Deluxe",
 *     "checkInDate": "2024-12-01",
 *     "checkOutDate": "2024-12-05",
 *     "nights": 4,
 *     "totalPrice": 519.96,
 *     "status": "confirmed",
 *     "createdAt": "2024-11-19T10:30:00Z"
 *   },
 *   ...
 * ]
 */

/**
 * GET /reservations/{reservationId}
 * Get details of a specific reservation
 * 
 * URL Parameters:
 * - reservationId: string or integer (required)
 * 
 * Headers:
 * - Authorization: Bearer {token} (REQUIRED)
 * 
 * Response (200):
 * {
 *   "id": "res1",
 *   "userId": 1,
 *   "roomId": "r1",
 *   "guestName": "John Doe",
 *   "guestEmail": "john@example.com",
 *   "guestPhone": "+1-555-0123",
 *   "room": "City View Deluxe",
 *   "checkInDate": "2024-12-01",
 *   "checkOutDate": "2024-12-05",
 *   "nights": 4,
 *   "totalPrice": 519.96,
 *   "status": "confirmed",
 *   "createdAt": "2024-11-19T10:30:00Z"
 * }
 * 
 * Response (404):
 * { "error": "Reservation not found" }
 */

/**
 * PUT /reservations/{reservationId}/cancel
 * Cancel a reservation
 * 
 * URL Parameters:
 * - reservationId: string or integer (required)
 * 
 * Headers:
 * - Authorization: Bearer {token} (REQUIRED)
 * 
 * Request Body: {} (empty)
 * 
 * Response (200):
 * {
 *   "id": "res1",
 *   "status": "cancelled",
 *   "message": "Reservation cancelled successfully",
 *   "refundAmount": 519.96
 * }
 * 
 * Response (400):
 * { "error": "Cannot cancel reservation in current status" }
 * 
 * Response (404):
 * { "error": "Reservation not found" }
 */

// ============================================================================
// ERROR RESPONSES
// ============================================================================

/**
 * All endpoints may return:
 * 
 * 401 Unauthorized:
 * { "error": "Missing or invalid authentication token" }
 * 
 * 403 Forbidden:
 * { "error": "You don't have permission to access this resource" }
 * 
 * 404 Not Found:
 * { "error": "Resource not found" }
 * 
 * 500 Internal Server Error:
 * { "error": "Internal server error" }
 * 
 * CORS Error (when CORS not configured):
 * Browser console: "Access to XMLHttpRequest at 'http://...' from origin 
 * 'http://localhost:3000' has been blocked by CORS policy"
 */

// ============================================================================
// AUTHENTICATION FLOW
// ============================================================================

/*
1. User registers:
   POST /auth/register -> receives token
   Token stored in localStorage as 'authToken'

2. Subsequent requests:
   All requests include:
   Headers: { Authorization: "Bearer {token}" }

3. Token validation:
   Backend validates JWT signature and expiry
   Returns 401 if invalid

4. User logout:
   Frontend deletes authToken from localStorage
   No backend call needed
*/

// ============================================================================
// REQUIRED SPRING BOOT CONFIGURATION
// ============================================================================

/*
@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:3000")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true)
            .maxAge(3600);
    }
}

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    // Configure JWT filter and endpoints
}
*/

// ============================================================================
// FRONTEND ENVIRONMENT CONFIGURATION
// ============================================================================

/*
File: .env
REACT_APP_API_URL=http://localhost:8080/api

File: .env.production
REACT_APP_API_URL=https://api.yourdomain.com/api
*/

// ============================================================================
// TESTING THE API
// ============================================================================

/*
Using curl:

1. Register:
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'

2. Login:
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'

3. Get rooms (with token):
curl -X GET http://localhost:8080/api/rooms \
  -H "Authorization: Bearer {token}"

4. Create reservation:
curl -X POST http://localhost:8080/api/reservations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{...reservation data...}'
*/

