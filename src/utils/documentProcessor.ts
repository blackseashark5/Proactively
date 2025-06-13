import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import { createWorker } from 'tesseract.js';
import { TermSheetData } from '../types';

export class DocumentProcessor {
  private static tesseractWorker: Tesseract.Worker | null = null;

  static async initTesseract() {
    if (!this.tesseractWorker) {
      this.tesseractWorker = await createWorker();
      await this.tesseractWorker.loadLanguage('eng');
      await this.tesseractWorker.initialize('eng');
    }
    return this.tesseractWorker;
  }

  static async processPDF(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }

    return fullText;
  }

  static async processWord(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  }

  static async processImage(file: File): Promise<string> {
    const worker = await this.initTesseract();
    const imageUrl = URL.createObjectURL(file);
    const result = await worker.recognize(imageUrl);
    URL.revokeObjectURL(imageUrl);
    return result.data.text;
  }

  static async extractTermSheetData(text: string): Promise<TermSheetData> {
    // Regular expressions for extracting data
    const companyNameRegex = /(?:company|corporation|inc\.?):\s*([^\n]+)/i;
    const valuationRegex = /valuation:\s*[\$]?([\d,]+(?:\.\d+)?)\s*(?:million|m|billion|b)?/i;
    const investmentRegex = /investment(?:\s*amount)?:\s*[\$]?([\d,]+(?:\.\d+)?)\s*(?:million|m|billion|b)?/i;
    const equityRegex = /equity(?:\s*percentage)?:\s*([\d.]+)%/i;
    const investorsRegex = /investors?:\s*([^\n]+)/i;
    const dateRegex = /date:\s*(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/i;

    // Extract data using regex
    const companyName = text.match(companyNameRegex)?.[1]?.trim() || '';
    const valuationMatch = text.match(valuationRegex);
    const investmentMatch = text.match(investmentRegex);
    const equityMatch = text.match(equityRegex);
    const investorsMatch = text.match(investorsRegex);
    const dateMatch = text.match(dateRegex);

    // Process numeric values
    const processNumericValue = (match: RegExpMatchArray | null): number => {
      if (!match) return 0;
      const value = parseFloat(match[1].replace(/,/g, ''));
      const multiplier = match[0].toLowerCase().includes('billion') ? 1e9 :
                        match[0].toLowerCase().includes('million') ? 1e6 : 1;
      return value * multiplier;
    };

    // Extract terms (looking for bullet points or numbered lists)
    const termsRegex = /(?:terms|conditions|provisions):\s*((?:[\s\S](?!\n\s*(?:company|valuation|investment|equity|investors|date):))*)/i;
    const termsMatch = text.match(termsRegex);
    const terms = termsMatch ? 
      termsMatch[1]
        .split(/(?:\n\s*[-•*]|\n\s*\d+\.)\s*/)
        .filter(term => term.trim().length > 0)
        .map(term => term.trim()) : 
      [];

    return {
      companyName,
      valuation: processNumericValue(valuationMatch),
      investmentAmount: processNumericValue(investmentMatch),
      equityPercentage: equityMatch ? parseFloat(equityMatch[1]) : 0,
      investorNames: investorsMatch ? 
        investorsMatch[1].split(/,|\band\b/).map(investor => investor.trim()) : 
        [],
      terms,
      date: dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0]
    };
  }

  static async processDocument(file: File): Promise<TermSheetData> {
    let text = '';
    
    switch (file.type) {
      case 'application/pdf':
        text = await this.processPDF(file);
        break;
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        text = await this.processWord(file);
        break;
      case 'image/png':
      case 'image/jpeg':
      case 'image/jpg':
        text = await this.processImage(file);
        break;
      default:
        throw new Error('Unsupported file type');
    }

    return await this.extractTermSheetData(text);
  }
}