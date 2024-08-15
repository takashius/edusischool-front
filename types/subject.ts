export interface SubjectType {
  _id?: string | undefined
  name: string | undefined
}

export interface SubjectTypeResponse {
  results: SubjectType[];
  totalPages: number;
  currentPage: number;
  next: number;
  totalStudyPlans: number;
}