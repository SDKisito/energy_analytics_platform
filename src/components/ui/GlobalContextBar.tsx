import React, { useState, useEffect } from 'react';
import Select from './Select';
import Icon from '../AppIcon';

interface Facility {
  value: string;
  label: string;
  description?: string;
}

interface TimeRange {
  value: string;
  label: string;
}

interface GlobalContextBarProps {
  className?: string;
}

const GlobalContextBar = ({ className = '' }: GlobalContextBarProps) => {
  const [selectedFacility, setSelectedFacility] = useState<string>('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('24h');
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const facilities: Facility[] = [
    { value: 'all', label: 'All Facilities', description: 'Municipal overview' },
    {
      value: 'city-hall',
      label: 'City Hall',
      description: 'Administrative center',
    },
    {
      value: 'sports-complex',
      label: 'Sports Complex',
      description: 'Recreation facility',
    },
    {
      value: 'library',
      label: 'Public Library',
      description: 'Cultural center',
    },
    {
      value: 'school-district',
      label: 'School District',
      description: 'Educational facilities',
    },
  ];

  const timeRanges: TimeRange[] = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: 'custom', label: 'Custom Range' },
  ];

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastUpdate(new Date());
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const formatLastUpdate = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      className={`lg:fixed top-[60px] left-0 right-0 z-[90] bg-card border-b border-border ${className}`}
    >
      <div className="flex flex-wrap items-center gap-4 px-6 py-3">
        <div className="flex items-center gap-2 min-w-[200px]">
          <Icon
            name="Building2"
            size={18}
            className="text-muted-foreground"
            strokeWidth={2}
          />
          <Select
            options={facilities}
            value={selectedFacility}
            onChange={setSelectedFacility}
            placeholder="Select facility"
            className="flex-1"
          />
        </div>

        <div className="flex items-center gap-2 min-w-[180px]">
          <Icon
            name="Clock"
            size={18}
            className="text-muted-foreground"
            strokeWidth={2}
          />
          <Select
            options={timeRanges}
            value={selectedTimeRange}
            onChange={setSelectedTimeRange}
            placeholder="Select time range"
            className="flex-1"
          />
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <button
            type="button"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              autoRefresh
                ? 'bg-success/10 text-success hover:bg-success/20' :'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
            title={autoRefresh ? 'Auto-refresh enabled' : 'Auto-refresh disabled'}
          >
            <Icon
              name={autoRefresh ? 'RefreshCw' : 'Pause'}
              size={16}
              strokeWidth={2}
              className={autoRefresh ? 'animate-spin' : ''}
            />
            <span className="hidden sm:inline">
              {autoRefresh ? 'Auto' : 'Paused'}
            </span>
          </button>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Icon name="Clock" size={14} strokeWidth={2} />
            <span>Updated {formatLastUpdate(lastUpdate)}</span>
          </div>

          <button
            type="button"
            onClick={() => setLastUpdate(new Date())}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
            title="Refresh now"
          >
            <Icon name="RotateCw" size={18} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalContextBar;