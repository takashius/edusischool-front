import Link from "next/link";
import { Dispatch, SetStateAction } from 'react';
interface BrButton {
  use: boolean;
  title: string;
  setOpenDialog?: Dispatch<SetStateAction<boolean>>;
}
interface BreadcrumbProps {
  pageName: string;
  button?: BrButton;
}

const Breadcrumb = ({ pageName, button }: BreadcrumbProps) => {
  return (
    <>
      <div className="mb-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          {pageName}
        </h2>
        <nav>
          <ol className="flex items-center gap-2">
            <li>
              <Link className="font-medium" href="/">
                Dashboard /
              </Link>
            </li>
            <li className="font-medium text-primary">{pageName}</li>
          </ol>
        </nav>
      </div>
      {(button && button.use) &&
        <div className="w-full row-auto">
          <div className="text-right mb-4">
            <Link
              onClick={() => {
                if (button.setOpenDialog) button.setOpenDialog(true);
              }}
              href="#"
              className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              {button.title}
            </Link>
          </div>
        </div>
      }

    </>
  );
};

export default Breadcrumb;
