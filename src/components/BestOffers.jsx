import { useRef } from 'react';
import { motion } from 'framer-motion';
import { offers } from '../data/offers';
import OfferCard from './OfferCard';
import './BestOffers.css';

export default function BestOffers() {
    const trackRef = useRef(null);

    // Helper to extract numerical value from bonus string (supports $ and €)
    const getBonusValue = (bonus) => {
        const match = bonus.match(/(\d+)(?:\$|€)/) || bonus.match(/(?:\$|€)(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
    };

    // Sort all offers by bonus value descending and pick top 6
    const featured = [...offers]
        .sort((a, b) => getBonusValue(b.bonus) - getBonusValue(a.bonus))
        .slice(0, 6);

    const scroll = (dir) => {
        if (trackRef.current) {
            trackRef.current.scrollBy({ left: dir * 360, behavior: 'smooth' });
        }
    };

    return (
        <section className="section best-offers" id="offers">
            <div className="container">
                {/* Header */}
                <div className="best-offers-header">
                    <div>
                        <div className="section-label">🏆 Editor's Picks</div>
                        <h2 className="section-title">Best Offers Right Now</h2>
                        <p className="section-sub">
                            Handpicked, high-value deals our team refreshes daily. Don't miss out — they expire fast.
                        </p>
                    </div>
                    <div className="best-offers-controls">
                        <button className="best-offers-arrow" onClick={() => scroll(-1)} aria-label="Scroll Left">‹</button>
                        <button className="best-offers-arrow" onClick={() => scroll(1)} aria-label="Scroll Right">›</button>
                    </div>
                </div>

                {/* Horizontal scroll track */}
                <div className="best-offers-track" ref={trackRef}>
                    {featured.map((offer, i) => (
                        <div key={offer.id} className="best-offers-item">
                            <OfferCard offer={offer} featured index={i} />
                        </div>
                    ))}
                </div>

                {/* View all link */}
                <motion.div
                    className="best-offers-viewall"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <a href="#categories" className="btn btn-secondary">
                        View All Offers →
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
