import { useQuery } from "@tanstack/react-query";
import ERDEAxios from "./ERDEAxios";
import { StudyPlanResponse } from "@/types/studyPlan";

export const useStudyPlanList = (pattern?: string, page: number = 1) => {
  const query = useQuery<StudyPlanResponse>({
    queryKey: ["studyPlanList", pattern, page],
    networkMode: 'offlineFirst',
    queryFn: async () => {
      return ERDEAxios.get(`/studyPlan/list/${page}/${pattern}`);
    }
  });
  return query;
};