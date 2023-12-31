import TabsHeader from "@components/Tabs/TabsHeader"
import { Tab } from "@headlessui/react"
import VersesPanel from "./VersesSection/VersesPanel"
import { useContext } from "react"
import { ColumnContext } from "@context/ColumnContext"

const VersesSection = () => {
  const { activeColumn } = useContext(ColumnContext)
  return (
    <div className={`lg:block ${activeColumn !== 3 && "hidden"}`}>
      <div className="general-section h-[calc(100vh-95px)] lg:h-[calc(100vh-30px)]">
        <Tab.Group>
          <TabsHeader items={["Versículos", "Versiones", "Ajustes"]} />
          <Tab.Panels className="p-4">
            <VersesPanel />
            <Tab.Panel>Mostrará el historial del usuario</Tab.Panel>
            <Tab.Panel>Mostrará el historial del usuario</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

export default VersesSection
