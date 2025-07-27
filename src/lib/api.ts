import { ClientsResponse, DashboardData } from '@/types/dashboard';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:6970';

export async function fetchClients(): Promise<ClientsResponse> {
  const response = await fetch(`${BASE_URL}/api/dashboard/clients`);
  if (!response.ok) {
    throw new Error('Failed to fetch clients');
  }
  return response.json();
}

export async function fetchClientAnalytics(clientMacAddress: string): Promise<DashboardData> {
  const response = await fetch(`${BASE_URL}/api/dashboard/analytics?clientMacAddress=${encodeURIComponent(clientMacAddress)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch client analytics');
  }
  return response.json();
}