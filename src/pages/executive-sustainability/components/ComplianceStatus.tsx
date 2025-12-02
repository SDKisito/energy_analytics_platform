import React from 'react';
import Icon from '../../../components/AppIcon';
import { ComplianceItem } from '../types';

interface ComplianceStatusProps {
  items: ComplianceItem[];
}

const ComplianceStatus = ({ items }: ComplianceStatusProps) => {
  const getStatusConfig = (status: ComplianceItem['status']) => {
    switch (status) {
      case 'compliant':
        return {
          color: 'text-success bg-success/10',
          icon: 'CheckCircle',
          label: 'Conforme',
        };
      case 'pending':
        return {
          color: 'text-warning bg-warning/10',
          icon: 'Clock',
          label: 'En cours',
        };
      case 'non-compliant':
        return {
          color: 'text-error bg-error/10',
          icon: 'AlertCircle',
          label: 'Non conforme',
        };
      default:
        return {
          color: 'text-muted-foreground bg-muted',
          icon: 'Info',
          label: 'Inconnu',
        };
    }
  };

  const formatDeadline = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diff < 0) return 'Échéance dépassée';
    if (diff === 0) return "Aujourd'hui";
    if (diff === 1) return 'Demain';
    if (diff < 30) return `${diff} jours`;
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Conformité Réglementaire
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Suivi des obligations légales
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-success/10 text-success">
          <Icon name="Shield" size={16} strokeWidth={2} />
          <span className="text-sm font-medium">
            {items.filter(i => i.status === 'compliant').length}/{items.length}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item) => {
          const config = getStatusConfig(item.status);
          return (
            <div
              key={item.id}
              className="p-4 border border-border rounded-lg hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`p-2 rounded-md ${config.color}`}>
                    <Icon name={config.icon} size={18} strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground mb-1">
                      {item.regulation}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${config.color}`}>
                  {config.label}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progression</span>
                  <span className="font-medium text-foreground">{item.progress}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      item.progress >= 100
                        ? 'bg-success'
                        : item.progress >= 75
                        ? 'bg-primary' :'bg-warning'
                    }`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                  <div className="flex items-center gap-1">
                    <Icon name="Calendar" size={12} strokeWidth={2} />
                    <span>Échéance: {formatDeadline(item.deadline)}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="w-full mt-4 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-md transition-all duration-200"
      >
        Voir tous les rapports de conformité
      </button>
    </div>
  );
};

export default ComplianceStatus;