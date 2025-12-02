import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import AppImage from '../AppImage';

interface HeaderProps {
  className?: string;
}

interface NavItem {
  label: string;
  path: string;
  icon: string;
  tooltip: string;
}

const Header = ({ className = '' }: HeaderProps) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      label: 'Vue d\'ensemble',
      path: '/energy-overview-dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Centre de surveillance en temps réel',
    },
    {
      label: 'Analyses',
      path: '/predictive-analytics-hub',
      icon: 'TrendingUp',
      tooltip: 'Modélisation prédictive et prévisions',
    },
    {
      label: 'Sites',
      path: '/site-performance-monitor',
      icon: 'Building2',
      tooltip: 'Surveillance des performances par site',
    },
    {
      label: 'Durabilité',
      path: '/executive-sustainability',
      icon: 'Leaf',
      tooltip: 'Tableau de bord exécutif pour les rapports stratégiques',
    },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <header
      className={`sticky top-0 z-[100] bg-card border-b border-border ${className}`}
    >
      <div className="flex items-center h-[60px] px-6">
        <Link
          to="/energy-overview-dashboard"
          className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-80"
        >
          <div className="flex items-center justify-center w-10 h-10">
            <AppImage 
              src="/assets/images/favicon-1764675826789.png"
              alt="Logo Métropole Toulon Provence Méditerranée"
              className="w-10 h-10 object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-foreground leading-tight">
              Plateforme Énergétique
            </span>
            <span className="text-xs text-muted-foreground leading-tight">
              Métropole TPM
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-2 ml-12">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`group relative flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
                isActivePath(item.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={item.tooltip}
            >
              <Icon
                name={item.icon}
                size={18}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:scale-110"
              />
              <span className="text-sm font-medium">{item.label}</span>
              {isActivePath(item.path) && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 ml-auto">
          <button
            type="button"
            className="relative p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
            title="Notifications"
          >
            <Icon name="Bell" size={20} strokeWidth={2} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
          </button>

          <button
            type="button"
            className="flex items-center gap-2 p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
            title="Menu utilisateur"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Icon name="User" size={16} color="white" strokeWidth={2} />
            </div>
          </button>

          <button
            type="button"
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Ouvrir le menu mobile"
          >
            <Icon
              name={isMobileMenuOpen ? 'X' : 'Menu'}
              size={24}
              strokeWidth={2}
            />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon name={item.icon} size={20} strokeWidth={2} />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-xs opacity-80">{item.tooltip}</span>
                </div>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;