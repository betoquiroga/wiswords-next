import TabsHeader from "@components/Tabs/TabsHeader"
import { Tab } from "@headlessui/react"
import BooksPanel from "./BooksSection/BooksPanel"

const BooksSection = () => {
  return (
    <div className="bg-ww-content rounded col-span-3 overflow-y-scroll">
      <Tab.Group>
        <TabsHeader items={["Libros", "Secciones", "Historial"]} />
        <Tab.Panels className="p-4">
          <BooksPanel />
          <Tab.Panel>Mostrará el historial del usuario</Tab.Panel>
          <Tab.Panel>Mostrará el historial del usuario</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default BooksSection
