1. Job Portal Backend

This is the backend of the Job Portal project built using **Node.js**, **Express**, and **MySQL**.

2. 📁 Folder Structure
jobportal-backend/
├── controllers/
├── middleware/
├── routes/
├── db.js
├── server.js
├── package.json
└── .env
 🚀 Features

- Register & Login (JWT based auth)
- Post and Apply to Jobs
- Role-based Access (Admin/User)
- MySQL Database Integration

 3.🛠️ Technologies Used

- Node.js
- Express.js
- MySQL
- JWT for authentication
- Railway for deployment

 🔧 Setup Instructions

4. Clone the repository  
```bash
git clone https://github.com/ANJUWATHLEY/jobportal-backend.git
cd jobportal-backend

5.Install dependencies
npm install

6. Create a .env file in the root directory and add your credentials

DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret

7. Start the server choose one
  npm start
  node server.js

8 . API Testing via Postman
📸 API Test via Postman: Below are screenshots of Register, Login, Post Job, Apply Job APIs tested in Postman.

![Screenshot 2025-06-17 122059](https://github.com/user-attachments/assets/0bb5236d-5f28-4241-8c61-9dfc7c71a21e)
![Screenshot 2025-06-17 121717](https://github.com/user-attachments/assets/f4ba6305-97a7-4f37-a3b1-4b071ba3def6)
![Screenshot 2025-06-17 121614](https://github.com/user-attachments/assets/4dba8ea0-b630-4f3d-8dce-6e7b7abf7575)
![Screenshot 2025-06-17 121525](https://github.com/user-attachments/assets/4f526542-0c17-41a0-95b0-d95bfdb4cf1e)
![Screenshot 2025-06-17 121304](https://github.com/user-attachments/assets/98b29153-8101-4351-a9c7-8d5c908f721b)
![Screenshot 2025-06-17 121219](https://github.com/user-attachments/assets/edb8aab3-d477-4f07-9e56-41f67440d3bf)
![Screenshot 2025-06-17 120859](https://github.com/user-attachments/assets/1f7e1411-33f0-47d5-a1e6-6ed1afe4c2ed)
![Screenshot 2025-06-17 120552](https://github.com/user-attachments/assets/d0b7b5ed-c4ab-40d9-80ab-84c2730a2604)
![Screenshot 2025-06-17 120533](https://github.com/user-attachments/assets/25c50ccf-d480-4c30-b389-98a4fea7a703)
![Screenshot 2025-06-17 120501](https://github.com/user-attachments/assets/220711ff-c854-4b24-9183-417b836a46a5)
![Screenshot 2025-06-17 120349](https://github.com/user-attachments/assets/a4114435-bc54-41d3-9fe5-1d37662b942c)
