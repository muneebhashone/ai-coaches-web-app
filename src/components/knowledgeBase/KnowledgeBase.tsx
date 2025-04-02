import React from 'react';
import { Card } from '@/components/ui/card';

interface KnowledgeBaseProps {
  title: string;
  items: { question: string; answer: string }[];
}

const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ title, items }) => {
  return (
  
      <div className="space-y-4 mr-7 ml-7 mt-7">
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {items.map((item, index) => (
          <div key={index} className="border p-4 rounded-lg">
            <h3 className="font-medium">{item.question}</h3>
            <p className="text-sm text-muted-foreground mt-2">{item.answer}</p>
          </div>
        ))}
      </div>

  );
};

export default KnowledgeBase;