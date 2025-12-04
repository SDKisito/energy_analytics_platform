import jsPDF from "jspdf";
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

interface ReportGeneratorProps {
  className?: string;
}

const ReportGenerator = ({ className = '' }: ReportGeneratorProps) => {
  const [reportType, setReportType] = useState<string>('monthly');
  const [reportFormat, setReportFormat] = useState<string>('pdf');
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    { value: 'monthly', label: 'Rapport Mensuel', description: 'Synthèse mensuelle complète' },
    { value: 'quarterly', label: 'Rapport Trimestriel', description: 'Analyse trimestrielle détaillée' },
    { value: 'annual', label: 'Rapport Annuel', description: 'Bilan annuel stratégique' },
    { value: 'custom', label: 'Rapport Personnalisé', description: 'Période personnalisée' },
  ];

  const reportFormats = [
    { value: 'pdf', label: 'PDF', description: 'Format imprimable' },
    { value: 'html', label: 'HTML', description: 'Format web interactif' },
    { value: 'excel', label: 'Excel', description: 'Données exportables' },
  ];

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert(`Rapport ${reportTypes.find(r => r.value === reportType)?.label} généré avec succès au format ${reportFormat.toUpperCase()}`);
    }, 2000);
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Icon name="FileText" size={20} strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Génération de Rapports
          </h3>
          <p className="text-sm text-muted-foreground">
            Rapports exécutifs automatisés
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Select
          label="Type de rapport"
          options={reportTypes}
          value={reportType}
          onChange={setReportType}
          placeholder="Sélectionner le type"
        />

        <Select
          label="Format de sortie"
          options={reportFormats}
          value={reportFormat}
          onChange={setReportFormat}
          placeholder="Sélectionner le format"
        />

        <Button
          variant="default"
          fullWidth
          loading={isGenerating}
          iconName="Download"
          iconPosition="left"
          onClick={handleGenerateReport}
        >
          {isGenerating ? 'Génération en cours...' : 'Générer le rapport'}
        </Button>
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">
          Rapports récents
        </h4>
        <div className="space-y-2">
          {[
            { name: 'Rapport Mensuel - Décembre 2024', date: '01/01/2025', size: '2.4 MB' },
            { name: 'Rapport Trimestriel - Q4 2024', date: '28/12/2024', size: '5.1 MB' },
            { name: 'Rapport Annuel - 2024', date: '15/12/2024', size: '8.7 MB' },
          ].map((report, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-md hover:bg-muted transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <Icon name="FileText" size={16} className="text-muted-foreground" strokeWidth={2} />
                <div>
                  <p className="text-sm font-medium text-foreground">{report.name}</p>
                  <p className="text-xs text-muted-foreground">{report.date} • {report.size}</p>
                </div>
              </div>
              <button
                type="button"
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                title="Télécharger"
              >
                <Icon name="Download" size={16} strokeWidth={2} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;
