"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
// import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { TimePicker } from "./time-picker";

const formSchema = z.object({
  dateTime: z.date(),
//   dateTime: z.string().min(1).max(10),
});

type FormSchemaType = z.infer<typeof formSchema>;


export default function DateTimePickerForm() {
     // 1. Define your form.
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   username: "",
    // },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: FormSchemaType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="dateTime"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Username</FormLabel>
              {/* <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl> */}
              {/* popover */}
                <Popover>
                    {/* <PopoverTrigger>Open</PopoverTrigger> */}
                    <PopoverTrigger asChild>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                        )}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {/* {field.value ? format(field.value, "PPP HH:mm:ss") : <span>Pick a date</span>} */}
                        {field.value ? (
                            <>
                                {format(field.value, "PPP HH:mm:ss")}{" "}
                                {field.value.getHours() >= 12 ? "PM" : "AM"}
                            </>
                            ) : (
                            <span>Pick a date</span>
                        )}

                        </Button>
                    </PopoverTrigger>
                    {/* <PopoverContent>Place content for the popover here.</PopoverContent> */}
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                        mode="single"
                        selected={field.value }
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        />
                        <div className="p-3 border-t">
                            <TimePicker setDate={field.onChange} date={field.value}/>
                        </div>
                    </PopoverContent>
                </Popover>

              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  )
}
