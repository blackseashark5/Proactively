import React, { useState, useEffect } from 'react';
import { ClauseAnalyzer, ClauseAnalysisResult } from '../utils/clauseAnalysis';
import { DocumentSecurity } from '../utils/documentSecurity';
import { TermSheetBenchmark } from '../utils/benchmarking';
import { AlertTriangle, CheckCircle, Activity, Lock } from 'lucide-react';

interface AdvancedAnalysisProps {
  termSheetData: any;
  onAnalysisComplete: (result: any) => void;
}

export const AdvancedAnalysis: React.FC<AdvancedAnalysisProps> = ({
  termSheetData,
  onAnalysisComplete
}) => {
  const [loading, setLoading] = useState(true);
  const [analysisResults, setAnalysisResults] = useState<{
    clauseAnalysis?: ClauseAnalysisResult;
    documentIntegrity?: boolean;
    benchmarkData?: any;
  }>({});

  useEffect(() => {
    performAnalysis();
  }, [termSheetData]);

  const performAnalysis = async () => {
    setLoading(true);
    try {
      // Initialize analyzers
      const clauseAnalyzer = new ClauseAnalyzer();
      const benchmark = new TermSheetBenchmark([/* historical data would go here */]);

      // Perform various analyses
      const [clauseAnalysis, documentIntegrity, benchmarkData] = await Promise.all([
        clauseAnalyzer.analyzeClauses(termSheetData.terms),
        DocumentSecurity.detectModifications(
          termSheetData.originalHash,
          JSON.stringify(termSheetData)
        ),
        benchmark.analyzeDeal(termSheetData)
      ]);

      const results = {
        clauseAnalysis,
        documentIntegrity,
        benchmarkData
      };

      setAnalysisResults(results);
      onAnalysisComplete(results);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">Analyzing term sheet...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Clause Analysis Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
          <Activity className="w-5 h-5 mr-2 text-blue-500" />
          Clause Analysis
        </h3>
        
        <div className="mt-4 space-y-4">
          {analysisResults.clauseAnalysis?.duplicates.map((duplicate, index) => (
            <div key={index} className="flex items-start space-x-3 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-5 h-5 mt-0.5" />
              <p>{duplicate}</p>
            </div>
          ))}

          {analysisResults.clauseAnalysis?.suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start space-x-3 text-blue-600 dark:text-blue-400">
              <CheckCircle className="w-5 h-5 mt-0.5" />
              <p>{suggestion}</p>
            </div>
          ))}

          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Risk Score</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {(analysisResults.clauseAnalysis?.riskScore || 0) * 100}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Document Security Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
          <Lock className="w-5 h-5 mr-2 text-green-500" />
          Document Security
        </h3>
        
        <div className="mt-4">
          <div className="flex items-center space-x-3">
            {analysisResults.documentIntegrity ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-500" />
            )}
            <span className="text-gray-700 dark:text-gray-300">
              {analysisResults.documentIntegrity
                ? 'Document integrity verified'
                : 'Document has been modified'}
            </span>
          </div>
        </div>
      </div>

      {/* Benchmarking Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
          <Activity className="w-5 h-5 mr-2 text-purple-500" />
          Market Comparison
        </h3>
        
        <div className="mt-4 space-y-4">
          {analysisResults.benchmarkData?.riskProfile.factors.map((factor: string, index: number) => (
            <div key={index} className="flex items-start space-x-3 text-gray-700 dark:text-gray-300">
              <AlertTriangle className="w-5 h-5 mt-0.5 text-amber-500" />
              <p>{factor}</p>
            </div>
          ))}

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Industry Avg. Valuation</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                ${analysisResults.benchmarkData?.industryAvgValuation.toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Industry Avg. Equity</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {analysisResults.benchmarkData?.industryAvgEquity.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};