import { Fragment, useEffect, useState } from "react"
import RevenueFeature from "../components/dashboardFeatures/revenue";
import { TrendingDown, TrendingUp, Package } from 'lucide-react';
import ChartDashboard from "../components/dashboardFeatures/chart";
import CardSideValue from "../components/dashboardFeatures/card";
import TableList from "../components/common/Table";


const DashboardFeature = () => {

  const revenueData = [
    {
      name: "Revenu total",
      description: "Le montant total des revenus générés",
      total: 12000,
      yesterdayTotal: 11000,
      icon: <TrendingUp />
    },
    {
      name: "Ventes",
      description: "Le montant total des ventes réalisées",
      total: 5000,
      yesterdayTotal: 4500,
      icon: <TrendingUp />
    },
    {
      name: "Top ventes",
      description: "Le montant total des ventes de ce produit",
      total: 200,
      yesterdayTotal: 180,
      icon: <TrendingUp />
    },
    {
      name: "Livraisons",
      description: "Le nombre total de livraisons effectuées",
      total: 150,
      yesterdayTotal: 170,
      icon: <TrendingDown />
    }
  ];

  return (
    <Fragment>
      <div className="grid grid-cols-4 gap-4">
        {revenueData.map((item, index) => (
          <RevenueFeature
            key={index}
            name={item.name}
            description={item.description}
            total={item.total}
            icon={item.icon}
            yesterdayTotal={item.yesterdayTotal}
          />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-4 gap-4">
        <div className="col-span-3 p-4 dark:bg-content2 bg-content1 rounded-2xl border border-content3">
          <ChartDashboard />
        </div>
        <div className="col-span-1 space-y-4">
          <CardSideValue
            title="Produits en stock"
            total={150}
            description="Le nombre total de produits en stock"
            icon={<Package />}
          />
          <CardSideValue
            title="Produits épuisés"
            total={25}
            description="Le nombre de produits en rupture de stock"
            icon={<Package />}
          />
          <CardSideValue
            title="Produits en commande"
            total={75}
            description="Le nombre de produits en commande"
            icon={<Package />}
          />
          <CardSideValue
            title="Produits en faible quantité"
            total={7}
            description="Produits proches de la rupture de stock"
            icon={<Package />}
          />
        </div>
      </div>


      <TableList />

    </Fragment>
  );
};



export default DashboardFeature;
