import React from 'react';
import Icon from '../../../components/AppIcon';
import { SustainabilityKPI } from '../types';

interface KPICardProps {
  kpi: SustainabilityKPI;
}

const KPICard = ({ kpi }: KPICardProps) => {
  const getStatusColor = () => {
    switch (kpi.status) {
      case 'exceeded':
        return 'text-success bg-success/10';
      case 'on-track':
        return 'text-primary bg-primary/10';
      case 'at-risk':
        return 'text-warning bg-warning/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = () => {
    switch (kpi.status) {
      case 'exceeded':
        return 'TrendingUp';
      case 'on-track':
        return 'Target';
      case 'at-risk':
        return 'AlertTriangle';
      default:
        return 'Activity';
    }
  };

  const progressPercentage = (kpi.value / kpi.target) * 100;

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${getStatusColor()}`}>
          <Icon name={kpi.icon} size={24} strokeWidth={2} />
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${getStatusColor()}`}>
          <Icon name={getStatusIcon()} size={14} strokeWidth={2} />
          <span className="capitalize">{kpi.status.replace('-', ' ')}</span>
        </div>
      </div>

      <h3 className="text-sm font-medium text-muted-foreground mb-2">
        {kpi.title}
      </h3>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-3xl font-bold text-foreground">
          {kpi.value.toLocaleString('fr-FR')}
        </span>
        <span className="text-lg text-muted-foreground">{kpi.unit}</span>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <Icon
          name={kpi.change >= 0 ? 'TrendingUp' : 'TrendingDown'}
          size={16}
          className={kpi.change >= 0 ? 'text-success' : 'text-error'}
          strokeWidth={2}
        />
        <span className={`text-sm font-medium ${kpi.change >= 0 ? 'text-success' : 'text-error'}`}>
          {Math.abs(kpi.change)}% vs année précédente
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Progression vers objectif</span>
          <span className="font-medium">{progressPercentage.toFixed(0)}%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              progressPercentage >= 100
                ? 'bg-success'
                : progressPercentage >= 75
                ? 'bg-primary' :'bg-warning'
            }`}
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Objectif: {kpi.target.toLocaleString('fr-FR')} {kpi.unit}
        </p>
      </div>

      <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
        {kpi.description}
      </p>
    </div>
  );
};

export default KPICard;