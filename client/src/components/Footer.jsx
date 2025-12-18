import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark-card/50 py-8 px-6">
            <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm mb-4 md:mb-0">
                        © 2024 Hamza Bencheikh. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <a
                            href="https://github.com/hamzaBencheikh8"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-cyber-green transition-colors duration-300"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://linkedin.com/in/hamza-bencheikh-19034a288"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-cyber-blue transition-colors duration-300"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="mailto:hamzabencheikh8@gmail.com"
                            className="text-gray-400 hover:text-cyber-purple transition-colors duration-300"
                        >
                            Email
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
