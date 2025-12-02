import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import type { MaintenanceSchedule, MaintenanceFilter } from '../types';

interface MaintenanceScheduleViewProps {
  schedules: MaintenanceSchedule[];
}

const MaintenanceScheduleView = ({ schedules }: MaintenanceScheduleViewProps) => {
  const [selectedFilter, setSelectedFilter] = useState<MaintenanceFilter>('all');

  const filters: { value: MaintenanceFilter; label: string; icon: string }[] = [
    { value: 'all', label: 'Tous', icon: 'List' },
    { value: 'scheduled', label: 'Planifiés', icon: 'Calendar' },
    { value: 'in-progress', label: 'En cours', icon: 'Clock' },
    { value: 'overdue', label: 'En retard', icon: 'AlertCircle' },
  ];

  const getStatusColor = (status: MaintenanceSchedule['status']) => {
    switch (status) {
      case 'scheduled':
        return 'text-primary bg-primary/10';
      case 'in-progress':
        return 'text-warning bg-warning/10';
      case 'completed':
        return 'text-success bg-success/10';
      case 'overdue':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status: MaintenanceSchedule['status']) => {
    switch (status) {
      case 'scheduled':
        return 'Calendar';
      case 'in-progress':
        return 'Clock';
      case 'completed':
        return 'CheckCircle';
      case 'overdue':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  const getTypeIcon = (type: MaintenanceSchedule['type']) => {
    switch (type) {
      case 'preventive':
        return 'Shield';
      case 'corrective':
        return 'Wrench';
      case 'inspection':
        return 'Search';
      default:
        return 'Tool';
    }
  };

  const getPriorityColor = (priority: MaintenanceSchedule['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const filteredSchedules = schedules.filter((schedule) => {
    switch (selectedFilter) {
      case 'scheduled':
        return schedule.status === 'scheduled';
      case 'in-progress':
        return schedule.status === 'in-progress';
      case 'overdue':
        return schedule.status === 'overdue';
      default:
        return true;
    }
  });

  const upcomingCount = schedules.filter((s) => s.status === 'scheduled').length;
  const overdueCount = schedules.filter((s) => s.status === 'overdue').length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Planning de maintenance
          </h3>
          <p className="text-sm text-muted-foreground">
            {upcomingCount} à venir
            {overdueCount > 0 && ` • ${overdueCount} en retard`}
          </p>
        </div>

        <Button variant="default" iconName="Plus" iconPosition="left">
          Planifier maintenance
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setSelectedFilter(filter.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              selectedFilter === filter.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <Icon name={filter.icon} size={16} strokeWidth={2} />
            <span>{filter.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredSchedules.map((schedule) => (
          <div
            key={schedule.id}
            className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-all duration-200"
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg ${getStatusColor(
                  schedule.status
                )}`}
              >
                <Icon
                  name={getStatusIcon(schedule.status)}
                  size={20}
                  strokeWidth={2}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(
                          schedule.status
                        )}`}
                      >
                        {schedule.status === 'scheduled' && 'Planifié'}
                        {schedule.status === 'in-progress' && 'En cours'}
                        {schedule.status === 'completed' && 'Terminé'}
                        {schedule.status === 'overdue' && 'En retard'}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Icon name={getTypeIcon(schedule.type)} size={12} strokeWidth={2} />
                        <span className="capitalize">{schedule.type}</span>
                      </div>
                      <div
                        className={`flex items-center gap-1 text-xs ${getPriorityColor(
                          schedule.priority
                        )}`}
                      >
                        <Icon name="Flag" size={12} strokeWidth={2} />
                        <span className="capitalize">{schedule.priority}</span>
                      </div>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">
                      {schedule.equipmentName}
                    </h4>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Icon
                      name="Calendar"
                      size={14}
                      className="text-muted-foreground"
                      strokeWidth={2}
                    />
                    <div>
                      <p className="text-xs text-muted-foreground">Date</p>
                      <p className="text-foreground font-medium">
                        {schedule.scheduledDate.toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Icon
                      name="Clock"
                      size={14}
                      className="text-muted-foreground"
                      strokeWidth={2}
                    />
                    <div>
                      <p className="text-xs text-muted-foreground">Durée</p>
                      <p className="text-foreground font-medium">
                        {schedule.duration}h
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Icon
                      name="User"
                      size={14}
                      className="text-muted-foreground"
                      strokeWidth={2}
                    />
                    <div>
                      <p className="text-xs text-muted-foreground">Technicien</p>
                      <p className="text-foreground font-medium">
                        {schedule.technician}
                      </p>
                    </div>
                  </div>
                </div>

                {schedule.notes && (
                  <div className="p-3 bg-muted/50 rounded-md mb-3">
                    <p className="text-xs text-muted-foreground mb-1">Notes</p>
                    <p className="text-sm text-foreground">{schedule.notes}</p>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" iconName="Eye">
                    Détails
                  </Button>
                  {schedule.status === 'scheduled' && (
                    <>
                      <Button variant="outline" size="sm" iconName="Edit">
                        Modifier
                      </Button>
                      <Button variant="outline" size="sm" iconName="Play">
                        Démarrer
                      </Button>
                    </>
                  )}
                  {schedule.status === 'in-progress' && (
                    <Button variant="success" size="sm" iconName="CheckCircle">
                      Terminer
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSchedules.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Icon
            name="Calendar"
            size={48}
            className="text-muted-foreground mb-4"
            strokeWidth={1.5}
          />
          <p className="text-sm text-muted-foreground">
            Aucune maintenance trouvée
          </p>
        </div>
      )}
    </div>
  );
};

export default MaintenanceScheduleView;