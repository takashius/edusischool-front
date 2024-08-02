import { Created } from "./general";

export interface StudyPlan {
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

export interface StudyPlanForm {
  _id?: string;
  name: string;
  code: string;
  abbr: string;
  mention: string;
  type: string;
}

export interface StudyPlanResponse {
  results: StudyPlan[];
  totalPages: number;
  currentPage: number;
  next: number;
  totalStudyPlans: number;
}

export interface StudyPlanSimple {
  id: string;
  name: string;
  created: Created;
}

export interface StudyPlanTypes {
  _id: string;
  code: string;
  name: string;
}

export interface StudyPlanType {
  _id?: string;
  code: string;
  name: string;
}

export interface StudyPlanSingle {
  _id: string;
  name: string;
  code: string;
  abbr: string;
  mention: string;
  type: StudyPlanType;
  created: Created
}

