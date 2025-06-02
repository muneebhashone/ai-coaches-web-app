"use client";

import { useState } from "react";
import { SessionList } from "./session-list";
import { ChatInterface } from "./chat-interface";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function SessionsMessenger() {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-full">
      {/* Desktop Session List - Left Column */}
      <div className="hidden md:flex w-80 border-r border-border bg-card">
        <SessionList
          selectedSessionId={selectedSessionId}
          onSessionSelect={setSelectedSessionId}
        />
      </div>

      {/* Chat Interface - Right Column */}
      <div className="flex-1 bg-background flex flex-col">
        {/* Mobile Header with Menu */}
        <div className="md:hidden border-b border-border p-4 bg-card">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-80">
              <SessionList
                selectedSessionId={selectedSessionId}
                onSessionSelect={(sessionId) => {
                  setSelectedSessionId(sessionId);
                  setMobileMenuOpen(false);
                }}
              />
            </SheetContent>
          </Sheet>
        </div>

        {/* Chat Interface */}
        <div className="flex-1">
          <ChatInterface sessionId={selectedSessionId} />
        </div>
      </div>
    </div>
  );
}
