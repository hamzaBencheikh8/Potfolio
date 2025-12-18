import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setMobileMenuOpen(false);
    };

    const menuItems = ['home', 'about', 'skills', 'projects', 'education', 'contact'];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-strong shadow-lg' : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="text-2xl font-bold cursor-pointer z-50"
                        onClick={() => scrollToSection('home')}
                    >
                        <span className="text-cyber-green">H</span>
                        <span className="text-white">B</span>
                        <span className="text-cyber-blue">.</span>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        {menuItems.map((item) => (
                            <motion.button
                                key={item}
                                whileHover={{ scale: 1.1, color: '#39FF14' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => scrollToSection(item)}
                                aria-label={`Navigate to ${item} section`}
                                className="text-white capitalize hover:text-cyber-green transition-colors duration-300"
                            >
                                {item}
                            </motion.button>
                        ))}
                    </div>

                    {/* Download CV - Desktop */}
                    <motion.a
                        href="/cv.pdf"
                        download
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden md:block glass px-6 py-2 rounded-full text-cyber-green border border-cyber-green hover:bg-cyber-green hover:text-dark-bg transition-all duration-300"
                    >
                        Download CV
                    </motion.a>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                        className="md:hidden z-50 relative w-8 h-8 flex flex-col justify-center items-center"
                    >
                        <span className={`block w-6 h-0.5 bg-cyber-green transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-cyber-green transition-all duration-300 my-1 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-cyber-green transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed top-0 right-0 bottom-0 w-64 glass-strong md:hidden"
                    >
                        <div className="flex flex-col items-start justify-center h-full px-8 space-y-6">
                            {menuItems.map((item, idx) => (
                                <motion.button
                                    key={item}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => scrollToSection(item)}
                                    className="text-2xl text-white capitalize hover:text-cyber-green transition-colors duration-300 w-full text-left"
                                >
                                    {item}
                                </motion.button>
                            ))}
                            <motion.a
                                href="/cv.pdf"
                                download
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: menuItems.length * 0.1 }}
                                className="glass px-6 py-3 rounded-full text-cyber-green border border-cyber-green hover:bg-cyber-green hover:text-dark-bg transition-all duration-300 w-full text-center"
                            >
                                Download CV
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
