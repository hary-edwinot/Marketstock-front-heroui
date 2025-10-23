import { NavbarTop } from "@/components/admin-navbar/topbar";
import Sidebar from "@/components/admin-navbar/sidebar";

import Title from "../components/admin-navbar/TitleDashboard";
import { Button } from "@heroui/react";
import { Newspaper } from 'lucide-react';
import { useLocation } from "react-router-dom";

import { routes } from "../config/routes";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const location = useLocation();
  const currentRoute = routes.find(route => route.path === location.pathname);


  // Condition qui permet d'afficher le Title
  const ShowMenuTop = currentRoute?.name.toLowerCase() !== 'livraisons'
    && currentRoute?.name.toLowerCase() !== 'dashboard';

  return (
    <div className="bg-content2 dark:bg-background px-4 pt-[1px]">
      <NavbarTop />
      <div className="relative grid grid-cols-6 gap-6 mt-5 grid-rows-[auto_1fr_auto]">
        <div className="col-span-1 min-h-screen">
          <Sidebar />
        </div>
        <div className="col-span-5">
          <main className="container flex-grow min-h-[calc(100vh-4rem)]">
            {ShowMenuTop && <MenuTop currentRoute={currentRoute} />}
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}



const MenuTop = ({ currentRoute }) => {
  return (
    <div className="flex justify-between items-center h-[60px] mb-4 p-4 dark:bg-content2 bg-content1 rounded-2xl border border-content3">
      <Title current={currentRoute} />
      <div className="flex gap-3">
        <Button
          color="primary"
          variant="solid"
          startContent={<Newspaper />}
        >
          Publier
        </Button>
      </div>
    </div>
  )
}
