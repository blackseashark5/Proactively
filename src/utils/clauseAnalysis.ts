import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import natural from 'natural';
const { TfIdf } = natural;

export interface ClauseAnalysisResult {
  similarity: number;
  riskScore: number;
  suggestions: string[];
  duplicates: string[];
}

export class ClauseAnalyzer {
  private model: any;
  private tfidf: any;
  private standardClauses: Map<string, string[]>;

  constructor() {
    this.tfidf = new TfIdf();
    this.standardClauses = new Map([
      ['investment', [
        'Investment Amount',
        'Valuation',
        'Equity Percentage',
        'Payment Terms'
      ]],
      ['governance', [
        'Board Composition',
        'Voting Rights',
        'Veto Rights',
        'Information Rights'
      ]],
      ['exit', [
        'Exit Rights',
        'Tag Along',
        'Drag Along',
        'IPO Ratchet'
      ]]
    ]);
  }

  async initialize() {
    this.model = await use.load();
  }

  async analyzeClauses(clauses: string[]): Promise<ClauseAnalysisResult> {
    if (!this.model) {
      await this.initialize();
    }

    // Encode clauses using Universal Sentence Encoder
    const embeddings = await this.model.embed(clauses);
    const duplicates = await this.findDuplicates(embeddings, clauses);
    const riskScore = this.calculateRiskScore(clauses);
    const suggestions = this.generateSuggestions(clauses);

    return {
      similarity: await this.calculateSimilarity(embeddings),
      riskScore,
      suggestions,
      duplicates
    };
  }

  private async calculateSimilarity(embeddings: tf.Tensor): Promise<number> {
    const similarities = await tf.matMul(embeddings, embeddings.transpose()).array();
    let totalSimilarity = 0;
    let count = 0;

    for (let i = 0; i < similarities.length; i++) {
      for (let j = i + 1; j < similarities[i].length; j++) {
        totalSimilarity += similarities[i][j];
        count++;
      }
    }

    return count > 0 ? totalSimilarity / count : 0;
  }

  private async findDuplicates(embeddings: tf.Tensor, clauses: string[]): Promise<string[]> {
    const similarities = await tf.matMul(embeddings, embeddings.transpose()).array();
    const duplicates: string[] = [];
    const threshold = 0.95;

    for (let i = 0; i < similarities.length; i++) {
      for (let j = i + 1; j < similarities[i].length; j++) {
        if (similarities[i][j] > threshold) {
          duplicates.push(`Potential duplicate: "${clauses[i]}" and "${clauses[j]}"`);
        }
      }
    }

    return duplicates;
  }

  private calculateRiskScore(clauses: string[]): number {
    const riskTerms = [
      'unlimited liability',
      'no cap',
      'unrestricted',
      'perpetual',
      'irrevocable',
      'waiver of rights'
    ];

    let riskScore = 0;
    clauses.forEach(clause => {
      const lowerClause = clause.toLowerCase();
      riskTerms.forEach(term => {
        if (lowerClause.includes(term)) {
          riskScore += 0.1;
        }
      });
    });

    return Math.min(riskScore, 1);
  }

  private generateSuggestions(clauses: string[]): string[] {
    const suggestions: string[] = [];
    const presentClauses = new Set(clauses.map(c => c.toLowerCase()));

    // Check for missing standard clauses
    this.standardClauses.forEach((standardList, category) => {
      const missingClauses = standardList.filter(clause => 
        !Array.from(presentClauses).some(present => 
          present.includes(clause.toLowerCase())
        )
      );

      if (missingClauses.length > 0) {
        suggestions.push(
          `Consider adding standard ${category} clauses: ${missingClauses.join(', ')}`
        );
      }
    });

    return suggestions;
  }
}