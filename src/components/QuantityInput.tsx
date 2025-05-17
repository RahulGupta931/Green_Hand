import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantityInputProps {
  quantity: number;
  maxQuantity?: number;
  onQuantityChange: (quantity: number) => void;
  small?: boolean;
}

const QuantityInput: React.FC<QuantityInputProps> = ({ 
  quantity, 
  maxQuantity = 99, 
  onQuantityChange,
  small = false
}) => {
  const decrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const increment = () => {
    if (!maxQuantity || quantity < maxQuantity) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= 1 && (!maxQuantity || newValue <= maxQuantity)) {
      onQuantityChange(newValue);
    }
  };

  const buttonClasses = `flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors ${
    small ? 'h-7 w-7 text-xs' : 'h-9 w-9'
  }`;

  return (
    <div className={`flex items-center border rounded-md overflow-hidden ${small ? 'h-7' : 'h-9'}`}>
      <button 
        type="button"
        className={buttonClasses}
        onClick={decrement}
        aria-label="Decrease quantity"
      >
        <Minus className={small ? "h-3.5 w-3.5" : "h-4 w-4"} />
      </button>
      
      <input
        type="text"
        value={quantity}
        onChange={handleChange}
        className={`h-full w-12 text-center text-gray-700 focus:outline-none ${small ? 'text-sm' : ''}`}
        aria-label="Quantity"
      />
      
      <button 
        type="button"
        className={buttonClasses}
        onClick={increment}
        aria-label="Increase quantity"
      >
        <Plus className={small ? "h-3.5 w-3.5" : "h-4 w-4"} />
      </button>
    </div>
  );
};

export default QuantityInput;