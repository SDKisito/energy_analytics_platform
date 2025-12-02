import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

type ConnectionStatus = 'connected' | 'disconnected' | 'reconnecting';

interface ConnectionStatusIndicatorProps {
  className?: string;
}

const ConnectionStatusIndicator = ({
  className = '',
}: ConnectionStatusIndicatorProps) => {
  const [status, setStatus] = useState<ConnectionStatus>('connected');
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (status === 'connected') {
        setLastUpdate(new Date());
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [status]);

  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          color: 'bg-success',
          textColor: 'text-success',
          icon: 'Wifi',
          label: 'Connected',
          description: 'Real-time data streaming',
        };
      case 'disconnected':
        return {
          color: 'bg-error',
          textColor: 'text-error',
          icon: 'WifiOff',
          label: 'Disconnected',
          description: 'Connection lost',
        };
      case 'reconnecting':
        return {
          color: 'bg-warning',
          textColor: 'text-warning',
          icon: 'RefreshCw',
          label: 'Reconnecting',
          description: 'Attempting to reconnect',
        };
      default:
        return {
          color: 'bg-muted',
          textColor: 'text-muted-foreground',
          icon: 'Wifi',
          label: 'Unknown',
          description: 'Status unknown',
        };
    }
  };

  const formatLastUpdate = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 10) return 'Just now';
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const config = getStatusConfig();

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-all duration-200"
        title={`${config.label} - Click for details`}
      >
        <div className="relative">
          <Icon
            name={config.icon}
            size={16}
            className={config.textColor}
            strokeWidth={2}
          />
          <span
            className={`absolute -top-1 -right-1 w-2 h-2 ${config.color} rounded-full ${
              status === 'reconnecting' ? 'animate-pulse' : ''
            }`}
          />
        </div>
        <span className="hidden lg:inline text-xs text-muted-foreground">
          {config.label}
        </span>
      </button>

      {isExpanded && (
        <>
          <div
            className="fixed inset-0 z-[105]"
            onClick={() => setIsExpanded(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-lg shadow-lg z-[110] p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">
                Connection Status
              </h3>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
              >
                <Icon name="X" size={14} strokeWidth={2} />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-lg ${config.textColor} bg-opacity-10`}
                  style={{ backgroundColor: `${config.color}20` }}
                >
                  <Icon
                    name={config.icon}
                    size={20}
                    className={config.textColor}
                    strokeWidth={2}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {config.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {config.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-border space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Last update:</span>
                  <span className="text-foreground font-medium">
                    {formatLastUpdate(lastUpdate)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Data quality:</span>
                  <span className="text-success font-medium">Excellent</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Latency:</span>
                  <span className="text-foreground font-medium">12ms</span>
                </div>
              </div>

              {status === 'disconnected' && (
                <button
                  type="button"
                  onClick={() => setStatus('reconnecting')}
                  className="w-full px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-md transition-all duration-200"
                >
                  Reconnect
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ConnectionStatusIndicator;