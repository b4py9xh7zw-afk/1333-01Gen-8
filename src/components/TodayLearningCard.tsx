import { BookOpen, Clock, Trophy } from 'lucide-react';
import type { TodayLearning } from '@/types';

interface TodayLearningCardProps {
  data: TodayLearning;
}

export default function TodayLearningCard({ data }: TodayLearningCardProps) {
  const progressPercent = data.totalCourses > 0
    ? Math.round((data.completedCourses / data.totalCourses) * 100)
    : 0;

  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-primary-100 rounded-xl flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">今日学习</h3>
        </div>
        <span className="text-sm text-gray-400">加油哦</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24 flex-shrink-0">
          <svg className="w-24 h-24 -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="#F3F4F6"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-700 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF8956" />
                <stop offset="100%" stopColor="#FF6B35" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-800">{progressPercent}%</span>
            <span className="text-xs text-gray-400">完成度</span>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-secondary-500" />
            <div className="flex-1">
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-gray-500">学习时长</span>
                <span className="text-lg font-bold text-gray-800">
                  {data.totalMinutes}
                  <span className="text-sm font-normal text-gray-400 ml-1">分钟</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Trophy className="w-4 h-4 text-warning-500" />
            <div className="flex-1">
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-gray-500">完成课程</span>
                <span className="text-lg font-bold text-gray-800">
                  {data.completedCourses}
                  <span className="text-sm font-normal text-gray-400 ml-1">/ {data.totalCourses}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 mb-3">科目分布</p>
        <div className="flex gap-3">
          {data.subjects.map((subject, index) => (
            <div
              key={subject.name}
              className="flex-1"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${(subject.minutes / data.totalMinutes) * 100}%`,
                    backgroundColor: subject.color,
                  }}
                />
              </div>
              <div className="flex justify-between items-center mt-1.5">
                <span className="text-xs text-gray-500">{subject.name}</span>
                <span className="text-xs font-medium text-gray-700">{subject.minutes}分</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
