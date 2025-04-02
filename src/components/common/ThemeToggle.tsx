import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  defaultTheme?: "light" | "dark";
  onThemeChange?: (theme: "light" | "dark") => void;
}

const ThemeToggle = ({
  className = "",
  defaultTheme = "light",
  onThemeChange,
}: ThemeToggleProps) => {
  const [theme, setTheme] = useState<"light" | "dark">(defaultTheme);

  // Effect to initialize theme from localStorage or system preference
  useEffect(() => {
    // Check if theme is stored in localStorage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      // If no stored theme, check system preference
      setTheme("dark");
    }

    // Apply theme to document
    applyTheme((storedTheme as "light" | "dark") || defaultTheme);
  }, [defaultTheme]);

  // Function to apply theme to document and store in localStorage
  const applyTheme = (newTheme: "light" | "dark") => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Handle theme toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyTheme(newTheme);

    // Call the callback if provided
    if (onThemeChange) {
      onThemeChange(newTheme);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 bg-background p-1 rounded-md",
        className,
      )}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center space-x-2">
              <Sun
                className={cn(
                  "h-4 w-4 transition-colors",
                  theme === "light"
                    ? "text-amber-500"
                    : "text-muted-foreground",
                )}
              />
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
                aria-label="Toggle theme"
              />
              <Moon
                className={cn(
                  "h-4 w-4 transition-colors",
                  theme === "dark"
                    ? "text-indigo-400"
                    : "text-muted-foreground",
                )}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Switch to {theme === "light" ? "dark" : "light"} mode</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ThemeToggle;
