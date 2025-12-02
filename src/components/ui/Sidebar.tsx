import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

interface SidebarProps {
  isCollapsed?: boolean;
  className?: string;
}

interface NavItem {
  label: string;
  path: string;
  icon: string;
  tooltip: string;
}

const Sidebar = ({ isCollapsed = false, className = '' }: SidebarProps) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(isCollapsed);

  const navItems: NavItem[] = [
    {
      label: 'Vue d\'ensemble',
      path: '/',
      icon: 'LayoutDashboard',
      tooltip: 'Centre de surveillance en temps réel',
    },
    {
      label: 'Analyses',
      path: '/analytics',
      icon: 'TrendingUp',
      tooltip: 'Modélisation prédictive et prévisions',
    },
    {
      label: 'Sites',
      path: '/site-monitor',
      icon: 'Building2',
      tooltip: 'Surveillance des performances par site',
    },
    {
      label: 'Durabilité',
      path: '/executive',
      icon: 'Leaf',
      tooltip: 'Tableau de bord exécutif pour les rapports stratégiques',
    },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <aside
      className={`lg:fixed top-[60px] left-0 h-[calc(100vh-60px)] bg-card border-r border-border transition-all duration-300 ease-smooth z-[90] ${
        collapsed ? 'w-16' : 'w-64'
      } ${className}`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-end p-4 border-b border-border">
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
            title={collapsed ? 'Étendre la barre latérale' : 'Réduire la barre latérale'}
          >
            <Icon
              name={collapsed ? 'ChevronRight' : 'ChevronLeft'}
              size={20}
              strokeWidth={2}
            />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center gap-3 px-3 py-3 rounded-md transition-all duration-200 ${
                isActivePath(item.path)
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={collapsed ? item.tooltip : ''}
            >
              <Icon
                name={item.icon}
                size={20}
                strokeWidth={2}
                className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
              />
              {!collapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium truncate">
                    {item.label}
                  </span>
                  <span className="text-xs opacity-80 truncate">
                    {item.tooltip}
                  </span>
                </div>
              )}
              {isActivePath(item.path) && !collapsed && (
                <div className="ml-auto w-1 h-6 bg-accent rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div
            className={`flex items-center gap-3 px-3 py-3 rounded-md bg-muted ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Icon name="User" size={16} color="white" strokeWidth={2} />
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-foreground truncate">
                  Gestionnaire Énergie
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  admin@tpm.fr
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;