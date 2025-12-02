import React from 'react';
import Icon from '../../../components/AppIcon';
import type { FacilityMetadata } from '../types';

interface FacilityOverviewCardProps {
  facility: FacilityMetadata;
}

const FacilityOverviewCard = ({ facility }: FacilityOverviewCardProps) => {
  const getStatusColor = (status: FacilityMetadata['operationalStatus']) => {
    switch (status) {
      case 'operational':
        return 'text-success bg-success/10';
      case 'maintenance':
        return 'text-warning bg-warning/10';
      case 'offline':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status: FacilityMetadata['operationalStatus']) => {
    switch (status) {
      case 'operational':
        return 'CheckCircle';
      case 'maintenance':
        return 'AlertTriangle';
      case 'offline':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const occupancyPercentage = (facility.occupancy / facility.maxOccupancy) * 100;

  return (
    <div className="bg-card border border-border rounded-lg p-6 h-full">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {facility.name}
          </h3>
          <p className="text-sm text-muted-foreground">{facility.type}</p>
        </div>
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getStatusColor(
            facility.operationalStatus
          )}`}
        >
          <Icon
            name={getStatusIcon(facility.operationalStatus)}
            size={16}
            strokeWidth={2}
          />
          <span className="text-xs font-medium capitalize">
            {facility.operationalStatus}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Icon name="MapPin" size={20} className="text-primary" strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground mb-0.5">Adresse</p>
            <p className="text-sm text-foreground truncate">{facility.address}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-muted/50 rounded-md">
            <div className="flex items-center gap-2 mb-1">
              <Icon
                name="Maximize"
                size={14}
                className="text-muted-foreground"
                strokeWidth={2}
              />
              <p className="text-xs text-muted-foreground">Surface</p>
            </div>
            <p className="text-base font-semibold text-foreground">
              {facility.squareFootage.toLocaleString('fr-FR')} m²
            </p>
          </div>

          <div className="p-3 bg-muted/50 rounded-md">
            <div className="flex items-center gap-2 mb-1">
              <Icon
                name="Users"
                size={14}
                className="text-muted-foreground"
                strokeWidth={2}
              />
              <p className="text-xs text-muted-foreground">Occupation</p>
            </div>
            <p className="text-base font-semibold text-foreground">
              {facility.occupancy}/{facility.maxOccupancy}
            </p>
            <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${occupancyPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Gestionnaire:</span>
            <span className="text-foreground font-medium">
              {facility.buildingManager}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Contact:</span>
            <span className="text-foreground font-medium">
              {facility.contactPhone}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Dernière inspection:</span>
            <span className="text-foreground font-medium">
              {facility.lastInspection.toLocaleDateString('fr-FR')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityOverviewCard;