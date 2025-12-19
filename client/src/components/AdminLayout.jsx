import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        toast.success('Logged out successfully');
        navigate('/admin/login');
    };

    const menuItems = [
        { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/admin/projects', label: 'Projects', icon: '💼' },
        { path: '/admin/certifications', label: 'Certifications', icon: '🎓' },
        { path: '/admin/testimonials', label: 'Testimonials', icon: '💬' },
    ];

    return (
        <div className="min-h-screen bg-dark-bg flex">
            {/* Sidebar */}
            <motion.aside
                initial={{ x: -250 }}
                animate={{ x: 0 }}
                className="w-64 glass border-r border-gray-700/50 p-6"
            >
                {/* Logo */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-cyber-green">Admin Panel</h1>
                    <p className="text-xs text-gray-400 mt-1">Portfolio Management</p>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                    ? 'bg-cyber-green/10 text-cyber-green border border-cyber-green/30'
                                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                                }`
                            }
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Logout Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
                    className="w-full mt-auto absolute bottom-6 left-6 right-6 px-4 py-3 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-all duration-200"
                >
                    🚪 Logout
                </motion.button>
            </motion.aside>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {/* Header */}
                <header className="glass border-b border-gray-700/50 px-8 py-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white">Welcome, Admin</h2>
                        <a href="/" target="_blank" rel="noopener noreferrer" className="text-cyber-green hover:underline">
                            View Portfolio →
                        </a>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
