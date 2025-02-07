export const formatDeliveryDate = (orderDate: Date, minDays: number, maxDays: number) => {
 const addDays = (date: Date, days: number) => 
   new Date(new Date(date).setDate(new Date(date).getDate() + days));
   
 const formatDate = (date: Date) => 
   date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

 const minDeliveryDate = addDays(orderDate, minDays);
 const maxDeliveryDate = addDays(orderDate, maxDays); 

 return `${formatDate(minDeliveryDate)}-${formatDate(maxDeliveryDate)}`;
};