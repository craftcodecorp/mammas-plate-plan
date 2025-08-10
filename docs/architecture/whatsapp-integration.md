# WhatsApp Integration Architecture

## Overview

This document outlines the architectural design and integration flow for WhatsApp communication in the CardapioFacil system. It establishes clear boundaries between services and defines the proper communication patterns.

## Architectural Boundaries

### Core Principle

**All WhatsApp communication must go through the WhatsApp Service.**

This is a strict architectural boundary that ensures:
- Centralized management of WhatsApp API integration
- Consistent message formatting and templates
- Proper rate limiting and error handling
- Unified analytics and monitoring
- Compliance with WhatsApp Business API policies

### Service Responsibilities

#### WhatsApp Service
- Handles all direct communication with WhatsApp Business API
- Manages message templates and formatting
- Processes incoming webhook events from WhatsApp
- Implements rate limiting and retry mechanisms
- Maintains message history and delivery status

#### User Management Service
- Manages user profiles and authentication
- Stores user preferences and settings
- Handles partial profile creation during onboarding
- Does NOT directly send WhatsApp messages

#### Landing Page (Mammas Plate Plan)
- Collects initial user information
- Creates partial user profiles via User Management Service
- Notifies WhatsApp Service about new signups
- Does NOT directly send WhatsApp messages

## Integration Flow

### Landing Page Signup Flow

1. User submits the landing page form with:
   - Name
   - WhatsApp number
   - Family size
   - Dietary restrictions

2. Landing page creates a partial user profile:
   ```
   POST /api/v1/profiles/partial
   ```

3. Landing page notifies WhatsApp Service about the new signup:
   ```
   POST /api/v1/onboarding/landing-page-signup
   ```

4. WhatsApp Service sends welcome message to the user
   - Introduces CardapioFacil service
   - Provides instructions to start the onboarding process
   - Includes opt-in confirmation

5. User responds on WhatsApp to continue onboarding

### API Endpoints

#### WhatsApp Service API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/onboarding/landing-page-signup` | POST | Notifies WhatsApp Service about new landing page signup |
| `/api/v1/messages` | POST | Sends a WhatsApp message (internal use only) |
| `/api/v1/webhook` | GET/POST | Receives and processes WhatsApp webhook events |

#### User Management Service API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/profiles/partial` | POST | Creates a partial user profile during onboarding |
| `/api/v1/profiles/:id` | PUT | Updates a user profile with additional information |

## Implementation Details

### WhatsApp Service Client

The WhatsApp Service Client in the landing page application:
- Communicates with the WhatsApp Service API
- Does NOT directly send WhatsApp messages
- Uses environment variables for configuration:
  - `VITE_WHATSAPP_SERVICE_URL`: URL of the WhatsApp Service API
  - `VITE_WHATSAPP_API_KEY`: API key for authentication

### Authentication

- API key authentication for service-to-service communication
- Rate limiting to prevent abuse
- Input validation for all endpoints

## Deprecated Functionality

The following functionality has been deprecated as it violates the architectural boundary:

- `sendLandingPageCompletionMessage()`: This function directly sent WhatsApp messages from the landing page
- Direct WhatsApp API calls from any service other than the WhatsApp Service

## Testing

### Unit Tests

- Test WhatsApp Service Client functions
- Verify proper error handling
- Ensure correct data transformation

### End-to-End Tests

- Test the complete landing page signup flow
- Verify WhatsApp Service notification
- Mock external API calls

## Monitoring and Observability

- Log all WhatsApp Service API calls
- Track message delivery status
- Monitor rate limits and API usage
- Alert on communication failures

## Future Improvements

- Implement circuit breaker pattern for API calls
- Add message queuing for improved reliability
- Enhance analytics for message engagement
- Implement more sophisticated retry mechanisms
