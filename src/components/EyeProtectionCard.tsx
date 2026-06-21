import { Eye, EyeOff, Sun, Clock, Info } from 'lucide-react';
import type { EyeProtection } from '@/types';

interface EyeProtectionCardProps {
  settings: EyeProtection;
  onToggle: () => void;
}

export default function EyeProtectionCard({ settings, onToggle }: EyeProtectionCardProps) {
  return (
    <div
      className={`
        card relative overflow-hidden transition-all duration-500
        ${settings.enabled ? 'bg-gradient-to-br from-amber-50 to-orange-50' : ''}
      `}
      style={{ animationDelay: '0.3s' }}
    >
      {settings.enabled && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
      )}

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className={`
                w-9 h-9 rounded-xl flex items-center justify-center transition-colors
                ${settings.enabled ? 'bg-amber-100' : 'bg-gray-100'}
              `}
            >
              {settings.enabled ? (
                <Eye className="w-5 h-5 text-amber-500" />
              ) : (
                <EyeOff className="w-5 h-5 text-gray-400" />
              )}
            </div>
            <h3 className="text-lg font-bold text-gray-800">护眼模式</h3>
          </div>

          <button
            type="button"
            onClick={onToggle}
            className={`
              relative w-14 h-8 rounded-full transition-all duration-300
              ${settings.enabled ? 'bg-success-500' : 'bg-gray-300'}
            `}
            aria-label="切换护眼模式"
          >
            <span
              className={`
                absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300
                ${settings.enabled ? 'left-7' : 'left-1'}
              `}
            />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          智能过滤蓝光，缓解视觉疲劳，每学习 20 分钟提醒休息，科学守护孩子视力健康。
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/70 backdrop-blur rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-secondary-500" />
              <span className="text-xs text-gray-500">休息提醒</span>
            </div>
            <p className="text-lg font-bold text-gray-800">
              每 {settings.reminderInterval} 分钟
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Sun className="w-4 h-4 text-warning-500" />
              <span className="text-xs text-gray-500">蓝光过滤</span>
            </div>
            <p className="text-lg font-bold text-gray-800">
              {settings.blueLightFilter}%
            </p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-white/50 rounded-xl flex gap-2">
          <Info className="w-4 h-4 text-secondary-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-500 leading-relaxed">
            遵循 20-20-20 护眼法则：每用眼 20 分钟，看 20 英尺（约 6 米）外的物体 20 秒。
          </p>
        </div>
      </div>
    </div>
  );
}
