import { IconLanguage, IconLayoutDashboard } from '@tabler/icons-react';
import { Toggle } from '@/components/ui/toggle';
import { SiteHeader } from '../site-header';

interface AdminHeaderProps {
  language: 'english' | 'korean';
  onLanguageChange: (language: 'english' | 'korean') => void;
}

export const AdminHeader = ({ language, onLanguageChange }: AdminHeaderProps) => {
  return (
    <SiteHeader>
      <div className="flex items-center gap-2">
        <IconLayoutDashboard className="h-5 w-5" />
        <h1 className="text-xl font-semibold">
          {language === 'english' ? 'Coaching Dashboard' : '코칭 대시보드'}
        </h1>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Toggle
          aria-label="Toggle language"
          pressed={language === 'korean'}
          onPressedChange={(pressed) => onLanguageChange(pressed ? 'korean' : 'english')}
        >
          <IconLanguage className="h-4 w-4 mr-2" />
          {language === 'english' ? 'English' : '한국어'}
        </Toggle>
      </div>
    </SiteHeader>
  );
};
