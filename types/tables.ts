import { Dispatch, SetStateAction } from "react";

export interface FieldData {
  name: string;
  input: string;
}

export interface IconsTable {
  icon: string;
  method: any;
}

export interface ParamsTable {
  itemsData: any;
  fields: FieldData[];
  icons: IconsTable[];
  setPage: Dispatch<SetStateAction<number>>;
}