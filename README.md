### 🏘️ SaaS Community Platform Backend
A SaaS (Software as a Service) platform that enables users to create communities and manage members with strict roles and validations.
✨ Features
### 🔐 Authentication
- ✅ Signup with name, email, and strong password.
- ✅ Signin with valid credentials.
 ### 🌐 Community
- ✅ View all communities.
- ✅ Create a new community. Creator becomes the **Community Admin**.
 ### 🛠️ Moderation
- ✅ View all members of a specific community.
- ✅ Add a user as **Community Member**.
- ✅ Remove a member (only by Community Admin).
🛠 Tech Stack
- **Backend**: Node.js v14+, Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcrypt

🚀 Installation
1. Clone the Repository
2.  Install Dependencies
3.  Create a .env file in the root with the following:
   PORT=5000
MONGO_URI=mongodb://localhost:27017/community-platform
JWT_SECRET=your_jwt_secret
4.Start the Server---npm start (Frontend) node server.js(Backend)

ScreenShots of App:
![image](https://github.com/user-attachments/assets/803ea15f-2769-4d0d-a7e0-83209fba9384)
![image](https://github.com/user-attachments/assets/4a71dc3e-7c1a-4668-b6bd-6b191cb6c994)
![image](https://github.com/user-attachments/assets/baa91cc7-417a-4c82-8e2a-24832b830703)
![image](https://github.com/user-attachments/assets/4d07e7ed-a180-489e-ab14-1ffeccc72c46)

![image](https://github.com/user-attachments/assets/6abdd667-1230-46aa-9e5d-0c63aa4585d8)
