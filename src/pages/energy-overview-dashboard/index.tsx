import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import GlobalContextBar from '../../components/ui/GlobalContextBar';
import AlertNotificationBadge from '../../components/ui/AlertNotificationBadge';
import ConnectionStatusIndicator from '../../components/ui/ConnectionStatusIndicator';
import KPICard from './components/KPICard';
import AlertFeed from './components/AlertFeed';
import RealTimeChart from './components/RealTimeChart';
import SiteHeatmap from './components/SiteHeatmap';
import ExportPanel from './components/ExportPanel';
import {
  EnergyKPI,
  Alert,
  ConsumptionDataPoint,
  SiteHeatmapData,
  ExportOptions,
} from './types';

const EnergyOverviewDashboard = () => {
  const [kpiData, setKpiData] = useState<EnergyKPI[]>([
    {
      id: '1',
      label: 'Consommation totale',
      value: '2 847',
      unit: 'kWh',
      change: 12.5,
      changeLabel: 'vs hier',
      trend: 'up',
      sparklineData: [120, 135, 128, 145, 152, 148, 160, 155, 170, 165, 180, 175],
      threshold: { warning: 10, critical: 15 },
      icon: 'Zap',
      color: 'bg-primary',
    },
    {
      id: '2',
      label: 'Coût actuel',
      value: '427',
      unit: '€',
      change: 8.3,
      changeLabel: 'vs hier',
      trend: 'up',
      sparklineData: [18, 20, 19, 22, 23, 22, 24, 23, 26, 25, 27, 26],
      threshold: { warning: 8, critical: 12 },
      icon: 'Euro',
      color: 'bg-accent',
    },
    {
      id: '3',
      label: 'Empreinte carbone',
      value: '1.42',
      unit: 'tCO₂',
      change: 5.2,
      changeLabel: 'vs hier',
      trend: 'down',
      sparklineData: [1.5, 1.48, 1.52, 1.45, 1.43, 1.46, 1.42, 1.44, 1.40, 1.42, 1.38, 1.42],
      threshold: { warning: 5, critical: 10 },
      icon: 'Leaf',
      color: 'bg-success',
    },
    {
      id: '4',
      label: 'Alertes actives',
      value: '7',
      unit: 'alertes',
      change: 2,
      changeLabel: 'nouvelles',
      trend: 'up',
      sparklineData: [3, 4, 3, 5, 6, 5, 7, 6, 8, 7, 9, 7],
      threshold: { warning: 5, critical: 10 },
      icon: 'AlertTriangle',
      color: 'bg-warning',
    },
    {
      id: '5',
      label: 'Score d\'efficacité',
      value: '87',
      unit: '%',
      change: 3.5,
      changeLabel: 'amélioration',
      trend: 'up',
      sparklineData: [82, 83, 84, 83, 85, 86, 85, 87, 86, 88, 87, 87],
      threshold: { warning: 3, critical: 5 },
      icon: 'TrendingUp',
      color: 'bg-primary',
    },
    {
      id: '6',
      label: 'Écart budgétaire',
      value: '-4.2',
      unit: '%',
      change: 1.8,
      changeLabel: 'vs prévision',
      trend: 'down',
      sparklineData: [-5, -4.8, -5.2, -4.5, -4.3, -4.6, -4.2, -4.4, -4.0, -4.2, -3.8, -4.2],
      threshold: { warning: 3, critical: 5 },
      icon: 'Target',
      color: 'bg-success',
    },
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      severity: 'critical',
      title: 'Consommation anormale détectée',
      description: 'Pic de consommation inhabituel de +45% par rapport à la moyenne',
      location: 'Hôtel de Ville - Bâtiment A',
      timestamp: new Date(),
      acknowledged: false,
      impact: 'Coût supplémentaire estimé: 125€',
    },
    {
      id: '2',
      severity: 'warning',
      title: 'Efficacité HVAC en baisse',
      description: 'Système de climatisation fonctionnant en dessous du seuil optimal',
      location: 'Complexe Sportif',
      timestamp: new Date(Date.now() - 300000),
      acknowledged: false,
      impact: 'Perte d\'efficacité: 12%',
    },
    {
      id: '3',
      severity: 'info',
      title: 'Maintenance programmée',
      description: 'Entretien préventif des compteurs prévu demain',
      location: 'Bibliothèque Municipale',
      timestamp: new Date(Date.now() - 600000),
      acknowledged: false,
      impact: 'Interruption de données: 2h',
    },
    {
      id: '4',
      severity: 'warning',
      title: 'Dépassement de seuil',
      description: 'Consommation dépassant le seuil mensuel de 15%',
      location: 'École Primaire Jean Moulin',
      timestamp: new Date(Date.now() - 900000),
      acknowledged: false,
      impact: 'Budget mensuel dépassé',
    },
    {
      id: '5',
      severity: 'critical',
      title: 'Panne de capteur',
      description: 'Capteur de température hors ligne depuis 30 minutes',
      location: 'Hôtel de Ville - Sous-sol',
      timestamp: new Date(Date.now() - 1800000),
      acknowledged: false,
      impact: 'Données manquantes',
    },
  ]);

  const [consumptionData, setConsumptionData] = useState<ConsumptionDataPoint[]>([]);

  const [siteHeatmapData] = useState<SiteHeatmapData[]>([
    {
      id: '1',
      name: 'Toulon - Hôtel de Ville',
      consumption: 1850,
      intensity: 92,
      area: 8500,
      location: { lat: 43.1242, lng: 5.9280 },
      status: 'critical',
    },
    {
      id: '2',
      name: 'La Seyne-sur-Mer - Centre Technique',
      consumption: 1620,
      intensity: 88,
      area: 7200,
      location: { lat: 43.1012, lng: 5.8795 },
      status: 'critical',
    },
    {
      id: '3',
      name: 'Hyères - Complexe Sportif',
      consumption: 1480,
      intensity: 85,
      area: 6800,
      location: { lat: 43.1204, lng: 6.1286 },
      status: 'warning',
    },
    {
      id: '4',
      name: 'La Garde - Pôle Culturel',
      consumption: 980,
      intensity: 72,
      area: 5200,
      location: { lat: 43.1243, lng: 6.0106 },
      status: 'warning',
    },
    {
      id: '5',
      name: 'Six-Fours-les-Plages - Médiathèque',
      consumption: 720,
      intensity: 58,
      area: 4100,
      location: { lat: 43.0938, lng: 5.8382 },
      status: 'normal',
    },
    {
      id: '6',
      name: 'La Valette-du-Var - Centre Administratif',
      consumption: 890,
      intensity: 68,
      area: 4800,
      location: { lat: 43.1388, lng: 5.9838 },
      status: 'warning',
    },
    {
      id: '7',
      name: 'Le Pradet - École Municipale',
      consumption: 520,
      intensity: 45,
      area: 3200,
      location: { lat: 43.1069, lng: 6.0226 },
      status: 'normal',
    },
    {
      id: '8',
      name: 'Carqueiranne - Piscine Municipale',
      consumption: 1150,
      intensity: 78,
      area: 5500,
      location: { lat: 43.0937, lng: 6.0732 },
      status: 'warning',
    },
    {
      id: '9',
      name: 'Ollioules - Centre Culturel',
      consumption: 650,
      intensity: 52,
      area: 3800,
      location: { lat: 43.1396, lng: 5.8481 },
      status: 'normal',
    },
    {
      id: '10',
      name: 'Sanary-sur-Mer - Port de Plaisance',
      consumption: 820,
      intensity: 64,
      area: 4400,
      location: { lat: 43.1189, lng: 5.7998 },
      status: 'normal',
    },
    {
      id: '11',
      name: 'Le Revest-les-Eaux - Station d\'Épuration',
      consumption: 1380,
      intensity: 82,
      area: 6200,
      location: { lat: 43.1734, lng: 5.9276 },
      status: 'warning',
    },
    {
      id: '12',
      name: 'La Crau - Zone d\'Activités',
      consumption: 1240,
      intensity: 75,
      area: 5900,
      location: { lat: 43.1495, lng: 6.0710 },
      status: 'warning',
    },
  ]);

  useEffect(() => {
    const generateMockData = () => {
      const now = new Date();
      const data: ConsumptionDataPoint[] = [];
      const facilities = [
        'Toulon - Hôtel de Ville',
        'La Seyne-sur-Mer',
        'Hyères',
        'La Garde',
        'Six-Fours-les-Plages',
        'La Valette-du-Var',
      ];
      const meterTypes = ['Électricité', 'Gaz', 'Eau'];

      for (let i = 0; i < 60; i++) {
        const timestamp = new Date(now.getTime() - i * 60000);
        facilities.forEach((facility) => {
          meterTypes.forEach((meterType) => {
            data.push({
              timestamp: timestamp.toISOString(),
              value: Math.random() * 100 + 50,
              facility,
              meterType,
            });
          });
        });
      }
      return data.reverse();
    };

    setConsumptionData(generateMockData());

    const interval = setInterval(() => {
      setConsumptionData((prev) => {
        const newData = [...prev];
        const facilities = [
          'Toulon - Hôtel de Ville',
          'La Seyne-sur-Mer',
          'Hyères',
          'La Garde',
          'Six-Fours-les-Plages',
          'La Valette-du-Var',
        ];
        const meterTypes = ['Électricité', 'Gaz', 'Eau'];
        const now = new Date();

        facilities.forEach((facility) => {
          meterTypes.forEach((meterType) => {
            newData.push({
              timestamp: now.toISOString(),
              value: Math.random() * 100 + 50,
              facility,
              meterType,
            });
          });
        });

        return newData.slice(-180);
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleAcknowledgeAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  const handleExport = (options: ExportOptions) => {
    console.log('Exporting with options:', options);
  };

  return (
    <>
      <Helmet>
        <title>Tableau de bord énergétique - Métropole TPM</title>
        <meta
          name="description"
          content="Surveillance en temps réel de la consommation énergétique de Toulon Provence Méditerranée"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 lg:ml-64">
            <GlobalContextBar className="lg:pl-64" />

            <div className="p-6 lg:mt-[52px]">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-1">
                    Tableau de bord énergétique
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Surveillance en temps réel de la consommation énergétique
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <ConnectionStatusIndicator />
                  <AlertNotificationBadge />
                  <ExportPanel onExport={handleExport} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
                {kpiData.map((kpi) => (
                  <KPICard key={kpi.id} kpi={kpi} />
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                  <RealTimeChart data={consumptionData} />
                </div>
                <div className="lg:col-span-1">
                  <AlertFeed
                    alerts={alerts}
                    onAcknowledge={handleAcknowledgeAlert}
                  />
                </div>
              </div>

              <div className="mb-6">
                <SiteHeatmap sites={siteHeatmapData} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default EnergyOverviewDashboard;