import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { ExportOptions } from '../types';

interface ExportPanelProps {
  onExport: (options: ExportOptions) => void;
  className?: string;
}

const ExportPanel = ({ onExport, className = '' }: ExportPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [format, setFormat] = useState<'pdf' | 'csv' | 'excel'>('pdf');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeAlerts, setIncludeAlerts] = useState(true);
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    end: new Date(),
  });

  const handleExport = () => {
    onExport({
      format,
      dateRange,
      includeCharts,
      includeAlerts,
    });
    setIsOpen(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        iconName="Download"
        iconPosition="left"
        onClick={() => setIsOpen(!isOpen)}
      >
        Exporter
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[105]"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-[110] p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">
                Exporter les données
              </h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
              >
                <Icon name="X" size={16} strokeWidth={2} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-foreground mb-2">
                  Format d'export
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['pdf', 'csv', 'excel'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setFormat(fmt)}
                      className={`px-3 py-2 text-xs font-medium rounded-md transition-all duration-200 ${
                        format === fmt
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {fmt.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-2">
                  Période
                </label>
                <div className="space-y-2">
                  <input
                    type="date"
                    value={dateRange.start.toISOString().split('T')[0]}
                    onChange={(e) =>
                      setDateRange({
                        ...dateRange,
                        start: new Date(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="date"
                    value={dateRange.end.toISOString().split('T')[0]}
                    onChange={(e) =>
                      setDateRange({
                        ...dateRange,
                        end: new Date(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeCharts}
                    onChange={(e) => setIncludeCharts(e.target.checked)}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-xs text-foreground">
                    Inclure les graphiques
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeAlerts}
                    onChange={(e) => setIncludeAlerts(e.target.checked)}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-xs text-foreground">
                    Inclure les alertes
                  </span>
                </label>
              </div>

              <div className="pt-4 border-t border-border">
                <Button
                  variant="default"
                  fullWidth
                  iconName="Download"
                  iconPosition="left"
                  onClick={handleExport}
                >
                  Exporter
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExportPanel;