"use client"

import CategorysSearch from "./_components/CategorysSearch";
import DoctorList from "./_components/DoctorList";
import Footer from "./_components/Footer";
import Hero from "./_components/Hero";


export default function Home() {
  return (
    <div>
      <Hero/>
      <CategorysSearch/>
      <DoctorList/>
    </div>
  );
}
