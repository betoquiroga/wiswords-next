import { ActiveLyricContext } from "src/common/context/ActiveLyricContext"
import classNames from "classnames"
import { useContext, useEffect, useState } from "react"
import {
  activeSongEmit,
  coverEmit,
  lyricEmit,
  styleEmit,
} from "@helpers/socket/emit"
import { Style } from "@interfaces/style.interface"
import { currentImageUrl, defaultStyle } from "src/common/constants/style"
import { WW_STYLES_FOLDER } from "src/common/constants/images"
import { StyleContext } from "@context/StyleContext"
import { WW_DEFAULT_SCREEN_ID } from "src/common/constants/screen"
import { updateScreen } from "src/common/api/screen/screen.api"
import SongIcon from "@icons/misc/song"
import { setActive } from "src/common/api/songs/lyrics.api"
import { setActiveSong } from "src/common/api/songs/songs.api"

const LyricsItem = ({ content, id, cover, style, idSong }: LyricsItemProps) => {
  const { activeLyricId, setActiveLyricId } = useContext(ActiveLyricContext)
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
      styleEmit(defaultStyle(image, WW_STYLES_FOLDER))
      setStyle({ ...style, image: currentImageUrl(image) })
      updateScreen(WW_DEFAULT_SCREEN_ID, {
        verse: " ",
      })
      setStyleChanged(true)
    }
  }

  const handleClick = () => {
    addMessage()
    setActiveLyricId(id)
    setActive(id)
    setActiveSong(idSong)
    activeSongEmit(`${idSong}`)
  }

  return (
    <div
      className={classNames(
        "song text-ww-normal hover:bg-ww-alt cursor-pointer",
        {
          "bg-ww-green-800 hover:bg-ww-green-800": activeLyricId === id,
        }
      )}
    >
      <p
        className={classNames(" p-4", {
          "text-ww-green-400": id < 0,
        })}
        onClick={handleClick}
      >
        {content.split("\n").map((line, i) => (
          <span key={`${line[0]}-${i}`} className="flex">
            {line}
          </span>
        ))}
      </p>
      {activeLyricId === id && <SongIcon />}
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
