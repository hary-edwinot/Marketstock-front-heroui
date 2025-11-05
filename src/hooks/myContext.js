import { createContext } from "react";

// Créez le contexte du Drawer
export const DrawerContext = createContext();





// import { useDisclosure } from "@heroui/react";

// export const DrawerProvider = ({ children }) => {
//     const { isOpen, onOpen, onClose } = useDisclosure();

//     return (
//         <DrawerContext.Provider value={{ isOpen, onOpen, onClose }}>
//             {children}
//         </DrawerContext.Provider>
//     );
// };

// export const useDrawerContext = () => {
//     const context = useContext(DrawerContext);
//     if (!context) {
//         throw new Error("useDrawerContext must be used within a DrawerProvider");
//     }
//     return context;
// };