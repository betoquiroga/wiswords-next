import TabsHeader from "@components/Tabs/TabsHeader"
import { Tab } from "@headlessui/react"
import LyricsPanel from "./LyricsPanels/LyricsPanel"

const LyricsSection = () => {
  return (
    <div className="song-section hidden md:block lg:block">
      <Tab.Group>
        <TabsHeader items={["Letras", "Detalles", "Configuración"]} />
        <Tab.Panels className="p-4">
          <LyricsPanel />
          <Tab.Panel>Aquí irán los listados creados</Tab.Panel>
          <Tab.Panel>Mostrará el historial del usuario</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default LyricsSection
