export interface SubjectProgress {
  name: string;
  color: string;
  minutes: number;
}

export interface TodayLearning {
  totalMinutes: number;
  completedCourses: number;
  totalCourses: number;
  subjects: SubjectProgress[];
}

export interface Homework {
  id: string;
  title: string;
  subject: string;
  deadline: string;
  status: 'pending' | 'completed' | 'overdue';
}

export interface Child {
  id: string;
  name: string;
  avatar: string;
  grade: string;
  todayLearning: TodayLearning;
  homeworkList: Homework[];
}

export interface Parent {
  id: string;
  phone: string;
  nickname: string;
  avatar: string;
  children: Child[];
}

export interface EyeProtection {
  enabled: boolean;
  reminderInterval: number;
  breakDuration: number;
  blueLightFilter: number;
}
