
# 🎓 E-Learning Platform  

An advanced **Full-Stack E-Learning Platform** built with **MERN (MongoDB, Express.js, React.js, Node.js)**, featuring **authentication, course management, payments, and a responsive UI** with **dark mode support**.

## 🚀 Features  

### **User Features**  
✅ **Sign Up & Sign In** (JWT Authentication)  
✅ **View & Search Courses** (Filter by Price & Category)  
✅ **Purchase Courses** (Stripe Payment Integration)  
✅ **Watch Lectures** (Uploaded & YouTube Videos)  
✅ **Track Course Progress** (Auto & Manual Completion)  
✅ **Dark Mode & Mobile Responsive UI**  

### **Instructor/Admin Features**  
✅ **Create & Manage Courses** (Upload Videos, Edit Lectures)  
✅ **Publish Courses** (Only if lectures are available)  
✅ **Delete Courses & Lectures** (Removes from Cloudinary)  
✅ **View Purchased Courses & Users**  
✅ **Role-Based Protected Routes**  

## 🛠️ Tech Stack  

### **Frontend**  
- **React.js** (with Redux Toolkit & RTK Query)  
- **Tailwind CSS & ShadCN UI** (Responsive & Modern UI)  
- **React Router DOM** (Routing & Protected Routes)  

### **Backend**  
- **Node.js & Express.js** (REST API)  
- **MongoDB & Mongoose** (Database & Models)  
- **JWT & Cookie-Parser** (Authentication & Security)  
- **Cloudinary** (Video & Image Uploads)  
- **Multer** (File Handling)  
- **Stripe API** (Secure Payment Processing)  

## 🔧 Installation  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com//venkatsait33/MERN_LMS.git
cd elearning-platform
```

### **2️⃣ Setup Backend**  
```bash
cd server
npm install
```
Create a `.env` file inside the `server` directory and add:  
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publish_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
FRONTEND_URL= frontend-url

```
Run the server:  
```bash
npm run dev
```

### **3️⃣ Setup Frontend**  
```bash
cd client
npm install
```
Create a `.env` file inside the `client` directory and add:  
```env
VITE_BACKEND_URL= Add your Backend_url
```
Run the frontend:  
```bash
npm run dev
```

## 🌍 Deployment  

- **Frontend**: Vercel / Netlify  
- **Backend**: Render / Railway / DigitalOcean  
- **Database**: MongoDB Atlas  

## 🎯 Future Improvements  

- ✅ Quiz & Assignment Features  
- ✅ User Dashboard with Learning Analytics  
- ✅ Certificate Generation After Completion  

## 🤝 Contributing  

Feel free to **fork the repo** and create **pull requests**! If you find bugs or have feature requests, open an **issue**.  

## 📝 License  

This project is **open-source** and available under the **MIT License**.  

## 📩 Connect with Me  

🔗 [LinkedIn]([https://www.linkedin.com/in/your-profile](https://www.linkedin.com/in/venkatsai-t/)) | ✉️ [Email](mailto:venkatsait33@gmail.com)  

---

