export interface SubjectType {
  _id?: string
  id?: string
  name: string | undefined
}

export interface SubjectBase {
  _id?: string | undefined
  name: string | undefined
  abbr: string | undefined
  hours: number | undefined
  group: string | undefined
  modality: string | undefined
}

export interface Subject extends SubjectBase {
  type?: SubjectType
}

export interface SubjectForm extends SubjectBase {
  type?: string
}

export interface SubjectTypeResponse {
  results: SubjectType[];
  totalPages: number;
  currentPage: number;
  next: number;
  totalStudyPlans: number;
}

export interface SubjectResponse {
  results: Subject[];
  totalPages: number;
  currentPage: number;
  next: number;
  totalStudyPlans: number;
}