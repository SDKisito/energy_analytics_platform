import React from 'react';
import Icon from '../../../components/AppIcon';
import { EnergyKPI } from '../types';

interface KPICardProps {
  kpi: EnergyKPI;
  className?: string;
}

const KPICard = ({ kpi, className = '' }: KPICardProps) => {
  const getTrendColor = () => {
    if (kpi.trend === 'up') return 'text-error';
    if (kpi.trend === 'down') return 'text-success';
    return 'text-muted-foreground';
  };

  const getTrendIcon = () => {
    if (kpi.trend === 'up') return 'TrendingUp';
    if (kpi.trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getStatusColor = () => {
    const absChange = Math.abs(kpi.change);
    if (absChange >= kpi.threshold.critical) return 'border-error';
    if (absChange >= kpi.threshold.warning) return 'border-warning';
    return 'border-border';
  };

  return (
    <div
      className={`bg-card border-2 ${getStatusColor()} rounded-lg p-4 transition-all duration-200 hover:shadow-md ${className}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-lg ${kpi.color}`}
        >
          <Icon name={kpi.icon} size={20} color="white" strokeWidth={2} />
        </div>
        <div className={`flex items-center gap-1 ${getTrendColor()}`}>
          <Icon name={getTrendIcon()} size={16} strokeWidth={2} />
          <span className="text-sm font-semibold">
            {Math.abs(kpi.change)}%
          </span>
        </div>
      </div>

      <div className="space-y-1 mb-3">
        <p className="text-xs text-muted-foreground font-medium">{kpi.label}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-foreground">{kpi.value}</span>
          <span className="text-sm text-muted-foreground">{kpi.unit}</span>
        </div>
        <p className="text-xs text-muted-foreground">{kpi.changeLabel}</p>
      </div>

      <div className="h-12 flex items-end gap-1">
        {kpi.sparklineData.map((value, index) => {
          const maxValue = Math.max(...kpi.sparklineData);
          const height = (value / maxValue) * 100;
          return (
            <div
              key={index}
              className="flex-1 bg-primary/20 rounded-sm transition-all duration-200 hover:bg-primary/40"
              style={{ height: `${height}%` }}
              title={`${value} ${kpi.unit}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default KPICard;