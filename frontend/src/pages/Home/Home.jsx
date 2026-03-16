import Hero from '../../components/Hero/Hero';
import FeaturedStays from '../../components/FeaturedStays/FeaturedStays';
import Destinations from '../../components/Destinations/Destinations';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import Testimonials from '../../components/Testimonials/Testimonials';
import Newsletter from '../../components/Newsletter/Newsletter';
import './Home.css';

export default function Home() {
  return (
    <main className="home">
      <Hero />
      <Destinations />
      <FeaturedStays />
      <HowItWorks />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
