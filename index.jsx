import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import MainHeader from '../../components/ui/MainHeader';
import TradeVolumeCard from './components/TradeVolumeCard';
import WorldTradeMap from './components/WorldTradeMap';
import TrendingProductsChart from './components/TrendingProductsChart';
import AlertsFeed from './components/AlertsFeed';
import QuickActions from './components/QuickActions';
import BookmarkShortcuts from './components/BookmarkShortcuts';
import FilterControls from './components/FilterControls';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Dashboard = () => {
  const [filters, setFilters] = useState({});
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Mock trade volume data
  const tradeVolumeData = [
    {
      title: "Total Trade Volume",
      value: "$2.4T",
      change: "+12.5%",
      changeType: "positive",
      icon: "TrendingUp",
      color: "bg-primary"
    },
    {
      title: "Active Trade Routes",
      value: "1,247",
      change: "+8.3%",
      changeType: "positive",
      icon: "Route",
      color: "bg-secondary"
    },
    {
      title: "New Suppliers",
      value: "342",
      change: "+15.2%",
      changeType: "positive",
      icon: "Building2",
      color: "bg-success"
    },
    {
      title: "Price Alerts",
      value: "28",
      change: "-5.1%",
      changeType: "negative",
      icon: "AlertTriangle",
      color: "bg-warning"
    }
  ];

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setLastUpdated(new Date());
    }, 1000);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLastUpdated(new Date());
    }, 1500);
  };

  const formatLastUpdated = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - TradeFlow Analytics</title>
        <meta name="description" content="Global trade analytics dashboard with real-time insights, trade volume tracking, and market intelligence for informed business decisions." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <MainHeader />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <span>Dashboard</span>
                  <Icon name="ChevronRight" size={16} />
                  <span className="text-foreground">Overview</span>
                </nav>
                <h1 className="text-3xl font-bold text-foreground">Trade Analytics Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Real-time global trade intelligence and market insights
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Last updated</div>
                  <div className="text-sm font-medium text-foreground">
                    {formatLastUpdated(lastUpdated)}
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="RefreshCw"
                  iconPosition="left"
                  loading={isLoading}
                  onClick={handleRefresh}
                >
                  Refresh
                </Button>
                
                <Button
                  variant="default"
                  size="sm"
                  iconName="Settings"
                  iconPosition="left"
                >
                  Customize
                </Button>
              </div>
            </div>

            {/* Filter Controls */}
            <FilterControls onFiltersChange={handleFiltersChange} />

            {/* Trade Volume Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {tradeVolumeData.map((data, index) => (
                <TradeVolumeCard
                  key={index}
                  title={data.title}
                  value={data.value}
                  change={data.change}
                  changeType={data.changeType}
                  icon={data.icon}
                  color={data.color}
                />
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* World Trade Map - Takes 2 columns */}
              <div className="lg:col-span-2">
                <WorldTradeMap />
              </div>
              
              {/* Trending Products Chart */}
              <div className="lg:col-span-1">
                <TrendingProductsChart />
              </div>
            </div>

            {/* Secondary Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Quick Actions */}
              <QuickActions />
              
              {/* Bookmark Shortcuts */}
              <BookmarkShortcuts />
            </div>

            {/* Alerts Feed - Full Width */}
            <div className="mb-8">
              <AlertsFeed />
            </div>

            {/* Loading Overlay */}
            {isLoading && (
              <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className="bg-card rounded-lg border border-border p-6 flex items-center space-x-4">
                  <div className="animate-spin">
                    <Icon name="Loader2" size={24} className="text-primary" />
                  </div>
                  <span className="text-foreground font-medium">Updating dashboard data...</span>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;