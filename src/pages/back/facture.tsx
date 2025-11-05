import AdminLayout from "@/layouts/admin";
import DashboardFeature from "@/features/dashboard";
import Title from "@/components/admin-navbar/TitleDashboard";
import { useLocation, useParams } from "react-router-dom";
import { Button } from "@heroui/react";
import { Newspaper } from 'lucide-react';
import { routes } from "@/config/routes";

export default function FacturePage() {
  const { commande_number, facture_id } = useParams();
  const location = useLocation();

  const currentRoute = routes.find(route => route.path === location.pathname);

  return (
    <AdminLayout>
      <div>
        <h1>Facture</h1>
        <p>Commande : {commande_number}</p>
        <p>Facture ID : {facture_id}</p>
      </div>
    </AdminLayout>
  );
}




