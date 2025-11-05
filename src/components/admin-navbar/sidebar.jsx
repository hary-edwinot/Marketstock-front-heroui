import { Link, useLocation } from "react-router-dom";
import { routes } from "../../config/routes";
import { Button } from "@heroui/react";

export default function Sidebar() {
    const location = useLocation();

    return (
        <div className="h-full p-3 [&>header]:px-2 dark:bg-content2 bg-content1  rounded-3xl border border-content3">
            <div className="">
                {routes.map(route => {
                    if (route.path !== '/' && route.path !== ':commande_number/facture/:facture_id') {
                        const isActive = location.pathname === route.path;
                        return (
                            <Button
                                key={route.path}
                                as={Link}
                                to={route.path}
                                size="md"
                                fullWidth
                                className="mb-1 justify-start py-6 rounded-2xl"
                                color={isActive ? "primary" : "default"}
                                variant={isActive ? "solid" : ""}
                                startContent={route.icon ? <route.icon size={20} /> : null}
                            >
                                {route.name}
                            </Button>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
}


