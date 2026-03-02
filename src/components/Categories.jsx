import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories, offers } from '../data/offers';
import OfferCard from './OfferCard';
import './Categories.css';

export default function Categories() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filtered = offers.filter((o) => {
        const matchesCat = activeCategory === 'all' || o.category === activeCategory;
        const matchesSearch =
            !searchQuery ||
            o.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            o.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            o.bonus.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesSearch;
    });

    return (
        <section className="section categories" id="categories">
            <div className="container">
                {/* Header */}
                <div className="categories-header">
                    <div className="section-label">🗂️ Browse by Category</div>
                    <h2 className="section-title">
                        All <span className="gradient-text">Offers</span>
                    </h2>
                    <p className="section-sub">
                        Filter by category to find the best deal for you. Updated daily.
                    </p>
                </div>

                {/* Filters row */}
                <div className="categories-filters">
                    {/* Category pills */}
                    <div className="categories-pills">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`categories-pill ${activeCategory === cat.id ? 'categories-pill--active' : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                <span>{cat.icon}</span>
                                <span>{cat.label}</span>
                                {activeCategory === cat.id && (
                                    <motion.div
                                        className="categories-pill-bg"
                                        layoutId="pill-bg"
                                        transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="categories-search-wrap">
                        <span className="categories-search-icon">🔍</span>
                        <input
                            type="text"
                            className="categories-search"
                            placeholder="Search offers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button className="categories-search-clear" onClick={() => setSearchQuery('')}>✕</button>
                        )}
                    </div>
                </div>

                {/* Results count */}
                <div className="categories-count">
                    <span>{filtered.length} offer{filtered.length !== 1 ? 's' : ''}</span>
                    {activeCategory !== 'all' && (
                        <span> in <strong>{categories.find(c => c.id === activeCategory)?.label}</strong></span>
                    )}
                </div>

                {/* Grid */}
                <AnimatePresence mode="wait">
                    {filtered.length > 0 ? (
                        <motion.div
                            key={activeCategory + searchQuery}
                            className="grid-offers"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {filtered.map((offer, i) => (
                                <OfferCard key={offer.id} offer={offer} index={i} />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            className="categories-empty"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            <span className="categories-empty-icon">🔍</span>
                            <p>No offers found for your search.</p>
                            <button className="btn btn-secondary btn-sm" onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}>
                                Clear filters
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
