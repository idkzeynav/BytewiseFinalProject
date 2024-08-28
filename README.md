# Project Overview

This application is deployed through Render and Netlify, but due to an error, the links have been temporarily taken down. However, the application is fully functional in local development.

## Admin Access

To check out the admin side of the application, use the following credentials as you won't be authorized otherwise:

- **Username:** zeynabxco@gmail.com
- **Password:** z

In the admin panel, you can access:
- Dashboard
- Payment Integration
- Full Authentication and Authorization
- CRUD Operations for Category Management
- Product CRUD
- Product Filtering and Cart Implementation
- Order Management 
- Secure Payments
- Admin Dashboard
- And many more features to explore

## Installation and Running Locally

To set up the project locally, follow these commands:

1. **Install Dependencies**

   ```bash
   # Navigate to the frontend directory
   cd frontend
   npm install

   # Navigate to the backend directory
   cd ../backend
   npm install

   # Go back to the root directory
   cd ..

   # Install dependencies for the main root
   npm install
2. **Run the Application**

Use `concurrently` to run both frontend and backend simultaneously:

```bash
npm run dev
