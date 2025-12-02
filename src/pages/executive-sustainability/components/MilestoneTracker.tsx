import React from 'react';
import Icon from '../../../components/AppIcon';
import { SustainabilityMilestone } from '../types';

interface MilestoneTrackerProps {
  milestones: SustainabilityMilestone[];
}

const MilestoneTracker = ({ milestones }: MilestoneTrackerProps) => {
  const getStatusConfig = (status: SustainabilityMilestone['status']) => {
    switch (status) {
      case 'completed':
        return {
          color: 'text-success bg-success/10',
          icon: 'CheckCircle',
          label: 'Terminé',
        };
      case 'in-progress':
        return {
          color: 'text-primary bg-primary/10',
          icon: 'Clock',
          label: 'En cours',
        };
      case 'delayed':
        return {
          color: 'text-warning bg-warning/10',
          icon: 'AlertTriangle',
          label: 'Retardé',
        };
      default:
        return {
          color: 'text-muted-foreground bg-muted',
          icon: 'Circle',
          label: 'Planifié',
        };
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Jalons Stratégiques
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Initiatives durabilité en cours
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 text-primary">
          <Icon name="Target" size={16} strokeWidth={2} />
          <span className="text-sm font-medium">
            {milestones.filter(m => m.status === 'completed').length}/{milestones.length}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {milestones.map((milestone, index) => {
          const config = getStatusConfig(milestone.status);
          return (
            <div key={milestone.id} className="relative">
              {index < milestones.length - 1 && (
                <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-border" />
              )}
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 p-2 rounded-full ${config.color} relative z-10`}>
                  <Icon name={config.icon} size={16} strokeWidth={2} />
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-foreground mb-1">
                        {milestone.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${config.color} ml-2`}>
                      {config.label}
                    </span>
                  </div>

                  <div className="space-y-2 mt-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Progression</span>
                      <span className="font-medium text-foreground">{milestone.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          milestone.progress >= 100
                            ? 'bg-success'
                            : milestone.progress >= 75
                            ? 'bg-primary' :'bg-warning'
                        }`}
                        style={{ width: `${milestone.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                      <Icon name="Calendar" size={12} strokeWidth={2} />
                      <span>Date cible: {formatDate(milestone.targetDate)}</span>
                    </div>
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
        Voir la feuille de route complète
      </button>
    </div>
  );
};

export default MilestoneTracker;