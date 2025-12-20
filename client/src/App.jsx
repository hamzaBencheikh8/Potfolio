import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Public components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Education from './components/Education';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

// Admin components
import PrivateRoute from './components/PrivateRoute';
import AdminLayout from './components/AdminLayout';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import TestimonialsManagement from './pages/admin/TestimonialsManagementPage';
import ProjectsManagement from './pages/admin/ProjectsManagementPage';
import CertificationsManagement from './pages/admin/CertificationsManagementPage';

function App() {
    return (
        <Router>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            {/* AI Chatbot - Available on all pages */}
            <ChatBot />

            <Routes>
                {/* Public Routes */}
                <Route path="/" element={
                    <div className="App">
                        <Navbar />
                        <Hero />
                        <About />
                        <Skills />
                        <Certifications />
                        <Projects />
                        <Education />
                        <Testimonials />
                        <Contact />
                        <Footer />
                    </div>
                } />

                {/* Admin Login */}
                <Route path="/admin/login" element={<LoginPage />} />

                {/* Protected Admin Routes */}
                <Route path="/admin" element={
                    <PrivateRoute>
                        <AdminLayout />
                    </PrivateRoute>
                }>
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="projects" element={<ProjectsManagement />} />
                    <Route path="certifications" element={<CertificationsManagement />} />
                    <Route path="testimonials" element={<TestimonialsManagement />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
