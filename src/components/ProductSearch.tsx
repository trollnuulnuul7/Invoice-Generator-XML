import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import type { Product } from '../types';
import { useDebounce } from '../hooks/useDebounce';
import { InvoiceItemList } from './InvoiceItemList';

interface ProductSearchProps {
  onProductSelect: (product: Product) => void;
  onProductRemove: (productId: string) => void;
  products: Product[];
  isLoading?: boolean;
}

export function ProductSearch({ onProductSelect, onProductRemove, products, isLoading = false }: ProductSearchProps) {
  console.log("Received onProductRemove in ProductSearch:", onProductRemove); // Debugging log

  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);

  const debouncedSearch = useDebounce(search, 300);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    if (value.length > 2) {
      const filtered = products.filter(
        product =>
          product.id.toLowerCase().includes(value.toLowerCase()) ||
          product.title.toLowerCase().includes(value.toLowerCase()) ||
          product.brand.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered.slice(0, 10));
    } else {
      setResults([]);
    }
  }, [products]);

  React.useEffect(() => {
    handleSearch(debouncedSearch);
  }, [debouncedSearch, handleSearch]);

  const handleProductSelect = (product: Product) => {
    setSelectedItems((prevItems) => [...prevItems, product]);
    setSearch('');
    setResults([]);
    onProductSelect(product);
  };

  const handleRemoveItem = (productId: string) => {
    console.log("Calling onProductRemove from ProductSearch with productId:", productId); // Debugging log
    setSelectedItems((prevItems) => prevItems.filter(item => item.id !== productId));
    onProductRemove(productId); // Ensure product removal is passed up correctly
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Введите артикул или название товара"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-transparent"
          disabled={isLoading}
        />
        <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
      </div>
      
      {results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-auto">
          {results.map((product) => (
            <button
              key={product.id}
              onClick={() => handleProductSelect(product)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-4 border-b border-gray-100"
            >
              <img 
                src={product.imageUrl} 
                alt={product.title} 
                className="w-12 h-12 object-cover rounded"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=360';
                }}
              />
              <div>
                <p className="font-medium">{product.title}</p>
                <p className="text-sm text-gray-600">Артикул: {product.id}</p>
                <p className="text-sm font-medium">{product.price.toLocaleString('ru-RU')} ₸</p>
              </div>
            </button>
          ))}
        </div>
      )}

      <div className="mt-4">
        <InvoiceItemList items={selectedItems} onRemove={handleRemoveItem} />
      </div>
    </div>
  );
}
