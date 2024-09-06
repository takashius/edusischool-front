import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LineChartIcon,
  MenuIcon,
  ShoppingBag,
  AreaChart,
  Calendar,
  User2Icon,
  LockIcon,
  BarChart2,
  Component,
  Settings,
  Table2Icon,
  FormInputIcon,
  File,
  LampIcon,
  SignalHigh,
  AlertCircle,
  FileType2,
  MousePointerClick,
  LayoutDashboard
} from "lucide-react";
import { useSidebar } from "./use-sidebar";
import { cn } from "@/app/libs/utlis";
import MenuItem from "./MenuItem";
import LinkItem from "./LinkItem";
import ExpandMenu from "./ExpandMenu";
import { useTranslations } from 'next-intl';

interface SidebarProps { }

const Sidebar = ({ }: SidebarProps) => {
  const t = useTranslations("Menu");
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar } = useSidebar((state) => state);

  return (
    <aside
      className={cn(
        `fixed left-0 top-0 z-[9999] flex h-screen w-20 flex-col overflow-y-hidden bg-primary duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0`,
        {
          "w-70": isSidebarOpen,
          "hidden lg:flex": !isSidebarOpen,
        }
      )}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="relative flex w-full items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link className="flex items-center" href="/dashboard">
          <Image
            className="h-6 w-6 rounded-md"
            width={400}
            height={400}
            src={"/images/logo/logo-icon.png"}
            alt="Logo"
          />
          {isSidebarOpen && (
            <h1 className="ml-2 text-xl font-semibold text-white">
              {t('title')}
            </h1>
          )}
        </Link>
        {isSidebarOpen && (
          <MenuIcon onClick={toggleSidebar} className="h-6 w-6" />
        )}
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="px-4 py-4 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul
              className={cn("mb-6 flex flex-col gap-1.5", {
                "items-center justify-center": !isSidebarOpen,
              })}
            >
              {/* <!-- Menu Item Dashboard --> */}
              <li>
                <LinkItem
                  icon={<LayoutDashboard />}
                  title={t('dashboard')}
                  href="/dashboard"
                />
              </li>
              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Item Settings --> */}
              <li>
                <ExpandMenu icon={<Settings className="h-6 w-6" />} name={t('config')}>
                  <LinkItem
                    title={t('studyPlan')}
                    href="/studyplan"
                    icon={<User2Icon className="h-5 w-5" />}
                  />
                  <ExpandMenu icon={<File className="h-6 w-6" />} name={t('subject')}>
                    <LinkItem
                      title={t('subject')}
                      href="/subject"
                      icon={<File className="h-5 w-5" />}
                    />
                    <LinkItem
                      title={t('subjectType')}
                      href="/subjectType"
                      icon={<FileType2 className="h-5 w-5" />}
                    />
                  </ExpandMenu>
                </ExpandMenu>
              </li>
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
