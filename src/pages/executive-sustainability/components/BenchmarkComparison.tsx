import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Icon from '../../../components/AppIcon';
import { BenchmarkData } from '../types';

interface BenchmarkComparisonProps {
  data: BenchmarkData[];
}

const BenchmarkComparison = ({ data }: BenchmarkComparisonProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Analyse Comparative
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Performance vs références régionales et nationales
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 text-primary">
          <Icon name="Award" size={16} strokeWidth={2} />
          <span className="text-sm font-medium">Top 15%</span>
        </div>
      </div>

      <div className="w-full h-[350px]" aria-label="Benchmark Comparison Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="category"
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '11px' }}
              angle={-15}
              textAnchor="end"
              height={80}
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
              formatter={(value: number, name: string) => [
                `${value.toLocaleString('fr-FR')}`,
                name,
              ]}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px' }}
              iconType="rect"
            />
            <Bar
              dataKey="departmental"
              name="Départemental"
              fill="var(--color-primary)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="regional"
              name="Régional"
              fill="var(--color-secondary)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="national"
              name="National"
              fill="var(--color-accent)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-sm bg-primary" />
            <span className="text-xs text-muted-foreground">Départemental</span>
          </div>
          <p className="text-lg font-bold text-foreground">Leader</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-sm bg-secondary" />
            <span className="text-xs text-muted-foreground">Régional</span>
          </div>
          <p className="text-lg font-bold text-foreground">+12%</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-sm bg-accent" />
            <span className="text-xs text-muted-foreground">National</span>
          </div>
          <p className="text-lg font-bold text-foreground">+18%</p>
        </div>
      </div>
    </div>
  );
};

export default BenchmarkComparison;