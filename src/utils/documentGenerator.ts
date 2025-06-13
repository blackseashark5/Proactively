import { jsPDF } from 'jspdf';
import { format } from 'date-fns';

export class DocumentGenerator {
  static generateSampleTermSheet(): File {
    const doc = new jsPDF();
    const today = format(new Date(), 'MM/dd/yyyy');

    // Set font styles
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('TERM SHEET', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.text('CONFIDENTIAL', 105, 30, { align: 'center' });
    doc.setFont('helvetica', 'normal');

    // Company Information
    doc.setFont('helvetica', 'bold');
    doc.text('Company:', 20, 50);
    doc.setFont('helvetica', 'normal');
    doc.text('TechStart Innovations, Inc.', 60, 50);

    // Date
    doc.setFont('helvetica', 'bold');
    doc.text('Date:', 20, 60);
    doc.setFont('helvetica', 'normal');
    doc.text(today, 60, 60);

    // Investment Terms
    doc.setFont('helvetica', 'bold');
    doc.text('Investment Terms:', 20, 80);
    doc.setFont('helvetica', 'normal');
    doc.text('Valuation: $10,000,000', 30, 90);
    doc.text('Investment Amount: $2,000,000', 30, 100);
    doc.text('Equity Percentage: 20%', 30, 110);

    // Investors
    doc.setFont('helvetica', 'bold');
    doc.text('Investors:', 20, 130);
    doc.setFont('helvetica', 'normal');
    doc.text('1. Alpha Ventures', 30, 140);
    doc.text('2. Beta Capital Partners', 30, 150);
    doc.text('3. Individual Investor: John Smith', 30, 160);

    // Key Terms
    doc.setFont('helvetica', 'bold');
    doc.text('Key Terms:', 20, 180);
    doc.setFont('helvetica', 'normal');
    doc.text('1. Board Seat: One board seat for lead investor', 30, 190);
    doc.text('2. Pro-rata Rights: Investors maintain ownership %', 30, 200);
    doc.text('3. Vesting: 4-year vesting with 1-year cliff', 30, 210);
    doc.text('4. Information Rights: Quarterly financial reports', 30, 220);
    doc.text('5. Right of First Refusal on future rounds', 30, 230);

    // Footer
    doc.setFontSize(10);
    doc.text('This term sheet is non-binding and for discussion purposes only.', 105, 270, { align: 'center' });

    // Convert to blob and create File object
    const pdfBlob = doc.output('blob');
    return new File([pdfBlob], 'sample_term_sheet.pdf', { type: 'application/pdf' });
  }
}