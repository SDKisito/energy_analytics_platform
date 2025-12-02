export interface FacilityMetadata {
  id: string;
  name: string;
  type: string;
  address: string;
  squareFootage: number;
  occupancy: number;
  maxOccupancy: number;
  operationalStatus: 'operational' | 'maintenance' | 'offline';
  buildingManager: string;
  contactPhone: string;
  lastInspection: Date;
}

export interface ConsumptionMetrics {
  current: number;
  average: number;
  peak: number;
  efficiency: number;
  costPerSqm: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  comparisonPeriod: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: 'hvac' | 'lighting' | 'electrical' | 'water' | 'other';
  status: 'operational' | 'warning' | 'critical' | 'offline';
  consumption: number;
  efficiency: number;
  lastMaintenance: Date;
  nextMaintenance: Date;
  sensorCount: number;
  alerts: number;
}

export interface SensorReading {
  id: string;
  equipmentId: string;
  name: string;
  type: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  lastUpdate: Date;
  connectivity: 'connected' | 'disconnected';
  dataQuality: number;
}

export interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  category: 'threshold' | 'maintenance' | 'data-quality' | 'equipment';
  equipmentId: string;
  equipmentName: string;
  message: string;
  timestamp: Date;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
}

export interface MaintenanceSchedule {
  id: string;
  equipmentId: string;
  equipmentName: string;
  type: 'preventive' | 'corrective' | 'inspection';
  scheduledDate: Date;
  duration: number;
  technician: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  notes: string;
}

export interface HourlyConsumption {
  timestamp: Date;
  consumption: number;
  cost: number;
  temperature: number;
  occupancy: number;
}

export interface ComparisonPeriod {
  label: string;
  startDate: Date;
  endDate: Date;
  totalConsumption: number;
  averageDaily: number;
  peakHour: string;
  costTotal: number;
}

export type TabView = 'consumption' | 'equipment' | 'sensors' | 'maintenance';

export type EquipmentCategory = 'all' | 'hvac' | 'lighting' | 'electrical' | 'water' | 'other';

export type MaintenanceFilter = 'all' | 'scheduled' | 'in-progress' | 'overdue';

export type AlertFilter = 'all' | 'critical' | 'warning' | 'info' | 'unacknowledged';