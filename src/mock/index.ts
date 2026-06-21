import type { Parent, Child, EyeProtection } from '@/types';

export const mockParent: Parent = {
  id: 'parent-001',
  phone: '13800138000',
  nickname: '小明妈妈',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mom',
  children: [
    {
      id: 'child-001',
      name: '小明',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaoming',
      grade: '三年级',
      todayLearning: {
        totalMinutes: 45,
        completedCourses: 3,
        totalCourses: 5,
        subjects: [
          { name: '语文', color: '#FF6B35', minutes: 15 },
          { name: '数学', color: '#4A90D9', minutes: 20 },
          { name: '英语', color: '#52C41A', minutes: 10 },
        ],
      },
      homeworkList: [
        {
          id: 'hw-001',
          title: '语文同步练习第12课',
          subject: '语文',
          deadline: '今天 18:00',
          status: 'pending',
        },
        {
          id: 'hw-002',
          title: '数学口算练习30道',
          subject: '数学',
          deadline: '今天 20:00',
          status: 'completed',
        },
        {
          id: 'hw-003',
          title: '英语单词听写 Unit 5',
          subject: '英语',
          deadline: '昨天 18:00',
          status: 'overdue',
        },
        {
          id: 'hw-004',
          title: '科学实验报告',
          subject: '科学',
          deadline: '明天 12:00',
          status: 'pending',
        },
      ],
    },
    {
      id: 'child-002',
      name: '小红',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaohong',
      grade: '一年级',
      todayLearning: {
        totalMinutes: 30,
        completedCourses: 2,
        totalCourses: 4,
        subjects: [
          { name: '语文', color: '#FF6B35', minutes: 12 },
          { name: '数学', color: '#4A90D9', minutes: 10 },
          { name: '英语', color: '#52C41A', minutes: 8 },
        ],
      },
      homeworkList: [
        {
          id: 'hw-101',
          title: '拼音练习 a o e',
          subject: '语文',
          deadline: '今天 17:00',
          status: 'completed',
        },
        {
          id: 'hw-102',
          title: '数字认知 1-20',
          subject: '数学',
          deadline: '今天 19:00',
          status: 'pending',
        },
        {
          id: 'hw-103',
          title: '英语字母 A-F',
          subject: '英语',
          deadline: '明天 10:00',
          status: 'pending',
        },
      ],
    },
  ],
};

export const mockEyeProtection: EyeProtection = {
  enabled: true,
  reminderInterval: 20,
  breakDuration: 60,
  blueLightFilter: 50,
};

export const MOCK_VERIFICATION_CODE = '123456';

export const sendVerificationCode = async (phone: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`验证码已发送到 ${phone}，测试验证码：${MOCK_VERIFICATION_CODE}`);
      resolve(true);
    }, 1000);
  });
};

export const verifyCode = async (phone: string, code: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(code === MOCK_VERIFICATION_CODE);
    }, 800);
  });
};

export const login = async (phone: string, code: string): Promise<Parent | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (code === MOCK_VERIFICATION_CODE) {
        resolve({ ...mockParent, phone });
      } else {
        resolve(null);
      }
    }, 1000);
  });
};
