
import { Order } from "@/types/types";

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