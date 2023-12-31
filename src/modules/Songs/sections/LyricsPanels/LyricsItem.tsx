import { ActiveLyricContext } from "src/common/context/ActiveLyricContext"
import classNames from "classnames"
import { useContext, useEffect, useState } from "react"
import {
  activeLyricEmit,
  activeSongEmit,
  coverEmit,
  lyricEmit,
  styleEmit,
} from "@helpers/socket/emit"
import { Style } from "@interfaces/style.interface"
import { currentImageUrl, defaultStyle } from "src/common/constants/style"
import { WW_STYLES_FOLDER } from "src/common/constants/images"
import { StyleContext } from "@context/StyleContext"
import { setActive } from "src/common/api/songs/lyrics.api"
import { setActiveSong } from "src/common/api/songs/songs.api"
import ProyectIcon from "@icons/misc/proyect"

const LyricsItem = ({ content, id, cover, style, idSong }: LyricsItemProps) => {
  const {
    activeLyricId,
    setActiveLyricId,
    selectedLyricId,
    setSelectedLyricId,
  } = useContext(ActiveLyricContext)
  const { setStyle } = useContext(StyleContext)
  const [styleChanged, setStyleChanged] = useState(false)

  useEffect(() => {
    setStyleChanged(false)
  }, [idSong])

  const addMessage = () => {
    cover ? coverEmit(content) : lyricEmit(content)

    if (
      !styleChanged &&
      style !== null &&
      style !== undefined &&
      cover === true
    ) {
      const image = style.image
      styleEmit(defaultStyle(image, WW_STYLES_FOLDER), "style")
      setStyle({ ...style, image: currentImageUrl(image) })
      setStyleChanged(true)
    }
  }

  const handleClick = () => {
    addMessage()
    setActiveLyricId(id)
    setActive(id)
    setActiveSong(idSong)
    setSelectedLyricId(id)
    activeSongEmit(`${idSong}`)
    activeLyricEmit(`${id}`)
  }

  return (
    <div
      onClick={handleClick}
      className={classNames(
        "flex justify-between items-center border-t-2 border-t-ww-alt p-4 hover:bg-ww-alt cursor-pointer",
        {
          "bg-ww-green-800 hover:bg-ww-green-800": selectedLyricId === id,
        }
      )}
    >
      <p
        className={classNames("flex justify-between items-center w-full", {
          "text-ww-green-400": id < 0,
        })}
      >
        <span>
          {content.split("\n").map((line, i) => (
            <span key={`${line[0]}-${i}`} className="flex">
              {line}
            </span>
          ))}
        </span>
        {activeLyricId === id && <ProyectIcon />}
      </p>
    </div>
  )
}

type LyricsItemProps = {
  id: number
  content: string
  cover?: boolean
  style?: Style | null
  idSong: number
}

export default LyricsItem
