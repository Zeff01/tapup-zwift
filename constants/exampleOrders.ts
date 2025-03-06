
import { Order, SubscriptionPlan } from "@/types/types";

const exampleSubscriptionPlan: SubscriptionPlan = {
  id: "SP001",
  name: "Gold Plan",
  price: 100,
  durationDays: 30,
  features: ["Priority Support", "Extended Warranty", "Discounts on Renewals"],
};

export const exampleOrders: Order[] = [
{
    orderId: "ORD123126",
    items: [
      {
        product: {
          id: "C123",
          image: "/assets/cards/back/card2.png",
          title: "Standard Card",
          description: "Essential",
          price: 250,
        },
        quantity: 2,
                physicalCardId: "PHC123",
        subscriptionPlan: exampleSubscriptionPlan,
      },
       {
        product: {
          id: "C126",
          image: "/assets/cards/back/card2.png",
          title: "Standard Card",
          description: "Essential",
          price: 250,
        },
         quantity: 2,
                physicalCardId: "PHC124",
        subscriptionPlan: exampleSubscriptionPlan,
      },
      {
        product: {
          id: "C124",
          image: "/assets/cards/back/card5.png",
          title: "Premium Card",
          description: "Essential",
          price: 50,
        },
        quantity: 1,
                physicalCardId: "PHC125",
        subscriptionPlan: exampleSubscriptionPlan,
      },
    ],
    shippingInfo: {
      recipientName: "John",
      contactNumber: "123-456-7890",
      address: {
        city: "New York",
        street: "5th Avenue",
        unit: "12B",
        postalCode: "10001",
      },
    },
    deliveryOption: {
        name: "J&T Express",
            image:"/assets/courier/lbc.png",
      shippingFee: 50,
      minDays: 3,
      maxDays: 7,
    },
    orderDate: new Date("2025-01-28"),
    totalAmount: 1050,
    status: "Pending",
  },

  
    
  
  {
    orderId: "ORD123216",
    items: [
      {
        product: {
          id: "C123",
          image: "/assets/cards/back/card6.png",
          title: "Standard Card",
          description: "Essential",
          price: 1000,
        },
        quantity: 2,
                physicalCardId: "PHC12311",
        subscriptionPlan: exampleSubscriptionPlan,
      },
      {
        product: {
          id: "C124",
          image: "/assets/cards/back/card4.png",
          title: "Premium Card",
          description: "Essential",
          price: 350,
        },
        quantity: 1,
                physicalCardId: "PHC1232",
        subscriptionPlan: exampleSubscriptionPlan,
      },
       {
        product: {
          id: "C124",
          image: "/assets/cards/back/card4.png",
          title: "Premium Card",
          description: "Essential",
          price: 350,
        },
         quantity: 1,
                physicalCardId: "PHC123232",
        subscriptionPlan: exampleSubscriptionPlan,
      },
    ],
    shippingInfo: {
      recipientName: "John Doe Receive",
      contactNumber: "123-456-7890",
      address: {
        city: "New York",
        street: "5th Avenue",
        unit: "12B",
        postalCode: "10001",
      },
    },
    deliveryOption: {
        name: "J&T Express",
            image:"/assets/courier/lbc.png",
      shippingFee: 50,
      minDays: 3,
      maxDays: 7,
    },
    orderDate: new Date("2025-01-28"),
    totalAmount: 2700,
    status: "To Receive",
    },
  
   {
    orderId: "ORD1234321",
    items: [
      {
        product: {
          id: "C123",
          image: "/assets/cards/back/card2.png",
          title: "Standard Card",
          description: "Essential",
          price: 250,
        },
        quantity: 2,
                physicalCardId: "PHC1231232132",
        subscriptionPlan: exampleSubscriptionPlan,
      },
      {
        product: {
          id: "C124",
          image: "/assets/cards/back/card6.png",
          title: "Premium Card",
          description: "Essential",
          price: 50,
        },
        quantity: 1,
                physicalCardId: "PHC1231212",
        subscriptionPlan: exampleSubscriptionPlan,
      },
    ],
    shippingInfo: {
      recipientName: "John Doe Return Rquested",
      contactNumber: "123-456-7890",
      address: {
        city: "New York",
        street: "5th Avenue",
        unit: "12B",
        postalCode: "10001",
      },
    },
    deliveryOption: {
        name: "J&T Express",
            image:"/assets/courier/lbc.png",
      shippingFee: 50,
      minDays: 3,
      maxDays: 7,
    },
    orderDate: new Date("2025-01-28"),
    totalAmount: 550,
    status: "To Return/Refund",
    returnStatus: "Return Requested",
    },
  
   {
    orderId: "ORD123456",
    items: [
      {
        product: {
          id: "C123",
          image: "/assets/cards/back/card1.png",
          title: "Standard Card",
          description: "Essential",
          price: 250,
        },
        quantity: 2,
                physicalCardId: "PHC1231111",
        subscriptionPlan: exampleSubscriptionPlan,
      },
      {
        product: {
          id: "C124",
          image: "/assets/cards/back/card1.png",
          title: "Premium Card",
          description: "Essential",
          price: 50,
        },
        quantity: 1,
                physicalCardId: "PHC12332131",
        subscriptionPlan: exampleSubscriptionPlan,
      },
    ],
    shippingInfo: {
      recipientName: "John Doe",
      contactNumber: "123-456-7890",
      address: {
        city: "New York",
        street: "5th Avenue",
        unit: "12B",
        postalCode: "10001",
      },
    },
    deliveryOption: {
        name: "J&T Express",
            image:"/assets/courier/lbc.png",
      shippingFee: 50,
      minDays: 3,
      maxDays: 7,
    },
    orderDate: new Date("2025-01-28"),
    totalAmount: 550,
    status: "To Return/Refund",
    returnStatus: "Refunded",
    },
  
   {
    orderId: "ORD123326",
    items: [
      {
        product: {
          id: "C123",
          image: "/assets/cards/back/card5.png",
          title: "Standard Card",
          description: "Essential",
          price: 250,
        },
        quantity: 2,
            physicalCardId: "PHC12332132",
        subscriptionPlan: exampleSubscriptionPlan,
        
      },
      {
        product: {
          id: "C124",
          image: "/assets/cards/back/card1.png",
          title: "Premium Card",
          description: "Essential",
          price: 50,
        },
        quantity: 1,
                physicalCardId: "PHC132123",
        subscriptionPlan: exampleSubscriptionPlan,
      },
    ],
    shippingInfo: {
      recipientName: "John Doe To return",
      contactNumber: "123-456-7890",
      address: {
        city: "New York",
        street: "5th Avenue",
        unit: "12B",
        postalCode: "10001",
      },
    },
    deliveryOption: {
        name: "J&T Express",
            image:"/assets/courier/lbc.png",
      shippingFee: 50,
      minDays: 3,
      maxDays: 7,
    },
    orderDate: new Date("2025-01-28"),
    totalAmount: 550,
    status: "To Return/Refund",
    returnStatus: "To Return",
    },
  
  {
    orderId: "ORD1226",
    items: [
      {
        product: {
          id: "C123",
          image: "/assets/cards/back/card1.png",
          title: "Standard Card",
          description: "Essential",
          price: 250,
        },
        quantity: 2,
                physicalCardId: "PHC1323223",
        subscriptionPlan: exampleSubscriptionPlan,
      },
      {
        product: {
          id: "C124",
          image: "/assets/cards/back/card1.png",
          title: "Premium Card",
          description: "Essential",
          price: 50,
        },
        quantity: 1,
                physicalCardId: "PHC1232323",
        subscriptionPlan: exampleSubscriptionPlan,
      },
    ],
    shippingInfo: {
      recipientName: "John Delivered",
      contactNumber: "123-456-7890",
      address: {
        city: "New York",
        street: "5th Avenue",
        unit: "12B",
        postalCode: "10001",
      },
    },
    deliveryOption: {
        name: "J&T Express",
            image:"/assets/courier/lbc.png",
      shippingFee: 50,
      minDays: 3,
      maxDays: 7,
    },
    orderDate: new Date("2025-01-28"),
    totalAmount: 550,
      status: "Delivered",
    returnStatus:"Delivered"
    },
  
  {
    orderId: "ORD12312",
    items: [
      {
        product: {
          id: "C123",
          image: "/assets/cards/back/card1.png",
          title: "Standard Card",
          description: "Essential",
          price: 250,
        },
        quantity: 2,
                physicalCardId: "PHC111123",
        subscriptionPlan: exampleSubscriptionPlan,
      },
      {
        product: {
          id: "C124",
          image: "/assets/cards/back/card1.png",
          title: "Premium Card",
          description: "Essential",
          price: 50,
        },
        quantity: 1,
                physicalCardId: "PHC1232323",
        subscriptionPlan: exampleSubscriptionPlan,
      },
    ],
    shippingInfo: {
      recipientName: "John Return Rejected",
      contactNumber: "123-456-7890",
      address: {
        city: "New York",
        street: "5th Avenue",
        unit: "12B",
        postalCode: "10001",
      },
    },
    deliveryOption: {
        name: "J&T Express",
            image:"/assets/courier/lbc.png",
      shippingFee: 50,
      minDays: 3,
      maxDays: 7,
    },
    orderDate: new Date("2025-01-28"),
    totalAmount: 550,
      status: "Delivered",
    returnStatus: "Return Rejected",
    },
  
  {
    orderId: "ORD123456",
    items: [
      {
        product: {
          id: "C123",
          image: "/assets/cards/back/card1.png",
          title: "Standard Card",
          description: "Essential",
          price: 250,
        },
        quantity: 2,
                physicalCardId: "PHC13223",
        subscriptionPlan: exampleSubscriptionPlan,
      },
      {
        product: {
          id: "C124",
          image: "/assets/cards/back/card4.png",
          title: "Premium Card",
          description: "Essential",
          price: 50,
        },
        quantity: 1,
                physicalCardId: "PHC123",
        subscriptionPlan: exampleSubscriptionPlan,
      },
    ],
    shippingInfo: {
      recipientName: "John To return e",
      contactNumber: "123-456-7890",
      address: {
        city: "New York",
        street: "5th Avenue",
        unit: "12B",
        postalCode: "10001",
      },
    },
    deliveryOption: {
        name: "J&T Express",
            image:"/assets/courier/lbc.png",
      shippingFee: 50,
      minDays: 3,
      maxDays: 7,
    },
    orderDate: new Date("2025-01-28"),
    totalAmount: 550,
    status: "To Return/Refund",
    returnStatus: "To Return",
  },
  {
    orderId: "ORD123456",
    items: [
      {
        product: {
          id: "C123",
          image: "/assets/cards/back/card1.png",
          title: "Standard Card",
          description: "Essential",
          price: 250,
        },
        quantity: 2,
                physicalCardId: "PHC11232123",
        subscriptionPlan: exampleSubscriptionPlan,
      },
      {
        product: {
          id: "C124",
          image: "/assets/cards/back/card1.png",
          title: "Premium Card",
          description: "Essential",
          price: 50,
        },
        quantity: 1,
                physicalCardId: "PHC1213223",
        subscriptionPlan: exampleSubscriptionPlan,
      },
    ],
    shippingInfo: {
      recipientName: "John Doe Refunded",
      contactNumber: "123-456-7890",
      address: {
        city: "New York",
        street: "5th Avenue",
        unit: "12B",
        postalCode: "10001",
      },
    },
    deliveryOption: {
        name: "J&T Express",
            image:"/assets/courier/lbc.png",
      shippingFee: 50,
      minDays: 3,
      maxDays: 7,
    },
    orderDate: new Date("2025-01-28"),
    totalAmount: 550,
      status: "Cancelled",
    returnStatus: "Refunded"
    },

   {
    orderId: "ORD123326",
    items: [
      {
        product: {
          id: "C123",
          image: "/assets/cards/back/card1.png",
          title: "Standard Card",
          description: "Essential",
          price: 250,
        },
        quantity: 2,
                physicalCardId: "PHC1323223",
        subscriptionPlan: exampleSubscriptionPlan,
      },
      {
        product: {
          id: "C124",
          image: "/assets/cards/back/card1.png",
          title: "Premium Card",
          description: "Essential",
          price: 50,
        },
        quantity: 1,
                physicalCardId: "PHC12322323",
        subscriptionPlan: exampleSubscriptionPlan,
      },
    ],
    shippingInfo: {
      recipientName: "John Doe Cancelled",
      contactNumber: "123-456-7890",
      address: {
        city: "New York",
        street: "5th Avenue",
        unit: "12B",
        postalCode: "10001",
      },
    },
    deliveryOption: {
        name: "J&T Express",
            image:"/assets/courier/lbc.png",
      shippingFee: 50,
      minDays: 3,
      maxDays: 7,
    },
    orderDate: new Date("2025-01-28"),
    totalAmount: 550,
      status: "Cancelled",
    returnStatus: "Cancelled"
    },
  

{
    orderId: "ORD123326",
    items: [
      {
        product: {
          id: "C123",
          image: "/assets/cards/back/card1.png",
          title: "Standard Card",
          description: "Essential",
          price: 250,
        },
        quantity: 2,
                physicalCardId: "PHC3232123",
        subscriptionPlan: exampleSubscriptionPlan,
      },
      {
        product: {
          id: "C124",
          image: "/assets/cards/back/card1.png",
          title: "Premium Card",
          description: "Essential",
          price: 50,
        },
        quantity: 1,
                physicalCardId: "PHC1223123",
        subscriptionPlan: exampleSubscriptionPlan,
      },
    ],
    shippingInfo: {
      recipientName: "John Doe To ship",
      contactNumber: "123-456-7890",
      address: {
        city: "New York",
        street: "5th Avenue",
        unit: "12B",
        postalCode: "10001",
      },
    },
    deliveryOption: {
        name: "J&T Express",
        image:"/assets/courier/lbc.png",
      shippingFee: 50,
      minDays: 3,
      maxDays: 7,
    },
    orderDate: new Date("2025-01-28"),
    totalAmount: 550,
    status: "To Ship",
  },
];