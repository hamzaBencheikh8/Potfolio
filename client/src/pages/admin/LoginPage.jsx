import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { login } from '../../services/api';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await login(formData);
            localStorage.setItem('adminToken', response.data.token);
            toast.success('Login successful!');
            navigate('/admin/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-dark-bg flex items-center justify-center px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass max-w-md w-full p-8 rounded-xl border border-gray-700/50"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-cyber-green mb-2">Admin Dashboard</h1>
                    <p className="text-gray-400">Portfolio Management System</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="w-full px-4 py-3 bg-dark-bg/50 border border-gray-700 rounded-lg text-white focus:border-cyber-green focus:outline-none transition-colors"
                            placeholder="admin@hamzabencheikh.com"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            className="w-full px-4 py-3 bg-dark-bg/50 border border-gray-700 rounded-lg text-white focus:border-cyber-green focus:outline-none transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full glass px-6 py-3 rounded-full text-cyber-green border border-cyber-green hover:bg-cyber-green hover:text-dark-bg transition-all duration-300 font-semibold disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </motion.button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <a href="/" className="text-sm text-gray-400 hover:text-cyber-green transition-colors">
                        ← Back to Portfolio
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
