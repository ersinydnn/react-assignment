# React-Assignment Project

1. Project Start
   Project Overview: The goal of the project was to build a full-stack application. This included a login/register page, homepage with static reports, company and product tables, and CRUD operations.

2. Frontend Development
   Login/Register Page: We created a Login/Register form using React.js. The form sends fetch requests to the backend for login and registration.
   JWT Authentication: We integrated a JWT-based authentication system. After the user logs in, the token is saved in local storage.
   Homepage: We built a homepage that dynamically displays company and product data.
   Static Reports: The homepage includes static reports and a list of the latest companies added.
   AntD Components: Cards and lists were built using Ant Design components.

3. Backend Development
   Node.js & Express Server: We set up a backend server using Express.js.
   JWT Authentication: JWT was used for user authentication.
   MongoDB: MongoDB was used as the database. We connected it using Mongoose, and models were created to handle CRUD operations.
   API Endpoints:
   /api/register: For user registration
   /api/login: For user login
   /api/companies: CRUD operations for companies
   /api/products: CRUD operations for products

4. Frontend-Backend Integration
   CORS Issues: We encountered CORS issues when trying to connect the frontend and backend in production. These were resolved by updating the CORS settings in the backend.
   Local and Production Environments: We set up dynamic environment variables to handle switching between localhost for development and a backend URL for production.

Technologies Used:
Frontend: React.js, Ant Design, Tailwind CSS
Backend: Node.js, Express.js, MongoDB, Mongoose
Authentication: JWT
Styling: Tailwind CSS
Deployment: AWS, Vercel, Render
Database: MongoDB Atlas
