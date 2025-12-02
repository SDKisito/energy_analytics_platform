import React from 'react';
import Icon from '../../../components/AppIcon';
import { RiskPeriod } from '../types';

interface RiskPeriodTimelineProps {
  riskPeriods: RiskPeriod[];
  className?: string;
}

const RiskPeriodTimeline = ({
  riskPeriods,
  className = '',
}: RiskPeriodTimelineProps) => {
  const getSeverityConfig = (severity: RiskPeriod['severity']) => {
    switch (severity) {
      case 'critical':
        return {
          color: 'bg-error',
          textColor: 'text-error',
          bgColor: 'bg-error/10',
          icon: 'AlertCircle',
          label: 'Critique',
        };
      case 'warning':
        return {
          color: 'bg-warning',
          textColor: 'text-warning',
          bgColor: 'bg-warning/10',
          icon: 'AlertTriangle',
          label: 'Attention',
        };
      case 'info':
        return {
          color: 'bg-primary',
          textColor: 'text-primary',
          bgColor: 'bg-primary/10',
          icon: 'Info',
          label: 'Information',
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
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatDateRange = (start: Date, end: Date) => {
    return `${formatDate(start)} - ${formatDate(end)}`;
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-error/10">
          <Icon name="AlertTriangle" size={20} className="text-error" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Périodes à Risque Détectées
          </h3>
          <p className="text-sm text-muted-foreground">
            Prévisions de dépassement de seuils
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {riskPeriods.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Icon
              name="CheckCircle"
              size={32}
              className="text-success mb-3"
              strokeWidth={2}
            />
            <p className="text-sm text-muted-foreground">
              Aucune période à risque détectée
            </p>
          </div>
        ) : (
          riskPeriods.map((period) => {
            const config = getSeverityConfig(period.severity);
            return (
              <div
                key={period.id}
                className={`p-4 rounded-lg border-l-4 ${config.color} ${config.bgColor}`}
              >
                <div className="flex items-start gap-3">
                  <Icon
                    name={config.icon}
                    size={20}
                    className={config.textColor}
                    strokeWidth={2}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-semibold ${config.textColor}`}>
                        {config.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDateRange(period.startDate, period.endDate)}
                      </span>
                    </div>
                    <p className="text-sm text-foreground mb-2">
                      {period.description}
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div>
                        <span className="text-xs text-muted-foreground">
                          Consommation prévue
                        </span>
                        <p className="text-sm font-semibold text-foreground">
                          {period.predictedConsumption.toLocaleString('fr-FR')} kWh
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">
                          Dépassement
                        </span>
                        <p className={`text-sm font-semibold ${config.textColor}`}>
                          +{period.exceedancePercentage.toFixed(1)}%
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

export default RiskPeriodTimeline;