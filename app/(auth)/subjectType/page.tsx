"use client";
import TableThree from "@/components/Tables/TableThree";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useSubjectTypeList, useCreateSubjectType, useUpdateSubjectType, useDeleteSubjectType } from "@/api/subjectType";
import Loader from "@/components/common/Loader";
import { useState, useEffect } from "react";
import { IconsTable } from "@/types/tables";
import { DialogForm } from "./dialogForm";
import { SubjectType } from "@/types/subject";
import { useTranslations } from 'next-intl';

const List = () => {
  const [pattern, setPattern] = useState<string>('');
  const [dataEdit, setDataEdit] = useState<SubjectType>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const responseQuery = useSubjectTypeList(pattern, page);
  const t = useTranslations("SubjectType");
  const g = useTranslations('General');
  const onSuccessAction = () => {
    responseQuery.refetch();
    setIsOpen(false);
  }
  const createMutation = useCreateSubjectType(onSuccessAction);
  const editMutation = useUpdateSubjectType(onSuccessAction);
  const deleteMutation = useDeleteSubjectType(onSuccessAction);
  const fields = [
    { name: g('name'), input: 'name' }
  ];

  useEffect(() => {
    if (!isOpen) {
      setDataEdit({
        name: '',
        _id: ''
      });
      createMutation.reset();
      editMutation.reset();
    }
  }, [isOpen])

  const editButton = (id: string) => {
    if (responseQuery.data) {
      const itemEdit = responseQuery.data.results.find((item: SubjectType) => item._id == id);
      if (itemEdit)
        setDataEdit({
          name: itemEdit.name,
          _id: itemEdit._id
        });
    }
    setIsOpen(true);
  }

  const createAction = (data: SubjectType) => createMutation.mutate(data);
  const updateAction = (data: SubjectType) => editMutation.mutate(data);
  const deleteAction = (id: string) => deleteMutation.mutate(id);

  const IconsTable: IconsTable[] = [
    { icon: 'edit', method: editButton },
    { icon: 'delete', method: deleteAction },
  ]

  const buttonAdd = {
    use: true,
    title: g("addNew"),
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
      <Breadcrumb pageName={t('title')} button={buttonAdd} />

      <div className="flex flex-col gap-10">
        {responseQuery.isFetching || createMutation.isPending && <Loader />}
        <DialogForm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          dataEdit={dataEdit}
          createAction={createAction}
          updateAction={updateAction}
          errorMessage={createMutation.isError ? getErrorMessage(createMutation.error) :
            editMutation.isError ? getErrorMessage(editMutation.error) : ''}
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