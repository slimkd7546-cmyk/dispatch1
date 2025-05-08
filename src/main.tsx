import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/ui/theme-provider";
import PerformanceOptimizer from "@/components/common/PerformanceOptimizer";

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

const basename = import.meta.env.BASE_URL;

// Preload critical assets
const preloadAssets = () => {
  // Add preload hints for critical resources
  const preloadLinks = [
    { href: '/favicon.ico', as: 'image' },
  ];

  preloadLinks.forEach(({ href, as }) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  });
};

// Execute preloading
preloadAssets();

// Create root with error handling
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement);

// Render with performance optimizations
root.render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" enableSystem>
      <PerformanceOptimizer>
        <BrowserRouter basename={basename}>
          <App />
        </BrowserRouter>
      </PerformanceOptimizer>
    </ThemeProvider>
  </React.StrictMode>,
);
