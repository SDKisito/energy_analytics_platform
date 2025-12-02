import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import type { Alert, AlertFilter } from '../types';

interface AlertManagementPanelProps {
  alerts: Alert[];
  onAcknowledge: (alertId: string) => void;
}

const AlertManagementPanel = ({
  alerts,
  onAcknowledge,
}: AlertManagementPanelProps) => {
  const [selectedFilter, setSelectedFilter] = useState<AlertFilter>('all');
  const [sortBy, setSortBy] = useState<'timestamp' | 'severity'>('timestamp');

  const filters: { value: AlertFilter; label: string; icon: string }[] = [
    { value: 'all', label: 'Toutes', icon: 'List' },
    { value: 'critical', label: 'Critiques', icon: 'AlertCircle' },
    { value: 'warning', label: 'Avertissements', icon: 'AlertTriangle' },
    { value: 'info', label: 'Informations', icon: 'Info' },
    { value: 'unacknowledged', label: 'Non acquittées', icon: 'Bell' },
  ];

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'text-error bg-error/10';
      case 'warning':
        return 'text-warning bg-warning/10';
      case 'info':
        return 'text-primary bg-primary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getSeverityIcon = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'AlertCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'info':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const getCategoryIcon = (category: Alert['category']) => {
    switch (category) {
      case 'threshold':
        return 'TrendingUp';
      case 'maintenance':
        return 'Wrench';
      case 'data-quality':
        return 'Database';
      case 'equipment':
        return 'Package';
      default:
        return 'Bell';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return 'À l\'instant';
    if (diff < 3600) return `Il y a ${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `Il y a ${Math.floor(diff / 3600)}h`;
    return date.toLocaleDateString('fr-FR');
  };

  const filteredAlerts = alerts
    .filter((alert) => {
      switch (selectedFilter) {
        case 'critical':
          return alert.severity === 'critical';
        case 'warning':
          return alert.severity === 'warning';
        case 'info':
          return alert.severity === 'info';
        case 'unacknowledged':
          return !alert.acknowledged;
        default:
          return true;
      }
    })
    .sort((a, b) => {
      if (sortBy === 'timestamp') {
        return b.timestamp.getTime() - a.timestamp.getTime();
      }
      const severityOrder = { critical: 0, warning: 1, info: 2 };
      return severityOrder[a.severity] - severityOrder[b.severity];
    });

  const unacknowledgedCount = alerts.filter((a) => !a.acknowledged).length;
  const criticalCount = alerts.filter(
    (a) => a.severity === 'critical' && !a.acknowledged
  ).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Gestion des alertes
          </h3>
          <p className="text-sm text-muted-foreground">
            {unacknowledgedCount} non acquittées
            {criticalCount > 0 && ` • ${criticalCount} critiques`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-3 py-2 bg-muted border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="timestamp">Plus récentes</option>
            <option value="severity">Par gravité</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setSelectedFilter(filter.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              selectedFilter === filter.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <Icon name={filter.icon} size={16} strokeWidth={2} />
            <span>{filter.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`bg-card border rounded-lg p-4 transition-all duration-200 ${
              alert.acknowledged
                ? 'border-border opacity-60' :'border-border hover:border-primary'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg ${getSeverityColor(
                  alert.severity
                )}`}
              >
                <Icon
                  name={getSeverityIcon(alert.severity)}
                  size={20}
                  strokeWidth={2}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${getSeverityColor(
                          alert.severity
                        )}`}
                      >
                        {alert.severity.toUpperCase()}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Icon name={getCategoryIcon(alert.category)} size={12} strokeWidth={2} />
                        <span className="capitalize">{alert.category}</span>
                      </div>
                    </div>
                    <p className="text-sm text-foreground font-medium mb-1">
                      {alert.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {alert.equipmentName}
                    </p>
                  </div>

                  {!alert.acknowledged && (
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Check"
                      onClick={() => onAcknowledge(alert.id)}
                    >
                      Acquitter
                    </Button>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {formatTimestamp(alert.timestamp)}
                  </span>
                  {alert.acknowledged && (
                    <div className="flex items-center gap-1 text-success">
                      <Icon name="CheckCircle" size={12} strokeWidth={2} />
                      <span>
                        Acquitté par {alert.acknowledgedBy} •{' '}
                        {alert.acknowledgedAt?.toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Icon
            name="CheckCircle"
            size={48}
            className="text-success mb-4"
            strokeWidth={1.5}
          />
          <p className="text-sm text-muted-foreground">Aucune alerte trouvée</p>
        </div>
      )}
    </div>
  );
};

export default AlertManagementPanel;