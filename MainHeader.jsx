import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const MainHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, [location]);

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'BarChart3' },
    { label: 'Global Trade Search', path: '/global-trade-search', icon: 'Search' },
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  // Don't render header on authentication pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[1000] bg-card border-b border-border">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="TrendingUp" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              TradeFlow Analytics
            </span>
          </Link>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                    isActivePath(item.path)
                      ? 'text-primary bg-primary/10 border-l-3 border-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item.icon} size={16} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* User Menu */}
                <div className="hidden md:flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} color="white" />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      Trade Analyst
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    iconName="LogOut"
                    iconSize={16}
                  >
                    Logout
                  </Button>
                </div>

                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={handleMobileMenuToggle}
                  iconName={isMobileMenuOpen ? "X" : "Menu"}
                  iconSize={20}
                />
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="default" size="sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && isAuthenticated && (
        <div className="fixed inset-0 z-[1100] md:hidden">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleMobileMenuToggle}
          />
          <div className="fixed top-16 left-0 right-0 bg-card border-b border-border shadow-modal animate-slide-in">
            <nav className="px-6 py-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleMobileMenuToggle}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors duration-150 ${
                    isActivePath(item.path)
                      ? 'text-primary bg-primary/10 border-l-3 border-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {/* Mobile User Actions */}
              <div className="pt-4 mt-4 border-t border-border">
                <div className="flex items-center space-x-3 px-4 py-2">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} color="white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      Trade Analyst
                    </div>
                    <div className="text-xs text-muted-foreground">
                      analyst@tradeflow.com
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  iconName="LogOut"
                  iconPosition="left"
                  iconSize={16}
                  className="w-full justify-start mt-2 mx-4"
                >
                  Logout
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default MainHeader;