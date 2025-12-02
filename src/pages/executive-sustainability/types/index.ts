export interface SustainabilityKPI {
  id: string;
  title: string;
  value: number;
  unit: string;
  change: number;
  target: number;
  status: 'on-track' | 'at-risk' | 'exceeded';
  icon: string;
  description: string;
}

export interface CarbonMetric {
  period: string;
  emissions: number;
  reduction: number;
  target: number;
}

export interface ComplianceItem {
  id: string;
  regulation: string;
  status: 'compliant' | 'pending' | 'non-compliant';
  deadline: Date;
  progress: number;
  description: string;
}

export interface BenchmarkData {
  category: string;
  departmental: number;
  regional: number;
  national: number;
  unit: string;
}

export interface SustainabilityMilestone {
  id: string;
  title: string;
  targetDate: Date;
  progress: number;
  status: 'completed' | 'in-progress' | 'delayed';
  description: string;
}

export interface ExecutiveTrendData {
  month: string;
  cost: number;
  consumption: number;
  carbonReduction: number;
}

export interface ReportPeriod {
  value: string;
  label: string;
  fiscalYear: string;
}