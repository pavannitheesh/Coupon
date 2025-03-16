# 🎟️ Coupon Distribution System

## 📖 Overview  
This is a **Round-Robin Coupon Distribution System** with an **Admin Panel**.  
It ensures fair coupon distribution while preventing abuse using **IP tracking and session cookies**.  

---

## 🚀 Tech Stack  

### 🖥 Backend  
- **Node.js & Express.js** – REST API development  
- **PostgreSQL** – Database for storing coupons, claims, and admin users  
- **JWT Authentication** – Secure admin access  
- **Rate Limiting (express-rate-limit)** – Prevent abuse  
- **bcrypt** – Secure password hashing  
- **cookie-parser** – Handle session cookies  

### 🌍 Frontend  
- **React.js** – User Interface  
- **Axios** – API calls  
- **React Router** – Client-side routing  
- **tailwindcss** – UI styling  

---

## 🛠 Features  

### 🔹 Admin Features  
✅ **Admin Login & Logout** – Secure access via JWT authentication  
✅ **Add New Coupons** – Dynamically create discount codes  
✅ **View All Coupons** – See available & claimed coupons  
✅ **Update Coupons** – Modify coupon details  
✅ **Security Measures** – JWT, bcrypt password hashing  

### 🔹 User Features  
✅ **Claim a Coupon** – Users can claim 1 coupon per 24 hours  
✅ **IP Address Tracking** – Ensures fair distribution  
✅ **Session Cookies** – Prevent multiple claims per session  

---

## 🔑 Test Admin Credentials  
- **Username:** `admin`  
- **Password:** `admin123`  

_(Change these after first login for security.)_  

---
### 📌 How to Use
### ➡️ Admin Panel
- Login as admin using the test credentials.
- Add new coupons from the dashboard.
- Monitor claimed coupons via the admin panel.
### ➡️ Claiming a Coupon
- Visit the /claim-coupon page.
- Click "Claim Coupon" (Allowed once per session & IP per day).
- Get your discount code! 🎉
## 📡 API Endpoints  

### 🔐 Admin Routes  

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|---------------|
| **POST** | `/api/admin/login` | Admin login | ❌ No (public) |
| **POST** | `/api/admin/logout` | Admin logout | ✅ Yes (JWT) |
| **GET** | `/api/admin/coupons` | Fetch all coupons | ✅ Yes (JWT) |
| **POST** | `/api/admin/add-coupon` | Add a new coupon | ✅ Yes (JWT) |
| **PUT** | `/api/admin/update-coupon/:id` | Update coupon details | ✅ Yes (JWT) |

---

### 🌍 Public Routes  

| Method | Endpoint | Description | Protection |
|--------|----------|-------------|------------|
| **GET** | `/api/all-coupons` | Get all available & claimed coupons | ❌ No |
| **POST** | `/api/claim-coupon` | Claim a coupon | ✅ Yes (IP & Cookie Restriction) |

---

## 🛡 Security Features  

### 🔹 IP Address Tracking  
- Each coupon claim **stores the user's IP address** in the database.  
- Users **can claim only 1 coupon per 24 hours per IP.**  

### 🔹 Session Cookie Enforcement  
- A **session cookie (`claimed`)** is set when a user claims a coupon.  
- If the user refreshes and tries to claim again, the API **denies** the request.  

```javascript
const checkSessionCookie = (req, res, next) => {
    if (req.cookies.claimed) {
        return res.status(429).json({ message: "You've already claimed a coupon in this session." });
    }
    next();
};
