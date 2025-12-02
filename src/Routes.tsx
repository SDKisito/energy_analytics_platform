import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';
import { useGoogleAnalytics } from './hooks/useGoogleAnalytics';
import EnergyOverviewDashboard from './pages/energy-overview-dashboard/index';
import PredictiveAnalyticsHub from './pages/predictive-analytics-hub/index';
import SitePerformanceMonitor from './pages/site-performance-monitor/index';
import ExecutiveSustainability from './pages/executive-sustainability/index';
import NotFound from './pages/NotFound';

// Lazy load pages for code splitting with error retry logic
const lazyWithRetry = (componentImport: () => Promise<any>) =>
  lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(
      window.sessionStorage.getItem('page-has-been-force-refreshed') || 'false'
    );

    try {
      const component = await componentImport();
      window.sessionStorage.setItem('page-has-been-force-refreshed', 'false');
      return component;
    } catch (error) {
      if (!pageHasAlreadyBeenForceRefreshed) {
        window.sessionStorage.setItem('page-has-been-force-refreshed', 'true');
        return window.location.reload();
      }
      throw error;
    }
  });

const LazyEnergyOverviewDashboard = lazyWithRetry(() => import('./pages/energy-overview-dashboard'));
const LazyPredictiveAnalyticsHub = lazyWithRetry(() => import('./pages/predictive-analytics-hub'));
const LazySitePerformanceMonitor = lazyWithRetry(() => import('./pages/site-performance-monitor'));
const LazyExecutiveSustainability = lazyWithRetry(() => import('./pages/executive-sustainability'));
const LazyNotFound = lazyWithRetry(() => import('./pages/NotFound'));

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-muted-foreground">Chargement en cours...</p>
    </div>
  </div>
);

function RoutesWithAnalytics() {
  useGoogleAnalytics();

  return (
    <RouterRoutes>
      <Route
        path="/"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <LazyEnergyOverviewDashboard />
          </Suspense>
        }
      />
      <Route
        path="/analytics"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <LazyPredictiveAnalyticsHub />
          </Suspense>
        }
      />
      <Route
        path="/site-monitor"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <LazySitePerformanceMonitor />
          </Suspense>
        }
      />
      <Route
        path="/executive"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <LazyExecutiveSustainability />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <LazyNotFound />
          </Suspense>
        }
      />
    </RouterRoutes>
  );
}

export default function Routes() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RoutesWithAnalytics />
      </ErrorBoundary>
    </BrowserRouter>
  );
}