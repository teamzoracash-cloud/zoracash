import { useState } from 'react';
import { motion } from 'framer-motion';
import './ReferralBanner.css';

// TODO: Get your endpoint URL from Formspree.io and paste it here
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xwvnwplv';

export default function ReferralBanner() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        offerUrl: '',
        contactMethod: 'email',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                setError('Oops! There was a problem submitting your form.');
            }
        } catch (err) {
            setError('Oops! There was a problem submitting your form.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <section className="advertise section" id="advertise">
            <div className="advertise-orb advertise-orb-1" />
            <div className="advertise-orb advertise-orb-2" />

            <div className="container advertise-container">
                {/* Left Side: Header & Info */}
                <div className="advertise-info">
                    <motion.div
                        className="section-label"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        💼 Partner With Us
                    </motion.div>

                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        List Your <span className="gradient-text">Referral Offer</span>
                    </motion.h2>

                    <motion.p
                        className="section-sub advertise-sub"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Get your referral program in front of thousands of highly engaged users. We work closely with partners to ensure maximum visibility and conversions.
                    </motion.p>

                    <motion.ul
                        className="advertise-perks"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <li><span className="perk-icon">🎯</span> Targeted audience of active deal-seekers</li>
                        <li><span className="perk-icon">📈</span> High conversion rates and ROI tracking</li>
                        <li><span className="perk-icon">✨</span> Premium featured placements available</li>
                        <li><span className="perk-icon">🤝</span> Dedicated account management</li>
                    </motion.ul>
                </div>

                {/* Right Side: Form */}
                <motion.div
                    className="advertise-form-wrap glass"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    {submitted ? (
                        <div className="advertise-success">
                            <div className="advertise-success-icon">✅</div>
                            <h3>Request Received!</h3>
                            <p>Thanks for your interest, {formData.name || 'friend'}. Our partnerships team will reach out shortly to discuss your offer.</p>
                            <button className="btn btn-secondary" onClick={() => setSubmitted(false)}>
                                Submit Another Offer
                            </button>
                        </div>
                    ) : (
                        <form className="advertise-form" onSubmit={handleSubmit}>
                            <h3 className="form-title">Get in Touch</h3>
                            <p className="form-sub">Tell us about your offer and we'll craft a custom placement package for you.</p>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Full Name *</label>
                                    <input type="text" id="name" name="name" required placeholder="Jane Doe" onChange={handleChange} value={formData.name} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="company">Company</label>
                                    <input type="text" id="company" name="company" placeholder="Acme Corp" onChange={handleChange} value={formData.company} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="email">Work Email *</label>
                                    <input type="email" id="email" name="email" required placeholder="jane@company.com" onChange={handleChange} value={formData.email} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input type="tel" id="phone" name="phone" placeholder="+1 (555) 000-0000" onChange={handleChange} value={formData.phone} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="offerUrl">Offer URL (Optional)</label>
                                    <input type="url" id="offerUrl" name="offerUrl" placeholder="https://..." onChange={handleChange} value={formData.offerUrl} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contactMethod">Preferred Contact</label>
                                    <select id="contactMethod" name="contactMethod" onChange={handleChange} value={formData.contactMethod}>
                                        <option value="email">Email</option>
                                        <option value="phone">Phone Call</option>
                                        <option value="whatsapp">WhatsApp / Text</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Offer Details & Goals</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    required
                                    placeholder="Tell us what you're offering and what kind of volume you're looking for..."
                                    onChange={handleChange}
                                    value={formData.message}
                                ></textarea>
                            </div>

                            {error && <p className="form-error" style={{ color: '#EF4444', fontSize: '13px', marginTop: '10px' }}>{error}</p>}

                            <button type="submit" className="btn btn-primary form-submit" disabled={submitting}>
                                {submitting ? 'Sending Request...' : 'Request Information →'}
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
