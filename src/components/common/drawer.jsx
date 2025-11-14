import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
} from "@heroui/react";

import { useState } from "react";

const DrawerForm = ({ isOpen, onClose, WrappedFormComponent, size = "md", title = "Formulaire" }) => {

    

    function handleFormSubmit() {
        onClose();
    }

    return (
        <div>
            <Drawer isOpen={isOpen} size={size} onClose={onClose}>
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="flex flex-col gap-1">{title}</DrawerHeader>
                            <DrawerBody>
                                {WrappedFormComponent && <WrappedFormComponent closeDrawer={handleFormSubmit} />}
                            </DrawerBody>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </div>
    );
}

export default DrawerForm;