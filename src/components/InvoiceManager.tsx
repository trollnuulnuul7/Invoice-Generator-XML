import React, { useState } from 'react';
import type { Product } from '../types';
import { ProductSearch } from './ProductSearch';
import { InvoicePreview } from './InvoicePreview';

export function InvoiceManager() {
  const [invoice, setInvoice] = useState({
    number: '06156858',
    date: '04.11.2024',
    customer: { name: 'ТОО "Покупатель"', bin: '123456789012', address: 'г. Алматы, ул. Примерная, 12' },
    items: [],
    total: 0,
    vat: 0,
  });

  const handleProductSelect = (product: Product) => {
    setInvoice((prevInvoice) => {
      const updatedItems = [...prevInvoice.items, { ...product, quantity: 1 }];
      const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const vat = total * 0.12;
      return {
        ...prevInvoice,
        items: updatedItems,
        total: total,
        vat: vat,
      };
    });
  };

  // Standalone function to handle product removal.
  const handleProductRemove = (productId: string) => {
    console.log("Removing product with ID:", productId);
    setInvoice((prevInvoice) => {
      const updatedItems = prevInvoice.items.filter(item => item.id !== productId);
      const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const vat = total * 0.12;
      return {
        ...prevInvoice,
        items: updatedItems,
        total: total,
        vat: vat,
      };
    });
  };

  console.log("Passing handleProductRemove as a function:", typeof handleProductRemove === "function");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Счет на оплату</h1>
      <ProductSearch
        onProductSelect={handleProductSelect}
        onProductRemove={handleProductRemove} // Passing handleProductRemove as a prop
        products={[]} // Add available products here
      />
      <InvoicePreview invoice={invoice} />
    </div>
  );
}

export default InvoiceManager;