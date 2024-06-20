"use client";
import TableThree from "@/components/Tables/TableThree";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useStudyPlanList } from "@/api/studyPlan";
import Loader from "@/components/common/Loader";
import { useState } from "react";

const List = () => {
  const [pattern, setPattern] = useState<string>('');
  const responseQuery = useStudyPlanList(pattern);
  const fields = [
    'Name',
    'Code',
    'Abbr',
    'Actions'
  ];
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        {responseQuery.isFetching && <Loader />}

        {responseQuery.isError && <p>{`${responseQuery.error}`}</p>}

        {responseQuery.isSuccess && <TableThree params={{ fields, itemsData: responseQuery.data?.pages[0] }} />}

      </div>
    </>
  );
}

export default List;