import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Icon from '../../../components/AppIcon';
import type { HourlyConsumption } from '../types';

interface HourlyConsumptionChartProps {
  data: HourlyConsumption[];
}

const HourlyConsumptionChart = ({ data }: HourlyConsumptionChartProps) => {
  const chartData = data.map((item) => ({
    time: item.timestamp.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    consumption: item.consumption,
    cost: item.cost,
    temperature: item.temperature,
    occupancy: item.occupancy,
  }));

  const totalConsumption = data.reduce((sum, item) => sum + item.consumption, 0);
  const totalCost = data.reduce((sum, item) => sum + item.cost, 0);
  const avgTemperature =
    data.reduce((sum, item) => sum + item.temperature, 0) / data.length;
  const avgOccupancy =
    data.reduce((sum, item) => sum + item.occupancy, 0) / data.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Tendances de consommation horaire
        </h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
            title="Exporter les données"
          >
            <Icon name="Download" size={18} strokeWidth={2} />
          </button>
          <button
            type="button"
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
            title="Actualiser"
          >
            <Icon name="RefreshCw" size={18} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3 bg-primary/10 rounded-md">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Zap" size={14} className="text-primary" strokeWidth={2} />
            <p className="text-xs text-muted-foreground">Consommation totale</p>
          </div>
          <p className="text-xl font-bold text-foreground">
            {totalConsumption.toFixed(1)}
          </p>
          <p className="text-xs text-muted-foreground">kWh</p>
        </div>

        <div className="p-3 bg-success/10 rounded-md">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Euro" size={14} className="text-success" strokeWidth={2} />
            <p className="text-xs text-muted-foreground">Coût total</p>
          </div>
          <p className="text-xl font-bold text-foreground">
            {totalCost.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground">€</p>
        </div>

        <div className="p-3 bg-warning/10 rounded-md">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Thermometer" size={14} className="text-warning" strokeWidth={2} />
            <p className="text-xs text-muted-foreground">Température moyenne</p>
          </div>
          <p className="text-xl font-bold text-foreground">
            {avgTemperature.toFixed(1)}
          </p>
          <p className="text-xs text-muted-foreground">°C</p>
        </div>

        <div className="p-3 bg-accent/10 rounded-md">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Users" size={14} className="text-accent" strokeWidth={2} />
            <p className="text-xs text-muted-foreground">Occupation moyenne</p>
          </div>
          <p className="text-xl font-bold text-foreground">
            {avgOccupancy.toFixed(0)}
          </p>
          <p className="text-xs text-muted-foreground">personnes</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="consumptionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="time"
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                fontSize: '12px',
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px' }}
              iconType="circle"
            />
            <Area
              type="monotone"
              dataKey="consumption"
              stroke="var(--color-primary)"
              fill="url(#consumptionGradient)"
              strokeWidth={2}
              name="Consommation (kWh)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="time"
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              yAxisId="left"
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                fontSize: '12px',
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px' }}
              iconType="circle"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="temperature"
              stroke="var(--color-warning)"
              strokeWidth={2}
              dot={false}
              name="Température (°C)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="occupancy"
              stroke="var(--color-accent)"
              strokeWidth={2}
              dot={false}
              name="Occupation"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HourlyConsumptionChart;