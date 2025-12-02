import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import type { SensorReading } from '../types';

interface SensorHealthStatusProps {
  sensors: SensorReading[];
  equipmentName: string;
}

const SensorHealthStatus = ({ sensors, equipmentName }: SensorHealthStatusProps) => {
  const [expandedSensor, setExpandedSensor] = useState<string | null>(null);

  const getStatusColor = (status: SensorReading['status']) => {
    switch (status) {
      case 'normal':
        return 'text-success bg-success/10';
      case 'warning':
        return 'text-warning bg-warning/10';
      case 'critical':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status: SensorReading['status']) => {
    switch (status) {
      case 'normal':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'critical':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  const getConnectivityColor = (connectivity: SensorReading['connectivity']) => {
    return connectivity === 'connected' ?'text-success' :'text-error';
  };

  const formatLastUpdate = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return 'À l\'instant';
    if (diff < 3600) return `Il y a ${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `Il y a ${Math.floor(diff / 3600)}h`;
    return date.toLocaleDateString('fr-FR');
  };

  const statusCounts = sensors.reduce(
    (acc, sensor) => {
      acc[sensor.status] = (acc[sensor.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const connectedCount = sensors.filter((s) => s.connectivity === 'connected').length;
  const averageQuality =
    sensors.reduce((sum, s) => sum + s.dataQuality, 0) / sensors.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">{equipmentName}</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Activity" size={16} strokeWidth={2} />
          <span>
            {connectedCount}/{sensors.length} connectés
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3 bg-muted/50 rounded-md">
          <div className="flex items-center gap-2 mb-1">
            <Icon
              name="Activity"
              size={14}
              className="text-muted-foreground"
              strokeWidth={2}
            />
            <p className="text-xs text-muted-foreground">Total capteurs</p>
          </div>
          <p className="text-xl font-bold text-foreground">{sensors.length}</p>
        </div>

        <div className="p-3 bg-success/10 rounded-md">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="CheckCircle" size={14} className="text-success" strokeWidth={2} />
            <p className="text-xs text-success">Normal</p>
          </div>
          <p className="text-xl font-bold text-success">
            {statusCounts.normal || 0}
          </p>
        </div>

        <div className="p-3 bg-warning/10 rounded-md">
          <div className="flex items-center gap-2 mb-1">
            <Icon
              name="AlertTriangle"
              size={14}
              className="text-warning"
              strokeWidth={2}
            />
            <p className="text-xs text-warning">Avertissement</p>
          </div>
          <p className="text-xl font-bold text-warning">
            {statusCounts.warning || 0}
          </p>
        </div>

        <div className="p-3 bg-error/10 rounded-md">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="AlertCircle" size={14} className="text-error" strokeWidth={2} />
            <p className="text-xs text-error">Critique</p>
          </div>
          <p className="text-xl font-bold text-error">
            {statusCounts.critical || 0}
          </p>
        </div>
      </div>

      <div className="p-4 bg-primary/10 rounded-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Qualité moyenne des données
          </span>
          <span className="text-sm font-semibold text-foreground">
            {averageQuality.toFixed(1)}%
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${averageQuality}%` }}
          />
        </div>
      </div>

      <div className="space-y-2">
        {sensors.map((sensor) => (
          <div
            key={sensor.id}
            className="bg-card border border-border rounded-lg overflow-hidden"
          >
            <button
              type="button"
              onClick={() =>
                setExpandedSensor(expandedSensor === sensor.id ? null : sensor.id)
              }
              className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-lg ${getStatusColor(
                    sensor.status
                  )}`}
                >
                  <Icon name={getStatusIcon(sensor.status)} size={20} strokeWidth={2} />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-semibold text-foreground">
                    {sensor.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">{sensor.type}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-base font-bold text-foreground">
                    {sensor.value.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">{sensor.unit}</p>
                </div>
                <Icon
                  name={expandedSensor === sensor.id ? 'ChevronUp' : 'ChevronDown'}
                  size={20}
                  className="text-muted-foreground"
                  strokeWidth={2}
                />
              </div>
            </button>

            {expandedSensor === sensor.id && (
              <div className="px-4 pb-4 space-y-3 border-t border-border">
                <div className="grid grid-cols-2 gap-3 pt-3">
                  <div className="p-3 bg-muted/50 rounded-md">
                    <p className="text-xs text-muted-foreground mb-1">Connectivité</p>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          sensor.connectivity === 'connected' ?'bg-success' :'bg-error'
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${getConnectivityColor(
                          sensor.connectivity
                        )}`}
                      >
                        {sensor.connectivity === 'connected' ?'Connecté' :'Déconnecté'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-muted/50 rounded-md">
                    <p className="text-xs text-muted-foreground mb-1">
                      Qualité des données
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {sensor.dataQuality}%
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-muted/50 rounded-md">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Dernière mise à jour:</span>
                    <span className="text-foreground font-medium">
                      {formatLastUpdate(sensor.lastUpdate)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SensorHealthStatus;