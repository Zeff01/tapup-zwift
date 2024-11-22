"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "@/components/ui/use-toast";

import { TimePicker12Demo } from "../timepicker/time-picker-12h";

const formSchema = z.object({
  dateTime: z.date(),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function DateTimePickerForm() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: FormSchemaType) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 justify-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h2 className="text-left text-xl pl-2">Make an appointment:</h2>
        <FormField
          control={form.control}
          name="dateTime"
          render={({ field }) => (
            <FormItem className="flex flex-col mx-auto">
              <FormLabel className="text-left text-sm">
                Date and Time:
              </FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[250px] justify-start bg-transparent text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP hh:mm:ss a")
                      ) : (
                        <span>Select date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    className="w-auto"
                  />
                  <div className="p-3 border-t border-border">
                    <TimePicker12Demo
                      setDate={field.onChange}
                      date={field.value}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end mr-2 pb-5">
          <Button type="submit" className="w-[120px] bg-gray-300">
            Set appointment
          </Button>
        </div>
      </form>
    </Form>
  );
}
