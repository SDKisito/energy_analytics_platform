import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Icon from '../../../components/AppIcon';
import { ConsumptionDataPoint } from '../types';

interface RealTimeChartProps {
  data: ConsumptionDataPoint[];
  className?: string;
}

const RealTimeChart = ({ data, className = '' }: RealTimeChartProps) => {
  const [isLive, setIsLive] = useState(true);
  const [selectedFacility, setSelectedFacility] = useState<string>('all');
  const [localData, setLocalData] = useState<ConsumptionDataPoint[]>([]);

  // Initialiser avec des données locales si aucune donnée n'est fournie
  useEffect(() => {
    if (data && data.length > 0) {
      setLocalData(data);
    } else {
      // Générer des données de démonstration
      const generateData = () => {
        const now = Date.now();
        const facilities = ['Hôtel de Ville', 'Complexe Sportif', 'Bibliothèque'];
        const newData: ConsumptionDataPoint[] = [];
        
        for (let i = 29; i >= 0; i--) {
          const timestamp = new Date(now - i * 60000).toISOString();
          facilities.forEach((facility) => {
            newData.push({
              timestamp,
              value: 50 + Math.random() * 100,
              facility,
              meterType: 'Électricité',
            });
          });
        }
        return newData;
      };
      
      setLocalData(generateData());
    }
  }, [data]);

  // Mise à jour en temps réel
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setLocalData((prev) => {
        const facilities = ['Hôtel de Ville', 'Complexe Sportif', 'Bibliothèque'];
        const now = new Date().toISOString();
        const newPoints: ConsumptionDataPoint[] = facilities.map((facility) => ({
          timestamp: now,
          value: 50 + Math.random() * 100,
          facility,
          meterType: 'Électricité',
        }));

        // Garder seulement les 30 dernières minutes
        const allData = [...prev, ...newPoints];
        const cutoffTime = Date.now() - 30 * 60000;
        return allData.filter((d) => new Date(d.timestamp).getTime() > cutoffTime);
      });
    }, 5000); // Mise à jour toutes les 5 secondes

    return () => clearInterval(interval);
  }, [isLive]);

  const facilities = ['all', 'Hôtel de Ville', 'Complexe Sportif', 'Bibliothèque'];

  const filteredData =
    selectedFacility === 'all'
      ? localData
      : localData.filter((d) => d.facility === selectedFacility);

  const aggregatedData = filteredData.reduce((acc, curr) => {
    const existing = acc.find((item) => item.timestamp === curr.timestamp);
    if (existing) {
      existing.value += curr.value;
    } else {
      acc.push({ ...curr });
    }
    return acc;
  }, [] as ConsumptionDataPoint[]);

  const formatXAxis = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-xs text-muted-foreground mb-1">
            {new Date(payload[0].payload.timestamp).toLocaleString('fr-FR')}
          </p>
          <p className="text-sm font-semibold text-foreground">
            {payload[0].value.toFixed(2)} kWh
          </p>
          <p className="text-xs text-muted-foreground">
            {payload[0].payload.facility}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-foreground">
            Consommation en temps réel
          </h3>
          <div
            className={`flex items-center gap-2 px-2 py-1 rounded-md text-xs font-medium ${
              isLive
                ? 'bg-success/10 text-success' :'bg-muted text-muted-foreground'
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                isLive ? 'bg-success animate-pulse' : 'bg-muted-foreground'
              }`}
            />
            <span>{isLive ? 'En direct' : 'Pause'}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            className="px-3 py-2 text-sm bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {facilities.map((facility) => (
              <option key={facility} value={facility}>
                {facility === 'all' ? 'Tous les sites' : facility}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setIsLive(!isLive)}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
            title={isLive ? 'Mettre en pause' : 'Reprendre'}
          >
            <Icon name={isLive ? 'Pause' : 'Play'} size={18} strokeWidth={2} />
          </button>

          <button
            type="button"
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
            title="Télécharger les données"
          >
            <Icon name="Download" size={18} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="p-4">
        {aggregatedData.length === 0 ? (
          <div className="flex items-center justify-center h-[400px] text-muted-foreground">
            <div className="text-center">
              <Icon name="LineChart" size={48} className="mx-auto mb-3 opacity-50" />
              <p className="text-sm">Chargement des données en temps réel...</p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={aggregatedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={formatXAxis}
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: '12px' }}
                label={{
                  value: 'kWh',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: '12px', fill: 'var(--color-muted-foreground)' },
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '12px' }}
                iconType="line"
                iconSize={12}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={false}
                name="Consommation"
                animationDuration={300}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default RealTimeChart;
