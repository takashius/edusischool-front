import { useMutation, useQuery } from "@tanstack/react-query";
import ERDEAxios from "./ERDEAxios";
import { StudyPlan, StudyPlanResponse, StudyPlanSimple, StudyPlanSingle, StudyPlanTypes } from "@/types/studyPlan";

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

export const useListSimpleStudyPlan = () => {
  const query = useQuery<StudyPlanSimple[]>({
    queryKey: ["studyPlanSimple"],
    retry: false,
    queryFn: () => {
      return ERDEAxios.get("/studyPlan/simple");
    },
  });
  return query;
};

export const useListTypes = () => {
  const query = useQuery<StudyPlanTypes[]>({
    queryKey: ["studyPlanTypes"],
    retry: false,
    queryFn: () => {
      return ERDEAxios.get("/studyPlan/types");
    },
  });
  return query;
};

export const useGetStudyPlan = (id: string | string[]) => {
  const query = useQuery<StudyPlanSingle>({
    queryKey: ["studyPlanDetail"],
    retry: false,
    queryFn: () => {
      return ERDEAxios.get("/studyPlan/" + id);
    },
  });
  return query;
};

export const useCreateStudyPlan = (onSuccess: { (): void; onSuccess?: () => void; }) => {
  const mutation = useMutation({
    mutationFn: (data: StudyPlan) => {
      return ERDEAxios.post("/studyPlan", data);
    },
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
    }
  });

  return mutation;
};

export const useUpdateStudyPlan = (onSuccess: { (): void; onSuccess?: () => void; }) => {
  const mutation = useMutation({
    mutationFn: (data: StudyPlan) => {
      return ERDEAxios.patch("/studyPlan", data);
    },
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
    }
  });

  return mutation;
};

export const useDeleteStudyPlan = (onSuccess: { (): void; onSuccess?: () => void; }) => {
  const mutation = useMutation({
    mutationFn: (id: string) => {
      return ERDEAxios.delete(`/studyPlan/${id}`);
    },
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
    }
  });

  return mutation;
};