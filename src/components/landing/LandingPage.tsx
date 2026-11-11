import React from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { AboutSection } from './AboutSection';
import { ServicesSection } from './ServicesSection';
import { FeaturedProjects } from './FeaturedProjects';
import { PrecisionSection } from './PrecisionSection';
import { PartnersSection } from './PartnersSection';
import { SupplierCTA } from './SupplierCTA';
import { ContactSection } from './ContactSection';
import { CorporateFooter } from './CorporateFooter';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#071629] text-white">
      <Navbar />
      <Hero />
      <AboutSection />
      <ServicesSection />
      <FeaturedProjects />
      <PrecisionSection />
      <PartnersSection />
      <SupplierCTA />
      <ContactSection />
      <CorporateFooter />
    </div>
  );
};

