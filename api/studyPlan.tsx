import { useInfiniteQuery } from "@tanstack/react-query";
import ERDEAxios from "./ERDEAxios";
import { StudyPlanType } from "@/types/studyPlan";

export const useStudyPlanList = (pattern?: string) => {
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