import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import GlobalContextBar from '../../components/ui/GlobalContextBar';
import AlertNotificationBadge from '../../components/ui/AlertNotificationBadge';
import ConnectionStatusIndicator from '../../components/ui/ConnectionStatusIndicator';
import Icon from '../../components/AppIcon';
import Select from '../../components/ui/Select';
import KPICard from './components/KPICard';
import ExecutiveTrendChart from './components/ExecutiveTrendChart';
import ComplianceStatus from './components/ComplianceStatus';
import BenchmarkComparison from './components/BenchmarkComparison';
import MilestoneTracker from './components/MilestoneTracker';
import ReportGenerator from './components/ReportGenerator';
import {
  SustainabilityKPI,
  ComplianceItem,
  BenchmarkData,
  SustainabilityMilestone,
  ExecutiveTrendData,
  ReportPeriod,
} from './types';

const ExecutiveSustainability = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('fy2024');

  const reportPeriods: ReportPeriod[] = [
    { value: 'fy2024', label: 'Exercice 2024', fiscalYear: '2024' },
    { value: 'fy2023', label: 'Exercice 2023', fiscalYear: '2023' },
    { value: 'q4-2024', label: 'T4 2024', fiscalYear: '2024' },
    { value: 'q3-2024', label: 'T3 2024', fiscalYear: '2024' },
  ];

  const kpis: SustainabilityKPI[] = [
    {
      id: '1',
      title: 'Économies Énergétiques',
      value: 18.5,
      unit: '%',
      change: 12.3,
      target: 20,
      status: 'on-track',
      icon: 'TrendingDown',
      description: 'Réduction de la consommation énergétique totale par rapport à l\'année de référence 2022',
    },
    {
      id: '2',
      title: 'Réduction des Coûts',
      value: 847,
      unit: 'k€',
      change: 15.8,
      target: 1000,
      status: 'on-track',
      icon: 'Euro',
      description: 'Économies financières réalisées grâce aux initiatives d\'efficacité énergétique',
    },
    {
      id: '3',
      title: 'Réduction Carbone',
      value: 2340,
      unit: 'tCO₂',
      change: 22.1,
      target: 2500,
      status: 'exceeded',
      icon: 'Leaf',
      description: 'Tonnes de CO₂ évitées par rapport aux émissions de référence',
    },
    {
      id: '4',
      title: 'ROI Investissements',
      value: 3.2,
      unit: 'années',
      change: -8.5,
      target: 3.5,
      status: 'exceeded',
      icon: 'TrendingUp',
      description: 'Retour sur investissement moyen des projets d\'efficacité énergétique',
    },
  ];

  const trendData: ExecutiveTrendData[] = [
    { month: 'Jan', cost: 245, consumption: 3200, carbonReduction: 12.5 },
    { month: 'Fév', cost: 238, consumption: 3100, carbonReduction: 14.2 },
    { month: 'Mar', cost: 225, consumption: 2950, carbonReduction: 16.8 },
    { month: 'Avr', cost: 218, consumption: 2850, carbonReduction: 18.3 },
    { month: 'Mai', cost: 205, consumption: 2700, carbonReduction: 20.1 },
    { month: 'Juin', cost: 198, consumption: 2600, carbonReduction: 21.5 },
    { month: 'Juil', cost: 192, consumption: 2520, carbonReduction: 22.8 },
    { month: 'Août', cost: 188, consumption: 2480, carbonReduction: 23.4 },
    { month: 'Sep', cost: 195, consumption: 2550, carbonReduction: 22.1 },
    { month: 'Oct', cost: 202, consumption: 2650, carbonReduction: 20.5 },
    { month: 'Nov', cost: 215, consumption: 2800, carbonReduction: 18.7 },
    { month: 'Déc', cost: 228, consumption: 2950, carbonReduction: 16.9 },
  ];

  const complianceItems: ComplianceItem[] = [
    {
      id: '1',
      regulation: 'Décret Tertiaire',
      status: 'compliant',
      deadline: new Date('2025-12-31'),
      progress: 100,
      description: 'Réduction de 40% de la consommation énergétique des bâtiments tertiaires',
    },
    {
      id: '2',
      regulation: 'Loi ELAN',
      status: 'compliant',
      deadline: new Date('2025-06-30'),
      progress: 95,
      description: 'Évolution du logement, de l\'aménagement et du numérique',
    },
    {
      id: '3',
      regulation: 'RE2020',
      status: 'pending',
      deadline: new Date('2025-09-30'),
      progress: 68,
      description: 'Réglementation environnementale pour les constructions neuves',
    },
    {
      id: '4',
      regulation: 'Bilan Carbone',
      status: 'compliant',
      deadline: new Date('2025-03-31'),
      progress: 100,
      description: 'Rapport annuel des émissions de gaz à effet de serre',
    },
  ];

  const benchmarkData: BenchmarkData[] = [
    {
      category: 'Efficacité\nÉnergétique',
      departmental: 92,
      regional: 78,
      national: 75,
      unit: 'score',
    },
    {
      category: 'Réduction\nCarbone',
      departmental: 22,
      regional: 18,
      national: 15,
      unit: '%',
    },
    {
      category: 'Économies\nRéalisées',
      departmental: 18.5,
      regional: 14.2,
      national: 12.8,
      unit: '%',
    },
    {
      category: 'Conformité\nRéglementaire',
      departmental: 95,
      regional: 82,
      national: 78,
      unit: 'score',
    },
  ];

  const milestones: SustainabilityMilestone[] = [
    {
      id: '1',
      title: 'Installation Panneaux Solaires - Bâtiment A',
      targetDate: new Date('2025-03-31'),
      progress: 100,
      status: 'completed',
      description: 'Déploiement de 500 kWc de capacité photovoltaïque',
    },
    {
      id: '2',
      title: 'Modernisation Système CVC',
      targetDate: new Date('2025-06-30'),
      progress: 75,
      status: 'in-progress',
      description: 'Remplacement des systèmes de chauffage et climatisation obsolètes',
    },
    {
      id: '3',
      title: 'Certification ISO 50001',
      targetDate: new Date('2025-09-30'),
      progress: 45,
      status: 'in-progress',
      description: 'Obtention de la certification de management de l\'énergie',
    },
    {
      id: '4',
      title: 'Déploiement Compteurs Intelligents',
      targetDate: new Date('2025-12-31'),
      progress: 30,
      status: 'delayed',
      description: 'Installation de 150 compteurs IoT pour monitoring temps réel',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Tableau de Bord Exécutif Durabilité | Energy Analytics Platform</title>
        <meta
          name="description"
          content="Tableau de bord stratégique pour le suivi des initiatives de durabilité et de conformité réglementaire du Conseil Départemental du Var"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar isCollapsed={sidebarCollapsed} />
        <GlobalContextBar />

        <main
          className={`lg:pt-[120px] pt-[60px] transition-all duration-300 ${
            sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'
          }`}
        >
          <div className="p-6 max-w-[1600px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Tableau de Bord Exécutif Durabilité
                </h1>
                <p className="text-muted-foreground">
                  Suivi stratégique des initiatives d'efficacité énergétique et de conformité réglementaire
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 min-w-[200px]">
                  <Icon name="Calendar" size={18} className="text-muted-foreground" strokeWidth={2} />
                  <Select
                    options={reportPeriods}
                    value={selectedPeriod}
                    onChange={setSelectedPeriod}
                    placeholder="Période"
                  />
                </div>
                <ConnectionStatusIndicator />
                <AlertNotificationBadge />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              {kpis.map((kpi) => (
                <KPICard key={kpi.id} kpi={kpi} />
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
              <div className="xl:col-span-8">
                <ExecutiveTrendChart data={trendData} />
              </div>
              <div className="xl:col-span-4">
                <ComplianceStatus items={complianceItems} />
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
              <div className="xl:col-span-8">
                <BenchmarkComparison data={benchmarkData} />
              </div>
              <div className="xl:col-span-4">
                <MilestoneTracker milestones={milestones} />
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              <div className="xl:col-span-4">
                <ReportGenerator />
              </div>
              <div className="xl:col-span-8">
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-accent/10 text-accent">
                      <Icon name="Lightbulb" size={20} strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        Recommandations Stratégiques
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Opportunités d'optimisation identifiées
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        title: 'Optimisation Éclairage LED',
                        impact: 'Économies potentielles: 125 k€/an',
                        priority: 'high',
                        description: 'Remplacement de l\'éclairage conventionnel dans 8 bâtiments municipaux',
                      },
                      {
                        title: 'Isolation Thermique Renforcée',
                        impact: 'Réduction: 180 tCO₂/an',
                        priority: 'high',
                        description: 'Amélioration de l\'isolation des toitures et façades',
                      },
                      {
                        title: 'Système de Gestion Énergétique',
                        impact: 'ROI: 2.1 années',
                        priority: 'medium',
                        description: 'Déploiement d\'un BMS centralisé pour 15 sites',
                      },
                    ].map((recommendation, index) => (
                      <div
                        key={index}
                        className="p-4 border border-border rounded-lg hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-sm font-medium text-foreground">
                            {recommendation.title}
                          </h4>
                          <span
                            className={`px-2 py-1 rounded-md text-xs font-medium ${
                              recommendation.priority === 'high' ?'bg-error/10 text-error' :'bg-warning/10 text-warning'
                            }`}
                          >
                            {recommendation.priority === 'high' ? 'Priorité haute' : 'Priorité moyenne'}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                          {recommendation.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs font-medium text-success">
                          <Icon name="TrendingUp" size={14} strokeWidth={2} />
                          <span>{recommendation.impact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ExecutiveSustainability;