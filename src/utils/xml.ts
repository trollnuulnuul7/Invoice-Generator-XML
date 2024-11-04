import type { Product } from '../types';

export const parseXML = async (xml: string): Promise<Product[]> => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'application/xml');

    const items = Array.from(xmlDoc.getElementsByTagName('item'));
    const products: Product[] = items.map((item) => {
      const id = item.getElementsByTagName('g:id')[0]?.textContent || '';
      const title = item.getElementsByTagName('g:title')[0]?.textContent || '';
      const description =
        item.getElementsByTagName('g:description')[0]?.textContent || '';

      // Извлечение и обработка цены
      const priceStr =
        item.getElementsByTagName('g:price')[0]?.textContent || '0';
      const price = parseFloat(priceStr.replace(/[^\d.]/g, '')); // Оставляем только числа и точку

      const brand = item.getElementsByTagName('g:brand')[0]?.textContent || '';
      const imageUrl =
        item.getElementsByTagName('g:image_link')[0]?.textContent || '';

      return { id, title, description, price, brand, imageUrl };
    });

    return products;
  } catch (error) {
    console.error('Error parsing XML:', error);
    throw new Error('Invalid XML structure');
  }
};
