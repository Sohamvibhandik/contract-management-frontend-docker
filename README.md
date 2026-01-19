# Contract Management Platform (Frontend)

## Overview
This project is a **frontend-based Contract Management Platform** built from scratch to demonstrate **product thinking, UI design, state management, and clean code architecture**.

No backend or UI designs were provided. All functionality, structure, and UX decisions were implemented independently as part of the assignment.

The platform allows users to:
- Create reusable contract blueprints
- Generate contracts from blueprints
- Manage a strict contract lifecycle
- View and control contracts from a dashboard

All data persistence is mocked using browser LocalStorage.

---

## Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **Docker**
- **Browser LocalStorage** (mock persistence)

---

## Setup Instructions (Local)

### Prerequisites
- Node.js (v20+ recommended)
- npm

### Run Locally
```bash
npm install
npm run dev

## Running with Docker (Recommended)

This project can also be run inside a **Docker container** to ensure a consistent and reproducible environment.

### Prerequisites
- Docker installed and running

### Build Docker Image
```bash
docker build -t contract-management .
Run Docker Container (Detached Mode)
bash
Copy code
docker run -d -p 5174:5174 --name contract-management-app contract-management
The application will be available on:

arduino
Copy code
http://localhost:5174
Useful Docker Commands
bash
Copy code
# View running containers
docker ps

# View logs
docker logs contract-management-app

# Stop container
docker stop contract-management-app

# Remove container
docker rm contract-management-app

Why Docker?

Eliminates environment-specific issues

Ensures consistent runtime

Demonstrates deployment and DevOps readiness

Application Architecture

The project follows a simple and explicit architecture:

UI Components (Pages)
↓
Local State Management (useState)
↓
Business Rules (Lifecycle Guards)
↓
Mock Persistence (LocalStorage)

Key Design Decisions

Frontend-only architecture (no backend required)

Strict lifecycle enforcement at the UI level

Component-based separation of features

Minimal abstractions for clarity and maintainability

Core Features
1. Blueprint Creation

Create reusable contract templates

Add configurable fields

Supported field types:

Text

Date

Signature

Checkbox

Field metadata includes:

Type

Label

Position (x, y)

2. Contract Creation from Blueprint

Select an existing blueprint

Generate a contract inheriting all fields

Initial contract status set to CREATED

3. Contract Lifecycle Management

Contracts follow a strict lifecycle:

CREATED → APPROVED → SENT → SIGNED → LOCKED


Additional rule:

CREATED or SENT → REVOKED

Lifecycle Rules

No skipping states

Locked contracts cannot be edited

Revoked contracts cannot proceed further

Only valid actions are displayed in the UI

4. Contract Dashboard

Displays all contracts

Shows:

Contract name

Blueprint name

Current status

Created date

Action buttons appear only for valid lifecycle transitions

State Management Approach

Local component state using useState

Centralized persistence via LocalStorage

Explicit lifecycle guard functions to ensure correctness

No external state management libraries to keep logic transparent

Assumptions

Single user system

No authentication or authorization

No concurrent contract editing

No backend validation

Limitations

No real backend or database

No drag-and-drop field placement

No document rendering or digital signatures

No automated tests

Basic UI styling only

Future Enhancements

Drag-and-drop field positioning

Lifecycle timeline visualization

Reusable component library

Unit tests for lifecycle logic

Backend API integration

Conclusion

This project focuses on correctness, controlled workflows, and clarity rather than visual polish.
It demonstrates how a frontend-only system can enforce strong business rules while remaining simple and maintainable.