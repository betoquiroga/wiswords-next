import TabsHeader from "@components/Tabs/TabsHeader"
import { Tab } from "@headlessui/react"
import { useContext } from "react"
import { ColumnContext } from "@context/ColumnContext"
import PreviewPanel from "@modules/Songs/sections/PreviewPanels/PreviewPanel"

const PreviewSection = () => {
  const { activeColumn } = useContext(ColumnContext)
  return (
    <div
      className={`md:block lg:col-span-1 md:col-span-1 ${
        activeColumn !== 2 && "hidden"
      }`}
    >
      <div className="general-section h-[calc(100vh-95px)] lg:h-[calc(100vh-30px)]">
        <Tab.Group>
          <TabsHeader items={["Vista previa", "Configuraciones rápidas"]} />
          <Tab.Panels className="p-4">
            <PreviewPanel />
            <Tab.Panel>Aquí irán los listados creados</Tab.Panel>
            <Tab.Panel>Mostrará el historial del usuario</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

export default PreviewSection
