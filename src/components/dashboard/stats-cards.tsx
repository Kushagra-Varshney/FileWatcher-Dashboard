'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DashboardStats } from '@/types/dashboard';
import { Files, FolderOpen, HardDrive, Activity, Plus, Edit, Trash2 } from 'lucide-react';

interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const { basic, categories, topExtensions } = stats;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Events</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{basic.total_events}</div>
          <p className="text-xs text-muted-foreground">
            {basic.files} files, {basic.directories} directories
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">File Operations</CardTitle>
          <Files className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="flex items-center text-sm">
                <Plus className="h-3 w-3 mr-1 text-green-500" />
                Created
              </span>
              <span className="font-bold">{basic.files_created}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center text-sm">
                <Edit className="h-3 w-3 mr-1 text-blue-500" />
                Modified
              </span>
              <span className="font-bold">{basic.files_modified}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center text-sm">
                <Trash2 className="h-3 w-3 mr-1 text-red-500" />
                Deleted
              </span>
              <span className="font-bold">{basic.files_deleted}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Storage</CardTitle>
          <HardDrive className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{basic.total_size} KB</div>
          <p className="text-xs text-muted-foreground">
            Total file size
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Categories</CardTitle>
          <FolderOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  {category.category}
                </Badge>
                <span className="text-sm font-medium">{category.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}