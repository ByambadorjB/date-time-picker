'use client'
import DateTimePickerDialog from "@/components/time-picker/date-time-picker-dialog";
import MobileNav from "@/components/ui/mobile-nav";
import Sidebar from "@/components/ui/sidebar";
import Map from "@/components/map";
// import { useState } from "react";

export default function Home() {

  // const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  const latlong = {
    lat: -33.88204726572486, // Example latitude
    lng: 151.20646287457745 // Example longitude
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar Section */}
      <aside className={`bg-gray-300 h-screen absolute md:relative transform transition-transform duration-300  "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}>
        <Sidebar />
        {/* <MobileNav /> */}
      </aside>
      {/* Mobile Navigation */}
      <nav className="md:hidden">
        {/* Mobile Navigation (appears alongside the hamburger menu) */}
        <MobileNav />
      </nav>

      {/* Main Content Section */}
      <main className="relative p-5">
        <div>
          <h1 className="absolute top-5 left-1/2 transform -translate-x-1/2 text-xl font-bold">
            Welcome to Lunch buddy, <br />
          </h1>

        </div>
        <br />
        <br />
        <div className="">
          <Map {...latlong} />
          <DateTimePickerDialog />
        </div>
        
      </main>
      
    </div>
  );
}
