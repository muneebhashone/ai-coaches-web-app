"use client"

import React, { useState } from 'react'
import KnowledgeBase from '@/components/knowledgeBase/KnowledgeBase';
import { AdminLayout } from '@/components/admin/AdminLayout';

const KnowledgeBasePage = () => {
  const [language, setLanguage] = useState<"english" | "korean">("english")
  const sessionNotes = [
    {
      question: 'How did the session go?',
      answer: 'The session was productive. The user showed improvement in goal setting.',
    },
    {
      question: 'What feedback was provided?',
      answer: 'Encouraged the user to focus on time management skills.',
    },
  ];

  return (
    <AdminLayout language={language} onLanguageChange={setLanguage}>
      
        <KnowledgeBase
          title="Session Notes"
          items={sessionNotes}
        />
     
    </AdminLayout>

  );
};

export default KnowledgeBasePage;