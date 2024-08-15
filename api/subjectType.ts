import { useMutation, useQuery } from "@tanstack/react-query";
import ERDEAxios from "./ERDEAxios";
import { SubjectType, SubjectTypeResponse } from "@/types/subject";

export const useSubjectTypeList = (pattern?: string, page: number = 1) => {
  const query = useQuery<SubjectTypeResponse>({
    queryKey: ["SubjectTypeList", pattern, page],
    networkMode: 'offlineFirst',
    queryFn: async () => {
      return ERDEAxios.get(`/subjectType/list/${page}/${pattern}`);
    }
  });
  return query;
};

export const useListSubjectType = () => {
  const query = useQuery<SubjectType[]>({
    queryKey: ["SubjectTypeSimple"],
    retry: false,
    queryFn: () => {
      return ERDEAxios.get("/subjectType/simple");
    },
  });
  return query;
};

export const useGetSubjectType = (id: string | string[]) => {
  const query = useQuery<SubjectType>({
    queryKey: ["useGetSubjectType"],
    retry: false,
    queryFn: () => {
      return ERDEAxios.get("/subjectType/" + id);
    },
  });
  return query;
};

export const useCreateSubjectType = (onSuccess: { (): void; onSuccess?: () => void; }) => {
  const mutation = useMutation({
    mutationFn: (data: SubjectType) => {
      return ERDEAxios.post("/subjectType", data);
    },
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
    }
  });

  return mutation;
};

export const useUpdateSubjectType = (onSuccess: { (): void; onSuccess?: () => void; }) => {
  const mutation = useMutation({
    mutationFn: (data: SubjectType) => {
      return ERDEAxios.patch("/subjectType", data);
    },
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
    }
  });

  return mutation;
};

export const useDeleteSubjectType = (onSuccess: { (): void; onSuccess?: () => void; }) => {
  const mutation = useMutation({
    mutationFn: (id: string) => {
      return ERDEAxios.delete(`/subjectType/${id}`);
    },
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
    }
  });

  return mutation;
};