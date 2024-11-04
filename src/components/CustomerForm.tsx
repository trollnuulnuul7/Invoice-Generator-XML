import React from 'react';
import type { Customer } from '../types';

interface CustomerFormProps {
  customer: Customer;
  onChange: (customer: Customer) => void;
}

export function CustomerForm({ customer, onChange }: CustomerFormProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium mb-4">Данные получателя</h2>
      <div className="grid gap-4">
        <div>
          <label
            htmlFor="customerName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Наименование организации
          </label>
          <input
            type="text"
            id="customerName"
            value={customer.name}
            onChange={(e) => onChange({ ...customer, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-transparent"
          />
        </div>
        <div>
          <label
            htmlFor="customerBin"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            БИН
          </label>
          <input
            type="text"
            id="customerBin"
            value={customer.bin}
            onChange={(e) => onChange({ ...customer, bin: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-transparent"
          />
        </div>
        <div>
          <label
            htmlFor="customerAddress"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Адрес
          </label>
          <input
            type="text"
            id="customerAddress"
            value={customer.address}
            onChange={(e) => onChange({ ...customer, address: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}
