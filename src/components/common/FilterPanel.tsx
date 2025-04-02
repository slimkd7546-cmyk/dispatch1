import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Filter, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}

export interface FilterGroup {
  id: string;
  name: string;
  options: FilterOption[];
}

export interface DateRangeFilter {
  startDate: string;
  endDate: string;
}

export interface FilterPanelProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filterGroups?: FilterGroup[];
  onFilterChange?: (
    groupId: string,
    optionId: string,
    checked: boolean,
  ) => void;
  dateRange?: DateRangeFilter;
  onDateRangeChange?: (range: DateRangeFilter) => void;
  onClearFilters?: () => void;
  onApplyFilters?: () => void;
  activeFilterCount?: number;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  searchQuery,
  onSearchChange,
  filterGroups = [],
  onFilterChange,
  dateRange,
  onDateRangeChange,
  onClearFilters,
  onApplyFilters,
  activeFilterCount = 0,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10"
          />
          <div className="absolute left-3 top-2.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
        </div>

        {filterGroups.length > 0 && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-1 rounded-full px-1 py-0 text-xs"
                  >
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Filters</h4>
                  {onClearFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClearFilters}
                      className="h-auto p-0 text-sm text-muted-foreground"
                    >
                      Clear all
                    </Button>
                  )}
                </div>

                {dateRange && onDateRangeChange && (
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Date Range</h5>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <Label htmlFor="start-date" className="text-xs">
                          From
                        </Label>
                        <Input
                          id="start-date"
                          type="date"
                          value={dateRange.startDate}
                          onChange={(e) =>
                            onDateRangeChange({
                              ...dateRange,
                              startDate: e.target.value,
                            })
                          }
                          className="h-8"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="end-date" className="text-xs">
                          To
                        </Label>
                        <Input
                          id="end-date"
                          type="date"
                          value={dateRange.endDate}
                          onChange={(e) =>
                            onDateRangeChange({
                              ...dateRange,
                              endDate: e.target.value,
                            })
                          }
                          className="h-8"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {filterGroups.map((group) => (
                  <div key={group.id} className="space-y-2">
                    <h5 className="text-sm font-medium">{group.name}</h5>
                    <div className="space-y-1">
                      {group.options.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`${group.id}-${option.id}`}
                            checked={option.checked}
                            onCheckedChange={(checked) =>
                              onFilterChange?.(group.id, option.id, !!checked)
                            }
                          />
                          <Label
                            htmlFor={`${group.id}-${option.id}`}
                            className="text-sm"
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {onApplyFilters && (
                  <Button
                    className="w-full mt-2"
                    size="sm"
                    onClick={onApplyFilters}
                  >
                    Apply Filters
                  </Button>
                )}
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>

      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filterGroups.map((group) =>
            group.options
              .filter((option) => option.checked)
              .map((option) => (
                <Badge
                  key={`${group.id}-${option.id}`}
                  variant="outline"
                  className="flex items-center gap-1 px-3 py-1"
                >
                  <span>
                    {group.name}: {option.label}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onFilterChange?.(group.id, option.id, false)}
                    className="h-auto p-0 ml-1"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )),
          )}
          {dateRange?.startDate && dateRange?.endDate && onDateRangeChange && (
            <Badge
              variant="outline"
              className="flex items-center gap-1 px-3 py-1"
            >
              <span>
                Date: {dateRange.startDate} to {dateRange.endDate}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  onDateRangeChange({ startDate: "", endDate: "" })
                }
                className="h-auto p-0 ml-1"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
