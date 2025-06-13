import { User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const menuItems = [
    { href: "#properties", label: "Купить", scroll: true },
    { href: "/rent", label: "Арендовать" },
    { href: "/guide", label: "RealГид" },
    { href: "/news", label: "Новости" },
    { href: "/about", label: "О нас" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, scroll: boolean) => {
    if (scroll) {
      e.preventDefault();
      const href = e.currentTarget.getAttribute('href');
      if (href) {
        if (window.location.pathname !== '/') {
          window.location.href = '/' + href;
          return;
        }
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/70 backdrop-blur-xl shadow-sm sticky top-0 z-50 border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-shrink-0"
            >
              <a href="/">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer">
                RealNest
              </h1>
              </a>
            </motion.div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:ml-8 md:flex md:space-x-1">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.scroll || false)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 260,
                    damping: 20 
                  }}
                  className="group relative px-3 py-2 text-sm font-medium transition-colors text-slate-600 hover:text-blue-600"
                >
                  {item.label}
                  <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-blue-500/0 via-blue-500/70 to-blue-500/0 opacity-0 transition-opacity group-hover:opacity-100" />
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white/80 backdrop-blur-lg">
                {menuItems.map((item) => (
                  <DropdownMenuItem key={item.href} className="focus:bg-blue-50">
                    <a 
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.scroll || false)}
                      className="w-full text-slate-600 hover:text-blue-600 transition-colors"
                    >
                      {item.label}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Post Ad Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.3,
                type: "spring",
                stiffness: 260,
                damping: 20 
              }}
            >
              <Button 
                className="bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 text-white hover:from-blue-700 hover:via-indigo-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02]"
              >
                Разместить объявление
              </Button>
            </motion.div>

            {/* User Profile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.4,
                type: "spring",
                stiffness: 260,
                damping: 20 
              }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <User className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
