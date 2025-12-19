import React from 'react';
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

function App() {
    return (
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
    );
}

export default App;
