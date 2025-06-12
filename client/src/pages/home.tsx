import { useState } from "react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import FeaturedProperties from "@/components/featured-properties";
import SearchFilters from "@/components/search-filters";
import PropertyListings from "@/components/property-listings";
import PropertyModal from "@/components/property-modal";
import Footer from "@/components/footer";
import type { Property } from "@shared/schema";

export default function Home() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <FeaturedProperties onPropertyClick={handlePropertyClick} />
      <SearchFilters />
      <PropertyListings onPropertyClick={handlePropertyClick} />
      <Footer />
      
      <PropertyModal 
        property={selectedProperty}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}
