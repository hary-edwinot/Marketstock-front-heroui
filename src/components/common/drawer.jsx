import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
} from "@heroui/react";

const DrawerForm = ({ isOpen, onClose, onOpen, WrappedFormComponent, size = "md", title = "Formulaire" }) => {
    return (
        <div>
            <Drawer isOpen={isOpen} size={size} onClose={onClose}>
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="flex flex-col gap-1">{title}</DrawerHeader>
                            <DrawerBody>
                                {WrappedFormComponent && <WrappedFormComponent />}
                            </DrawerBody>
                            <DrawerFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </div>
    );
}

export default DrawerForm;