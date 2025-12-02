import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import type { EquipmentItem, EquipmentCategory } from '../types';

interface EquipmentPerformanceMatrixProps {
  equipment: EquipmentItem[];
  onEquipmentSelect: (equipmentId: string) => void;
}

const EquipmentPerformanceMatrix = ({
  equipment,
  onEquipmentSelect,
}: EquipmentPerformanceMatrixProps) => {
  const [selectedCategory, setSelectedCategory] =
    useState<EquipmentCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { value: EquipmentCategory; label: string; icon: string }[] = [
    { value: 'all', label: 'Tous', icon: 'Grid3x3' },
    { value: 'hvac', label: 'CVC', icon: 'Wind' },
    { value: 'lighting', label: 'Éclairage', icon: 'Lightbulb' },
    { value: 'electrical', label: 'Électrique', icon: 'Zap' },
    { value: 'water', label: 'Eau', icon: 'Droplet' },
    { value: 'other', label: 'Autre', icon: 'Package' },
  ];

  const getStatusColor = (status: EquipmentItem['status']) => {
    switch (status) {
      case 'operational':
        return 'text-success bg-success/10';
      case 'warning':
        return 'text-warning bg-warning/10';
      case 'critical':
        return 'text-error bg-error/10';
      case 'offline':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status: EquipmentItem['status']) => {
    switch (status) {
      case 'operational':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'critical':
        return 'AlertCircle';
      case 'offline':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const getCategoryIcon = (category: EquipmentItem['category']) => {
    const cat = categories.find((c) => c.value === category);
    return cat?.icon || 'Package';
  };

  const filteredEquipment = equipment.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const statusCounts = equipment.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Icon
              name="Search"
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              strokeWidth={2}
            />
            <input
              type="text"
              placeholder="Rechercher un équipement..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.value}
              type="button"
              onClick={() => setSelectedCategory(category.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                selectedCategory === category.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={category.icon} size={16} strokeWidth={2} />
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {Object.entries(statusCounts).map(([status, count]) => (
          <div
            key={status}
            className={`p-3 rounded-md ${getStatusColor(
              status as EquipmentItem['status']
            )}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon
                  name={getStatusIcon(status as EquipmentItem['status'])}
                  size={16}
                  strokeWidth={2}
                />
                <span className="text-xs font-medium capitalize">{status}</span>
              </div>
              <span className="text-lg font-bold">{count}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredEquipment.map((item) => (
          <div
            key={item.id}
            onClick={() => onEquipmentSelect(item.id)}
            className="bg-card border border-border rounded-lg p-4 hover:border-primary cursor-pointer transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                  <Icon
                    name={getCategoryIcon(item.category)}
                    size={20}
                    className="text-primary"
                    strokeWidth={2}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    {item.name}
                  </h4>
                  <p className="text-xs text-muted-foreground capitalize">
                    {item.category}
                  </p>
                </div>
              </div>
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-md ${getStatusColor(
                  item.status
                )}`}
              >
                <Icon name={getStatusIcon(item.status)} size={12} strokeWidth={2} />
                <span className="text-xs font-medium capitalize">{item.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="p-2 bg-muted/50 rounded-md">
                <p className="text-xs text-muted-foreground mb-0.5">Consommation</p>
                <p className="text-sm font-semibold text-foreground">
                  {item.consumption.toFixed(1)} kWh
                </p>
              </div>
              <div className="p-2 bg-muted/50 rounded-md">
                <p className="text-xs text-muted-foreground mb-0.5">Efficacité</p>
                <p className="text-sm font-semibold text-foreground">
                  {item.efficiency}%
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Icon name="Activity" size={12} strokeWidth={2} />
                <span>{item.sensorCount} capteurs</span>
              </div>
              {item.alerts > 0 && (
                <div className="flex items-center gap-1 text-error">
                  <Icon name="AlertCircle" size={12} strokeWidth={2} />
                  <span>{item.alerts} alertes</span>
                </div>
              )}
            </div>

            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Prochain entretien:</span>
              <span className="text-foreground font-medium">
                {item.nextMaintenance.toLocaleDateString('fr-FR')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredEquipment.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Icon
            name="Search"
            size={48}
            className="text-muted-foreground mb-4"
            strokeWidth={1.5}
          />
          <p className="text-sm text-muted-foreground">
            Aucun équipement trouvé
          </p>
        </div>
      )}
    </div>
  );
};

export default EquipmentPerformanceMatrix;