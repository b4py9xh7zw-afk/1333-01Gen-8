import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, LogOut } from 'lucide-react';
import ChildProfileSwitcher from '@/components/ChildProfileSwitcher';
import TodayLearningCard from '@/components/TodayLearningCard';
import HomeworkReminderCard from '@/components/HomeworkReminderCard';
import EyeProtectionCard from '@/components/EyeProtectionCard';
import BottomNavigation from '@/components/BottomNavigation';
import VerifyModal from '@/components/VerifyModal';
import useAppStore from '@/store/useAppStore';

export default function HomePage() {
  const navigate = useNavigate();
  const currentChild = useAppStore((state) => state.getCurrentChild());
  const eyeProtection = useAppStore((state) => state.eyeProtection);
  const toggleEyeProtection = useAppStore((state) => state.toggleEyeProtection);
  const isLoggedIn = useAppStore((state) => state.isLoggedIn);
  const logout = useAppStore((state) => state.logout);
  const settingsVerified = useAppStore((state) => state.settingsVerified);
  const setSettingsVerified = useAppStore((state) => state.setSettingsVerified);

  const [activeTab, setActiveTab] = useState<'home' | 'report' | 'settings'>('home');
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleSettingsClick = () => {
    if (settingsVerified) {
      setActiveTab('settings');
    } else {
      setShowVerifyModal(true);
    }
  };

  const handleVerified = () => {
    setSettingsVerified(true);
    setActiveTab('settings');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!currentChild) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">加载中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      <header className="bg-gradient-to-br from-primary-400 to-primary-500 pt-12 pb-20 px-6 rounded-b-[32px]">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <ChildProfileSwitcher />
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="relative w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Bell className="w-5 h-5 text-white" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full" />
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <LogOut className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 -mt-14 space-y-4">
        {activeTab === 'home' && (
          <>
            <TodayLearningCard data={currentChild.todayLearning} />
            <HomeworkReminderCard homeworkList={currentChild.homeworkList} />
            <EyeProtectionCard
              settings={eyeProtection}
              onToggle={toggleEyeProtection}
            />
          </>
        )}

        {activeTab === 'report' && (
          <div className="card text-center py-16">
            <div className="w-20 h-20 bg-secondary-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-secondary-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 3v18h18" strokeLinecap="round" />
                <path d="M7 14l3-3 4 4 5-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">学习报告</h3>
            <p className="text-gray-400 text-sm">功能开发中，敬请期待</p>
          </div>
        )}

        {activeTab === 'settings' && settingsVerified && (
          <div className="space-y-4">
            <div className="card">
              <h3 className="text-lg font-bold text-gray-800 mb-4">家长设置</h3>
              <div className="space-y-1">
                <button
                  type="button"
                  className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-700">账号管理</span>
                  <span className="text-gray-400">›</span>
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-700">孩子管理</span>
                  <span className="text-gray-400">›</span>
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-700">护眼模式设置</span>
                  <span className="text-gray-400">›</span>
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-700">消息通知</span>
                  <span className="text-gray-400">›</span>
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full card text-center text-red-500 font-medium hover:bg-red-50 transition-colors"
            >
              退出登录
            </button>
          </div>
        )}
      </main>

      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSettingsClick={handleSettingsClick}
      />

      <VerifyModal
        isOpen={showVerifyModal}
        onClose={() => setShowVerifyModal(false)}
        onVerified={handleVerified}
      />
    </div>
  );
}
