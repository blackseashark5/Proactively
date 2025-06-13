interface BenchmarkMetrics {
  industryAvgValuation: number;
  industryAvgEquity: number;
  commonClauses: string[];
  riskProfile: {
    score: number;
    factors: string[];
  };
}

export class TermSheetBenchmark {
  private historicalData: any[];

  constructor(historicalData: any[]) {
    this.historicalData = historicalData;
  }

  analyzeDeal(termSheet: any): BenchmarkMetrics {
    const similarDeals = this.findSimilarDeals(termSheet);
    
    return {
      industryAvgValuation: this.calculateAverageValuation(similarDeals),
      industryAvgEquity: this.calculateAverageEquity(similarDeals),
      commonClauses: this.identifyCommonClauses(similarDeals),
      riskProfile: this.assessRiskProfile(termSheet, similarDeals)
    };
  }

  private findSimilarDeals(termSheet: any): any[] {
    // Filter historical deals based on industry, size, and timeframe
    return this.historicalData.filter(deal => {
      const valuationDiff = Math.abs(deal.valuation - termSheet.valuation) / termSheet.valuation;
      const sameIndustry = deal.industry === termSheet.industry;
      const recentDeal = new Date(deal.date) > new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
      
      return valuationDiff < 0.3 && sameIndustry && recentDeal;
    });
  }

  private calculateAverageValuation(deals: any[]): number {
    if (deals.length === 0) return 0;
    return deals.reduce((sum, deal) => sum + deal.valuation, 0) / deals.length;
  }

  private calculateAverageEquity(deals: any[]): number {
    if (deals.length === 0) return 0;
    return deals.reduce((sum, deal) => sum + deal.equityPercentage, 0) / deals.length;
  }

  private identifyCommonClauses(deals: any[]): string[] {
    const clauseFrequency = new Map<string, number>();
    
    deals.forEach(deal => {
      deal.terms.forEach((term: string) => {
        clauseFrequency.set(term, (clauseFrequency.get(term) || 0) + 1);
      });
    });

    return Array.from(clauseFrequency.entries())
      .filter(([_, frequency]) => frequency > deals.length * 0.5)
      .map(([clause]) => clause);
  }

  private assessRiskProfile(termSheet: any, similarDeals: any[]): { score: number; factors: string[] } {
    const factors: string[] = [];
    let riskScore = 0;

    // Valuation analysis
    const avgValuation = this.calculateAverageValuation(similarDeals);
    if (termSheet.valuation > avgValuation * 1.5) {
      factors.push('Valuation significantly above market average');
      riskScore += 0.2;
    }

    // Equity analysis
    const avgEquity = this.calculateAverageEquity(similarDeals);
    if (termSheet.equityPercentage < avgEquity * 0.7) {
      factors.push('Equity percentage below market average');
      riskScore += 0.15;
    }

    // Terms analysis
    const commonClauses = this.identifyCommonClauses(similarDeals);
    const missingClauses = commonClauses.filter(
      clause => !termSheet.terms.includes(clause)
    );
    
    if (missingClauses.length > 0) {
      factors.push(`Missing common clauses: ${missingClauses.join(', ')}`);
      riskScore += 0.1 * missingClauses.length;
    }

    return {
      score: Math.min(riskScore, 1),
      factors
    };
  }
}