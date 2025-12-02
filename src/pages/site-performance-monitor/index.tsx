import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import GlobalContextBar from '../../components/ui/GlobalContextBar';
import AlertNotificationBadge from '../../components/ui/AlertNotificationBadge';
import ConnectionStatusIndicator from '../../components/ui/ConnectionStatusIndicator';
import FacilityOverviewCard from './components/FacilityOverviewCard';
import ConsumptionGauge from './components/ConsumptionGauge';
import EquipmentPerformanceMatrix from './components/EquipmentPerformanceMatrix';
import SensorHealthStatus from './components/SensorHealthStatus';
import AlertManagementPanel from './components/AlertManagementPanel';
import MaintenanceScheduleView from './components/MaintenanceScheduleView';
import HourlyConsumptionChart from './components/HourlyConsumptionChart';
import type {
  FacilityMetadata,
  ConsumptionMetrics,
  EquipmentItem,
  SensorReading,
  Alert,
  MaintenanceSchedule,
  HourlyConsumption,
  TabView,
} from './types';

const SitePerformanceMonitor = () => {
  const [activeTab, setActiveTab] = useState<TabView>('consumption');
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(
    null
  );

  const facilityData: FacilityMetadata = {
    id: 'city-hall-001',
    name: 'Hôtel de Ville',
    type: 'Bâtiment administratif',
    address: '1 Place de la Liberté, 83000 Toulon',
    squareFootage: 8500,
    occupancy: 245,
    maxOccupancy: 350,
    operationalStatus: 'operational',
    buildingManager: 'Marie Dubois',
    contactPhone: '+33 4 94 36 30 00',
    lastInspection: new Date('2024-01-15'),
  };

  const consumptionMetrics: ConsumptionMetrics = {
    current: 156.8,
    average: 142.3,
    peak: 198.5,
    efficiency: 87,
    costPerSqm: 0.18,
    trend: 'stable',
    comparisonPeriod: 'Dernières 24h',
  };

  const equipmentData: EquipmentItem[] = [
    {
      id: 'hvac-001',
      name: 'Système CVC Principal',
      category: 'hvac',
      status: 'operational',
      consumption: 45.2,
      efficiency: 92,
      lastMaintenance: new Date('2024-01-10'),
      nextMaintenance: new Date('2024-04-10'),
      sensorCount: 12,
      alerts: 0,
    },
    {
      id: 'lighting-001',
      name: 'Éclairage Bureaux Étage 1',
      category: 'lighting',
      status: 'operational',
      consumption: 18.5,
      efficiency: 88,
      lastMaintenance: new Date('2023-12-15'),
      nextMaintenance: new Date('2024-06-15'),
      sensorCount: 8,
      alerts: 0,
    },
    {
      id: 'hvac-002',
      name: 'Climatisation Salle Conseil',
      category: 'hvac',
      status: 'warning',
      consumption: 32.1,
      efficiency: 68,
      lastMaintenance: new Date('2023-11-20'),
      nextMaintenance: new Date('2024-02-20'),
      sensorCount: 6,
      alerts: 2,
    },
    {
      id: 'electrical-001',
      name: 'Tableau Électrique Principal',
      category: 'electrical',
      status: 'operational',
      consumption: 28.7,
      efficiency: 95,
      lastMaintenance: new Date('2024-01-05'),
      nextMaintenance: new Date('2024-07-05'),
      sensorCount: 15,
      alerts: 0,
    },
    {
      id: 'water-001',
      name: 'Système de Chauffage Eau',
      category: 'water',
      status: 'critical',
      consumption: 52.3,
      efficiency: 55,
      lastMaintenance: new Date('2023-10-15'),
      nextMaintenance: new Date('2024-01-15'),
      sensorCount: 10,
      alerts: 3,
    },
    {
      id: 'lighting-002',
      name: 'Éclairage Extérieur',
      category: 'lighting',
      status: 'operational',
      consumption: 12.4,
      efficiency: 90,
      lastMaintenance: new Date('2024-01-08'),
      nextMaintenance: new Date('2024-07-08'),
      sensorCount: 5,
      alerts: 0,
    },
  ];

  const sensorData: SensorReading[] = [
    {
      id: 'sensor-001',
      equipmentId: 'hvac-001',
      name: 'Capteur Température Entrée',
      type: 'Température',
      value: 22.5,
      unit: '°C',
      status: 'normal',
      lastUpdate: new Date(),
      connectivity: 'connected',
      dataQuality: 98,
    },
    {
      id: 'sensor-002',
      equipmentId: 'hvac-001',
      name: 'Capteur Humidité',
      type: 'Humidité',
      value: 45.2,
      unit: '%',
      status: 'normal',
      lastUpdate: new Date(),
      connectivity: 'connected',
      dataQuality: 95,
    },
    {
      id: 'sensor-003',
      equipmentId: 'hvac-001',
      name: 'Capteur Pression Air',
      type: 'Pression',
      value: 1013.2,
      unit: 'hPa',
      status: 'normal',
      lastUpdate: new Date(),
      connectivity: 'connected',
      dataQuality: 97,
    },
    {
      id: 'sensor-004',
      equipmentId: 'hvac-001',
      name: 'Capteur Débit Air',
      type: 'Débit',
      value: 850.5,
      unit: 'm³/h',
      status: 'warning',
      lastUpdate: new Date(Date.now() - 300000),
      connectivity: 'connected',
      dataQuality: 82,
    },
    {
      id: 'sensor-005',
      equipmentId: 'hvac-001',
      name: 'Capteur CO2',
      type: 'Qualité Air',
      value: 680,
      unit: 'ppm',
      status: 'normal',
      lastUpdate: new Date(),
      connectivity: 'connected',
      dataQuality: 99,
    },
  ];

  const alertData: Alert[] = [
    {
      id: 'alert-001',
      severity: 'critical',
      category: 'equipment',
      equipmentId: 'water-001',
      equipmentName: 'Système de Chauffage Eau',
      message:
        'Efficacité du système de chauffage eau en dessous du seuil critique (55%)',
      timestamp: new Date(Date.now() - 1800000),
      acknowledged: false,
    },
    {
      id: 'alert-002',
      severity: 'warning',
      category: 'threshold',
      equipmentId: 'hvac-002',
      equipmentName: 'Climatisation Salle Conseil',
      message: 'Consommation supérieure à la moyenne de 15%',
      timestamp: new Date(Date.now() - 3600000),
      acknowledged: false,
    },
    {
      id: 'alert-003',
      severity: 'warning',
      category: 'maintenance',
      equipmentId: 'water-001',
      equipmentName: 'Système de Chauffage Eau',
      message: 'Maintenance préventive en retard de 5 jours',
      timestamp: new Date(Date.now() - 7200000),
      acknowledged: false,
    },
    {
      id: 'alert-004',
      severity: 'info',
      category: 'data-quality',
      equipmentId: 'hvac-001',
      equipmentName: 'Système CVC Principal',
      message: 'Qualité des données du capteur de débit air réduite à 82%',
      timestamp: new Date(Date.now() - 10800000),
      acknowledged: true,
      acknowledgedBy: 'Jean Martin',
      acknowledgedAt: new Date(Date.now() - 9000000),
    },
  ];

  const maintenanceSchedules: MaintenanceSchedule[] = [
    {
      id: 'maint-001',
      equipmentId: 'water-001',
      equipmentName: 'Système de Chauffage Eau',
      type: 'corrective',
      scheduledDate: new Date('2024-02-05'),
      duration: 4,
      technician: 'Pierre Lefebvre',
      status: 'scheduled',
      priority: 'high',
      notes:
        'Remplacement du circulateur et nettoyage complet du système. Vérification des vannes thermostatiques.',
    },
    {
      id: 'maint-002',
      equipmentId: 'hvac-002',
      equipmentName: 'Climatisation Salle Conseil',
      type: 'preventive',
      scheduledDate: new Date('2024-02-20'),
      duration: 2,
      technician: 'Sophie Bernard',
      status: 'scheduled',
      priority: 'medium',
      notes: 'Maintenance préventive trimestrielle standard.',
    },
    {
      id: 'maint-003',
      equipmentId: 'hvac-001',
      equipmentName: 'Système CVC Principal',
      type: 'inspection',
      scheduledDate: new Date('2024-02-01'),
      duration: 1,
      technician: 'Marc Dubois',
      status: 'in-progress',
      priority: 'low',
      notes: 'Inspection mensuelle de routine.',
    },
    {
      id: 'maint-004',
      equipmentId: 'electrical-001',
      equipmentName: 'Tableau Électrique Principal',
      type: 'preventive',
      scheduledDate: new Date('2024-01-25'),
      duration: 3,
      technician: 'Antoine Rousseau',
      status: 'overdue',
      priority: 'high',
      notes:
        'Maintenance semestrielle du tableau électrique. Vérification des disjoncteurs et des connexions.',
    },
  ];

  const hourlyConsumptionData: HourlyConsumption[] = Array.from(
    { length: 24 },
    (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 3600000),
      consumption: 120 + Math.random() * 80 + Math.sin(i / 3) * 30,
      cost: (120 + Math.random() * 80 + Math.sin(i / 3) * 30) * 0.15,
      temperature: 18 + Math.random() * 8,
      occupancy: i >= 8 && i <= 18 ? 150 + Math.random() * 100 : 20 + Math.random() * 30,
    })
  );

  const handleAcknowledgeAlert = (alertId: string) => {
    console.log('Acknowledging alert:', alertId);
  };

  const handleEquipmentSelect = (equipmentId: string) => {
    setSelectedEquipmentId(equipmentId);
    setActiveTab('sensors');
  };

  const tabs: { value: TabView; label: string; icon: string }[] = [
    { value: 'consumption', label: 'Consommation', icon: 'TrendingUp' },
    { value: 'equipment', label: 'Équipements', icon: 'Package' },
    { value: 'sensors', label: 'Capteurs', icon: 'Activity' },
    { value: 'maintenance', label: 'Maintenance', icon: 'Wrench' },
  ];

  const selectedEquipment = selectedEquipmentId
    ? equipmentData.find((e) => e.id === selectedEquipmentId)
    : null;

  const filteredSensors = selectedEquipmentId
    ? sensorData.filter((s) => s.equipmentId === selectedEquipmentId)
    : sensorData;

  return (
    <>
      <Helmet>
        <title>Moniteur de Performance des Sites | Energy Analytics Platform</title>
        <meta
          name="description"
          content="Surveillance complète des performances des installations avec suivi en temps réel de la consommation, gestion des équipements et planification de la maintenance"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar />
        <GlobalContextBar />

        <main className="lg:ml-64 pt-[120px] lg:pt-[120px]">
          <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Moniteur de Performance des Sites
                </h1>
                <p className="text-muted-foreground">
                  Surveillance opérationnelle complète et optimisation des équipements
                </p>
              </div>

              <div className="flex items-center gap-3">
                <ConnectionStatusIndicator />
                <AlertNotificationBadge />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4">
                <FacilityOverviewCard facility={facilityData} />
              </div>
              <div className="lg:col-span-4">
                <ConsumptionGauge metrics={consumptionMetrics} />
              </div>
              <div className="lg:col-span-4">
                <AlertManagementPanel
                  alerts={alertData}
                  onAcknowledge={handleAcknowledgeAlert}
                />
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="border-b border-border">
                <div className="flex overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.value}
                      type="button"
                      onClick={() => setActiveTab(tab.value)}
                      className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 ${
                        activeTab === tab.value
                          ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'consumption' && (
                  <HourlyConsumptionChart data={hourlyConsumptionData} />
                )}

                {activeTab === 'equipment' && (
                  <EquipmentPerformanceMatrix
                    equipment={equipmentData}
                    onEquipmentSelect={handleEquipmentSelect}
                  />
                )}

                {activeTab === 'sensors' && (
                  <SensorHealthStatus
                    sensors={filteredSensors}
                    equipmentName={
                      selectedEquipment?.name || 'Tous les équipements'
                    }
                  />
                )}

                {activeTab === 'maintenance' && (
                  <MaintenanceScheduleView schedules={maintenanceSchedules} />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SitePerformanceMonitor;