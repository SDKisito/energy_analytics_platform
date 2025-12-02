import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';
import { ExportOptions } from '../types';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (options: ExportOptions) => void;
  className?: string;
}

const ExportReportModal = ({
  isOpen,
  onClose,
  onExport,
  className = '',
}: ExportReportModalProps) => {
  const [format, setFormat] = useState<'html' | 'pdf'>('pdf');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeMetrics, setIncludeMetrics] = useState(true);
  const [includeRiskAnalysis, setIncludeRiskAnalysis] = useState(true);
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const handleExport = () => {
    const options: ExportOptions = {
      format,
      includeCharts,
      includeMetrics,
      includeRiskAnalysis,
      dateRange: {
        start: new Date(startDate),
        end: new Date(endDate),
      },
    };
    onExport(options);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-[200]"
        onClick={onClose}
      />
      <div className={`fixed inset-0 flex items-center justify-center z-[201] p-4 ${className}`}>
        <div className="bg-card rounded-lg border border-border shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <Icon name="Download" size={20} className="text-primary" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Exporter le Rapport
                </h3>
                <p className="text-sm text-muted-foreground">
                  Configurez les options d'export
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
            >
              <Icon name="X" size={20} strokeWidth={2} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Format d'export
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormat('pdf')}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    format === 'pdf' ?'border-primary bg-primary/10' :'border-border hover:border-primary/50'
                  }`}
                >
                  <Icon
                    name="FileText"
                    size={24}
                    className={format === 'pdf' ? 'text-primary' : 'text-muted-foreground'}
                    strokeWidth={2}
                  />
                  <p className="text-sm font-medium text-foreground mt-2">PDF</p>
                </button>
                <button
                  type="button"
                  onClick={() => setFormat('html')}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    format === 'html' ?'border-primary bg-primary/10' :'border-border hover:border-primary/50'
                  }`}
                >
                  <Icon
                    name="Code"
                    size={24}
                    className={format === 'html' ? 'text-primary' : 'text-muted-foreground'}
                    strokeWidth={2}
                  />
                  <p className="text-sm font-medium text-foreground mt-2">HTML</p>
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Contenu du rapport
              </label>
              <div className="space-y-3">
                <Checkbox
                  label="Inclure les graphiques de prévision"
                  checked={includeCharts}
                  onChange={(e) => setIncludeCharts(e.target.checked)}
                />
                <Checkbox
                  label="Inclure les métriques du modèle"
                  checked={includeMetrics}
                  onChange={(e) => setIncludeMetrics(e.target.checked)}
                />
                <Checkbox
                  label="Inclure l'analyse des risques"
                  checked={includeRiskAnalysis}
                  onChange={(e) => setIncludeRiskAnalysis(e.target.checked)}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Période de données
              </label>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="date"
                  label="Date de début"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <Input
                  type="date"
                  label="Date de fin"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 p-6 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              variant="default"
              onClick={handleExport}
              iconName="Download"
              iconPosition="left"
              className="flex-1"
            >
              Exporter
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExportReportModal;