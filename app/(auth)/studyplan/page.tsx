"use client";
import TableThree from "@/components/Tables/TableThree";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useStudyPlanList } from "@/api/studyPlan";
import Loader from "@/components/common/Loader";
import { useState, useEffect } from "react";
import { IconsTable } from "@/types/tables";
import { DialogForm } from "./dialogForm";
import { StudyPlanType } from "@/types/studyPlan";

const List = () => {
  const [pattern, setPattern] = useState<string>('');
  const [dataEdit, setDataEdit] = useState<StudyPlanType>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const responseQuery = useStudyPlanList(pattern, page);
  const fields = [
    { name: 'Name', input: 'name' },
    { name: 'Code', input: 'code' },
    { name: 'Abbr', input: 'abbr' }
  ];

  useEffect(() => {
    if (!isOpen) {
      setDataEdit({
        name: '',
        code: '',
        abbr: '',
        next: '',
        mention: '',
        _id: ''
      })
    }
  }, [isOpen])

  const editAction = (id: string) => {
    if (responseQuery.data) {
      const itemEdit = responseQuery.data.results.find((item: StudyPlanType) => item._id == id);
      setDataEdit(itemEdit);
    }
    setIsOpen(true);
  }

  const deleteAction = (id: string) => {
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
        <DialogForm isOpen={isOpen} setIsOpen={setIsOpen} dataEdit={dataEdit} />
        {responseQuery.isError && <p>{`${responseQuery.error}`}</p>}

        {responseQuery.isSuccess && <TableThree params={paramsTable} />}
      </div>

      {false && <dialog
        className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
        <div className="bg-white m-auto p-8 rounded-xl">
          <div className="flex flex-col items-center">
            <h3>Modal content</h3>
            <br />
            <button onClick={() => setIsOpen(false)} type="button" className="bg-red-500 text-white p-2 ">Close Modal</button>
          </div>

        </div>
      </dialog>
      }
    </>
  );
}

export default List;