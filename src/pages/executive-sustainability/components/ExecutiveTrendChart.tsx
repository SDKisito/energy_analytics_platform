import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,  } from 'recharts';
import { ExecutiveTrendData } from '../types';

interface ExecutiveTrendChartProps {
  data: ExecutiveTrendData[];
}

const ExecutiveTrendChart = ({ data }: ExecutiveTrendChartProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Tendances Stratégiques
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Évolution des indicateurs clés de performance
          </p>
        </div>
      </div>

      <div className="w-full h-[400px]" aria-label="Executive Sustainability Trends Chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="month"
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              yAxisId="left"
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
              label={{
                value: 'Coûts (k€)',
                angle: -90,
                position: 'insideLeft',
                style: { fontSize: '12px', fill: 'var(--color-muted-foreground)' },
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
              label={{
                value: 'Réduction (%)',
                angle: 90,
                position: 'insideRight',
                style: { fontSize: '12px', fill: 'var(--color-muted-foreground)' },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                fontSize: '12px',
              }}
              formatter={(value: number, name: string) => {
                if (name === 'Coûts énergétiques') {
                  return [`${value.toLocaleString('fr-FR')} k€`, name];
                }
                return [`${value.toLocaleString('fr-FR')}%`, name];
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px' }}
              iconType="line"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="cost"
              name="Coûts énergétiques"
              stroke="var(--color-primary)"
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="carbonReduction"
              name="Réduction carbone"
              stroke="var(--color-success)"
              strokeWidth={3}
              dot={{ fill: 'var(--color-success)', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Économies totales</p>
          <p className="text-2xl font-bold text-success">
            {data.reduce((acc, curr) => acc + curr.cost, 0).toLocaleString('fr-FR')} k€
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Réduction moyenne</p>
          <p className="text-2xl font-bold text-primary">
            {(data.reduce((acc, curr) => acc + curr.carbonReduction, 0) / data.length).toFixed(1)}%
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Tendance</p>
          <p className="text-2xl font-bold text-accent">Positive</p>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveTrendChart;