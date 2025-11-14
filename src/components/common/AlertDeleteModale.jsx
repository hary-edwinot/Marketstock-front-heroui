import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";
import { AlertTriangle } from 'lucide-react';

export default function AlertDeleteModale({ isOpen, onOpenChange, onConfirm, itemToDelete, content, label }) {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="text-danger" size={24} />
                                <span>Confirmation de suppression</span>
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <p className="text-default-600">
                                {content}
                            </p>
                            {itemToDelete && (
                                <p className="text-small text-default-400">
                                    {label} : <span className="font-bold">{itemToDelete}</span>
                                </p>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" onPress={onClose}>
                                Annuler
                            </Button>
                            <Button
                                color="danger"
                                onPress={() => {
                                    onConfirm();
                                    onClose();
                                }}
                            >
                                Supprimer
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
