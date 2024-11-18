//components/time-picker/date-time--picker-dialog.tsx
"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Calendar } from "../ui/calendar";
import { TimePicker } from "./time-picker"; // Assuming you have this component
import { format, setDate } from "date-fns";

export default function DateTimePickerDialog() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date || null); // Convert undefined to null for your internal state
  };

  return (
    <>
      <Dialog >
        <DialogTrigger asChild>
          <Button variant="outline">Open Date & Time Picker</Button>
        </DialogTrigger>
        <DialogContent className="bg-slate-100 flex flex-col items-center justify-center">
          <DialogHeader>
            <DialogTitle className=" text-center">Select Date and Time</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Date Picker */}
            <div>
              <h4 className="text-sm font-medium">Pick a Date:</h4>
              <Calendar
                mode="single"
                selected={selectedDate || undefined}
                onSelect={handleDateChange} 
                disabled={(date) => date < new Date()} // Disable past dates
                className="rounded-md border shadow"
              />
            </div>
            

            {/* Time Picker */}
            <div>
              <h4 className="text-sm font-medium">Pick a Time:</h4>
              <TimePicker 
                date={selectedDate || undefined}
                setDate={(date) => setSelectedDate(date || null)} 
                />
            </div>
            
          </div>

          <div className="mt-4">
            <Button
              onClick={() => {
                if (selectedDate) {
                    const date = new Date(selectedDate);
              
                    const day = date.toLocaleString("en-US", { weekday: "long" }); // e.g., Monday
                    const dateNumber = date.getDate(); // e.g., 18
                    const month = date.toLocaleString("en-US", { month: "long" }); // e.g., November
                    const year = date.getFullYear(); // e.g., 2024
                    const hours = date.getHours(); // 24-hour format hours
                    const minutes = date.getMinutes(); // Minutes
                    const seconds = date.getSeconds(); // Seconds
                    const ampm = hours >= 12 ? "PM" : "AM"; // Determine AM/PM
                    const formattedHours = hours % 12 || 12; // Convert 24-hour to 12-hour format

                    // Prepare row-by-row description
                    const message = `
                    Day: ${day}
                    Date: ${dateNumber}
                    Month: ${month}
                    Year: ${year}
                    Hours: ${formattedHours}
                    Minutes: ${minutes.toString().padStart(2, "0")}
                    Seconds: ${seconds.toString().padStart(2, "0")}
                    AM/PM: ${ampm}
                    `.trim(); // Trim to remove any extra spaces or newlines

                    const formattedDateTime = `${day}, ${dateNumber} ${month} ${year}, ${formattedHours}:${minutes
                      .toString()
                      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${ampm}`;
              
                    alert(`Selected DateTime: ${formattedDateTime}`);
                    alert(message);
                  } else {
                    alert("Please select a date first.");
                  }
                }}
            >
              Confirm Date and Time
            </Button>
          </div>
          
          <p className="bg-slate-200 text-green-600 text-center">Selected Date: {selectedDate?.toString() || "None"}</p>
        </DialogContent>
      </Dialog>
    </>
  );
}
