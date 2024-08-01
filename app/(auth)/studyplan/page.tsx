"use client";
import TableThree from "@/components/Tables/TableThree";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useStudyPlanList, useCreateStudyPlan } from "@/api/studyPlan";
import Loader from "@/components/common/Loader";
import { useState, useEffect } from "react";
import { IconsTable } from "@/types/tables";
import { DialogForm } from "./dialogForm";
import { StudyPlan, StudyPlanForm } from "@/types/studyPlan";

const List = () => {
  const [pattern, setPattern] = useState<string>('');
  const [dataEdit, setDataEdit] = useState<StudyPlanForm>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const responseQuery = useStudyPlanList(pattern, page);
  const createMutation = useCreateStudyPlan(() => {
    responseQuery.refetch();
    setIsOpen(false);
  });
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
        type: '',
        mention: '',
        _id: ''
      });
      createMutation.reset();
    }
  }, [isOpen])

  useEffect(() => {
    if (createMutation.isError) {
      console.log('createMutation.error', createMutation.error);
    }
  }, [createMutation.isError]);


  const editAction = (id: string) => {
    if (responseQuery.data) {
      const itemEdit = responseQuery.data.results.find((item: StudyPlan) => item._id == id);
      if (itemEdit)
        setDataEdit({
          name: itemEdit.name,
          code: itemEdit.code,
          abbr: itemEdit.abbr,
          mention: itemEdit.mention,
          type: itemEdit.type?.code!,
          _id: itemEdit._id
        });
    }
    setIsOpen(true);
  }

  const createAction = (data: StudyPlan) => {
    createMutation.mutate(data);
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

  const getErrorMessage = (error: unknown): string => {
    if (typeof error === 'string') {
      return error;
    } else if (error && typeof error === 'object' && 'message' in error) {
      return (error as { message: string }).message;
    }
    return 'Unknown error';
  };

  return (
    <>
      <Breadcrumb pageName="Study Plan List" button={buttonAdd} />

      <div className="flex flex-col gap-10">
        {responseQuery.isFetching || createMutation.isPending && <Loader />}
        <DialogForm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          dataEdit={dataEdit}
          createAction={createAction}
          errorMessage={createMutation.isError ? getErrorMessage(createMutation.error) : ''}
        />
        {responseQuery.isError && <p>{`${responseQuery.error.message}`}</p>}

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