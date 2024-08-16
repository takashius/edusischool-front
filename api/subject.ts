import { useMutation, useQuery } from "@tanstack/react-query";
import ERDEAxios from "./ERDEAxios";
import { Subject, SubjectResponse } from "@/types/subject";

export const useSubjectList = (pattern?: string, page: number = 1) => {
  const query = useQuery<SubjectResponse>({
    queryKey: ["SubjectList", pattern, page],
    networkMode: 'offlineFirst',
    queryFn: async () => {
      return ERDEAxios.get(`/subject/list/${page}/${pattern}`);
    }
  });
  return query;
};

export const useListSubject = () => {
  const query = useQuery<Subject[]>({
    queryKey: ["SubjectSimple"],
    retry: false,
    queryFn: () => {
      return ERDEAxios.get("/subject/simple");
    },
  });
  return query;
};

export const useGetSubject = (id: string | string[]) => {
  const query = useQuery<Subject>({
    queryKey: ["useGetSubject"],
    retry: false,
    queryFn: () => {
      return ERDEAxios.get("/subject/" + id);
    },
  });
  return query;
};

export const useCreateSubject = (onSuccess: { (): void; onSuccess?: () => void; }) => {
  const mutation = useMutation({
    mutationFn: (data: Subject) => {
      return ERDEAxios.post("/subject", data);
    },
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
    }
  });

  return mutation;
};

export const useUpdateSubject = (onSuccess: { (): void; onSuccess?: () => void; }) => {
  const mutation = useMutation({
    mutationFn: (data: Subject) => {
      return ERDEAxios.patch("/subject", data);
    },
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
    }
  });

  return mutation;
};

export const useDeleteSubject = (onSuccess: { (): void; onSuccess?: () => void; }) => {
  const mutation = useMutation({
    mutationFn: (id: string) => {
      return ERDEAxios.delete(`/subject/${id}`);
    },
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
    }
  });

  return mutation;
};