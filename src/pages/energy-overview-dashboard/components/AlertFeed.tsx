import React from 'react';
import Icon from '../../../components/AppIcon';
import { Alert } from '../types';

interface AlertFeedProps {
  alerts: Alert[];
  onAcknowledge: (id: string) => void;
  className?: string;
}

const AlertFeed = ({ alerts, onAcknowledge, className = '' }: AlertFeedProps) => {
  const getSeverityConfig = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return {
          color: 'bg-error/10 border-error',
          textColor: 'text-error',
          icon: 'AlertCircle',
        };
      case 'warning':
        return {
          color: 'bg-warning/10 border-warning',
          textColor: 'text-warning',
          icon: 'AlertTriangle',
        };
      case 'info':
        return {
          color: 'bg-primary/10 border-primary',
          textColor: 'text-primary',
          icon: 'Info',
        };
      default:
        return {
          color: 'bg-muted border-border',
          textColor: 'text-muted-foreground',
          icon: 'Bell',
        };
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return 'À l\'instant';
    if (diff < 3600) return `Il y a ${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `Il y a ${Math.floor(diff / 3600)}h`;
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">
          Alertes actives ({alerts.filter((a) => !a.acknowledged).length})
        </h3>
        <Icon
          name="Bell"
          size={18}
          className="text-muted-foreground"
          strokeWidth={2}
        />
      </div>

      <div className="max-h-[600px] overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <Icon
              name="CheckCircle"
              size={32}
              className="text-success mb-2"
              strokeWidth={2}
            />
            <p className="text-sm text-muted-foreground">
              Aucune alerte active
            </p>
          </div>
        ) : (
          alerts.map((alert) => {
            const config = getSeverityConfig(alert.severity);
            return (
              <div
                key={alert.id}
                className={`p-4 border-b border-border last:border-b-0 transition-all duration-200 ${
                  alert.acknowledged ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 p-2 rounded-md border ${config.color}`}
                  >
                    <Icon
                      name={config.icon}
                      size={16}
                      className={config.textColor}
                      strokeWidth={2}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-foreground">
                        {alert.title}
                      </h4>
                      {!alert.acknowledged && (
                        <button
                          type="button"
                          onClick={() => onAcknowledge(alert.id)}
                          className="flex-shrink-0 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                          title="Acquitter"
                        >
                          <Icon name="Check" size={16} strokeWidth={2} />
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {alert.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Icon name="MapPin" size={12} strokeWidth={2} />
                        <span>{alert.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={12} strokeWidth={2} />
                        <span>{formatTimestamp(alert.timestamp)}</span>
                      </div>
                    </div>
                    <div className="mt-2 px-2 py-1 bg-muted rounded text-xs text-foreground">
                      Impact: {alert.impact}
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

export default AlertFeed;