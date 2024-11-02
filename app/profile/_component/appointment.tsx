// 'use client'
// import React from 'react'

// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import DatePicker from './date'


// const Appointment = () => {
//   return (
//       <Card className="w-full mx-auto bg-transparent border-none">
//       <CardHeader>
//         <CardTitle>Make an appointment:</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form>
//           <div className="grid w-full items-center gap-4">
//             <div className="flex justify-between gap-5 items-center space-y-1.5">
//               <div className='flex flex-col w-[50%]'>
//               <h2 >Date:</h2>
//               <DatePicker/>
//               </div>
//               <div>
//               <label htmlFor='hours' className='pb-2'>Hours:</label>
//               <Input id='hours' type='time' placeholder='00:00' className='w-[4rem]'/>
//               </div>
//             </div>
//           </div>
//         </form>
//       </CardContent>
//       <CardFooter className="flex justify-end">
//         <Button className=''>Set an appointment</Button>
//       </CardFooter>
//     </Card>
//   )
// }

// export default Appointment;

'use client';
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DatePicker from './date';
import DateTimePickerForm from './date';

const Appointment = () => {
  return (
    <>
      <DateTimePickerForm/>
    </>
  );
};

export default Appointment;
 
