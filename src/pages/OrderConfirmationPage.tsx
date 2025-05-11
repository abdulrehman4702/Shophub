import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const OrderConfirmationPage: React.FC = () => {
  const orderNumber = Math.floor(Math.random() * 1000000);
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-8">
      <div className="text-center">
        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
        <h1 className="mb-2 text-3xl font-bold">Order Confirmed!</h1>
        <p className="mb-6 text-gray-600">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        
        <div className="mb-8 rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Order Details</h2>
          <div className="space-y-2 text-left">
            <p>
              <span className="font-medium">Order Number:</span> #{orderNumber}
            </p>
            <p>
              <span className="font-medium">Estimated Delivery:</span>{' '}
              {estimatedDelivery.toLocaleDateString()}
            </p>
          </div>
        </div>

        <Link to="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
};