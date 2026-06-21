import { Home, BarChart2, Lock } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: 'home' | 'report' | 'settings';
  onTabChange: (tab: 'home' | 'report' | 'settings') => void;
  onSettingsClick: () => void;
}

export default function BottomNavigation({
  activeTab,
  onTabChange,
  onSettingsClick,
}: BottomNavigationProps) {
  const tabs = [
    {
      key: 'home' as const,
      label: '首页',
      icon: Home,
    },
    {
      key: 'report' as const,
      label: '学习报告',
      icon: BarChart2,
    },
    {
      key: 'settings' as const,
      label: '设置',
      icon: Lock,
      isProtected: true,
    },
  ];

  const handleTabClick = (key: 'home' | 'report' | 'settings') => {
    if (key === 'settings') {
      onSettingsClick();
    } else {
      onTabChange(key);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white border-t border-gray-100 px-4 pb-safe">
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleTabClick(tab.key)}
              className={`
                flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all
                ${isActive
                  ? 'text-primary-500'
                  : 'text-gray-400 hover:text-gray-600'
                }
              `}
            >
              <div className="relative">
                <Icon className={`w-6 h-6 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {tab.isProtected && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full" />
                )}
              </div>
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
