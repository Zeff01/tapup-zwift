// components/CardItem.js
import { useState } from "react";
import Image from "next/image";

interface CardItemProps {
  imageSrc: string;
  title: string;
  price: number;
}

const CardItem: React.FC<CardItemProps> = ({ imageSrc, title, price }) => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="flex items-center p-4 border rounded-lg">
      {/* Product Image */}
      <div className="w-8 h-16 relative">
        <Image
          src={imageSrc}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="ml-4 flex-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">₱{price}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center">
        <button
          className="w-8 h-8 border rounded-full flex items-center justify-center"
          onClick={decrementQuantity}
        >
          –
        </button>
        <span className="mx-3">{quantity}</span>
        <button
          className="w-8 h-8 border rounded-full flex items-center justify-center"
          onClick={incrementQuantity}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CardItem;
