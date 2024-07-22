"use client";
import TableThree from "@/components/Tables/TableThree";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useStudyPlanList } from "@/api/studyPlan";
import Loader from "@/components/common/Loader";
import { useState } from "react";
import { IconsTable } from "@/types/tables";
import { DialogForm } from "./dialogForm";

const List = () => {
  const [pattern, setPattern] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const responseQuery = useStudyPlanList(pattern, page);
  const fields = [
    { name: 'Name', input: 'name' },
    { name: 'Code', input: 'code' },
    { name: 'Abbr', input: 'abbr' }
  ];

  const editAction = (id: string) => {
    console.log('A editar se ha dicho', id)
  }

  const deleteAction = (id: string) => {
    console.log('A eliminar se ha dicho', id)
  }

  const IconsTable: IconsTable[] = [
    { icon: 'edit', method: editAction },
    { icon: 'delete', method: deleteAction },
  ]

  const buttonAdd = {
    use: true,
    title: 'Add Study Plan',
    setOpenDialog: setIsOpen
  }

  const paramsTable = {
    fields,
    icons: IconsTable,
    itemsData: responseQuery.data,
    setPage
  };

  return (
    <>
      <Breadcrumb pageName="Study Plan List" button={buttonAdd} />

      <div className="flex flex-col gap-10">
        {responseQuery.isFetching && <Loader />}
        <DialogForm isOpen={isOpen} setIsOpen={setIsOpen} />
        {responseQuery.isError && <p>{`${responseQuery.error}`}</p>}

        {responseQuery.isSuccess && <TableThree params={paramsTable} />}
      </div>
    </>
  );
}

export default List;