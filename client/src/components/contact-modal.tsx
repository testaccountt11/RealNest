import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Users, Send } from "lucide-react";

// Стиль для удаления outline при всех взаимодействиях
const noOutlineStyle = "focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus:ring-0 focus:ring-offset-0 outline-none ring-0 ring-offset-0 hover:ring-0 hover:ring-offset-0 active:ring-0 active:ring-offset-0";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    console.log("Form submitted:", formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-800">
              Оставить заявку
            </DialogTitle>
          </div>
          <p className="text-gray-600">
            Заполните форму, и наши специалисты свяжутся с вами в ближайшее время
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Ваше имя</Label>
              <Input
                id="name"
                placeholder="Введите ваше имя"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`mt-1.5 ${noOutlineStyle}`}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`mt-1.5 ${noOutlineStyle}`}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`mt-1.5 ${noOutlineStyle}`}
                required
              />
            </div>

            <div>
              <Label htmlFor="message">Ваш вопрос</Label>
              <Textarea
                id="message"
                placeholder="Опишите ваш вопрос..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`mt-1.5 min-h-[100px] ${noOutlineStyle}`}
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <Button 
              type="submit" 
              className={`flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 ${noOutlineStyle}`}
            >
              <Send className="h-4 w-4 mr-2" />
              Отправить заявку
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className={`flex-1 hover:bg-gray-100 hover:text-gray-900 ${noOutlineStyle}`}
              onClick={() => onOpenChange(false)}
            >
              Отмена
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 