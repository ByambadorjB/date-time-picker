import DateTimePickerDialog from "@/components/time-picker/date-time-picker-dialog";
import MobileNav from "@/components/ui/mobile-nav";
import Sidebar from "@/components/ui/sidebar";
// import DateTimePickerForm from "@/components/time-picker/date-time-picker-form";
// import { DatePicker } from "@/components/ui/date-picker";
// import Image from "next/image";

export default function Home() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar Section */}
      <aside className="bg-gray-300 h-screen">
        <Sidebar />
        <MobileNav />
      </aside>

      {/* Main Content Section */}
      <main className="relative p-5">
        <h1 className="absolute top-5 left-1/2 transform -translate-x-1/2 text-xl font-bold">
          Welcome to Lunch buddy, <br />
          Connecting friends, one lunch at a time!
        </h1>
        
        <div className="flex items-center justify-center h-full">
          <DateTimePickerDialog />
        </div>
        
      </main>
      
    </div>
  );
}
