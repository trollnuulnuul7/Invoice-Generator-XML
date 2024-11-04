import React, { useState } from 'react';
import { ProductSearch } from './components/ProductSearch';
import { InvoicePreview } from './components/InvoicePreview';
import { CustomerForm } from './components/CustomerForm';
import type { Invoice, InvoiceItem, Customer } from './types';
import { useProducts } from './hooks/useProducts';
import { Speaker, Loader2 } from 'lucide-react';

function App() {
  const { products, loading, error } = useProducts();
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    bin: ''
  });
  
  const invoice: Invoice = {
    number: new Date().getTime().toString().slice(-8),
    date: new Date().toLocaleDateString('ru-RU'),
    items,
    total: items.reduce((sum, item) => sum + item.total, 0),
    vat: items.reduce((sum, item) => sum + item.total, 0) * 0.12,
    company: {
      name: 'ТОО "ASBC KAZAKHSTAN"',
      bin: '180440011718',
      bank: 'АО "Народный Банк Казахстана" г. г. Алматы',
      account: 'KZ166018771000135511',
      bic: 'HSBKKZKX'
    },
    customer
  };

  const handleProductSelect = (product: Product) => {
    const existingItem = items.find(item => item.article === product.id);
    
    if (existingItem) {
      setItems(items.map(item =>
        item.article === product.id
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
          : item
      ));
    } else {
      setItems([...items, {
        article: product.id,
        name: product.title,
        quantity: 1,
        price: product.price,
        total: product.price
      }]);
    }
  };
  const handleProductRemove = (productId: string) => {
    const index = items.findIndex(item => item.article === productId);

    if (index !== -1) {
        // Создаем новый массив с удалением первого найденного элемента
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    }
};

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-black text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <Speaker size={32} />
            <div>
              <h1 className="text-3xl font-light tracking-wider">
                BANG & OLUFSEN
              </h1>
              <p className="text-gray-400 mt-1">Генератор счетов</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <CustomerForm customer={customer} onChange={setCustomer} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-medium mb-4">Добавить товар</h2>
              {error && (
                <div className="mb-4 p-4 bg-yellow-50 text-yellow-800 rounded-lg">
                  Используются тестовые данные из-за ошибки загрузки XML-фида
                </div>
              )}
              <ProductSearch
                products={products}
                onProductSelect={handleProductSelect}
                onProductRemove={handleProductRemove}
                isLoading={loading}
              />
            </div>
            {items.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-medium mb-4">Товары в счете</h2>
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-4">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Артикул: {item.article}</p>
                      </div>
                      <div className="text-right">
                        <p>{item.quantity} шт × {item.price.toLocaleString('ru-RU')} ₸</p>
                        <p className="font-medium">{item.total.toLocaleString('ru-RU')} ₸</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-8">
            <InvoicePreview invoice={invoice} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;