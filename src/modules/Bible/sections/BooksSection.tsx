import TabsHeader from "@components/Tabs/TabsHeader"
import { Tab } from "@headlessui/react"
import BooksPanel from "./BooksSection/BooksPanel"
import { useContext } from "react"
import { ColumnContext } from "@context/ColumnContext"

const BooksSection = () => {
  const { activeColumn } = useContext(ColumnContext)
  return (
    <div className={`lg:block ${activeColumn !== 1 && "hidden"}`}>
      <div className="general-section h-[calc(100vh-95px)] lg:h-[calc(100vh-30px)]">
        <Tab.Group>
          <TabsHeader items={["Libros", "Secciones", "Historial"]} />
          <Tab.Panels className="p-4">
            <BooksPanel />
            <Tab.Panel>Mostrará el historial del usuario</Tab.Panel>
            <Tab.Panel>Mostrará el historial del usuario</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

export default BooksSection
