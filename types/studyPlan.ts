export interface StudyPlanType {
  next: unknown;
  _id: string;
  name: string;
  code: string;
  abbr: string;
  mention: string;
  type: {
    code: string;
    name: string;
  };
}
