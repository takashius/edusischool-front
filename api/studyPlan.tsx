import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ERDEAxios from "./ERDEAxios";
import { StudyPlanType } from "@/types/studyPlan";

export const useStudyPlanListOld = (pattern?: string) => {
  const query = useInfiniteQuery<StudyPlanType>({
    queryKey: ["studyPlanList", pattern],
    networkMode: 'offlineFirst',
    initialPageParam: 1,
    queryFn: async ({ pageParam = 0 }) => {
      return ERDEAxios.get(`/studyPlan/list/${pageParam}/${pattern}`);
    },
    getNextPageParam: (lastPage) => lastPage.next,
  });
  return query;
};

export const useStudyPlanList = (pattern?: string, page: number = 1) => {
  const query = useQuery<StudyPlanType>({
    queryKey: ["studyPlanList", pattern, page],
    networkMode: 'offlineFirst',
    queryFn: async () => {
      return ERDEAxios.get(`/studyPlan/list/${page}/${pattern}`);
    }
  });
  return query;
};