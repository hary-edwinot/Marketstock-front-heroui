import { HeroUIProvider } from '@heroui/react'
import { ToastProvider } from "@heroui/toast";



// Composant pour fournir les contextes HeroUI et Toast
function TaostProviders({ children }) {
  return (
    <HeroUIProvider>
      <ToastProvider placement="top-left" toastOffset={20} timeout={3000}/>
      {children}
    </HeroUIProvider>
  )
}
export default TaostProviders;