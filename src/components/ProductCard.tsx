import React from 'react';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';
import { formatPrice } from '../lib/utils';
import { useStore } from '../store/useStore';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist, isAuthenticated } = useStore();
  const navigate = useNavigate();
  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    addToCart({ productId: product.id, quantity: 1 });
  };

  const handleWishlist = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    toggleWishlist(product.id);
  };

  return (
    <div className="group relative rounded-lg border p-4 transition-all hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <button
          onClick={handleWishlist}
          className="absolute right-2 top-2 rounded-full bg-white p-2 shadow-md"
        >
          <Heart
            className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-500'}
            size={20}
          />
        </button>
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.description}</p>
        <p className="text-lg font-bold">{formatPrice(product.price)}</p>
        <Button
          onClick={handleAddToCart}
          className="w-full"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};