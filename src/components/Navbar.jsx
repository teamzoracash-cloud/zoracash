import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const navLinks = [
    { label: 'Offers', href: '#offers' },
    { label: 'Categories', href: '#categories' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Advertise', href: '#advertise' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <div className="navbar-inner">
                {/* Logo */}
                <a href="#" className="navbar-logo">
                    <span className="navbar-logo-icon">⚡</span>
                    <span className="navbar-logo-text">Zora<span className="navbar-logo-dot">.</span></span>
                </a>

                {/* Desktop Links */}
                <nav className="navbar-links">
                    {navLinks.map((link) => (
                        <a key={link.label} href={link.href} className="navbar-link">
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Single CTA */}
                <div className="navbar-actions">
                    <a href="#advertise" className="btn btn-primary btn-sm">
                        💼 List Your Offer
                    </a>
                    <button
                        className="navbar-menu-btn"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`menu-icon ${menuOpen ? 'open' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="navbar-mobile"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="navbar-mobile-link"
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                        <div className="navbar-mobile-actions">
                            <a href="#advertise" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>
                                💼 List Your Offer
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
