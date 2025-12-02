export interface ForecastDataPoint {
  timestamp: Date;
  actual: number | null;
  predicted: number;
  lowerBound: number;
  upperBound: number;
  confidence: number;
}

export interface ModelMetrics {
  mape: number;
  rmse: number;
  accuracy: number;
  lastTraining: Date;
  dataPoints: number;
}

export interface RiskPeriod {
  id: string;
  startDate: Date;
  endDate: Date;
  severity: 'critical' | 'warning' | 'info';
  predictedConsumption: number;
  threshold: number;
  exceedancePercentage: number;
  description: string;
}

export interface ScenarioParameter {
  id: string;
  name: string;
  currentValue: number;
  adjustedValue: number;
  unit: string;
  impact: number;
}

export interface ForecastHorizon {
  value: string;
  label: string;
  days: number;
}

export interface FacilityForecast {
  facilityId: string;
  facilityName: string;
  currentConsumption: number;
  predictedConsumption: number;
  variance: number;
  confidence: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface AnomalyDetection {
  id: string;
  timestamp: Date;
  meterId: string;
  meterName: string;
  actualValue: number;
  expectedValue: number;
  deviation: number;
  severity: 'high' | 'medium' | 'low';
  description: string;
}

export interface ExportOptions {
  format: 'html' | 'pdf';
  includeCharts: boolean;
  includeMetrics: boolean;
  includeRiskAnalysis: boolean;
  dateRange: {
    start: Date;
    end: Date;
  };
}