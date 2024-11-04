import React from 'react';
import type { Invoice } from '../types';
import { FileDown } from 'lucide-react';
import { usePDF } from '../hooks/usePDF';

interface InvoicePreviewProps {
  invoice: Invoice;
}

export function InvoicePreview({ invoice }: InvoicePreviewProps) {
  const { toPDF, targetRef } = usePDF({
    filename: `Счет-${invoice.number}.pdf`,
    scale: 2,
  });

  return (
    <div className="bg-white shadow-lg">
      <div className="p-4 border-b border-gray-300">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">СЧЕТ НА ОПЛАТУ</h2>
            <p className="text-sm text-gray-600">
              № {invoice.number} от {invoice.date}
            </p>
          </div>
          <button
            onClick={toPDF}
            className="flex items-center gap-2 px-3 py-1.5 bg-black text-white rounded hover:bg-gray-800"
          >
            <FileDown size={16} />
            Скачать PDF
          </button>
        </div>
      </div>

      <div
        ref={targetRef}
        className="w-[210mm] mx-auto p-8 bg-white min-h-[297mm] shadow"
        style={{ pageBreakAfter: 'always' }}
      >
        <div className="space-y-4">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold">
              Счет на оплату № {invoice.number} от {invoice.date}
            </h2>
          </div>

          <div className="flex justify-between items-start border-b border-gray-300 pb-4 mt-4">
            <div className="w-full">
              <h3 className="font-semibold text-sm text-gray-700 mb-2">
                Поставщик:
              </h3>
              <div className="text-xs space-y-1 leading-tight">
                <p>
                  Товарищество с ограниченной ответственностью "ASBC KAZAKHSTAN"
                </p>
                <p>БИН: 180440011718</p>
                <p>
                  Адрес: Республика Казахстан, город Алматы, Бостандыкский
                  район, улица Хусаинова, дом 281
                </p>
                <p>ИИК: KZ166018771000135511</p>
                <p>БИК: HSBKKZKX</p>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-300 pb-4 mt-4">
            <h3 className="font-semibold text-sm text-gray-700 mb-2">
              Покупатель:
            </h3>
            <div className="text-xs space-y-1 leading-tight text-red-600">
              <p>{invoice.customer.name}</p>
              <p>БИН: {invoice.customer.bin}</p>
              <p>Адрес: {invoice.customer.address}</p>
            </div>
          </div>
        </div>

        <table className="w-full text-xs mt-6 border-t border-gray-300">
          <thead>
            <tr className="border-b border-black">
              <th className="py-2 text-left">№</th>
              <th className="py-2 text-left">Артикул</th>
              <th className="py-2 text-left">
                Наименование товаров (работ, услуг)
              </th>
              <th className="py-2 text-right">Кол-во</th>
              <th className="py-2 text-right">Ед.</th>
              <th className="py-2 text-right">Цена</th>
              <th className="py-2 text-right">Сумма</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-1">{index + 1}</td>
                <td className="py-1">{item.article}</td>
                <td className="py-1">{item.name}</td>
                <td className="py-1 text-right">{item.quantity}</td>
                <td className="py-1 text-right">шт</td>
                <td className="py-1 text-right">
                  {Math.round(item.price).toLocaleString('ru-RU')} ₸
                </td>
                <td className="py-1 text-right">
                  {Math.round(item.total).toLocaleString('ru-RU')} ₸
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t">
              <td colSpan={6} className="py-2 text-right font-semibold">
                Итого:
              </td>
              <td className="py-2 text-right font-semibold">
                {Math.round(invoice.total).toLocaleString('ru-RU')} ₸
              </td>
            </tr>
            <tr>
              <td colSpan={6} className="py-2 text-right font-semibold">
                Итого (в т.ч. НДС 12%):
              </td>
              <td className="py-2 text-right font-semibold">
                {Math.round(invoice.vat).toLocaleString('ru-RU')} ₸
              </td>
            </tr>
          </tfoot>
        </table>

        <div className="pt-8 space-y-6">
          <div className="flex justify-between items-center">
            <p className="font-medium text-xs">Исполнитель</p>
            <div className="w-48 border-b border-gray-400">
              <p className="text-xs text-center pt-1"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
