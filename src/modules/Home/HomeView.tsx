"use client"

import { useContext, useEffect, useRef, useState } from "react"
import { socket } from "../../../socket/mainSocket"
import { StyleContext } from "src/common/context/StyleContext"
import { Style } from "src/common/interfaces/style.interface"
import classNames from "classnames"
import { Effect } from "@interfaces/effect.interface"
import { Emit } from "@interfaces/emit.interface"
import Wallpaper from "./components/Wallpaper"
import FullScreenButton from "./components/FullScreenButton"
import BibleVerse from "./components/BibleVerse"
import SongContent from "./components/SongContent"
import CoverContent from "./components/CoverContent"
import BibleContent from "./components/BibleContent"
import { getActive } from "src/common/api/songs/lyrics.api"

const HomeView = ({ width }: HomeViewProps) => {
  const preview = useRef<HTMLParagraphElement>(null)
  const { style } = useContext(StyleContext)
  const [content, setContent] = useState<Emit>({ content: "" } as Emit)
  const [styleData, setStyleData] = useState<Style>(style)
  const [bibleVerse, setBibleVerse] = useState<Emit>({ content: "" } as Emit)
  const [effectsWs, setEffectsWs] = useState<Effect>({
    zoom: false,
    particles: false,
  })
  const [black, setBlack] = useState<boolean>(false)

  useEffect(() => {
    socket.on("lyric", (message: string) => {
      if (message) setContent(JSON.parse(message))
    })
    socket.on("style", (data: string) => {
      setStyleData(JSON.parse(data))
    })
    socket.on("verse", (verse: string) => {
      if (verse) setBibleVerse(JSON.parse(verse))
    })
    socket.on("effects", (data: string) => {
      setEffectsWs(JSON.parse(data))
    })
  }, [])

  useEffect(() => {
    if (content.type === "black") {
      setBlack(true)
    } else {
      setBlack(false)
    }
  }, [content])

  useEffect(() => {
    const fetchActive = async () => {
      const active = await getActive()
      if (active) {
        setContent({
          type: "song",
          content: active.verse,
        })
      }
    }
    fetchActive()
  }, [])

  return (
    <div
      ref={preview}
      className={classNames("prueba", {
        "landscape:pt-24 portrait:pt-12": bibleVerse?.content.length > 0,
      })}
      style={{ transform: `scale(${width || 1})` }}
    >
      {effectsWs.particles && <div className="snow"></div>}
      {bibleVerse?.content.length > 0 && <BibleVerse verse={bibleVerse} />}
      {!black && <Wallpaper style={styleData} effects={effectsWs} />}
      {content.type === "song" && <SongContent data={content} />}
      {content.type === "bible" && <BibleContent data={content} />}
      {content.type === "cover" && <CoverContent data={content} />}
      <FullScreenButton />
    </div>
  )
}

export default HomeView

type HomeViewProps = {
  width?: number
}
