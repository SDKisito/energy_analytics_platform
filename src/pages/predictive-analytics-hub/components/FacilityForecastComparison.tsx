import React from 'react';
import Icon from '../../../components/AppIcon';
import { FacilityForecast } from '../types';

interface FacilityForecastComparisonProps {
  facilities: FacilityForecast[];
  className?: string;
}

const FacilityForecastComparison = ({
  facilities,
  className = '',
}: FacilityForecastComparisonProps) => {
  const getTrendIcon = (trend: FacilityForecast['trend']) => {
    switch (trend) {
      case 'increasing':
        return { name: 'TrendingUp', color: 'text-error' };
      case 'decreasing':
        return { name: 'TrendingDown', color: 'text-success' };
      case 'stable':
        return { name: 'Minus', color: 'text-muted-foreground' };
      default:
        return { name: 'Minus', color: 'text-muted-foreground' };
    }
  };

  const getVarianceColor = (variance: number) => {
    if (variance > 10) return 'text-error';
    if (variance > 5) return 'text-warning';
    if (variance < -5) return 'text-success';
    return 'text-muted-foreground';
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
          <Icon name="Building2" size={20} className="text-primary" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Comparaison par Installation
          </h3>
          <p className="text-sm text-muted-foreground">
            Prévisions de consommation par site
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {facilities.map((facility) => {
          const trendIcon = getTrendIcon(facility.trend);
          return (
            <div
              key={facility.facilityId}
              className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Icon
                    name={trendIcon.name}
                    size={18}
                    className={trendIcon.color}
                    strokeWidth={2}
                  />
                  <span className="text-sm font-medium text-foreground">
                    {facility.facilityName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Target" size={14} className="text-muted-foreground" strokeWidth={2} />
                  <span className="text-xs text-muted-foreground">
                    {facility.confidence.toFixed(0)}% confiance
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <span className="text-xs text-muted-foreground">Actuelle</span>
                  <p className="text-sm font-semibold text-foreground">
                    {facility.currentConsumption.toLocaleString('fr-FR')} kWh
                  </p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Prévue</span>
                  <p className="text-sm font-semibold text-foreground">
                    {facility.predictedConsumption.toLocaleString('fr-FR')} kWh
                  </p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Écart</span>
                  <p className={`text-sm font-semibold ${getVarianceColor(facility.variance)}`}>
                    {facility.variance > 0 ? '+' : ''}
                    {facility.variance.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FacilityForecastComparison;