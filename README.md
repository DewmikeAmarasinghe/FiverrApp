# 🚀 Fiverr Clone - Full Stack Marketplace

**Live Demo**: [https://fiverrappnetlify.netlify.app](https://fiverrappnetlify.netlify.app)

**Backend API**: [https://web-production-d1f6f.up.railway.app](https://web-production-d1f6f.up.railway.app)

---

## Try responsiveness (;
## Try using the DEMO user_names & passwords

## 🏗️ Architecture Overview

This is a modern full-stack Fiverr-style marketplace with a **microservices architecture**:

- **Frontend**: React 19 + React Router 7 deployed on **Netlify** (CDN + global distribution)
- **Backend**: Node.js/Express API deployed on **Railway** (scalable serverless)
- **Database**: MongoDB Atlas (cloud database)
- **Authentication**: JWT with httpOnly cookies
- **File Upload**: Cloudinary integration

---

## ✨ Features

### ✅ Fully Implemented
- **User Authentication**: Register, Login, Logout with JWT
- **Gig Management**: Create, view, search, and filter gigs
- **User Profiles**: Seller and buyer profiles with ratings
- **Reviews System**: Create and display reviews for gigs
- **Responsive Design**: Mobile-first UI with Tailwind CSS
- **Real-time Search**: Dynamic gig filtering and sorting

### 🔄 In Development
- **Order System**: Purchase and manage orders
- **Messaging**: Real-time chat between buyers and sellers
- **Payment Integration**: Stripe payment processing
- **AI Chatbot**: AI-powered customer support

---

## 🛠️ Tech Stack

### Frontend
- **React 19** with React Router 7
- **Vite 6** for fast development and building
- **Tailwind CSS 4** for styling
- **TanStack Query** for data fetching
- **Axios** for API communication
- **Swiper** for carousels and sliders

### Backend
- **Node.js 18+** with Express 5
- **MongoDB** with Mongoose ODM
- **JWT** authentication with httpOnly cookies
- **CORS** configuration for cross-origin requests
- **bcrypt** for password hashing
- **Cloudinary** for image uploads

### Deployment
- **Netlify** for frontend (CDN + global distribution)
- **Railway** for backend (serverless + auto-scaling)
- **MongoDB Atlas** for database

---

## 📁 Project Structure

```
Fiverr/
├── Backend/                 # Express API Server
│   ├── controllers/         # Route handlers
│   ├── middleware/          # Auth, validation, etc.
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── utils/              # Helper functions
│   ├── server.js           # Main server file
│   └── package.json
├── Frontend/               # React Application
│   ├── app/
│   │   ├── components/     # Reusable UI components
│   │   ├── layouts/        # Page layouts
│   │   ├── pages/          # Route components
│   │   ├── utils/          # API client, helpers
│   │   └── routes.js       # Route definitions
│   ├── public/             # Static assets
│   ├── netlify.toml        # Netlify configuration
│   └── package.json
├── package.json            # Monorepo scripts
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Netlify account (for frontend deployment)
- Railway account (for backend deployment)

### Local Development

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd Fiverr
```

2. **Install dependencies**
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd Frontend
npm install
```

3. **Set up environment variables**

Create `Backend/.env`:
```bash
NODE_ENV=development
PORT=8000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority
JWT_KEY=your-secure-jwt-secret
FRONTEND_URL=http://localhost:5173
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

Create `Frontend/.env`:
```bash
VITE_API_BASE_URL=http://localhost:8000/api/
```

4. **Run the development servers**
```bash
# Terminal 1 - Backend
cd Backend
npm run dev

# Terminal 2 - Frontend
cd Frontend
npm run dev
```

Visit `http://localhost:5173` to see the application!

---

## 🌐 Production Deployment

### Backend Deployment (Railway)

1. **Connect to Railway**
   - Go to [Railway](https://railway.app)
   - Connect your GitHub repository
   - Deploy the Backend directory

2. **Set Environment Variables**
```bash
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority
JWT_KEY=your-secure-jwt-secret
NODE_ENV=production
FRONTEND_URL=https://fiverrappnetlify.netlify.app
CORS_ALLOWED_ORIGINS=https://fiverrappnetlify.netlify.app,*.netlify.app
```

3. **Deploy**
   - Railway will automatically deploy on git push
   - Your API will be available at: `https://your-app-name.up.railway.app`

### Frontend Deployment (Netlify)

1. **Connect to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Connect your GitHub repository
   - Set build settings:
     - **Base directory**: `Frontend`
     - **Build command**: `npm run build`
     - **Publish directory**: `build/client`

2. **Set Environment Variables**
```bash
VITE_API_BASE_URL=https://your-railway-backend-url.up.railway.app/api/
```

3. **Deploy**
   - Netlify will automatically deploy on git push
   - Your app will be available at: `https://your-app-name.netlify.app`

---

## 🔧 API Endpoints

Base URL: `https://web-production-d1f6f.up.railway.app/api/`

### Authentication
- `POST /auth/register` - Create new user account
- `POST /auth/login` - User login (sets httpOnly cookie)
- `POST /auth/logout` - User logout (clears cookie)

### Users
- `GET /users/:id` - Get user profile
- `PATCH /users/:id` - Update user profile

### Gigs
- `GET /gigs` - List gigs with filters
- `GET /gigs/:id` - Get single gig details
- `POST /gigs` - Create new gig
- `DELETE /gigs/:id` - Delete gig

### Reviews
- `GET /reviews/:gigId` - Get reviews for a gig
- `POST /reviews` - Create new review
- `DELETE /reviews/:id` - Delete review

---

## 🔐 Authentication

The app uses JWT tokens stored in httpOnly cookies for security:

- **Login**: Sets `accessToken` cookie
- **Protected Routes**: Middleware validates token
- **Logout**: Clears cookie
- **CORS**: Configured for secure cross-origin requests

---

## 🎨 UI/UX Features

- **Responsive Design**: Works on all devices
- **Dark/Light Mode**: Automatic theme detection
- **Loading States**: Smooth loading animations
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time input validation
- **Search & Filters**: Advanced gig discovery

---

## 🚀 Performance Optimizations

### Frontend
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: WebP format with fallbacks
- **CDN Distribution**: Global content delivery
- **Caching**: Aggressive browser caching
- **Bundle Optimization**: Tree shaking and minification

### Backend
- **Database Indexing**: Optimized MongoDB queries
- **CORS Optimization**: Efficient cross-origin handling
- **Error Handling**: Comprehensive error management
- **Security**: JWT with httpOnly cookies

---

## 🔧 Development Scripts

### Root Directory
```bash
npm install          # Install backend dependencies
npm start           # Start backend server
```

### Backend
```bash
cd Backend
npm run dev         # Development with nodemon
npm start           # Production start
```

### Frontend
```bash
cd Frontend
npm run dev         # Development server
npm run build       # Production build
npm start           # Serve production build
```

---

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure `FRONTEND_URL` is set correctly in Railway
   - Check that `CORS_ALLOWED_ORIGINS` includes your Netlify domain

2. **Authentication Issues**
   - Verify JWT_KEY is set in Railway
   - Check that cookies are being sent with requests

3. **Database Connection**
   - Ensure MONGO_URI is correct
   - Check MongoDB Atlas network access

4. **Build Failures**
   - Verify Node.js version (18+)
   - Check all environment variables are set

### Debug Mode

Enable debug logging by setting:
```bash
NODE_ENV=development
DEBUG=*
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **Fiverr** for inspiration
- **React Router** team for the excellent routing solution
- **Tailwind CSS** for the utility-first CSS framework
- **Netlify** and **Railway** for excellent hosting platforms

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the API documentation
3. Open an issue on GitHub
4. Contact the development team

---

**Happy coding! 🎉**
