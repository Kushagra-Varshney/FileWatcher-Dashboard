'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from '@/components/ui/chart';
import { DashboardAnalytics } from '@/types/dashboard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface AnalyticsChartsProps {
  analytics: DashboardAnalytics;
}

const dailyChartConfig = {
  created: {
    label: "Created",
    color: "var(--chart-8)",
  },
  modified: {
    label: "Modified", 
    color: "var(--chart-7)",
  },
  deleted: {
    label: "Deleted",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

const hourlyChartConfig = {
  events: {
    label: "Events",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

const directoryChartConfig = {
  value: {
    label: "Events",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

const pieColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
  "var(--chart-7)",
  "var(--chart-8)",
  "var(--chart-9)",
  "var(--chart-10)",
]

export function AnalyticsCharts({ analytics }: AnalyticsChartsProps) {
  const hourlyData = analytics.hourly.map(item => ({
    hour: `${item.hour}:00`,
    events: item.event_count
  }));

  const dailyData = analytics.daily.map(item => ({
    date: new Date(item.date).toLocaleDateString(),
    total: item.event_count,
    created: item.created,
    modified: item.modified,
    deleted: item.deleted
  }));

  const directoryData = analytics.topDirectories.map((item) => ({
    name: item.directory,
    value: item.event_count,
  }));

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Daily Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={dailyChartConfig} className="h-80 w-full">
            <BarChart data={dailyData} width={600}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar 
                dataKey="created" 
                fill="var(--chart-8)" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="modified" 
                fill="var(--chart-7)" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="deleted" 
                fill="var(--chart-3)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Directory Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={directoryChartConfig} className="h-80">
              <PieChart>
                <Pie
                  data={directoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="var(--color-value)"
                  dataKey="value"
                >
                  {directoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Hourly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={hourlyChartConfig} className="h-80">
              <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis 
                dataKey="hour" 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="events" 
                stroke="var(--chart-4)" 
                strokeWidth={3}
                dot={{ fill: "var(--chart-4)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "var(--chart-4)", strokeWidth: 2, fill: "hsl(var(--background))" }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}