import { motion } from 'framer-motion';
import './Footer.css';

const footerLinks = {
    'Offers': ['Finance', 'Crypto', 'Shopping', 'Travel', 'Gaming', 'Food'],
    'Company': ['About Us', 'Blog', 'Careers', 'Press'],
    'Support': ['Help Center', 'Contact', 'Privacy Policy', 'Terms of Use'],
};

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    {/* Brand */}
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <span className="footer-logo-icon">⚡</span>
                            <span className="footer-logo-text">Zora<span>.</span></span>
                        </div>
                        <p className="footer-tagline">
                            The smartest way to discover referral bonuses, sign-up rewards, and exclusive deals from top platforms worldwide.
                        </p>
                        <div className="footer-socials">
                            {[
                                { label: 'Twitter', icon: '𝕏' },
                                { label: 'LinkedIn', icon: '💼' },
                                { label: 'Discord', icon: '💬' },
                                { label: 'Instagram', icon: '📷' },
                            ].map((s) => (
                                <a key={s.label} href="#" className="footer-social-btn" title={s.label}>
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([group, links]) => (
                        <div key={group} className="footer-group">
                            <h4 className="footer-group-title">{group}</h4>
                            <ul className="footer-group-links">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="footer-link">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="footer-divider" />

                <div className="footer-bottom">
                    <p className="footer-copy">© 2026 Zora. All rights reserved.</p>
                    <div className="footer-badges">
                        <span className="footer-badge">🔒 Secure</span>
                        <span className="footer-badge">✅ Verified Offers</span>
                        <span className="footer-badge">🌍 50+ Countries</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
