import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Sun, Moon, Heart, Search, LogIn, UserPlus } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from './ui/Button';

export const Header: React.FC = () => {
  const { darkMode, toggleDarkMode, cart, isAuthenticated, setIsAuthenticated } = useStore();
  const navigate = useNavigate();
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm dark:bg-gray-900">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="text-2xl font-bold">
          ShopHub
        </Link>

        <div className="flex flex-1 items-center justify-center px-8">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-full border px-4 py-2 pl-10 focus:border-blue-500 focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={toggleDarkMode}>
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          
          <Link to="/wishlist">
            <Button variant="secondary" size="sm">
              <Heart size={20} />
            </Button>
          </Link>

          <Link to="/cart" className="relative">
            <Button variant="secondary" size="sm">
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </Link>

          {isAuthenticated ? (
            <Button onClick={handleLogout} variant="outline" size="sm">
              Logout
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="secondary" size="sm" className="flex items-center space-x-1">
                  <LogIn size={18} />
                  <span>Login</span>
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="sm" className="flex items-center space-x-1">
                  <UserPlus size={18} />
                  <span>Sign Up</span>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};