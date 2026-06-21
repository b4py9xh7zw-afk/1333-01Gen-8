import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import useAppStore from '@/store/useAppStore';

export default function ChildProfileSwitcher() {
  const parent = useAppStore((state) => state.parent);
  const currentChildId = useAppStore((state) => state.currentChildId);
  const setCurrentChild = useAppStore((state) => state.setCurrentChild);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentChild = parent?.children.find((c) => c.id === currentChildId);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (childId: string) => {
    setCurrentChild(childId);
    setIsOpen(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '早上好';
    if (hour < 18) return '下午好';
    return '晚上好';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1 rounded-xl hover:bg-white/50 transition-colors"
      >
        <img
          src={currentChild?.avatar}
          alt={currentChild?.name}
          className="w-12 h-12 rounded-full bg-primary-100 object-cover"
        />
        <div className="text-left">
          <p className="text-sm text-white/80">{getGreeting()}，</p>
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold text-white">{currentChild?.name}</span>
            <ChevronDown
              className={`w-4 h-4 text-white/80 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </div>
      </button>

      {isOpen && parent && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-card overflow-hidden z-50 animate-bounce-in">
          <div className="p-2">
            <p className="text-xs text-gray-400 px-3 py-2">切换孩子</p>
            {parent.children.map((child) => (
              <button
                key={child.id}
                type="button"
                onClick={() => handleSelect(child.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors
                  ${child.id === currentChildId
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <img
                  src={child.avatar}
                  alt={child.name}
                  className="w-9 h-9 rounded-full bg-gray-100 object-cover"
                />
                <div className="text-left">
                  <p className="font-medium">{child.name}</p>
                  <p className="text-xs text-gray-400">{child.grade}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
