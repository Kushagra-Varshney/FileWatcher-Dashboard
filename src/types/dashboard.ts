export interface DashboardStats {
  basic: {
    total_events: number;
    directories: number;
    files: number;
    total_size: number;
    files_created: number;
    files_modified: number;
    files_deleted: number;
  };
  categories: Array<{
    category: string;
    count: number;
    total_size: number;
  }>;
  topExtensions: Array<{
    extension: string;
    count: number;
  }>;
}

export interface DashboardAnalytics {
  hourly: Array<{
    hour: string;
    event_count: number;
  }>;
  daily: Array<{
    date: string;
    event_count: number;
    created: number;
    modified: number;
    deleted: number;
  }>;
  topDirectories: Array<{
    directory: string;
    event_count: number;
    last_activity: string;
  }>;
  topClients: Array<{
    clientMacAddress: string;
    event_count: number;
    last_activity: string;
    files_created: number;
    files_modified: number;
    files_deleted: number;
    total_size: number;
  }>;
}

export interface FileType {
  file_type: string;
  count: number;
  total_size: number;
  avg_size: number;
}

export interface WeeklyTrend {
  date: string;
  day_of_week: string;
  total_events: number;
  created_count: number;
  modified_count: number;
  deleted_count: number;
  total_size: number;
}

export interface Client {
  clientMacAddress: string;
  first_seen: string;
  last_seen: string;
  total_events: number;
}

export interface ClientsResponse {
  clients: Client[];
  count: number;
}

export interface DashboardData {
  dashboard: {
    stats: DashboardStats;
    analytics: DashboardAnalytics;
    fileTypes: FileType[];
    weeklyTrends: WeeklyTrend[];
    clients: Client[];
  };
}