import { Effect } from "@interfaces/effect.interface"
import { useEffect, useState } from "react"
import { socket } from "socket/mainSocket"
import { getOptions, updateOption } from "src/common/api/options/options.api"
import {
  WW_DEFAULT_PARTICLES_ID,
  WW_DEFAULT_ZOOM_ID,
} from "src/common/constants/options"
const PreviewOptions = () => {
  const [effectsWs, setEffectsWs] = useState<Effect | undefined>()

  useEffect(() => {
    getOptions()
      .then((response) => {
        const zoomActive =
          response.find((zoom) => zoom.id === Number(WW_DEFAULT_ZOOM_ID))
            ?.active || false
        const particlesActive =
          response.find(
            (particles) => particles.id === Number(WW_DEFAULT_PARTICLES_ID)
          )?.active || false
        const newEffectsWs = {
          zoom: zoomActive,
          particles: particlesActive,
        }
        setEffectsWs(newEffectsWs)
      })
      .catch((error) => {
        console.error("Error al obtener las opciones:", error)
      })
    socket.on("effects", (data: string) => {
      setEffectsWs(JSON.parse(data))
    })
  }, [])

  const setZoom = () => {
    const newZoomValue = !effectsWs?.zoom
    setEffectsWs({
      zoom: newZoomValue,
      particles: effectsWs?.particles,
    } as Effect)
    updateOption(Number(WW_DEFAULT_ZOOM_ID), { active: newZoomValue })
      .then(() => {
        // Maneja el éxito si es necesario
      })
      .catch((error) => {
        console.error("Error al actualizar la opción de Zoom:", error)
      })
    socket.emit(
      "effects",
      JSON.stringify({
        zoom: newZoomValue,
        particles: effectsWs?.particles,
      })
    )
  }

  const setParticles = () => {
    const newParticlesValue = !effectsWs?.particles
    setEffectsWs({
      zoom: effectsWs?.zoom,
      particles: newParticlesValue,
    } as Effect)
    updateOption(Number(WW_DEFAULT_PARTICLES_ID), { active: newParticlesValue })
      .then(() => {
        // Maneja el éxito si es necesario
      })
      .catch((error) => {
        console.error("Error al actualizar la opción de Partículas:", error)
      })
    socket.emit(
      "effects",
      JSON.stringify({
        zoom: effectsWs?.zoom,
        particles: newParticlesValue,
      })
    )
  }

  if (!effectsWs) return <>...</>

  return (
    <div className="pt-4 mb-6 flex">
      <div className="mr-6 flex items-center">
        <label className="mr-2" htmlFor="transicion">
          Zoom
        </label>
        <input
          type="checkbox"
          id="toogleZoom"
          checked={effectsWs?.zoom}
          onChange={setZoom}
        />
      </div>
      <div>
        <label className="mr-2" htmlFor="transicion">
          Partículas
        </label>
        <input
          type="checkbox"
          id="toogleParticles"
          checked={effectsWs?.particles}
          onChange={setParticles}
        />
      </div>
    </div>
  )
}
export default PreviewOptions
