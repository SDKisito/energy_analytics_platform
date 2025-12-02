export interface EnergyKPI {
  id: string;
  label: string;
  value: string;
  unit: string;
  change: number;
  changeLabel: string;
  trend: 'up' | 'down' | 'neutral';
  sparklineData: number[];
  threshold: {
    warning: number;
    critical: number;
  };
  icon: string;
  color: string;
}

export interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  location: string;
  timestamp: Date;
  acknowledged: boolean;
  impact: string;
}

export interface ConsumptionDataPoint {
  timestamp: string;
  value: number;
  facility: string;
  meterType: string;
}

export interface SiteHeatmapData {
  id: string;
  name: string;
  consumption: number;
  intensity: number;
  area: number;
  location: {
    lat: number;
    lng: number;
  };
  status: 'normal' | 'warning' | 'critical';
}

export interface TimeRange {
  value: string;
  label: string;
}

export interface ExportOptions {
  format: 'pdf' | 'csv' | 'excel';
  dateRange: {
    start: Date;
    end: Date;
  };
  includeCharts: boolean;
  includeAlerts: boolean;
}

export interface WebSocketStatus {
  connected: boolean;
  lastUpdate: Date;
  dataQuality: 'excellent' | 'good' | 'poor';
  latency: number;
}