import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const AuthenticationLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" />
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm">
                <Icon name="TrendingUp" size={28} color="white" />
              </div>
              <span className="text-2xl font-bold">TradeFlow Analytics</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Global Trade Intelligence Platform
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Empowering trade professionals with sophisticated analytics and real-time market insights for confident decision-making in global commerce.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-lg backdrop-blur-sm mt-1">
                <Icon name="BarChart3" size={16} color="white" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Advanced Analytics</h3>
                <p className="text-white/80 text-sm">
                  Comprehensive trade data visualization and pattern recognition
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-lg backdrop-blur-sm mt-1">
                <Icon name="Search" size={16} color="white" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Global Search</h3>
                <p className="text-white/80 text-sm">
                  Instant access to worldwide trade records and market intelligence
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-lg backdrop-blur-sm mt-1">
                <Icon name="Shield" size={16} color="white" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Enterprise Security</h3>
                <p className="text-white/80 text-sm">
                  Bank-grade security for sensitive trade and financial data
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-32 w-24 h-24 bg-white/5 rounded-full blur-lg" />
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-white/10 rounded-full blur-md" />
      </div>

      {/* Right Side - Authentication Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link to="/" className="inline-flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-xl">
                <Icon name="TrendingUp" size={24} color="white" />
              </div>
              <span className="text-xl font-bold text-foreground">
                TradeFlow Analytics
              </span>
            </Link>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>

          {/* Form Content */}
          <div className="space-y-6">
            {children}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to our{' '}
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationLayout;