import { Search, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary">RealNest</h1>
            </div>
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <a href="/" className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium">
                Купить
              </a>
              <a href="/rent" className="text-gray-500 hover:text-primary px-3 py-2 text-sm font-medium">
                Арендовать
              </a>
              <a href="/guide" className="text-gray-500 hover:text-primary px-3 py-2 text-sm font-medium">
                RealГид
              </a>
              <a href="/news" className="text-gray-500 hover:text-primary px-3 py-2 text-sm font-medium">
                Новости
              </a>
              <a href="/about" className="text-gray-500 hover:text-primary px-3 py-2 text-sm font-medium">
                О нас
              </a>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 hidden lg:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Поиск по городу, району или адресу"
                className="pl-10 w-full"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-primary">
              <Heart className="h-6 w-6" />
            </Button>
            <Button className="bg-primary text-white hover:bg-primary/90">
              Разместить объявление
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-primary">
              <User className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
