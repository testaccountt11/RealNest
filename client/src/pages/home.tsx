import Header from "@/components/header";
import Hero from "@/components/hero";
import FeaturedProperties from "@/components/featured-properties";
import SearchFilters from "@/components/search-filters";
import PropertyListings from "@/components/property-listings";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <FeaturedProperties />
      <SearchFilters />
      <PropertyListings />
      <Footer />
    </div>
  );
}
