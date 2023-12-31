import React, { useState } from "react"
import { Tab } from "@headlessui/react"
import { videoEmit } from "@helpers/socket/emit"
import { defaultVideoStyle } from "src/common/constants/style"
import { useVideoContext } from "@context/VideoContext"

const VideosPanel = () => {
  const { videoURLs, addVideoURL, removeVideoURL } = useVideoContext()
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<null | number>(
    null
  )
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)
  const selectedFileNames = React.useRef<string[]>([])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      const files = event.target.files
      const videoURLArray = []

      if (videoURLs.length >= 20) {
        alert("Has alcanzado el límite de 20 archivos.")
        return
      }

      for (let i = 0; i < files.length; i++) {
        const myFile = files[i]
        if (myFile.type.startsWith("video/")) {
          if (selectedFileNames.current.includes(myFile.name)) {
            alert("El archivo ya ha sido seleccionado.")
          } else {
            const objectURL = URL.createObjectURL(myFile)
            videoURLArray.push(objectURL)
            selectedFileNames.current.push(myFile.name)
          }
        }
      }

      if (videoURLArray.length > 0) {
        if (videoURLs.length + videoURLArray.length <= 20) {
          addVideoURL(videoURLArray)
        } else {
          alert("No puedes seleccionar más de 20 archivos.")
        }
      } else {
        alert("Por favor, selecciona archivos de video válidos.")
      }
    }
  }

  const emitVideo = (videoURL: string, index: number) => {
    videoEmit(defaultVideoStyle(videoURL))
    setSelectedVideoIndex(index)
  }

  return (
    <Tab.Panel>
      <h1 className="text-2xl font-semibold mt-4 mb-4">Galería de videos</h1>
      <div className="mb-4"></div>
      <div className="w-1/2 mx-auto">
        <input
          type="file"
          accept="video/*"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
          ref={fileInputRef}
        />
        <button
          className="w-full bg-ww-alt transition-all py-2 px-4 rounded-lg mb-4 hover:bg-ww-green-800"
          onClick={() => fileInputRef.current?.click()}
        >
          Seleccionar archivos de video
        </button>
        <p>{videoURLs.length} archivo(s) seleccionado(s)</p>
      </div>
      <div className="mt-8"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videoURLs.map((videoURL, index) => (
          <div
            key={index}
            className={`relative cursor-pointer ${
              selectedVideoIndex === index ? "selected" : ""
            }`}
            style={{ position: "relative" }}
          >
            <video
              muted
              controls
              controlsList="nodownload nofullscreen noplaybackrate"
              src={videoURL}
              style={{
                width: "300px",
                height: "150px",
                objectFit: "cover",
                border:
                  selectedVideoIndex === index ? "4px solid #2DAB8B" : "none",
              }}
              onClick={() => emitVideo(videoURL, index)}
            ></video>
            <button
              type="button"
              className="bg-ww-scroll flex justify-center align-middle rounded-full text-ww-normal text-center w-6 h-6 absolute top-0 right-0 hover:bg-red-600"
              onClick={() => removeVideoURL(index)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </Tab.Panel>
  )
}

export default VideosPanel
