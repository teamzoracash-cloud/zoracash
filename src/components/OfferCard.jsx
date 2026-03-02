import { motion } from 'framer-motion';
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

export default function OfferCard({ offer, featured = false, index = 0 }) {
    const colorSet = categoryColors[offer.category] || categoryColors.finance;
    const extraCountries = offer.countries.length - MAX_FLAGS;
    const stars = Math.round(offer.rating);

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
                {/* Header: Logo, Company & Rating */}
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
                            <span className="rating-reviews">({(offer.reviews / 1000).toFixed(1)}k reviews)</span>
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
