import { useEffect, useState } from "react";
import Image from "next/image";
import { CartItem, CardItem } from "@/types/types";
import { useCart } from "@/providers/cart-provider";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  item: CartItem;
  showTrash: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ item, showTrash }) => {
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(item.quantity);

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    dispatch({
      type: "UPDATE_CART_ITEM_QUANTITY",
      payload: { id: item.product.id, quantity: newQuantity },
    });
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      dispatch({
        type: "UPDATE_CART_ITEM_QUANTITY",
        payload: { id: item.product.id, quantity: newQuantity },
      });
    }
  };

  const handleRemoveFromCart = () => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id: item.product.id } });
  };

  return (
    <div className="flex items-center p-4 rounded-lg">
      {/* Product Image */}
      <div className="w-16 h-10 relative">
        <Image
          src={item.product.image}
          alt={item.product.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="ml-4 flex-1">
        <h3 className="text-lg font-semibold">{item.product.title}</h3>
        <p>₱{item.product.price}</p>
      </div>

      {/* Quantity Controls */}
      {showTrash ? (
        <Button
          className="p-2 absolute right-4 text-destructive"
          variant="outline"
          onClick={handleRemoveFromCart}
        >
          <Trash />
        </Button>
      ) : (
        <div className="flex items-center gap-1">
          <button
            className="w-8 h-8 border rounded-lg flex items-center justify-center"
            onClick={decrementQuantity}
          >
            –
          </button>
          <span className=" w-8 h-8 border rounded-lg flex items-center justify-center">
            {quantity}
          </span>
          <button
            className="w-8 h-8 border rounded-lg flex items-center justify-center"
            onClick={incrementQuantity}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
