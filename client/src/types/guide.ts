import { LucideIcon } from "lucide-react";

export interface GuideArticle {
  id: number;
  title: string;
  description: string;
  category: string;
  readTime: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  popular: boolean;
  icon: LucideIcon;
  content: {
    intro: string;
    sections: {
      title: string;
      text: string;
    }[];
    conclusion: string;
    tips: string[];
  };
} 