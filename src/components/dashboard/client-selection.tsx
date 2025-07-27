'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Client } from '@/types/dashboard';
import { formatDistanceToNow } from 'date-fns';

interface ClientSelectionProps {
  clients: Client[];
  onClientSelect: (clientMacAddress: string) => void;
  selectedClient?: string;
}

export function ClientSelection({ clients, onClientSelect, selectedClient }: ClientSelectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Select a Client</h2>
        <p className="text-muted-foreground">Choose a client to view their detailed analytics</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <Card 
            key={client.clientMacAddress}
            className={`cursor-pointer transition-all hover:shadow-md border-2 ${
              selectedClient === client.clientMacAddress 
                ? 'border-primary ring-2 ring-primary/20' 
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => onClientSelect(client.clientMacAddress)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-mono">
                {client.clientMacAddress}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Events</span>
                  <Badge variant="secondary" className="font-semibold">
                    {client.total_events}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">First Seen</span>
                    <span className="text-foreground">
                      {formatDistanceToNow(new Date(client.first_seen), { addSuffix: true })}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Seen</span>
                    <span className="text-foreground">
                      {formatDistanceToNow(new Date(client.last_seen), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}