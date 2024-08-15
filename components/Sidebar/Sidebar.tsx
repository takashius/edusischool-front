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
  HomeIcon,
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
        `absolute left-0 top-0 z-9999 flex h-screen w-20 flex-col overflow-y-hidden bg-primary duration-300 ease-linear  dark:bg-boxdark lg:static lg:translate-x-0 `,
        {
          "w-70": isSidebarOpen,
        },
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
            <h1 className=" ml-2 text-xl font-semibold text-white">
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
        <nav className="px-4 py-4  lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul
              className={cn("mb-6 flex flex-col  gap-1.5", {
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
                  ></LinkItem>
                  <LinkItem
                    title={t('subjectType')}
                    href="/subjectType"
                    icon={<FileType2 className="h-5 w-5" />}
                  ></LinkItem>
                </ExpandMenu>
              </li>

              {/* <!-- Menu Item OLD ELEMENTS --> */}
              <li>
                <ExpandMenu icon={<AlertCircle className="h-6 w-6" />} name={t('old')}>
                  <LinkItem
                    title="Tables"
                    href="/tables"
                    icon={<Table2Icon className="h-6 w-6" />}
                  ></LinkItem>
                  <LinkItem
                    title="Settings"
                    href="/settings"
                    icon={<Settings className="h-6 w-6" />}
                  ></LinkItem>
                  <LinkItem
                    title="Profile"
                    href="/profile"
                    icon={<User2Icon className="h-6 w-6" />}
                  ></LinkItem>
                  <LinkItem
                    title="Charts"
                    href="/chart"
                    icon={<BarChart2 className="h-6 w-6" />}
                  ></LinkItem>
                  <ExpandMenu icon={<Component className="h-6 w-6" />} name="UI">
                    <LinkItem
                      title="Alerts"
                      href="/ui/alerts"
                      icon={<AlertCircle className="h-5 w-5" />}
                    ></LinkItem>
                    <LinkItem
                      title="Buttons"
                      href="/ui/buttons"
                      icon={<MousePointerClick className="h-5 w-5" />}
                    />
                  </ExpandMenu>
                  <ExpandMenu name="Auth" icon={<LampIcon className="h-6 w-6" />}>
                    <LinkItem
                      title="Sign In"
                      href="/login"
                      icon={<LockIcon className="h-5 w-5" />}
                    ></LinkItem>
                    <LinkItem
                      title="Sign up"
                      href="/signup"
                      icon={<SignalHigh className="h-5 w-5" />}
                    ></LinkItem>
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
