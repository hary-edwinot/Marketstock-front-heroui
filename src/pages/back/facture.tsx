import AdminLayout from "@/layouts/admin";
import { useLocation, useParams } from "react-router-dom";

import { routes } from "@/config/routes";
import FactureFeature from "@/features/factures";

export default function FacturePage() {
  const location = useLocation();

  const currentRoute = routes.find(route => route.path === location.pathname);

  return (
    <AdminLayout>
      <FactureFeature />
    </AdminLayout>
  );
}




