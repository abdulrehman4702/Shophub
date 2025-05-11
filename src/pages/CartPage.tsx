import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { products } from '../data/products';
import { formatPrice } from '../lib/utils';
import { Link } from 'react-router-dom';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useStore();

  const cartItems = cart.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.productId)!,
  }));

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const shipping = 10;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4">
        <h2 className="mb-4 text-2xl font-bold">Your cart is empty</h2>
        <p className="mb-8 text-gray-600">Add some products to your cart to continue shopping</p>
        <Link to="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>
      
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex items-center space-x-4 rounded-lg border p-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-24 w-24 rounded-md object-cover"
                />
                
                <div className="flex flex-1 flex-col">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{formatPrice(product.price)}</p>
                  
                  <div className="mt-2 flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(product.id, Math.max(0, quantity - 1))}
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="w-8 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="mb-2 font-semibold">
                    {formatPrice(product.price * quantity)}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFromCart(product.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{formatPrice(shipping)}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
          
          <Link to="/checkout">
            <Button className="mt-6 w-full">Proceed to Checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};