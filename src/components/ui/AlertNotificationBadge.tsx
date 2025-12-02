import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  acknowledged: boolean;
}

interface AlertNotificationBadgeProps {
  className?: string;
}

const AlertNotificationBadge = ({
  className = '',
}: AlertNotificationBadgeProps) => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      severity: 'critical',
      message: 'High energy consumption detected at City Hall',
      timestamp: new Date(),
      acknowledged: false,
    },
    {
      id: '2',
      severity: 'warning',
      message: 'HVAC system efficiency below threshold',
      timestamp: new Date(Date.now() - 300000),
      acknowledged: false,
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const unacknowledgedCount = alerts.filter((a) => !a.acknowledged).length;
  const criticalCount = alerts.filter(
    (a) => a.severity === 'critical' && !a.acknowledged
  ).length;

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

  const acknowledgeAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
        title={`${unacknowledgedCount} unacknowledged alerts`}
      >
        <Icon name="Bell" size={20} strokeWidth={2} />
        {unacknowledgedCount > 0 && (
          <span
            className={`absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-semibold rounded-full ${
              criticalCount > 0
                ? 'bg-error text-error-foreground'
                : 'bg-warning text-warning-foreground'
            }`}
          >
            {unacknowledgedCount > 9 ? '9+' : unacknowledgedCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[105]"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-[110] max-h-[400px] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">
                Alerts ({unacknowledgedCount})
              </h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
              >
                <Icon name="X" size={16} strokeWidth={2} />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[320px]">
              {alerts.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <Icon
                    name="CheckCircle"
                    size={32}
                    className="text-success mb-2"
                    strokeWidth={2}
                  />
                  <p className="text-sm text-muted-foreground">
                    No active alerts
                  </p>
                </div>
              ) : (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 border-b border-border last:border-b-0 transition-all duration-200 ${
                      alert.acknowledged ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 p-2 rounded-md ${getSeverityColor(
                          alert.severity
                        )}`}
                      >
                        <Icon
                          name={getSeverityIcon(alert.severity)}
                          size={16}
                          strokeWidth={2}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground mb-1">
                          {alert.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatTimestamp(alert.timestamp)}
                        </p>
                      </div>
                      {!alert.acknowledged && (
                        <button
                          type="button"
                          onClick={() => acknowledgeAlert(alert.id)}
                          className="flex-shrink-0 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                          title="Acknowledge"
                        >
                          <Icon name="Check" size={16} strokeWidth={2} />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {alerts.length > 0 && (
              <div className="p-3 border-t border-border">
                <button
                  type="button"
                  className="w-full px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-md transition-all duration-200"
                >
                  View all alerts
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AlertNotificationBadge;