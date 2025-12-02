import React from 'react';
import Icon from '../../../components/AppIcon';
import { AnomalyDetection } from '../types';

interface AnomalyDetectionPanelProps {
  anomalies: AnomalyDetection[];
  className?: string;
}

const AnomalyDetectionPanel = ({
  anomalies,
  className = '',
}: AnomalyDetectionPanelProps) => {
  const getSeverityConfig = (severity: AnomalyDetection['severity']) => {
    switch (severity) {
      case 'high':
        return {
          color: 'bg-error',
          textColor: 'text-error',
          bgColor: 'bg-error/10',
          icon: 'AlertCircle',
          label: 'Élevée',
        };
      case 'medium':
        return {
          color: 'bg-warning',
          textColor: 'text-warning',
          bgColor: 'bg-warning/10',
          icon: 'AlertTriangle',
          label: 'Moyenne',
        };
      case 'low':
        return {
          color: 'bg-primary',
          textColor: 'text-primary',
          bgColor: 'bg-primary/10',
          icon: 'Info',
          label: 'Faible',
        };
      default:
        return {
          color: 'bg-muted',
          textColor: 'text-muted-foreground',
          bgColor: 'bg-muted',
          icon: 'Circle',
          label: 'Inconnu',
        };
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-warning/10">
          <Icon name="Zap" size={20} className="text-warning" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Détection d'Anomalies
          </h3>
          <p className="text-sm text-muted-foreground">
            Écarts significatifs détectés au niveau compteur
          </p>
        </div>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {anomalies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Icon
              name="CheckCircle"
              size={32}
              className="text-success mb-3"
              strokeWidth={2}
            />
            <p className="text-sm text-muted-foreground">
              Aucune anomalie détectée
            </p>
          </div>
        ) : (
          anomalies.map((anomaly) => {
            const config = getSeverityConfig(anomaly.severity);
            return (
              <div
                key={anomaly.id}
                className={`p-4 rounded-lg border-l-4 ${config.color} ${config.bgColor}`}
              >
                <div className="flex items-start gap-3">
                  <Icon
                    name={config.icon}
                    size={18}
                    className={config.textColor}
                    strokeWidth={2}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">
                        {anomaly.meterName}
                      </span>
                      <span className={`text-xs font-semibold ${config.textColor}`}>
                        {config.label}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {formatDate(anomaly.timestamp)}
                    </p>
                    <p className="text-sm text-foreground mb-3">
                      {anomaly.description}
                    </p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Valeur réelle</span>
                        <p className="font-semibold text-foreground">
                          {anomaly.actualValue.toFixed(0)} kWh
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Attendue</span>
                        <p className="font-semibold text-foreground">
                          {anomaly.expectedValue.toFixed(0)} kWh
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Écart</span>
                        <p className={`font-semibold ${config.textColor}`}>
                          {anomaly.deviation > 0 ? '+' : ''}
                          {anomaly.deviation.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AnomalyDetectionPanel;