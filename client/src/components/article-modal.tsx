import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowLeft, Lightbulb } from "lucide-react";
import type { GuideArticle } from "@/types/guide";
import { motion } from "framer-motion";

interface ArticleModalProps {
  article: GuideArticle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ArticleModal({ article, open, onOpenChange }: ArticleModalProps) {
  if (!article) return null;

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: "bg-green-100 text-green-800",
      intermediate: "bg-blue-100 text-blue-800",
      advanced: "bg-purple-100 text-purple-800"
    };
    return colors[difficulty as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "Начинающий";
      case "intermediate": return "Средний";
      case "advanced": return "Продвинутый";
      default: return difficulty;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
              onClick={() => onOpenChange(false)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Badge className={getDifficultyColor(article.difficulty)}>
              {getDifficultyLabel(article.difficulty)}
            </Badge>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <Clock className="h-4 w-4" />
              {article.readTime}
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {article.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {/* Иконка и категория */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <article.icon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Категория</div>
              <div className="font-medium text-gray-800 capitalize">{article.category}</div>
            </div>
          </div>

          {/* Контент статьи */}
          <div className="prose max-w-none">
            {/* Введение */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-600 text-lg leading-relaxed">
                {article.content.intro}
              </p>
            </motion.div>

            {/* Основные разделы */}
            <div className="mt-8 space-y-8">
              {article.content.sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {section.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Заключение */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Заключение
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {article.content.conclusion}
              </p>
            </motion.div>

            {/* Полезные советы */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 bg-blue-50 rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="h-5 w-5 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Полезные советы
                </h3>
              </div>
              <ul className="space-y-3">
                {article.content.tips.map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-2 text-gray-600"
                  >
                    <span className="text-blue-600 font-medium">•</span>
                    {tip}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Кнопки действий */}
          <div className="flex items-center justify-end pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
            >
              Закрыть
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 