import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import MapItineraire from "../components/livraisonFeatures/Map";

const LivraisonFeature = () => {
    const [selectedKey, setSelectedKey] = useState("en_cours");


    return (
        <div className="flex w-full flex-col bg-content1 dark:bg-content2 p-4 rounded-2xl border border-content3">
            <Tabs
                aria-label="Tabs de livraison"
                selectedKey={selectedKey}
                onSelectionChange={setSelectedKey}
                color="primary"
            >
                <Tab key="en_cours" title="En cours">
                    <Card className="mt-4 bg-none shadow-none border-0">
                        <CardBody>
                            Liste des livraisons actuellement en cours de traitement. Ces commandes ont été préparées et sont en route vers leur destination.
                        </CardBody>
                    </Card>
                </Tab>

                <Tab key="programmees" title="Programmées">
                    <Card className="mt-4 bg-none shadow-none border-0">
                        <CardBody>
                            Livraisons planifiées pour les prochains jours. Ces commandes sont en attente de traitement et seront expédiées selon le planning établi.
                        </CardBody>
                    </Card>
                </Tab>

                <Tab key="completees" title="Complétées">
                    <Card className="mt-4 bg-none shadow-none border-0">
                        <CardBody>
                            Historique des livraisons terminées avec succès. Consultez les détails des livraisons effectuées et les confirmations de réception.
                        </CardBody>
                    </Card>
                </Tab>

                <Tab key="problemes" title="Problèmes">
                    <Card className="mt-4 bg-none shadow-none border-0">
                        <CardBody>
                            Livraisons rencontrant des difficultés : adresses introuvables, destinataires absents, ou autres problèmes nécessitant une intervention.
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>

            <MapItineraire />
        </div>
    );
};

export default LivraisonFeature;








