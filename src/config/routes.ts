import WelcomePage from "@/pages/front/home";
import DashboardPage from "@/pages/back/dashboard";
import ProduitPage from "@/pages/back/produit";
import LivraisonPage from "@/pages/back/livraison";
import CommandePage from "@/pages/back/commande";
import FacturePage from "@/pages/back/facture";

import {
  Home,
  LayoutDashboard,
  Package,
  SquareLibrary,
  LayoutList,
  ClipboardPenLine,
  Truck,
  ClipboardPaste,
  ShoppingBasket,
  Activity,
  UserCheck,
  BarChart3
} from 'lucide-react';


export const routes = [
  {
    path: "/",
    element: WelcomePage,
    name: "Accueil",
    icon: Home
  },
  {
    path: "/tableau-de-bord",
    element: DashboardPage,
    name: "Dashboard",
    icon: LayoutDashboard
  },
  {
    path: "/commandes",
    element: CommandePage,
    name: "Commandes",
    icon: ClipboardPenLine
  },
  {
    path: "/produits",
    element: ProduitPage,
    name: "Produits",
    icon: LayoutList
  },
  {
    path: "/categories",
    element: DashboardPage, // Remplacez par votre vraie page
    name: "Catégories",
    icon: SquareLibrary
  },
  {
    path: "/fournisseurs",
    element: DashboardPage, // Remplacez par votre vraie page
    name: "Fournisseurs",
    icon: Package
  },
  {
    path: "/entrees-de-stock",
    element: DashboardPage, // Remplacez par votre vraie page
    name: "Entrées de stock",
    icon: ClipboardPenLine
  },
  {
    path: "/sorties-de-stock",
    element: DashboardPage, // Remplacez par votre vraie page
    name: "Sorties de stock",
    icon: ClipboardPaste
  },
  {
    path: "/mouvements-du-stock",
    element: DashboardPage, // Remplacez par votre vraie page
    name: "Mouvements du stock",
    icon: Activity
  },
  {
    path: "/clients",
    element: DashboardPage, // Remplacez par votre vraie page
    name: "Clients",
    icon: ShoppingBasket
  },
  {
    path: "/livraisons",
    element: LivraisonPage, // Remplacez par votre vraie page
    name: "Livraisons",
    icon: Truck
  },
  {
    path: "/utilisateurs-et-roles",
    element: DashboardPage, // Remplacez par votre vraie page
    name: "Utilisateurs & Rôles",
    icon: UserCheck
  },
  {
    path: "/rapports",
    element: DashboardPage, // Remplacez par votre vraie page
    name: "Rapports",
    icon: BarChart3
  },
  {
    path: "commandes/:commande_number/:facture_number",
    element: FacturePage, // Remplacez par votre vraie page
    name: "Facture",
    icon: BarChart3
  }
];




