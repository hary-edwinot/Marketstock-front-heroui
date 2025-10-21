
import AdminLayout from "@/layouts/admin";
import DashboardFeature from "@/features/dashboard";
import Title from "@/components/admin-navbar/TitleDashboard";
import { useLocation } from "react-router-dom";
import { Button } from "@heroui/react";
import { Newspaper } from 'lucide-react';
import { routes } from "@/config/routes";

export default function DashboardPage() {
  const location = useLocation();

  const currentRoute = routes.find(route => route.path === location.pathname);

  return (
    <AdminLayout>
      <section className="">
        <div className="flex justify-between items-center h-[60px] mb-4">
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
        <DashboardFeature />
      </section>
    </AdminLayout>
  );
}




