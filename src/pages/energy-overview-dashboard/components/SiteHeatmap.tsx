import React, { useState, useEffect } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import { SiteHeatmapData } from '../types';

interface SiteHeatmapProps {
  sites: SiteHeatmapData[];
  className?: string;
}

interface SparklineData {
  value: number;
}

const SiteHeatmap = ({ sites, className = '' }: SiteHeatmapProps) => {
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [sparklineData, setSparklineData] = useState<Record<string, SparklineData[]>>({});

  // Générer des données de mini-graphiques pour chaque site
  useEffect(() => {
    const generateSparklineData = () => {
      const data: Record<string, SparklineData[]> = {};
      sites.forEach((site) => {
        const points: SparklineData[] = [];
        const baseValue = site.consumption;
        for (let i = 0; i < 12; i++) {
          const variation = (Math.random() - 0.5) * (baseValue * 0.2);
          points.push({ value: baseValue + variation });
        }
        data[site.id] = points;
      });
      return data;
    };

    setSparklineData(generateSparklineData());

    // Mise à jour périodique
    const interval = setInterval(() => {
      setSparklineData((prev) => {
        const newData = { ...prev };
        sites.forEach((site) => {
          if (newData[site.id]) {
            const lastValue = newData[site.id][newData[site.id].length - 1].value;
            const variation = (Math.random() - 0.5) * (site.consumption * 0.15);
            newData[site.id] = [
              ...newData[site.id].slice(1),
              { value: lastValue + variation },
            ];
          }
        });
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [sites]);

  const getIntensityColor = (intensity: number) => {
    if (intensity >= 80) return 'bg-error';
    if (intensity >= 60) return 'bg-warning';
    if (intensity >= 40) return 'bg-accent';
    return 'bg-success';
  };

  const getStatusIcon = (status: SiteHeatmapData['status']) => {
    switch (status) {
      case 'critical':
        return 'AlertCircle';
      case 'warning':
        return 'AlertTriangle';
      default:
        return 'CheckCircle';
    }
  };

  const getStatusColor = (status: SiteHeatmapData['status']) => {
    switch (status) {
      case 'critical':
        return 'text-error';
      case 'warning':
        return 'text-warning';
      default:
        return 'text-success';
    }
  };

  const maxConsumption = Math.max(...sites.map((s) => s.consumption));

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">
          Carte thermique des sites
        </h3>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-all duration-200 ${
              viewMode === 'grid' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
            title="Vue grille"
          >
            <Icon name="LayoutGrid" size={18} strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => setViewMode('map')}
            className={`p-2 rounded-md transition-all duration-200 ${
              viewMode === 'map' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
            title="Vue carte"
          >
            <Icon name="Map" size={18} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="p-4">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sites.map((site) => {
              const heightPercentage = (site.consumption / maxConsumption) * 100;
              const siteSparkline = sparklineData[site.id] || [];
              return (
                <div
                  key={site.id}
                  onClick={() => setSelectedSite(site.id)}
                  className={`bg-background border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedSite === site.id
                      ? 'border-primary' :'border-border'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-foreground mb-1">
                        {site.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {site.area.toLocaleString('fr-FR')} m²
                      </p>
                    </div>
                    <Icon
                      name={getStatusIcon(site.status)}
                      size={18}
                      className={getStatusColor(site.status)}
                      strokeWidth={2}
                    />
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Consommation
                      </span>
                      <span className="font-semibold text-foreground">
                        {site.consumption.toLocaleString('fr-FR')} kWh
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Intensité</span>
                      <span className="font-semibold text-foreground">
                        {site.intensity}%
                      </span>
                    </div>
                  </div>

                  {/* Mini graphique de tendance */}
                  {siteSparkline.length > 0 && (
                    <div className="mb-3 h-12 bg-muted/30 rounded">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={siteSparkline}>
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke={
                              site.intensity >= 80
                                ? 'hsl(var(--error))'
                                : site.intensity >= 60
                                ? 'hsl(var(--warning))'
                                : 'hsl(var(--primary))'
                            }
                            strokeWidth={2}
                            dot={false}
                            animationDuration={300}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getIntensityColor(
                        site.intensity
                      )} transition-all duration-500`}
                      style={{ width: `${heightPercentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="relative w-full h-[400px] bg-muted rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Sites énergétiques"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=43.1242,5.9280&z=12&output=embed"
              className="border-0"
            />
            <div className="absolute top-4 right-4 bg-card border border-border rounded-lg p-3 shadow-lg">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 bg-success rounded-full" />
                  <span className="text-muted-foreground">Normal</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 bg-warning rounded-full" />
                  <span className="text-muted-foreground">Attention</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 bg-error rounded-full" />
                  <span className="text-muted-foreground">Critique</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedSite && (
        <div className="p-4 border-t border-border bg-muted/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon
                name="MapPin"
                size={18}
                className="text-primary"
                strokeWidth={2}
              />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {sites.find((s) => s.id === selectedSite)?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Cliquez pour voir les détails
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedSite(null)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
            >
              <Icon name="X" size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteHeatmap;
