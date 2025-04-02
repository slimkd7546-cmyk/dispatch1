import React, { useState } from "react";
import {
  FileText,
  Download,
  BarChart2,
  PieChart,
  LineChart,
  Calendar as CalendarIcon,
} from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface ReportGeneratorProps {
  onGenerate?: (
    reportType: string,
    dateRange: DateRange | undefined,
    format: string,
  ) => void;
}

const ReportGenerator = ({ onGenerate = () => {} }: ReportGeneratorProps) => {
  const [reportType, setReportType] = useState<string>("performance");
  const [exportFormat, setExportFormat] = useState<string>("pdf");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      onGenerate(reportType, dateRange, exportFormat);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <Card className="w-full bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <FileText className="h-5 w-5 text-teal-500" />
          Report Generator
        </CardTitle>
        <CardDescription className="text-gray-500 dark:text-gray-400">
          Generate custom reports with date ranges and export options
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="report-type"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Report Type
            </label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger id="report-type" className="w-full">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="performance">
                  <div className="flex items-center">
                    <BarChart2 className="mr-2 h-4 w-4 text-teal-500" />
                    <span>Performance Metrics</span>
                  </div>
                </SelectItem>
                <SelectItem value="dispatch-summary">
                  <div className="flex items-center">
                    <PieChart className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Dispatch Summary</span>
                  </div>
                </SelectItem>
                <SelectItem value="officer-activity">
                  <div className="flex items-center">
                    <LineChart className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Officer Activity</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="export-format"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Export Format
            </label>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger id="export-format" className="w-full">
                <SelectValue placeholder="Select export format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Document</SelectItem>
                <SelectItem value="csv">CSV Spreadsheet</SelectItem>
                <SelectItem value="xlsx">Excel Workbook</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Date Range
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "MMM dd, yyyy")} -{" "}
                      {format(dateRange.to, "MMM dd, yyyy")}
                    </>
                  ) : (
                    format(dateRange.from, "MMM dd, yyyy")
                  )
                ) : (
                  <span>Select date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Report Preview
          </h4>
          <div className="h-32 flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800">
            {reportType === "performance" && (
              <div className="text-center">
                <BarChart2 className="h-10 w-10 mx-auto text-teal-500 opacity-50" />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Performance metrics preview
                </p>
              </div>
            )}
            {reportType === "dispatch-summary" && (
              <div className="text-center">
                <PieChart className="h-10 w-10 mx-auto text-blue-500 opacity-50" />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Dispatch summary preview
                </p>
              </div>
            )}
            {reportType === "officer-activity" && (
              <div className="text-center">
                <LineChart className="h-10 w-10 mx-auto text-purple-500 opacity-50" />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Officer activity preview
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          {isGenerating ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Generating...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Generate Report
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReportGenerator;
