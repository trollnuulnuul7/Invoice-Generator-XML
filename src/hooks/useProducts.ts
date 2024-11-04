import { useState, useEffect } from 'react';
import { parseXML } from '../utils/xml';
import { sampleProducts } from '../utils/data';
import type { Product } from '../types';

const FEED_URL = 'https://cdn0.it4profit.com/s3/cms/feeds/google_55_128_ru.xml';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      try {
        const response = await fetch(FEED_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const xml = await response.text();
        const products = await parseXML(xml);
        
        if (mounted) {
          setProducts(products);
          setError(null);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        if (mounted) {
          setProducts(sampleProducts);
          setError(error instanceof Error ? error : new Error('Failed to fetch products'));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, []);

  return { products, loading, error };
}