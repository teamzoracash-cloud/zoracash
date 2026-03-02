import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { supabase } from '../supabase';
import './OfferCard.css';

// Compute days remaining from an ISO date string ('YYYY-MM-DD')
function daysLeft(expiryDate) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const exp = new Date(expiryDate + 'T00:00:00Z');
    const diff = Math.ceil((exp - now) / (1000 * 60 * 60 * 24));
    return diff;
}

function expiryColor(days) {
    if (days <= 0) return '#EF4444';      // red   — expired
    if (days <= 7) return '#EF4444';      // red   — urgent
    if (days <= 14) return '#F59E0B';     // amber — soon
    return null;                          // default text colour
}

const categoryColors = {
    finance: { bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)', accent: '#10B981' },
    crypto: { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', accent: '#F59E0B' },
    shopping: { bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)', accent: '#3B82F6' },
    travel: { bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)', accent: '#EF4444' },
    gaming: { bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.2)', accent: '#8B5CF6' },
    food: { bg: 'rgba(251,146,60,0.08)', border: 'rgba(251,146,60,0.2)', accent: '#FB923C' },
};

const MAX_FLAGS = 5;

// Generate or get a simple device ID
const getDeviceId = () => {
    let id = localStorage.getItem('zora_device_id');
    if (!id) {
        id = 'dev_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('zora_device_id', id);
    }
    return id;
};

export default function OfferCard({ offer, featured = false, index = 0 }) {
    const [userRating, setUserRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [communityStats, setCommunityStats] = useState({ totalScore: 0, count: 0 });
    const deviceId = getDeviceId();

    // Fetch ratings from Supabase
    const fetchRatings = async () => {
        try {
            // Get total aggregate
            const { data: allRatings, error: fetchError } = await supabase
                .from('ratings')
                .select('rating')
                .eq('offer_id', offer.id);

            if (fetchError) throw fetchError;

            if (allRatings) {
                const totalScore = allRatings.reduce((acc, curr) => acc + curr.rating, 0);
                setCommunityStats({
                    totalScore,
                    count: allRatings.length
                });
            }

            // Get current user's rating
            const { data: myRating, error: myError } = await supabase
                .from('ratings')
                .select('rating')
                .eq('offer_id', offer.id)
                .eq('user_id', deviceId)
                .single();

            if (myRating) setUserRating(myRating.rating);
        } catch (err) {
            console.error('Error fetching ratings:', err);
        }
    };

    useEffect(() => {
        fetchRatings();

        // Optional: Real-time subscription
        const channel = supabase
            .channel(`public:ratings:offer_id=eq.${offer.id}`)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'ratings', filter: `offer_id=eq.${offer.id}` }, () => {
                fetchRatings();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [offer.id]);

    const handleRate = async (value) => {
        const previousRating = userRating;
        setUserRating(value); // Optimistic update

        try {
            const { error } = await supabase
                .from('ratings')
                .upsert({
                    offer_id: offer.id,
                    user_id: deviceId,
                    rating: value
                }, { onConflict: 'offer_id,user_id' });

            if (error) throw error;
            fetchRatings(); // Refresh totals
        } catch (err) {
            console.error('Error saving rating:', err);
            setUserRating(previousRating); // Rollback
        }
    };

    const communityAverage = communityStats.count > 0
        ? (communityStats.totalScore / communityStats.count).toFixed(1)
        : "0.0";

    const colorSet = categoryColors[offer.category] || categoryColors.finance;
    const extraCountries = offer.countries.length - MAX_FLAGS;

    const isSpots = offer.spots !== undefined && offer.spots !== null;
    const days = isSpots ? null : daysLeft(offer.expiry);
    const expColor = isSpots ? null : expiryColor(days);

    const displayCountries = offer.countries.slice(0, MAX_FLAGS).join('');
    const countryText = extraCountries > 0 ? `${displayCountries} +${extraCountries}` : displayCountries;

    return (
        <motion.div
            className={`offer-card ${featured ? 'offer-card--featured' : ''}`}
            style={{ '--card-accent': colorSet.accent, '--card-bg': colorSet.bg, '--card-border': colorSet.border }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.4 }}
            layout
        >
            {/* BIG EMPHASIS ON REGION/COUNTRIES */}
            <div className="offer-card-region-banner" style={{ background: colorSet.bg, borderBottomColor: colorSet.accent }}>
                <div className="region-banner-info">
                    <span className="region-banner-label">🌍 Available In</span>
                    <span className="region-banner-text">
                        {offer.countryNames.length === 1 ? offer.countryNames[0] : `${offer.countryNames.length} Supported Regions`}
                    </span>
                </div>
                <div className="region-flags-container">
                    {offer.countries.slice(0, 6).map((flag, i) => (
                        <span key={i} className="region-flag-huge" title={offer.countryNames[i]}>{flag}</span>
                    ))}
                    {extraCountries > 0 && <span className="region-flag-more">+{extraCountries}</span>}
                </div>
            </div>

            <div className="offer-card-body">
                {/* Header: Logo, Company & Official Rating */}
                <div className="offer-card-header">
                    <div className="offer-card-logo" style={{ borderColor: colorSet.border }}>
                        {offer.logo ? (
                            <img src={offer.logo} alt={offer.company} className="offer-card-logo-img" />
                        ) : (
                            <span className="offer-card-emoji">{offer.emoji}</span>
                        )}
                    </div>
                    <div className="offer-card-title">
                        <div className="offer-card-company-row">
                            <h3 className="offer-card-company">{offer.company}</h3>
                            {(offer.isHot || featured) && (
                                <span className={`offer-card-badge ${offer.isHot ? 'offer-card-badge--hot' : 'offer-card-badge--top'}`}>
                                    {offer.isHot ? '🔥 Hot' : '⭐ Top Pick'}
                                </span>
                            )}
                        </div>
                        <div className="offer-card-rating">
                            <span className="star-icon">★</span>
                            <span className="rating-score">{offer.rating}</span>
                            <span className="rating-reviews">({(offer.reviews / 1000).toFixed(1)}k official reviews)</span>
                        </div>
                    </div>
                </div>

                {/* The Reward */}
                <div className="offer-card-reward-block">
                    <div className="reward-glow" style={{ background: colorSet.bg }}></div>
                    <div className="reward-content" style={{ borderColor: colorSet.accent }}>
                        <div className="reward-amount" style={{ color: colorSet.accent }}>{offer.bonus}</div>
                        <div className="reward-note">{offer.bonusNote}</div>
                    </div>
                    <div className="reward-urgency" style={expColor ? { color: expColor, background: `${expColor}10` } : undefined}>
                        ⏳ {isSpots ? `${offer.spots} spots left` : (days <= 0 ? 'Expired' : `${days}d left`)}
                    </div>
                </div>

                {/* Description */}
                <p className="offer-card-desc">{offer.description}</p>

                {/* Sub-details (Steps & Tags) */}
                <div className="offer-card-sub-details">
                    <span className="offer-card-chip offer-card-chip--accent" style={{ background: colorSet.bg, color: colorSet.accent, borderColor: colorSet.border }}>
                        <span className="offer-card-chip-icon">📋</span> {offer.steps} step{offer.steps > 1 ? 's' : ''} to claim
                    </span>
                    {offer.tags.map((t) => (
                        <span key={t} className="offer-card-chip">{t}</span>
                    ))}
                </div>

                {/* REAL USER RATING SECTION */}
                <div className="community-rating-section" style={{ borderTop: `1px solid ${colorSet.border}` }}>
                    <div className="community-rating-header">
                        <span className="community-rating-label">Community Score</span>
                        <div className="community-rating-stats">
                            <span className="community-score-value">{communityAverage}</span>
                            <span className="community-reviews-count">({communityStats.count} users rated)</span>
                        </div>
                    </div>
                    <div className="user-rate-box">
                        <span className="user-rate-label">Rate this offer:</span>
                        <div className="star-rating-interactive">
                            {[...Array(5)].map((_, i) => {
                                const ratingValue = i + 1;
                                return (
                                    <label key={i}>
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={ratingValue}
                                            onClick={() => handleRate(ratingValue)}
                                            style={{ display: 'none' }}
                                        />
                                        <FaStar
                                            className="star"
                                            color={ratingValue <= (hover || userRating) ? "#F59E0B" : "rgba(255,255,255,0.1)"}
                                            size={18}
                                            onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(0)}
                                            style={{ cursor: 'pointer', transition: 'color 200ms, transform 200ms' }}
                                        />
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="offer-card-actions">
                    <a
                        href={offer.link || '#'}
                        target="_blank"
                        rel="noreferrer"
                        className="btn offer-card-cta"
                        style={{ '--card-accent': colorSet.accent }}
                    >
                        Claim Offer
                        <span className="offer-card-cta-arrow">→</span>
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
