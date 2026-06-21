import { ClipboardList, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import type { Homework } from '@/types';

interface HomeworkReminderCardProps {
  homeworkList: Homework[];
}

const statusConfig = {
  pending: {
    label: '待完成',
    bgColor: 'bg-warning-50',
    textColor: 'text-warning-600',
    icon: Clock,
  },
  completed: {
    label: '已完成',
    bgColor: 'bg-success-50',
    textColor: 'text-success-600',
    icon: CheckCircle,
  },
  overdue: {
    label: '已逾期',
    bgColor: 'bg-red-50',
    textColor: 'text-red-500',
    icon: AlertTriangle,
  },
};

const subjectColors: Record<string, string> = {
  语文: 'bg-primary-100 text-primary-600',
  数学: 'bg-secondary-100 text-secondary-600',
  英语: 'bg-success-100 text-success-600',
  科学: 'bg-purple-100 text-purple-600',
};

export default function HomeworkReminderCard({ homeworkList }: HomeworkReminderCardProps) {
  const pendingCount = homeworkList.filter((h) => h.status === 'pending').length;

  return (
    <div className="card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-secondary-100 rounded-xl flex items-center justify-center">
            <ClipboardList className="w-5 h-5 text-secondary-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">作业提醒</h3>
        </div>
        {pendingCount > 0 && (
          <span className="px-2.5 py-1 bg-red-50 text-red-500 text-xs font-medium rounded-full">
            {pendingCount} 项待完成
          </span>
        )}
      </div>

      <div className="space-y-3">
        {homeworkList.map((homework, index) => {
          const status = statusConfig[homework.status];
          const StatusIcon = status.icon;
          const subjectColor = subjectColors[homework.subject] || 'bg-gray-100 text-gray-600';

          return (
            <div
              key={homework.id}
              className={`
                flex items-center gap-3 p-3 rounded-xl transition-all
                ${homework.status === 'completed' ? 'bg-gray-50 opacity-70' : 'bg-white hover:bg-gray-50'}
              `}
              style={{ animationDelay: `${0.25 + index * 0.05}s` }}
            >
              <div className={`w-10 h-10 rounded-xl ${subjectColor} flex items-center justify-center flex-shrink-0`}>
                <span className="text-xs font-bold">{homework.subject}</span>
              </div>

              <div className="flex-1 min-w-0">
                <p className={`font-medium truncate ${homework.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                  {homework.title}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-400">{homework.deadline}</span>
                </div>
              </div>

              <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${status.bgColor} flex-shrink-0`}>
                <StatusIcon className="w-3.5 h-3.5" />
                <span className={`text-xs font-medium ${status.textColor}`}>
                  {status.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {homeworkList.length === 0 && (
        <div className="py-8 text-center text-gray-400">
          <CheckCircle className="w-12 h-12 mx-auto mb-2 text-success-300" />
          <p>太棒了，所有作业都完成了！</p>
        </div>
      )}
    </div>
  );
}
