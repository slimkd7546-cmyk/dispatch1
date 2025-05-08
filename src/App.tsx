import { Suspense, lazy, memo, useState, useEffect } from "react";
import {
  useRoutes,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
  useLocation,
} from "react-router-dom";
import routes from "tempo-routes";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { logError } from "./lib/error-logger";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./components/ui/use-toast";

// Improved loading fallback with animation
const LoadingFallback = memo(() => (
  <div className="flex h-screen w-full items-center justify-center bg-background">
    <div className="flex flex-col items-center">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      <p className="mt-4 text-muted-foreground">Loading...</p>
    </div>
  </div>
));

// Global error fallback
const GlobalErrorFallback = memo(() => (
  <div className="flex h-screen w-full items-center justify-center bg-background">
    <div className="flex flex-col items-center max-w-md text-center p-6">
      <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-red-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
      <p className="text-muted-foreground mb-6">
        We're sorry, but we encountered an unexpected error. Please try
        refreshing the page or contact support if the problem persists.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Refresh Page
        </button>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-4 py-2 bg-muted text-foreground rounded-md hover:bg-muted/90 transition-colors"
        >
          Go to Home
        </button>
      </div>
    </div>
  </div>
));

// Preload critical components
const Home = lazy(() => import("./components/home"));

// Use dynamic imports with prefetch hints for better performance
const Dashboard = lazy(() => {
  const component = import("./pages/dashboard");
  return component;
});

// Lazy load pages with chunk naming for better debugging
const MapPage = lazy(
  () => import("./pages/map" /* webpackChunkName: "map-page" */),
);
const AnalyticsPage = lazy(
  () => import("./pages/analytics" /* webpackChunkName: "analytics-page" */),
);
const LoadsPage = lazy(
  () => import("./pages/loads" /* webpackChunkName: "loads-page" */),
);
const ReportsPage = lazy(
  () => import("./pages/reports" /* webpackChunkName: "reports-page" */),
);
const MessagesPage = lazy(
  () => import("./pages/messages" /* webpackChunkName: "messages-page" */),
);

// Group related dispatcher pages for better code splitting
const TrucksPage = lazy(
  () =>
    import(
      "./pages/dispatcher/trucks" /* webpackChunkName: "dispatcher-trucks" */
    ),
);
const AuctionPage = lazy(
  () =>
    import(
      "./pages/dispatcher/auction" /* webpackChunkName: "dispatcher-auction" */
    ),
);
const TripMonitorPage = lazy(
  () =>
    import(
      "./pages/dispatcher/trip-monitor" /* webpackChunkName: "dispatcher-trip" */
    ),
);
const DispatcherLoadsPage = lazy(
  () =>
    import(
      "./pages/dispatcher/loads" /* webpackChunkName: "dispatcher-loads" */
    ),
);
const DriversPage = lazy(
  () =>
    import(
      "./pages/dispatcher/drivers" /* webpackChunkName: "dispatcher-drivers" */
    ),
);
const UsersPage = lazy(
  () =>
    import(
      "./pages/dispatcher/users" /* webpackChunkName: "dispatcher-users" */
    ),
);
const ContragentsPage = lazy(
  () =>
    import(
      "./pages/dispatcher/contragents" /* webpackChunkName: "dispatcher-contragents" */
    ),
);
const TasksPage = lazy(
  () =>
    import(
      "./pages/dispatcher/tasks" /* webpackChunkName: "dispatcher-tasks" */
    ),
);
const DispatcherMapPage = lazy(
  () =>
    import("./pages/dispatcher/map" /* webpackChunkName: "dispatcher-map" */),
);

// Memoized auth check for performance
const useAuthCheck = () => {
  // This could be enhanced with a proper auth context in a real app
  return localStorage.getItem("isAuthenticated") === "true";
};

// Route change tracker for analytics and error monitoring
const RouteChangeTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view
    console.log(`Page viewed: ${location.pathname}`);
    // You could send this to your analytics service
  }, [location]);

  return null;
};

// Error handler component
const GlobalErrorHandler = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();

  // Set up global error handler
  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      event.preventDefault();
      logError(event.error || new Error(event.message), undefined, "high");

      toast({
        title: "An error occurred",
        description: "We've logged the error and our team will look into it.",
        variant: "destructive",
      });
    };

    // Handle unhandled promise rejections
    const handlePromiseRejection = (event: PromiseRejectionEvent) => {
      event.preventDefault();
      logError(
        event.reason instanceof Error
          ? event.reason
          : new Error(String(event.reason)),
        undefined,
        "high",
      );

      toast({
        title: "Operation failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    };

    window.addEventListener("error", handleGlobalError);
    window.addEventListener("unhandledrejection", handlePromiseRejection);

    return () => {
      window.removeEventListener("error", handleGlobalError);
      window.removeEventListener("unhandledrejection", handlePromiseRejection);
    };
  }, [toast]);

  return <>{children}</>;
};

