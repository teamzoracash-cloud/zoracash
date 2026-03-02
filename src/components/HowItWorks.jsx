import { motion } from 'framer-motion';
import './HowItWorks.css';

const steps = [
    {
        number: '01',
        icon: '🔗',
        title: 'Browse & Pick an Offer',
        description: 'Explore hundreds of exclusive referral offers across Finance, Crypto, Shopping, Travel, and more.',
    },
    {
        number: '02',
        icon: '🚀',
        title: 'Sign Up Through Our Link',
        description: 'Click "Get Offer" and complete the sign-up process on the partner platform using our referral link.',
    },
    {
        number: '03',
        icon: '💸',
        title: 'Complete the Requirement',
        description: 'Meet the simple requirement (e.g., first deposit, first order) to unlock your reward.',
    },
    {
        number: '04',
        icon: '🎉',
        title: 'Collect Your Bonus',
        description: 'Your bonus — cash, stocks, crypto, or credits — lands in your account automatically. Enjoy!',
    },
];

export default function HowItWorks() {
    return (
        <section className="section how-it-works" id="how-it-works">
            <div className="container">
                <div className="how-it-works-header">
                    <div className="section-label">⚡ Simple Process</div>
                    <h2 className="section-title">
                        How It <span className="gradient-text">Works</span>
                    </h2>
                    <p className="section-sub">
                        From discovery to reward in as little as a few minutes. No tricks, no fine print.
                    </p>
                </div>

                <div className="how-it-works-steps">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.number}
                            className="how-step"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ delay: i * 0.12, duration: 0.5 }}
                        >
                            {/* Step number */}
                            <div className="how-step-num">{step.number}</div>

                            {/* Icon */}
                            <div className="how-step-icon">{step.icon}</div>

                            {/* Content */}
                            <h3 className="how-step-title">{step.title}</h3>
                            <p className="how-step-desc">{step.description}</p>

                            {/* Connector line (not on last) */}
                            {i < steps.length - 1 && (
                                <div className="how-step-connector">
                                    <motion.div
                                        className="how-step-connector-line"
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.12 + 0.3, duration: 0.5 }}
                                    />
                                    <span className="how-step-connector-arrow">→</span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="how-it-works-cta"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <a href="#categories" className="btn btn-primary">
                        🎁 Browse All Offers
                    </a>
                    <a href="#top" className="btn btn-secondary">
                        Learn More →
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
