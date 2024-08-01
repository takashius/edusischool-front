import { useState } from "react";
import { buttonView, buttonEdit, buttonDelete, buttonDownload } from "../ui/buttons";
import { ParamsTable, FieldData } from "@/types/tables";
import Confirm from "@/components/Confirm";
type ActionDeleteType = (id: string) => void;

const TableThree = ({ params }: { params: ParamsTable }) => {
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<string>('');
  const [actionDelete, setActionDelete] = useState<ActionDeleteType | undefined>(undefined);

  const { fields, itemsData, icons, setPage } = params;
  const paginateStyles = "flex items-center justify-center px-4 h-10 ms-0 leading-tight text-sky-600 dark:text-white border border-slate-300 hover:bg-slate-300 hover:text-sky-900 dark:border-slate-100 dark:hover:text-black";
  const paginateStylesSelected = "flex items-center justify-center px-4 h-10 ms-0 leading-tight bg-sky-600 text-white border border-slate-300 dark:border-slate-100 ";

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const openConfirm = (action: (id: string) => void, id: string) => {
    setShowConfirm(true);
    setActionDelete(() => action);
    setIdDelete(id);
  }

  const handleConfirm = (confirmed: boolean) => {
    setShowConfirm(false);
    if (confirmed && actionDelete) {
      actionDelete(idDelete);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        {showConfirm && (
          <Confirm
            title="Confirmar Acción"
            message="¿Estás seguro de que deseas ejecutar esta acción?"
            onConfirm={handleConfirm}
          />
        )}
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              {fields?.map((field: FieldData, index) => (
                <th key={index} className="min-w-[60px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  {field.name}
                </th>
              ))}
              <th className="min-w-[60px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {itemsData.results.map((data: any) => (
              <tr key={data._id}>
                {fields?.map((field: FieldData, index) => (
                  <td key={index} className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <p className="text-sm">{getNestedValue(data, field.input)}</p>
                  </td>
                ))}
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    {icons.map(item => {
                      switch (item.icon) {
                        case 'view':
                          return buttonView(item.method, data._id);
                        case 'edit':
                          return buttonEdit(item.method, data._id);
                        case 'delete':
                          return buttonDelete(openConfirm, item.method, data._id);
                        case 'download':
                          return buttonDownload(item.method, data._id);
                      }
                    })}
                  </div>
                </td>
              </tr>
            ))}
            {!itemsData.results && <tr>
              <th key={0} colSpan={fields.length + 1} className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                No hay resultados
              </th>
            </tr>}
          </tbody>
        </table>
      </div>
      <div className="w-full row-auto">
        <nav aria-label="Page navigation example" className="text-right mb-3 mt-4">
          <ul className="inline-flex -space-x-px text-base h-10">
            <li key={'prev'}>
              <a
                className={paginateStyles + " rounded-s-lg border-e-0" + (itemsData.currentPage != 1 ? ' cursor-pointer' : ' cursor-not-allowed')}
                onClick={() => {
                  if (parseInt(itemsData.currentPage) != 1) setPage(parseInt(itemsData.currentPage) - 1);
                }}
              >Previous</a>
            </li>
            {[...Array(itemsData.totalPages)].map((page, index) => (
              <li key={index}>
                <a
                  className={(itemsData.currentPage == index + 1 ? paginateStylesSelected + ' cursor-default' : paginateStyles + ' cursor-pointer') + ' border-e-0'}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </a>
              </li>
            ))}
            <li key={'next'}>
              <a
                className={paginateStyles + ' rounded-e-lg' + (itemsData.next ? ' cursor-pointer' : ' cursor-not-allowed')}
                onClick={() => {
                  if (itemsData.next) setPage(parseInt(itemsData.currentPage) + 1);
                }}>Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TableThree;
