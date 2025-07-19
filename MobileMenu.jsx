import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const MobileMenu = ({ isOpen, onClose, isAuthenticated, onLogout }) => {
  const location = useLocation();

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'BarChart3' },
    { label: 'Global Trade Search', path: '/global-trade-search', icon: 'Search' },
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const handleItemClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1100] md:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="fixed top-16 left-0 right-0 bg-card border-b border-border shadow-modal animate-slide-in">
        <nav className="px-6 py-4">
          {isAuthenticated ? (
            <>
              {/* Navigation Items */}
              <div className="space-y-2 mb-6">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleItemClick}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-150 ${
                      isActivePath(item.path)
                        ? 'text-primary bg-primary/10 border-l-3 border-primary shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted active:scale-[0.98]'
                    }`}
                  >
                    <Icon name={item.icon} size={20} />
                    <span>{item.label}</span>
                    {isActivePath(item.path) && (
                      <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
                    )}
                  </Link>
                ))}
              </div>

              {/* User Section */}
              <div className="pt-4 border-t border-border">
                <div className="flex items-center space-x-3 px-4 py-3 mb-3">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} color="white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">
                      Trade Analyst
                    </div>
                    <div className="text-xs text-muted-foreground">
                      analyst@tradeflow.com
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-success rounded-full" title="Online" />
                </div>

                {/* User Actions */}
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Settings"
                    iconPosition="left"
                    iconSize={16}
                    className="w-full justify-start"
                    onClick={handleItemClick}
                  >
                    Settings
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="HelpCircle"
                    iconPosition="left"
                    iconSize={16}
                    className="w-full justify-start"
                    onClick={handleItemClick}
                  >
                    Help & Support
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="LogOut"
                    iconPosition="left"
                    iconSize={16}
                    className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      onLogout();
                      handleItemClick();
                    }}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </>
          ) : (
            /* Unauthenticated State */
            <div className="space-y-4">
              <div className="text-center py-8">
                <Icon name="Lock" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Access Required
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Please sign in to access TradeFlow Analytics
                </p>
                
                <div className="space-y-3">
                  <Link to="/login" onClick={handleItemClick}>
                    <Button variant="default" size="default" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  
                  <Link to="/register" onClick={handleItemClick}>
                    <Button variant="outline" size="default" className="w-full">
                      Create Account
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;