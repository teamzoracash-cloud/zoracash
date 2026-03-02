import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BestOffers from './components/BestOffers';
import Categories from './components/Categories';
import HowItWorks from './components/HowItWorks';
import ReferralBanner from './components/ReferralBanner';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <BestOffers />
        <Categories />
        <HowItWorks />
        <ReferralBanner />
      </main>
      <Footer />
    </div>
  );
}
