import { Register, useMutation, useQuery, UseMutationResult } from "@tanstack/react-query";
import ERDEAxios from "./ERDEAxios";
import { Account, LoginResponse } from "@/types/general";

export interface UserLogin {
  name: string;
  lastName: string;
  email: string;
  token: string;
  _id: string;
}

export interface Recovery {
  code: Number;
  email: string;
  newPass: string;
}

export interface SetCompany {
  user: string;
  company: string;
}

export interface Login {
  email: string;
  password: string;
}

export const useLogin = (): UseMutationResult<LoginResponse, unknown, Login> => {
  const mutation = useMutation<LoginResponse, unknown, Login>({
    mutationFn: (data: Login) => {
      return ERDEAxios.post("/user/login", data);
    }
  });

  return mutation;
};

export const useAccount = () => {
  const query = useQuery<Account>({
    queryKey: ["myAccount"],
    retry: false,
    queryFn: () => {
      return ERDEAxios.get("/user/account");
    },
  });
  return query;
};

export const useLogout = () => {
  const query = useQuery({
    queryKey: ["logout"],
    queryFn: () => {
      return ERDEAxios.post("/user/logout");
    },
  });
  return query;
};

export const useRegister = () => {
  const mutation = useMutation({
    mutationFn: (data: Register) => {
      return ERDEAxios.post("/user/register", data);
    }
  });

  return mutation;
};

export const useUpdateProfile = () => {
  const mutation = useMutation({
    mutationFn: (data: Account) => {
      return ERDEAxios.patch("/user/profile", data);
    }
  });

  return mutation;
};

export const useSelectCompany = () => {
  const mutation = useMutation({
    mutationFn: (data: SetCompany) => {
      return ERDEAxios.patch("/user/select_company", data);
    }
  });

  return mutation;
};

export const useRecoveryOne = () => {
  const mutation = useMutation({
    mutationFn: (email: String) => {
      return ERDEAxios.get("/user/recovery/" + email);
    }
  });

  return mutation;
};

export const useRecoveryTwo = () => {
  const mutation = useMutation({
    mutationFn: (data: Recovery) => {
      return ERDEAxios.post("/user/recovery", data);
    }
  });

  return mutation;
};
