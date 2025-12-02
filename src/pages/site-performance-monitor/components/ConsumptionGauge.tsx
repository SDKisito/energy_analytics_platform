import React from 'react';
import Icon from '../../../components/AppIcon';
import type { ConsumptionMetrics } from '../types';

interface ConsumptionGaugeProps {
  metrics: ConsumptionMetrics;
}

const ConsumptionGauge = ({ metrics }: ConsumptionGaugeProps) => {
  const getTrendIcon = (trend: ConsumptionMetrics['trend']) => {
    switch (trend) {
      case 'increasing':
        return 'TrendingUp';
      case 'decreasing':
        return 'TrendingDown';
      case 'stable':
        return 'Minus';
      default:
        return 'Minus';
    }
  };

  const getTrendColor = (trend: ConsumptionMetrics['trend']) => {
    switch (trend) {
      case 'increasing':
        return 'text-error';
      case 'decreasing':
        return 'text-success';
      case 'stable':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const efficiencyPercentage = metrics.efficiency;
  const efficiencyColor =
    efficiencyPercentage >= 80
      ? 'text-success'
      : efficiencyPercentage >= 60
      ? 'text-warning' :'text-error';

  return (
    <div className="bg-card border border-border rounded-lg p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Consommation en temps réel
        </h3>
        <div className={`flex items-center gap-1 ${getTrendColor(metrics.trend)}`}>
          <Icon name={getTrendIcon(metrics.trend)} size={16} strokeWidth={2} />
          <span className="text-xs font-medium capitalize">{metrics.trend}</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mb-6">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              className="text-muted"
            />
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              strokeDasharray={`${(efficiencyPercentage / 100) * 502.4} 502.4`}
              className={efficiencyColor}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-4xl font-bold text-foreground">
              {metrics.current.toFixed(1)}
            </p>
            <p className="text-sm text-muted-foreground">kWh</p>
            <p className={`text-lg font-semibold mt-2 ${efficiencyColor}`}>
              {efficiencyPercentage}%
            </p>
            <p className="text-xs text-muted-foreground">Efficacité</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="p-3 bg-muted/50 rounded-md text-center">
          <p className="text-xs text-muted-foreground mb-1">Moyenne</p>
          <p className="text-base font-semibold text-foreground">
            {metrics.average.toFixed(1)}
          </p>
          <p className="text-xs text-muted-foreground">kWh</p>
        </div>
        <div className="p-3 bg-muted/50 rounded-md text-center">
          <p className="text-xs text-muted-foreground mb-1">Pic</p>
          <p className="text-base font-semibold text-foreground">
            {metrics.peak.toFixed(1)}
          </p>
          <p className="text-xs text-muted-foreground">kWh</p>
        </div>
        <div className="p-3 bg-muted/50 rounded-md text-center">
          <p className="text-xs text-muted-foreground mb-1">Coût/m²</p>
          <p className="text-base font-semibold text-foreground">
            {metrics.costPerSqm.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground">€</p>
        </div>
      </div>

      <div className="p-3 bg-primary/10 rounded-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Calendar" size={14} className="text-primary" strokeWidth={2} />
            <span className="text-xs text-muted-foreground">
              Période de comparaison:
            </span>
          </div>
          <span className="text-xs font-medium text-foreground">
            {metrics.comparisonPeriod}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConsumptionGauge;