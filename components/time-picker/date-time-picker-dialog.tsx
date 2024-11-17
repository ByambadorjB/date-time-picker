"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Calendar } from "../ui/calendar";
import { TimePicker } from "./time-picker"; // Assuming you have this component
import { format } from "date-fns";

export default function DateTimePickerDialog() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState<Date | null>(null);

  const handleDateChange = (date: Date | undefined) => {
    // setSelectedDate(date);
    setSelectedDate(date || null); // Convert undefined to null for your internal state
  };

//   const handleTimeChange = (time: Date) => {
//     setTime(time);
//   };

  const getFormattedDateTime = () => {
    if (selectedDate && time) {
      const combinedDate = new Date(selectedDate);
      combinedDate.setHours(time.getHours());
      combinedDate.setMinutes(time.getMinutes());
      return format(combinedDate, "PPP HH:mm:ss a");
    }
    return "No date and time selected.";
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open Date & Time Picker</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Date and Time</DialogTitle>
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
                setDate={(date) => setSelectedDate(date || null)} />
            </div>

            {/* Display Selected Date and Time */}
            <div>
              <h4 className="text-sm font-medium">Selected Date & Time:</h4>
              <p>{getFormattedDateTime()}</p>
            </div>
          </div>

          <div className="mt-4">
            <Button
              onClick={() => {
                if (selectedDate && time) {
                  const formattedDateTime = getFormattedDateTime();
                  console.log("Selected DateTime:", formattedDateTime);
                  alert(`You selected: ${formattedDateTime}`);
                } else {
                  alert("Please select both date and time.");
                }
              }}
            >
              Ok
            </Button>
          </div>
          <p>Selected Date: {selectedDate?.toString() || "None"}</p>
        </DialogContent>
      </Dialog>
    </>
  );
}
