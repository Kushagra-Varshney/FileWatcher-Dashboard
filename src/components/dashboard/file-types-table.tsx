'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from '@/components/ui/chart';
import { FileType, WeeklyTrend } from '@/types/dashboard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface FileTypesTableProps {
  fileTypes: FileType[];
  weeklyTrends: WeeklyTrend[];
}

const weeklyChartConfig = {
  events: {
    label: "Events",
    color: "var(--chart-1)",
  },
  created: {
    label: "Created",
    color: "var(--chart-2)",
  },
  modified: {
    label: "Modified",
    color: "var(--chart-3)",
  },
  deleted: {
    label: "Deleted",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

export function FileTypesTable({ fileTypes, weeklyTrends }: FileTypesTableProps) {
  const weeklyData = weeklyTrends.map(trend => ({
    date: new Date(trend.date).toLocaleDateString('en-US', { weekday: 'short' }),
    events: trend.total_events,
    created: trend.created_count,
    modified: trend.modified_count,
    deleted: trend.deleted_count,
    size: trend.total_size
  }));

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-0 shadow-lg flex flex-col max-h-max">
        <CardHeader>
          <CardTitle>File Types Overview</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto min-h-fit">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Count</TableHead>
                <TableHead>Total Size</TableHead>
                <TableHead>Avg Size</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fileTypes.map((fileType, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Badge variant={fileType.file_type === 'document' ? 'default' : 'secondary'}>
                      {fileType.file_type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{fileType.count}</TableCell>
                  <TableCell>{fileType.total_size} KB</TableCell>
                  <TableCell>{fileType.avg_size} KB</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg flex flex-col">
        <CardHeader>
          <CardTitle>Weekly Trends</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <ChartContainer config={weeklyChartConfig} className="h-80">
            <BarChart data={weeklyData}>
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
                fill="var(--chart-2)" 
                radius={[2, 2, 0, 0]}
                name="Created"
              />
              <Bar 
                dataKey="modified" 
                fill="var(--chart-3)" 
                radius={[2, 2, 0, 0]}
                name="Modified"
              />
              <Bar 
                dataKey="deleted" 
                fill="var(--chart-4)" 
                radius={[2, 2, 0, 0]}
                name="Deleted"
              />
            </BarChart>
          </ChartContainer>
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            {weeklyTrends.map((trend, index) => (
              <div key={index} className="space-y-2 p-3 rounded-lg bg-muted/50">
                <div className="font-semibold text-foreground">{new Date(trend.date).toLocaleDateString()}</div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created:</span>
                    <span className="font-medium" style={{ color: "var(--chart-2)" }}>{trend.created_count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Modified:</span>
                    <span className="font-medium" style={{ color: "var(--chart-3)" }}>{trend.modified_count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Deleted:</span>
                    <span className="font-medium" style={{ color: "var(--chart-4)" }}>{trend.deleted_count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}