import React, { useMemo } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from 'recharts';
import { ForecastDataPoint } from '../types';

interface ForecastChartProps {
  data: ForecastDataPoint[];
  showConfidenceBands: boolean;
  className?: string;
}

const ForecastChart = ({
  data,
  showConfidenceBands,
  className = '',
}: ForecastChartProps) => {
  const formatDate = (date: Date) => {
    try {
      // Ensure date is a valid Date object
      const validDate = date instanceof Date ? date : new Date(date);
      
      if (isNaN(validDate.getTime())) {
        return 'Date invalide';
      }
      
      return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: 'short',
      }).format(validDate);
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Date invalide';
    }
  };

  const formatValue = (value: number) => {
    if (value == null || isNaN(value)) {
      return '0 kWh';
    }
    return `${value.toFixed(0)} kWh`;
  };

  // Validate and transform data with comprehensive error handling
  const chartData = React.useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return [];
    }

    try {
      return data.map((point) => {
        // Validate point exists
        if (!point) {
          return null;
        }

        return {
          date: formatDate(point.timestamp),
          actual: point.actual ?? null,
          predicted: point.predicted ?? 0,
          lowerBound: showConfidenceBands ? (point.lowerBound ?? null) : null,
          upperBound: showConfidenceBands ? (point.upperBound ?? null) : null,
        };
      }).filter((point) => point !== null); // Remove any null entries
    } catch (error) {
      console.error('Chart data transformation error:', error);
      return [];
    }
  }, [data, showConfidenceBands]);

  // Show empty state if no valid data
  if (chartData.length === 0) {
    return (
      <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Prévisions de Consommation
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Données historiques et prévisions avec intervalles de confiance
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center h-[400px] text-muted-foreground">
          <p>Aucune donnée de prévision disponible</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Prévisions de Consommation
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Données historiques et prévisions avec intervalles de confiance
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
            dataKey="date"
            stroke="var(--color-muted-foreground)"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="var(--color-muted-foreground)"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `${value} kWh`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
            }}
            formatter={(value: number) => formatValue(value)}
          />
          <Legend />

          {showConfidenceBands && (
            <Area
              type="monotone"
              dataKey="upperBound"
              stroke="none"
              fill="var(--color-primary)"
              fillOpacity={0.1}
              name="Intervalle de confiance"
            />
          )}

          {showConfidenceBands && (
            <Area
              type="monotone"
              dataKey="lowerBound"
              stroke="none"
              fill="var(--color-primary)"
              fillOpacity={0.1}
            />
          )}

          <Line
            type="monotone"
            dataKey="actual"
            stroke="var(--color-accent)"
            strokeWidth={2}
            dot={{ r: 3 }}
            name="Consommation réelle"
            connectNulls
          />

          <Line
            type="monotone"
            dataKey="predicted"
            stroke="var(--color-primary)"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 3 }}
            name="Prévision"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastChart;