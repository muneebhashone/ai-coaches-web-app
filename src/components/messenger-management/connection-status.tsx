"use client";

import { useState } from "react";
import { IconCheck, IconRefresh, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for connection status
const connectionStatusData = [
  {
    id: "1",
    name: "Kim Min-ji",
    icon: "/globe.svg",
    status: "connected",
    lastConnected: "2025-04-21T14:30:00Z",
  },
  {
    id: "2",
    name: "Park Ji-sung",
    icon: "/globe.svg",
    status: "disconnected",
    lastConnected: "2025-04-10T09:15:00Z",
  },
  {
    id: "3",
    name: "Lee Soo-jin",
    icon: "/globe.svg",
    status: "connected",
    lastConnected: "2025-04-22T10:45:00Z",
  },
];

export function ConnectionStatus() {
  const [connections, setConnections] = useState(connectionStatusData);
  const [isReconnecting, setIsReconnecting] = useState<string | null>(null);

  const handleReconnect = (id: string) => {
    setIsReconnecting(id);

    // Simulate reconnection process
    setTimeout(() => {
      setConnections(
        connections.map((conn) =>
          conn.id === id
            ? {
                ...conn,
                status: "connected",
                lastConnected: new Date().toISOString(),
              }
            : conn
        )
      );
      setIsReconnecting(null);
    }, 1500);
  };

  return (
    <div className="bg-card rounded-lg border shadow-sm">
      <div className="p-4 pb-0">
        <h2 className="text-lg font-semibold">Connection Status</h2>
        <p className="text-sm text-muted-foreground">
          View and manage KakaoTalk connection status for users
        </p>
      </div>
      <div className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Connected</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {connections.map((connection) => (
              <TableRow key={connection.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={connection.icon}
                        alt={connection.name}
                      />
                      <AvatarFallback>
                        {connection.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{connection.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      connection.status === "connected"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {connection.status === "connected" ? (
                      <>
                        <IconCheck className="mr-1 h-3 w-3" /> Connected
                      </>
                    ) : (
                      <>
                        <IconX className="mr-1 h-3 w-3" /> Disconnected
                      </>
                    )}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(connection.lastConnected).toLocaleString()}
                </TableCell>
                <TableCell>
                  {connection.status === "disconnected" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReconnect(connection.id)}
                      disabled={isReconnecting === connection.id}
                    >
                      {isReconnecting === connection.id ? (
                        <IconRefresh className="mr-1 h-3 w-3 animate-spin" />
                      ) : (
                        <IconRefresh className="mr-1 h-3 w-3" />
                      )}
                      Reconnect
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
