export const TASK_STATUSES = ['todo', 'doing', 'done', 'blocked'] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export const RISK_LEVELS = ['low', 'medium', 'high'] as const;
export type RiskLevel = (typeof RISK_LEVELS)[number];

export type Project = {
  id: string;
  name: string;
  createdAt: string;
};

export type Task = {
  id: string;
  projectId: string;
  title: string;
  status: TaskStatus;
  createdAt: string;
};

export type ReviewChecklist = {
  testsReviewed: boolean;
  edgeCasesChecked: boolean;
  typesChecked: boolean;
  manualReviewCompleted: boolean;
};

export type AIChangeLogEntry = {
  id: string;
  projectId: string;
  title: string;
  filesTouched: string[];
  riskLevel: RiskLevel;
  reviewed: boolean;
  notes: string;
  checklist: ReviewChecklist;
  createdAt: string;
};

export const EMPTY_CHECKLIST: ReviewChecklist = {
  testsReviewed: false,
  edgeCasesChecked: false,
  typesChecked: false,
  manualReviewCompleted: false,
};
