import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  User,
  ShoppingCart,
  Heart,
  Menu,
  X,
  Settings,
} from 'lucide-react';
import { useSearch } from '../layout/Search';
import { useAuth } from '../../../hook/authContext';

interface HeaderProps {
  isTransparent?: boolean;
}

export function Header({ isTransparent }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { open, close, isOpen } = useSearch();
  const { user, authReady } = useAuth();
  const handleSearchClick = () => {
    isOpen ? close() : open();
  };
  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 ${isTransparent ? "bg-transparent" : "bg-white"} backdrop-blur-md`}>
        <div className="max-w-screen-xl mx-auto py-4 px-4">
          <div className="grid grid-cols-3 items-center text-sm tracking-wide">

            {/* Left: Desktop Nav + Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              {/* Trigger for Mobile Menu */}
              <button
                className="md:hidden p-2"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>

              <div className="hidden md:flex gap-8">
                <Link to="/series" className="hover:bg-black/10 px-4 py-2 rounded-md transition-all">SERIES</Link>
                <Link to="/about" className="hover:bg-black/10 px-4 py-2 rounded-md transition-all">ABOUT&CONTACT</Link>
              </div>
            </div>

            {/* Center: Logo */}
            <div className="flex justify-center">
              <Link to="/" className="text-2xl md:text-4xl font-serif font-bold">SONY</Link>
            </div>

            {/* Right: Icons */}
            <div className="flex justify-end gap-2 md:gap-8">
              <button onClick={handleSearchClick} className={`p-2 rounded-md hover:bg-black/10 ${isOpen ? 'text-blue-600' : ''}`}>
                {isOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>

              {!authReady ? (
                <div className="p-2 rounded-md hover:bg-black/10">
                  <div className="w-5 h-5 animate-pulse bg-gray-200 rounded-md" />
                </div>
              ) : (
                <>
                  {/* User Profile Link - Visible to any logged-in user */}
                  <Link
                    to={user ? "/users-profile" : "/login"}
                    className="p-2 rounded-md hover:bg-black/10"
                  >
                    <User className="w-5 h-5" />
                  </Link>

                  {/* Admin Settings Link - ONLY visible if user is admin */}
                  {user?.role === 'admin' && (
                    <Link to="/admin" className="p-2 rounded-md hover:bg-black/10">
                      <Settings className="w-5 h-5" />
                    </Link>
                  )}
                </>
              )}
              <Link to="/cart" className="p-2 rounded-md hover:bg-black/10">
                <ShoppingCart className="w-5 h-5" />
              </Link>
            </div>

          </div>
        </div>
      </header>
      {/* Mobile Side Menu */}
      <div
        className={`
          fixed inset-0 z-50 md:hidden
          ${isMobileMenuOpen ? 'visible' : 'invisible'}
        `}
      >
        {/* Backdrop */}
        <div
          className={`
            absolute inset-0 bg-black/40 transition-opacity
            ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}
          `}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`
            absolute left-0 top-0 h-full w-[100vw] max-w-md sm:max-w-3xl  bg-white
            transform transition-transform duration-300
            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-lg font-semibold">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-4 p-4 text-sm">
            <Link to="/category/tops" className=' hover:bg-black px-0.5 py-1 mt-1 hover:text-white' onClick={() => setIsMobileMenuOpen(false)}>
              Tops
            </Link>
            <Link to="/category/bottoms" className=' hover:bg-black px-0.5 py-1 mt-1 hover:text-white' onClick={() => setIsMobileMenuOpen(false)}>
              Bottoms
            </Link>
            <Link to="/category/accessories" className=' hover:bg-black px-0.5 py-1 mt-1 hover:text-white' onClick={() => setIsMobileMenuOpen(false)}>
              Accessories
            </Link>
            <Link to="/category/shoes" className=' hover:bg-black px-0.5 py-1 mt-1 hover:text-white' onClick={() => setIsMobileMenuOpen(false)}>
              Shoes
            </Link>
            <Link to="/sales" className=' hover:bg-black px-0.5 py-1 mt-1 hover:text-white' onClick={() => setIsMobileMenuOpen(false)}>
              Sales
            </Link>
            <Link to="/trending" className=' hover:bg-black px-0.5 py-1 mt-1 hover:text-white' onClick={() => setIsMobileMenuOpen(false)}>
              Trending
            </Link>

            <div className="mt-6 border-t pt-4 flex gap-4">
              <Link to="/profile">
                <User className="w-5 h-5" />
              </Link>
              <Link to="/cart">
                <ShoppingCart className="w-5 h-5" />
              </Link>
              <Link to="/favorites">
                <Heart className="w-5 h-5" />
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
