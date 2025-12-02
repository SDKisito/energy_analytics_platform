import React from 'react';
import Icon from '../../../components/AppIcon';
import { ModelMetrics } from '../types';

interface ModelMetricsCardProps {
  metrics: ModelMetrics;
  className?: string;
}

const ModelMetricsCard = ({ metrics, className = '' }: ModelMetricsCardProps) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-success';
    if (accuracy >= 75) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
          <Icon name="TrendingUp" size={20} className="text-primary" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Performance du Modèle
          </h3>
          <p className="text-sm text-muted-foreground">
            Métriques de précision Prophet
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
          <div className="flex items-center gap-3">
            <Icon name="Target" size={18} className="text-muted-foreground" strokeWidth={2} />
            <span className="text-sm font-medium text-foreground">
              Précision globale
            </span>
          </div>
          <span className={`text-lg font-semibold ${getAccuracyColor(metrics.accuracy)}`}>
            {metrics.accuracy.toFixed(1)}%
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Activity" size={16} className="text-muted-foreground" strokeWidth={2} />
              <span className="text-xs text-muted-foreground">MAPE</span>
            </div>
            <p className="text-lg font-semibold text-foreground">
              {metrics.mape.toFixed(2)}%
            </p>
          </div>

          <div className="p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="BarChart3" size={16} className="text-muted-foreground" strokeWidth={2} />
              <span className="text-xs text-muted-foreground">RMSE</span>
            </div>
            <p className="text-lg font-semibold text-foreground">
              {metrics.rmse.toFixed(0)} kWh
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-border space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Dernier entraînement</span>
            <span className="text-foreground font-medium">
              {formatDate(metrics.lastTraining)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Points de données</span>
            <span className="text-foreground font-medium">
              {metrics.dataPoints.toLocaleString('fr-FR')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-lg bg-success/10 text-success">
          <Icon name="CheckCircle" size={16} strokeWidth={2} />
          <span className="text-xs font-medium">
            Modèle à jour et performant
          </span>
        </div>
      </div>
    </div>
  );
};

export default ModelMetricsCard;