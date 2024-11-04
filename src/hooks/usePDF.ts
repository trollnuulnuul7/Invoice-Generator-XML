import { useCallback, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface UsePDFOptions {
  filename?: string;
  scale?: number;
}

export function usePDF({ filename = 'document.pdf', scale = 2 }: UsePDFOptions = {}) {
  const targetRef = useRef<HTMLDivElement>(null);

  const toPDF = useCallback(async () => {
    if (!targetRef.current) return;

    const canvas = await html2canvas(targetRef.current, {
      scale,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(filename);
  }, [filename, scale]);

  return { toPDF, targetRef };
}