import { AdminHeader } from './AdminHeader';
import { AppSidebar } from '../app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
  language: 'english' | 'korean';
  onLanguageChange: (language: 'english' | 'korean') => void;
}

export const AdminLayout = ({ children, language, onLanguageChange }: AdminLayoutProps) => {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <AdminHeader language={language} onLanguageChange={onLanguageChange} />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};
