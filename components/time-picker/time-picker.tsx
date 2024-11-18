"use client";
 
import * as React from "react";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "./time-picker-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
 
interface TimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}
 
export function TimePicker({ date, setDate }: TimePickerProps) {
    // const [period, setPeriod] = React.useState<Period>("PM");
    const getPeriod = (date: Date | undefined) => (date?.getHours() || 0) >= 12 ? "PM" : "AM";
    
    
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);
  const periodRef = React.useRef<HTMLSelectElement>(null);

  const handlePeriodChange = (selectedPeriod: string) => {
    if (!date) return;

    const newDate = new Date(date);
    const currentHours = newDate.getHours();

    if (selectedPeriod === "AM" && currentHours >= 12) {
      newDate.setHours(currentHours - 12); // Convert PM to AM
    } else if (selectedPeriod === "PM" && currentHours < 12) {
      newDate.setHours(currentHours + 12); // Convert AM to PM
    }

    setDate(newDate);
  };
 
  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1 text-center">
        <Label htmlFor="hours" className="text-xs">
          Hours
        </Label>
        <TimePickerInput
          picker="hours"
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="minutes" className="text-xs">
          Minutes
        </Label>
        <TimePickerInput
          picker="minutes"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="seconds" className="text-xs">
          Seconds
        </Label>
        <TimePickerInput
          picker="seconds"
          date={date}
          setDate={setDate}
          ref={secondRef}
          onLeftFocus={() => minuteRef.current?.focus()}
          onRightFocus={() => periodRef.current?.focus()}
        />
      </div>
     
      <div className="mt-2">
        <Label htmlFor="period-select" className="text-xs">Period</Label>
        <Select
          value={getPeriod(date)} // Dynamically set value based on the current date
          onValueChange={handlePeriodChange} // Update period when user selects
        >
          <SelectTrigger className="w-full border border-gray-300 rounded p-1 text-sm">
            <SelectValue placeholder="Select Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex h-10 items-center">
        <Clock className="ml-2 h-4 w-4" />
      </div>
    </div>
  );
}