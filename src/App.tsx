import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

// Lazy load pages for better performance
const Dashboard = lazy(() => import("./pages/dashboard"));
const MapPage = lazy(() => import("./pages/map"));
const AnalyticsPage = lazy(() => import("./pages/analytics"));
const LoadsPage = lazy(() => import("./pages/loads"));
const ReportsPage = lazy(() => import("./pages/reports"));

// Lazy load dispatcher pages
const TrucksPage = lazy(() => import("./pages/dispatcher/trucks"));
const AuctionPage = lazy(() => import("./pages/dispatcher/auction"));
const TripMonitorPage = lazy(() => import("./pages/dispatcher/trip-monitor"));
const DispatcherLoadsPage = lazy(() => import("./pages/dispatcher/loads"));
const DriversPage = lazy(() => import("./pages/dispatcher/drivers"));
const UsersPage = lazy(() => import("./pages/dispatcher/users"));
const ContragentsPage = lazy(() => import("./pages/dispatcher/contragents"));
const TasksPage = lazy(() => import("./pages/dispatcher/tasks"));
const DispatcherMapPage = lazy(() => import("./pages/dispatcher/map"));

function App() {
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <p>Loading...</p>
        </div>
      }
    >
      <>
        {/* For the tempo routes */}
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/map"
            element={isAuthenticated ? <MapPage /> : <Navigate to="/" />}
          />
          <Route
            path="/analytics"
            element={isAuthenticated ? <AnalyticsPage /> : <Navigate to="/" />}
          />
          <Route
            path="/loads"
            element={isAuthenticated ? <LoadsPage /> : <Navigate to="/" />}
          />

          {/* Dispatcher routes */}
          <Route
            path="/dispatcher/trucks"
            element={isAuthenticated ? <TrucksPage /> : <Navigate to="/" />}
          />
          <Route
            path="/dispatcher/auction"
            element={isAuthenticated ? <AuctionPage /> : <Navigate to="/" />}
          />
          <Route
            path="/dispatcher/loads"
            element={
              isAuthenticated ? <DispatcherLoadsPage /> : <Navigate to="/" />
            }
          />
          <Route
            path="/dispatcher/trip-monitor"
            element={
              isAuthenticated ? <TripMonitorPage /> : <Navigate to="/" />
            }
          />
          <Route
            path="/dispatcher/drivers"
            element={isAuthenticated ? <DriversPage /> : <Navigate to="/" />}
          />
          <Route
            path="/dispatcher/users"
            element={isAuthenticated ? <UsersPage /> : <Navigate to="/" />}
          />
          <Route
            path="/dispatcher/contragents"
            element={
              isAuthenticated ? <ContragentsPage /> : <Navigate to="/" />
            }
          />
          <Route
            path="/dispatcher/tasks"
            element={isAuthenticated ? <TasksPage /> : <Navigate to="/" />}
          />
          <Route
            path="/dispatcher/reports"
            element={isAuthenticated ? <ReportsPage /> : <Navigate to="/" />}
          />
          <Route
            path="/dispatcher/map"
            element={
              isAuthenticated ? <DispatcherMapPage /> : <Navigate to="/" />
            }
          />

          {/* Other role routes */}
          <Route
            path="/officer/*"
            element={
              isAuthenticated ? (
                <Dashboard userRole="Officer" />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/reviewer/*"
            element={
              isAuthenticated ? (
                <Dashboard userRole="Reviewer" />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin/*"
            element={
              isAuthenticated ? (
                <Dashboard userRole="Admin" />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/connect/*"
            element={
              isAuthenticated ? (
                <Dashboard userRole="Connect" />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/driver/*"
            element={
              isAuthenticated ? (
                <Dashboard userRole="Driver" />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* Add tempobook route before the catch-all */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" element={null} />
          )}

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
