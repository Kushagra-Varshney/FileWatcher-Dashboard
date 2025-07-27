'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { AnalyticsCharts } from '@/components/dashboard/analytics-charts';
import { FileTypesTable } from '@/components/dashboard/file-types-table';
import { ClientSelection } from '@/components/dashboard/client-selection';
import { DashboardData, Client } from '@/types/dashboard';
import { Button } from '@/components/ui/button';
import { LogOut, ArrowLeft } from 'lucide-react';
import { fetchClients, fetchClientAnalytics } from '@/lib/api';

export default function DashboardPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      router.push('/login');
      return;
    }

    loadClients();
  }, [router]);

  const loadClients = async () => {
    try {
      const clientsData = await fetchClients();
      setClients(clientsData.clients);
    } catch (error) {
      setError('Failed to load clients');
      console.error('Clients fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadClientAnalytics = async (clientMacAddress: string) => {
    setLoading(true);
    try {
      const analyticsData = await fetchClientAnalytics(clientMacAddress);
      setData(analyticsData);
      setSelectedClient(clientMacAddress);
    } catch (error) {
      setError('Failed to load client analytics');
      console.error('Client analytics fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClientSelect = (clientMacAddress: string) => {
    loadClientAnalytics(clientMacAddress);
  };

  const handleBackToClients = () => {
    setSelectedClient('');
    setData(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {selectedClient && (
                <Button variant="ghost" size="sm" onClick={handleBackToClients}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Clients
                </Button>
              )}
              <h1 className="text-2xl font-bold">
                {selectedClient ? `Client: ${selectedClient}` : 'NazarTs Dashboard'}
              </h1>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {!selectedClient ? (
          <ClientSelection 
            clients={clients} 
            onClientSelect={handleClientSelect}
            selectedClient={selectedClient}
          />
        ) : data ? (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <StatsCards stats={data.dashboard.stats} />
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Analytics</h2>
              <AnalyticsCharts analytics={data.dashboard.analytics} />
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">File Types & Trends</h2>
              <FileTypesTable 
                fileTypes={data.dashboard.fileTypes} 
                weeklyTrends={data.dashboard.weeklyTrends} 
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-20">
            <div>Loading client analytics...</div>
          </div>
        )}
      </div>
    </div>
  );
}