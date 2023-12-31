import { ChangeEvent, useContext, useEffect, useState } from "react"
import { Song } from "@interfaces/song.interface"
import { SongsContext } from "@context/SongsContext"
import { handleSearch } from "@helpers/handlers"
import SongTitle from "./components/SongViewComponents/SongTitle"
import SongAddButton from "./components/SongViewComponents/SongAddButton"
import SongSearchInput from "./components/SongViewComponents/SongSearchInput"
import SongTable from "./components/SongViewComponents/SongTable"

const SongsView = () => {
  const { data = [], isLoading, isError } = useContext(SongsContext)
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([])

  useEffect(() => {
    if (data) {
      setFilteredSongs(data as Song[])
    }
  }, [data])

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setFilteredSongs(handleSearch(e.target.value, data))
  }
  const renderContent = () => {
    if (isLoading) return <p>Cargando...</p>
    if (isError) return <p>Error</p>

    return (
      <div className="m-auto">
        <SongTitle />
        <SongAddButton />
        <SongSearchInput handleSearch={onSearch} />
        <div className="m-auto">
          <SongTable songs={filteredSongs} />
        </div>
      </div>
    )
  }
  return (
    <div className="p-4 lg:pl-[5rem] bg-ww-content pb-16">
      <div className="m-auto">{renderContent()}</div>
    </div>
  )
}

export default SongsView
