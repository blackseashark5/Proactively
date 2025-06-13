import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  Upload, AlertTriangle, FileText, Download, 
  RefreshCw, CheckCircle, Info
} from 'lucide-react';
import { ProcessingStatus } from './ProcessingStatus';
import { ResultsDisplay } from './ResultsDisplay';
import { ProcessedData, ValidationError } from '../types';
import { DocumentProcessor } from '../utils/documentProcessor';
import { DocumentGenerator } from '../utils/documentGenerator';
import { validateTermSheetData } from '../utils/validation';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const { user } = useAuth();
  const [processing, setProcessing] = useState(false);
  const [currentFile, setCurrentFile] = useState('');
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ProcessedData | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const processFile = async (file: File) => {
    try {
      setError(null);
      setProcessing(true);
      setProgress(10);
      
      const data = await DocumentProcessor.processDocument(file);
      setProgress(70);
      
      const errors = validateTermSheetData(data);
      setValidationErrors(errors);

      const results: ProcessedData = {
        data,
        confidence: calculateConfidence(data),
        source: file.name,
        timestamp: new Date().toISOString()
      };

      setProgress(100);
      setResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process document');
      setProgress(0);
    } finally {
      setProcessing(false);
    }
  };

  const calculateConfidence = (data: any): number => {
    let score = 0;
    let fields = 0;

    if (data.companyName) { score++; fields++; }
    if (data.valuation > 0) { score++; fields++; }
    if (data.investmentAmount > 0) { score++; fields++; }
    if (data.equityPercentage > 0 && data.equityPercentage <= 100) { score++; fields++; }
    if (data.investorNames.length > 0) { score++; fields++; }
    if (data.terms.length > 0) { score++; fields++; }
    if (data.date) { score++; fields++; }

    return fields > 0 ? score / fields : 0;
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setCurrentFile(file.name);
      await processFile(file);
    }
  }, []);

  const saveToDatabase = async () => {
    if (!results || !user) return;

    setIsSaving(true);
    try {
      const { error: dbError } = await supabase.from('term_sheets').insert({
        company_name: results.data.companyName,
        valuation: results.data.valuation,
        investment_amount: results.data.investmentAmount,
        equity_percentage: results.data.equityPercentage,
        investor_names: results.data.investorNames,
        terms: results.data.terms,
        date: results.data.date,
        confidence_score: results.confidence,
        source_file: results.source,
        user_id: user.id
      });

      if (dbError) throw dbError;
      
      setError(null);
      // Show success message
      const successMessage = document.getElementById('success-toast');
      if (successMessage) {
        successMessage.classList.remove('hidden');
        setTimeout(() => successMessage.classList.add('hidden'), 3000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save term sheet');
    } finally {
      setIsSaving(false);
    }
  };

  const generateSampleDocument = async () => {
    try {
      setError(null);
      const sampleFile = DocumentGenerator.generateSampleTermSheet();
      await processFile(sampleFile);
    } catch (err) {
      setError('Failed to generate sample document');
    }
  };

  const resetForm = () => {
    setResults(null);
    setValidationErrors([]);
    setError(null);
    setProgress(0);
    setCurrentFile('');
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    multiple: false
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Upload Term Sheet
          </h1>
          <button
            onClick={() => setShowTutorial(!showTutorial)}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            title="Show Tutorial"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={resetForm}
            className="flex items-center px-4 py-2 text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Reset
          </button>
          <button
            onClick={generateSampleDocument}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FileText className="w-5 h-5 mr-2" />
            Generate Sample
          </button>
        </div>
      </div>

      {showTutorial && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            How to Use
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800 dark:text-blue-200">
            <li>Upload a term sheet document (PDF, Word, or Image)</li>
            <li>Our AI will automatically extract key information</li>
            <li>Review the extracted data and validation results</li>
            <li>Save the processed term sheet to your database</li>
          </ol>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        </div>
      )}

      <div
        {...getRootProps()}
        className={`
          dropzone relative
          ${isDragActive ? 'dropzone-active' : ''}
          ${processing ? 'pointer-events-none opacity-50' : ''}
        `}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {isDragActive
            ? 'Drop the files here...'
            : 'Drag & drop files here, or click to select files'}
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Supported formats: PDF, Word, Images (PNG, JPG)
        </p>
      </div>

      {processing && (
        <ProcessingStatus
          currentFile={currentFile}
          progress={progress}
          status={`Processing ${currentFile}...`}
        />
      )}

      {results && (
        <ResultsDisplay
          results={results}
          validationErrors={validationErrors}
          onSave={saveToDatabase}
          isSaving={isSaving}
        />
      )}

      {/* Success Toast */}
      <div
        id="success-toast"
        className="hidden fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center"
      >
        <CheckCircle className="w-5 h-5 mr-2" />
        Term sheet saved successfully!
      </div>
    </div>
  );
};