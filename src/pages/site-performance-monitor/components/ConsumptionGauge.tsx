import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Icon from '../../../components/AppIcon';
import type { ConsumptionMetrics } from '../types';

interface ConsumptionGaugeProps {
  metrics: ConsumptionMetrics;
}

interface TimeSeriesData {
  time: string;
  consumption: number;
  timestamp: number;
}

const ConsumptionGauge = ({ metrics }: ConsumptionGaugeProps) => {
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);
  const [showChart, setShowChart] = useState(true);

  // Générer des données de série temporelle pour le graphique
  useEffect(() => {
    const generateInitialData = () => {
      const data: TimeSeriesData[] = [];
      const now = Date.now();
      const baseValue = metrics.current;
      
      for (let i = 29; i >= 0; i--) {
        const timestamp = now - i * 60000; // Données toutes les minutes
        const variation = (Math.random() - 0.5) * (baseValue * 0.15);
        data.push({
          time: new Date(timestamp).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          consumption: Math.max(0, baseValue + variation),
          timestamp,
        });
      }
      return data;
    };

    setTimeSeriesData(generateInitialData());

    // Mise à jour en temps réel
    const interval = setInterval(() => {
      setTimeSeriesData((prev) => {
        const newData = [...prev];
        const now = Date.now();
        const variation = (Math.random() - 0.5) * (metrics.current * 0.15);
        
        newData.push({
          time: new Date(now).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          consumption: Math.max(0, metrics.current + variation),
          timestamp: now,
        });

        // Garder seulement les 30 dernières minutes
        return newData.slice(-30);
      });
    }, 5000); // Mise à jour toutes les 5 secondes

    return () => clearInterval(interval);
  }, [metrics.current]);
  const getTrendIcon = (trend: ConsumptionMetrics['trend']) => {
    switch (trend) {
      case 'increasing':
        return 'TrendingUp';
      case 'decreasing':
        return 'TrendingDown';
      case 'stable':
        return 'Minus';
      default:
        return 'Minus';
    }
  };

  const getTrendColor = (trend: ConsumptionMetrics['trend']) => {
    switch (trend) {
      case 'increasing':
        return 'text-error';
      case 'decreasing':
        return 'text-success';
      case 'stable':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const efficiencyPercentage = metrics.efficiency;
  const efficiencyColor =
    efficiencyPercentage >= 80
      ? 'text-success'
      : efficiencyPercentage >= 60
      ? 'text-warning' :'text-error';

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-xs text-muted-foreground mb-1">{payload[0].payload.time}</p>
          <p className="text-sm font-semibold text-foreground">
            {payload[0].value.toFixed(2)} kWh
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Consommation en temps réel
        </h3>
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 ${getTrendColor(metrics.trend)}`}>
            <Icon name={getTrendIcon(metrics.trend)} size={16} strokeWidth={2} />
            <span className="text-xs font-medium capitalize">{metrics.trend}</span>
          </div>
          <button
            type="button"
            onClick={() => setShowChart(!showChart)}
            className="ml-2 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            title={showChart ? 'Afficher la jauge' : 'Afficher le graphique'}
          >
            <Icon name={showChart ? 'Gauge' : 'LineChart'} size={16} strokeWidth={2} />
          </button>
        </div>
      </div>

      {showChart ? (
        <>
          {/* Graphique en temps réel */}
          <div className="mb-6">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={timeSeriesData}>
                <defs>
                  <linearGradient id="colorConsumption" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis
                  dataKey="time"
                  stroke="var(--color-muted-foreground)"
                  style={{ fontSize: '11px' }}
                  interval="preserveStartEnd"
                  minTickGap={50}
                />
                <YAxis
                  stroke="var(--color-muted-foreground)"
                  style={{ fontSize: '11px' }}
                  label={{
                    value: 'kWh',
                    angle: -90,
                    position: 'insideLeft',
                    style: { fontSize: '11px', fill: 'var(--color-muted-foreground)' },
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="consumption"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#colorConsumption)"
                  animationDuration={300}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Valeur actuelle en grand */}
          <div className="flex items-center justify-center mb-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Consommation actuelle</p>
              <div className="flex items-baseline justify-center gap-2">
                <p className="text-4xl font-bold text-foreground">
                  {metrics.current.toFixed(1)}
                </p>
                <p className="text-lg text-muted-foreground">kWh</p>
              </div>
              <div className="flex items-center justify-center gap-2 mt-2">
                <p className={`text-sm font-semibold ${efficiencyColor}`}>
                  {efficiencyPercentage}% efficacité
                </p>
                <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Jauge circulaire */
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                className="text-muted"
              />
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                strokeDasharray={`${(efficiencyPercentage / 100) * 502.4} 502.4`}
                className={efficiencyColor}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-4xl font-bold text-foreground">
                {metrics.current.toFixed(1)}
              </p>
              <p className="text-sm text-muted-foreground">kWh</p>
              <p className={`text-lg font-semibold mt-2 ${efficiencyColor}`}>
                {efficiencyPercentage}%
              </p>
              <p className="text-xs text-muted-foreground">Efficacité</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="p-3 bg-muted/50 rounded-md text-center">
          <p className="text-xs text-muted-foreground mb-1">Moyenne</p>
          <p className="text-base font-semibold text-foreground">
            {metrics.average.toFixed(1)}
          </p>
          <p className="text-xs text-muted-foreground">kWh</p>
        </div>
        <div className="p-3 bg-muted/50 rounded-md text-center">
          <p className="text-xs text-muted-foreground mb-1">Pic</p>
          <p className="text-base font-semibold text-foreground">
            {metrics.peak.toFixed(1)}
          </p>
          <p className="text-xs text-muted-foreground">kWh</p>
        </div>
        <div className="p-3 bg-muted/50 rounded-md text-center">
          <p className="text-xs text-muted-foreground mb-1">Coût/m²</p>
          <p className="text-base font-semibold text-foreground">
            {metrics.costPerSqm.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground">€</p>
        </div>
      </div>

      <div className="p-3 bg-primary/10 rounded-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Calendar" size={14} className="text-primary" strokeWidth={2} />
            <span className="text-xs text-muted-foreground">
              Période de comparaison:
            </span>
          </div>
          <span className="text-xs font-medium text-foreground">
            {metrics.comparisonPeriod}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConsumptionGauge;
