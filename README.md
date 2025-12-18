# Full Stack Portfolio Website

Modern, responsive portfolio website for Hamza Bencheikh featuring a cyberpunk aesthetic with glassmorphism effects, neural network animations, and a full-stack architecture.

## 🚀 Features

- **Cyberpunk Minimalist Design** - Dark mode with neon green and blue accents
- **Glassmorphism Effects** - Modern blur effects on cards and components
- **Neural Network Animation** - Interactive particle background with connected nodes
- **Smooth Animations** - Framer Motion powered transitions and interactions
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop
- **Full Stack** - React frontend with Node.js/Express backend
- **Contact Form** - Functional contact form with backend API

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **CORS** - Cross-origin resource sharing
- **Body-Parser** - Request body parsing

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Portfolio
   ```

2. **Install dependencies for all packages**
   ```bash
   npm run install-all
   ```

   Or install individually:
   ```bash
   # Root dependencies
   npm install

   # Client dependencies
   cd client && npm install

   # Server dependencies
   cd ../server && npm install
   ```

## 🚀 Running the Application

### Development Mode (Both Client and Server)
```bash
npm run dev
```

This will start:
- Frontend dev server on `http://localhost:5173`
- Backend API server on `http://localhost:5000`

### Run Client Only
```bash
npm run client
```

### Run Server Only
```bash
npm run server
```

## 📁 Project Structure

```
Portfolio/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx       # Main App component
│   │   ├── main.jsx      # React entry point
│   │   └── index.css     # Global styles
│   ├── index.html        # HTML template
│   ├── vite.config.js    # Vite configuration
│   ├── tailwind.config.js # Tailwind configuration
│   └── package.json
├── server/                # Node.js backend
│   ├── models/           # Data models
│   ├── routes/           # API routes
│   ├── server.js         # Express server
│   └── package.json
├── package.json          # Root package.json
└── README.md
```

## 🎨 Design Features

- **Hero Section** - Animated headline with neural network particle background
- **About Section** - Glassmorphic card with stats
- **Skills Section** - Categorized skill tags with hover effects
- **Projects Section** - Project cards with hover animations
- **Education Timeline** - Vertical timeline with milestones
- **Contact Section** - Functional form with social links
- **Smooth Scrolling** - Navigation with smooth scroll behavior

## 📝 Customization

### Update Personal Information
Edit the content in the respective components:
- **client/src/components/Hero.jsx** - Name and headline
- **client/src/components/About.jsx** - Bio and stats
- **client/src/components/Contact.jsx** - Contact links

### Add Projects
Edit **server/models/projectData.js** to add or modify projects.

### Change Colors
Edit **client/tailwind.config.js** and **client/src/index.css** to customize the color scheme.

### Add CV File
Place your CV PDF in **client/public/** folder as `cv.pdf` for the Download CV button to work.

## 🌐 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
```
Deploy the `dist` folder.

### Backend (Heroku/Railway)
```bash
cd server
```
Deploy the server directory with the start script.

## 📧 Contact

- **Email**: hamzabencheikh8@gmail.com
- **GitHub**: [hamzaBencheikh8](https://github.com/hamzaBencheikh8)
- **LinkedIn**: [Hamza Bencheikh](https://linkedin.com/in/hamza-bencheikh-19034a288)
- **Location**: Marrakech / Maroc

## 📄 License

MIT License - feel free to use this project for your own portfolio!

---

Built with ❤️ by Hamza Bencheikh
