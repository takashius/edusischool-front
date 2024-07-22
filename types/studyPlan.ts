export interface StudyPlanType {
  next: unknown;
  _id?: string;
  name: string;
  code: string;
  abbr: string;
  mention: string;
  type?: {
    code: string;
    name: string;
  };
}

export interface StudyPlanResponse {
  results: StudyPlanType[];
  totalPages: number;
  currentPage: number;
  next: number;
  totalStudyPlans: number;
}
