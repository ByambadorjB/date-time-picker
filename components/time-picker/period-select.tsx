import * as React from "react";

interface TimePeriodSelectProps {
  period: "AM" | "PM";
  onChange: (period: "AM" | "PM") => void;
}

export const TimePeriodSelect: React.FC<TimePeriodSelectProps> = ({
  period,
  onChange,
}) => {
  return (
    <select
      value={period}
      onChange={(e) => onChange(e.target.value as "AM" | "PM")}
      className="border rounded p-1 text-xs"
    >
      <option value="AM">AM</option>
      <option value="PM">PM</option>
    </select>
  );
};
