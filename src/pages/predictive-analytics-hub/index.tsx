import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import GlobalContextBar from '../../components/ui/GlobalContextBar';
import AlertNotificationBadge from '../../components/ui/AlertNotificationBadge';
import ConnectionStatusIndicator from '../../components/ui/ConnectionStatusIndicator';
import Icon from '../../components/AppIcon';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import ForecastChart from './components/ForecastChart';
import ModelMetricsCard from './components/ModelMetricsCard';
import RiskPeriodTimeline from './components/RiskPeriodTimeline';
import ScenarioModeling from './components/ScenarioModeling';
import FacilityForecastComparison from './components/FacilityForecastComparison';
import AnomalyDetectionPanel from './components/AnomalyDetectionPanel';
import ExportReportModal from './components/ExportReportModal';
import {
  ForecastDataPoint,
  ModelMetrics,
  RiskPeriod,
  ScenarioParameter,
  FacilityForecast,
  AnomalyDetection,
  ForecastHorizon,
  ExportOptions,
} from './types';

const PredictiveAnalyticsHub = () => {
  const [showConfidenceBands, setShowConfidenceBands] = useState(true);
  const [selectedHorizon, setSelectedHorizon] = useState('7d');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const forecastHorizons: ForecastHorizon[] = [
    { value: '7d', label: '7 jours', days: 7 },
    { value: '14d', label: '14 jours', days: 14 },
    { value: '1m', label: '1 mois', days: 30 },
    { value: '3m', label: '3 mois', days: 90 },
    { value: '6m', label: '6 mois', days: 180 },
  ];

  const generateForecastData = (): ForecastDataPoint[] => {
    const data: ForecastDataPoint[] = [];
    const baseConsumption = 15000;
    const now = new Date();

    for (let i = -30; i <= 7; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() + i);

      const seasonalFactor = 1 + 0.2 * Math.sin((i / 365) * 2 * Math.PI);
      const randomVariation = 0.9 + Math.random() * 0.2;
      const predicted = baseConsumption * seasonalFactor * randomVariation;

      data.push({
        timestamp: date,
        actual: i <= 0 ? predicted * (0.95 + Math.random() * 0.1) : null,
        predicted: predicted,
        lowerBound: predicted * 0.85,
        upperBound: predicted * 1.15,
        confidence: 85 + Math.random() * 10,
      });
    }

    return data;
  };

  const modelMetrics: ModelMetrics = {
    mape: 4.23,
    rmse: 1247,
    accuracy: 92.5,
    lastTraining: new Date(Date.now() - 2 * 60 * 60 * 1000),
    dataPoints: 87654,
  };

  const riskPeriods: RiskPeriod[] = [
    {
      id: '1',
      startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      severity: 'critical',
      predictedConsumption: 18500,
      threshold: 16000,
      exceedancePercentage: 15.6,
      description: 'Pic de consommation prévu - Conditions météorologiques extrêmes',
    },
    {
      id: '2',
      startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      severity: 'warning',
      predictedConsumption: 17200,
      threshold: 16000,
      exceedancePercentage: 7.5,
      description: 'Augmentation modérée attendue - Événement municipal planifié',
    },
  ];

  const scenarioParameters: ScenarioParameter[] = [
    {
      id: '1',
      name: 'Température moyenne',
      currentValue: 18,
      adjustedValue: 18,
      unit: '°C',
      impact: 0,
    },
    {
      id: '2',
      name: 'Taux d\'occupation',
      currentValue: 75,
      adjustedValue: 75,
      unit: '%',
      impact: 0,
    },
    {
      id: '3',
      name: 'Heures d\'ouverture',
      currentValue: 8,
      adjustedValue: 8,
      unit: 'h/jour',
      impact: 0,
    },
  ];

  const facilityForecasts: FacilityForecast[] = [
    {
      facilityId: '1',
      facilityName: 'Hôtel de Ville',
      currentConsumption: 5200,
      predictedConsumption: 5680,
      variance: 9.2,
      confidence: 91,
      trend: 'increasing',
    },
    {
      facilityId: '2',
      facilityName: 'Complexe Sportif',
      currentConsumption: 8900,
      predictedConsumption: 8450,
      variance: -5.1,
      confidence: 88,
      trend: 'decreasing',
    },
    {
      facilityId: '3',
      facilityName: 'Bibliothèque Municipale',
      currentConsumption: 3400,
      predictedConsumption: 3380,
      variance: -0.6,
      confidence: 94,
      trend: 'stable',
    },
    {
      facilityId: '4',
      facilityName: 'Groupe Scolaire',
      currentConsumption: 6800,
      predictedConsumption: 7350,
      variance: 8.1,
      confidence: 89,
      trend: 'increasing',
    },
  ];

  const anomalies: AnomalyDetection[] = [
    {
      id: '1',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      meterId: 'M-001',
      meterName: 'Compteur Principal - Hôtel de Ville',
      actualValue: 2850,
      expectedValue: 2100,
      deviation: 35.7,
      severity: 'high',
      description: 'Consommation anormalement élevée détectée - Vérification système HVAC recommandée',
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      meterId: 'M-015',
      meterName: 'Compteur Éclairage - Complexe Sportif',
      actualValue: 450,
      expectedValue: 620,
      deviation: -27.4,
      severity: 'medium',
      description: 'Consommation inférieure à la normale - Possible défaillance d\'équipement',
    },
  ];

  const handleApplyScenario = (parameters: ScenarioParameter[]) => {
    console.log('Applying scenario with parameters:', parameters);
  };

  const handleExport = (options: ExportOptions) => {
    console.log('Exporting report with options:', options);
  };

  return (
    <>
      <Helmet>
        <title>Hub d'Analyse Prédictive | Energy Analytics Platform</title>
        <meta
          name="description"
          content="Prévisions de consommation énergétique basées sur Prophet avec modélisation de scénarios et détection d'anomalies pour le Conseil Départemental du Var"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar />
        <GlobalContextBar />

        <main className="lg:ml-64 pt-[120px] lg:pt-[120px]">
          <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1920px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  Hub d'Analyse Prédictive
                </h1>
                <p className="text-sm text-muted-foreground">
                  Prévisions de consommation énergétique avec modèles Prophet et détection d'anomalies
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <AlertNotificationBadge />
                  <ConnectionStatusIndicator />
                </div>

                <div className="flex items-center gap-2 min-w-[180px]">
                  <Icon name="Calendar" size={18} className="text-muted-foreground" strokeWidth={2} />
                  <Select
                    options={forecastHorizons}
                    value={selectedHorizon}
                    onChange={setSelectedHorizon}
                    placeholder="Horizon de prévision"
                    className="flex-1"
                  />
                </div>

                <Button
                  variant="outline"
                  onClick={() => setShowConfidenceBands(!showConfidenceBands)}
                  iconName={showConfidenceBands ? 'Eye' : 'EyeOff'}
                  iconPosition="left"
                  size="default"
                >
                  <span className="hidden sm:inline">Intervalles</span>
                </Button>

                <Button
                  variant="default"
                  onClick={() => setIsExportModalOpen(true)}
                  iconName="Download"
                  iconPosition="left"
                  size="default"
                >
                  <span className="hidden sm:inline">Exporter</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 space-y-6">
                <ForecastChart
                  data={generateForecastData()}
                  showConfidenceBands={showConfidenceBands}
                />

                <RiskPeriodTimeline riskPeriods={riskPeriods} />

                <FacilityForecastComparison facilities={facilityForecasts} />
              </div>

              <div className="lg:col-span-4 space-y-6">
                <ModelMetricsCard metrics={modelMetrics} />

                <ScenarioModeling
                  initialParameters={scenarioParameters}
                  onApplyScenario={handleApplyScenario}
                />

                <AnomalyDetectionPanel anomalies={anomalies} />
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" strokeWidth={2} />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    Mise à jour des prévisions
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Les modèles Prophet sont réentraînés quotidiennement avec les dernières données de consommation. 
                    La précision des prévisions s'améliore avec l'accumulation de données historiques et l'intégration 
                    de variables externes comme les conditions météorologiques et les événements planifiés.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <ExportReportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          onExport={handleExport}
        />
      </div>
    </>
  );
};

export default PredictiveAnalyticsHub;