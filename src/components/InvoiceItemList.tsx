import React from 'react';
import type { Product } from '../types';

interface InvoiceItemListProps {
  items: Product[];
  onRemove: (productId: string) => void;
}

export function InvoiceItemList({ items, onRemove }: InvoiceItemListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg">
          <img 
            src={item.imageUrl} 
            alt={item.title} 
            className="w-16 h-16 object-cover rounded"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=360';
            }}
          />
          <div className="flex-1">
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-gray-600">Артикул: {item.id}</p>
            <p className="text-sm font-medium">{item.price.toLocaleString('ru-RU')} ₸</p>
          </div>
          <button
            onClick={() => {
              console.log("Removing item in InvoiceItemList with ID:", item.id); // Debugging log
              onRemove(item.id);
            }}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Удалить
          </button>
        </div>
      ))}
    </div>
  );
}
