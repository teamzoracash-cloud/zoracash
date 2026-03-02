import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { stats, offers } from '../data/offers';
import { supabase } from '../supabase';
import './Hero.css';

const ParticleOrb = ({ style }) => (
    <div className="orb" style={style} />
);

export default function Hero() {
    const [happyUsersCount, setHappyUsersCount] = useState(0);
    const activeOffersCount = offers.length;

    // Fetch happy users from Supabase
    useEffect(() => {
        const fetchHappyUsers = async () => {
            try {
                // Count unique user_ids where rating >= 3
                const { data, error } = await supabase
                    .from('ratings')
                    .select('user_id')
                    .gte('rating', 3);

                if (error) throw error;

                if (data) {
                    // Count ALL 3+ star reviews (not just unique users)
                    setHappyUsersCount(data.length);
                }
            } catch (err) {
                console.error('Error fetching happy users:', err);
            }
        };

        fetchHappyUsers();

        // Subscribe to changes to keep it updated real-time
        const channel = supabase
            .channel('public:ratings:happy_users')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'ratings' }, () => {
                fetchHappyUsers();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // Sum up all bonuses starting with '$'
    const totalValue = offers.reduce((acc, offer) => {
        const match = offer.bonus.match(/\$(\d+)/);
        if (match) {
            return acc + parseInt(match[1], 10);
        }
        return acc;
    }, 0);

    const dynamicStats = [
        { label: 'Active Offers', value: activeOffersCount.toString(), icon: '🎁' },
        { label: 'Total Value', value: `$${totalValue.toLocaleString()}+`, icon: '💰' },
        { label: 'Countries', value: stats[2].value, icon: stats[2].icon },
        { label: 'Happy Users', value: `${happyUsersCount.toLocaleString()}+`, icon: '👥' }
    ];

    return (
        <section className="hero">
            {/* Background orbs */}
            <ParticleOrb style={{ top: '10%', left: '5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }} />
            <ParticleOrb style={{ top: '40%', right: '-5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />
            <ParticleOrb style={{ bottom: '0%', left: '30%', width: 600, height: 300, background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)' }} />

            <div className="container">
                <div className="hero-content">
                    {/* Label */}
                    <motion.div
                        className="section-label"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        🎁 Curated Referral Bonuses — Updated Daily
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Discover the Best<br />
                        <span className="gradient-text">Referral Offers</span><br />
                        in One Place
                    </motion.h1>

                    {/* Sub */}
                    <motion.p
                        className="hero-sub"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Find exclusive sign-up bonuses, free stocks, crypto rewards, and travel credits from top platforms worldwide — all in one clean directory.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="hero-cta"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <a href="#categories" className="btn btn-primary hero-btn">
                            🔍 Browse All Offers
                        </a>
                        <a href="#advertise" className="btn btn-secondary hero-btn">
                            💼 List Your Offer →
                        </a>
                    </motion.div>

                    {/* Trust badges */}
                    <motion.div
                        className="hero-trust"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.55 }}
                    >
                        <span className="hero-trust-item">✅ Verified offers only</span>
                        <span className="hero-trust-sep">·</span>
                        <span className="hero-trust-item">🌍 50+ countries</span>
                        <span className="hero-trust-sep">·</span>
                        <span className="hero-trust-item">🔄 Updated daily</span>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        className="hero-stats"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.65 }}
                    >
                        {dynamicStats.map((s, i) => (
                            <motion.div
                                key={s.label}
                                className="hero-stat"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7 + i * 0.08 }}
                            >
                                <span className="hero-stat-icon">{s.icon}</span>
                                <span className="hero-stat-value">
                                    {s.value}
                                    {s.label === 'Happy Users' && (
                                        <span style={{ fontSize: '0.6rem', marginLeft: '6px', verticalAlign: 'middle', color: '#10b981', fontWeight: 'bold' }}>
                                            ● LIVE
                                        </span>
                                    )}
                                </span>
                                <span className="hero-stat-label">{s.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Bottom fade out */}
            <div className="hero-fade" />
        </section>
    );
}