function App() {
  // Check if user is authenticated
  const isAuthenticated = useAuthCheck();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Show offline message when not connected
  if (!isOnline) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30 p-6 rounded-lg max-w-md text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12 text-yellow-500 mx-auto mb-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          <h2 className="text-xl font-bold mb-2">You're offline</h2>
          <p className="text-muted-foreground mb-4">
            Please check your internet connection and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<GlobalErrorFallback />}>
      <GlobalErrorHandler>
        <Suspense fallback={<LoadingFallback />}>
          <>
            <RouteChangeTracker />
            {/* For the tempo routes */}
            {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}

            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/dashboard"
                element={
                  <ErrorBoundary>
                    {isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
                  </ErrorBoundary>
                }
              />
              <Route
                path="/map"
                element={
                  <ErrorBoundary>
                    {isAuthenticated ? <MapPage /> : <Navigate to="/" />}
                  </ErrorBoundary>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ErrorBoundary>
                    {isAuthenticated ? <AnalyticsPage /> : <Navigate to="/" />}
                  </ErrorBoundary>
                }
              />
              <Route
                path="/loads"
                element={
                  <ErrorBoundary>
                    {isAuthenticated ? <LoadsPage /> : <Navigate to="/" />}
                  </ErrorBoundary>
                }
              />
              <Route
                path="/messages"
                element={
                  <ErrorBoundary>
                    {isAuthenticated ? <MessagesPage /> : <Navigate to="/" />}
                  </ErrorBoundary>
                }
              />

              {/* Dispatcher routes */}
              <Route
                path="/dispatcher/trucks"
                element={
                  <ErrorBoundary>
                    {isAuthenticated ? <TrucksPage /> : <Navigate to="/" />}
                  </ErrorBoundary>
                }
              />
              <Route
                path="/dispatcher/auction"
                element={
                  <ErrorBoundary>
                    {isAuthenticated ? <AuctionPage /> : <Navigate to="/" />}
                  </ErrorBoundary>
                }
              />
              <Route
                path="/dispatcher/loads"
                element={
                  <ErrorBoundary>
                    {isAuthenticated ? (
                      <DispatcherLoadsPage />
                    ) : (
                      <Navigate to="/" />
                    )}
                  </ErrorBoundary>
                }
              />
              <Route
                path="/dispatcher/trip-monitor"
                element={
                  <ErrorBoundary>
                    {isAuthenticated ? (
                      <TripMonitorPage />
                    ) : (
                      <Navigate to="/" />
                    )}
                  </ErrorBoundary>
                }
              />
              <Route
                path="/dispatcher/drivers"
                element={
                  <ErrorBoundary>
                    {isAuthenticated ? <DriversPage /> : <Navigate to="/" />}
                  </ErrorBoundary>
                }
              />
              <Route
                path="/dispatcher/users"
                element={
                  <ErrorBoundary>
                    {isAuthenticated ? <UsersPage /> : <Navigate to="/" />}
                  </ErrorBoundary>
                }
              />
              <Route
                path="/dispatcher/contragents"
                element={
                  <ErrorBoundary>
                    {isAuthenticated ? (
                      <ContragentsPage />
                    ) : (
                      <Navigate to="/" />
                    )}
                  </ErrorBoundary>
                }
              />
              <Route
                path="/dispatcher/tasks"
                element={
                  <ErrorBoundary>
                    {isAuthenticated ? <TasksPage /> : <Navigate to="/" />}
                  </ErrorBoundary>
                }
              />
              <Route
                path="/dispatcher/reports"
                element={
                  <ErrorBoundary>
                    {isAuthenticated ? <ReportsPage /> : <Navigate to="/" />}
                  </ErrorBoundary>
                }
              />
              <Route
                path="/dispatcher/map"
                element={
                  <ErrorBoundary>
                    {isAuthenticated ? (
                      <DispatcherMapPage />
                    ) : (
                      <Navigate to="/" />
                    )}
                  </ErrorBoundary>
                }
              />

              {/* Other role routes */}
              <Route
                path="/officer/*"
                element={
                  <ErrorBoundary>
                    {isAuthenticated ? (
                      <Dashboard userRole="Officer" />
                    ) : (
                      <Navigate to="/" />
                    )}
                  </ErrorBoundary>
                }
              />
              <Route
                path="/reviewer/*"
                element={
                  <ErrorBoundary>
                    {isAuthenticated ? (
                      <Dashboard userRole="Reviewer" />
                    ) : (
                      <Navigate to="/" />
                    )}
                  </ErrorBoundary>
                }
              />
              <Route
                path="/admin/*"
                element={
                  <ErrorBoundary>
                    {isAuthenticated ? (
                      <Dashboard userRole="Admin" />
                    ) : (
                      <Navigate to="/" />
                    )}
                  </ErrorBoundary>
                }
              />
              <Route
                path="/connect/*"
                element={
                  <ErrorBoundary>
                    {isAuthenticated ? (
                      <Dashboard userRole="Connect" />
                    ) : (
                      <Navigate to="/" />
                    )}
                  </ErrorBoundary>
                }
              />
              <Route
                path="/driver/*"
                element={
                  <ErrorBoundary>
                    {isAuthenticated ? (
                      <Dashboard userRole="Driver" />
                    ) : (
                      <Navigate to="/" />
                    )}
                  </ErrorBoundary>
                }
              />

              {/* Add tempobook route before the catch-all */}
              {import.meta.env.VITE_TEMPO === "true" && (
                <Route path="/tempobook/*" element={null} />
              )}

              {/* Catch-all route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Toaster />
          </>
        </Suspense>
      </GlobalErrorHandler>
    </ErrorBoundary>
  );
}

export default memo(App);
