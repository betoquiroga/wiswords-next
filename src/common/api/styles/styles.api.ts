import StyleService from "src/common/services/styles/styles.service"
import { StyleBase } from "src/common/interfaces/style.interface"

const service = new StyleService()

export const getStyles = async () => {
  const response = await service.getStyles()
  return response.data
}

export const getStyleById = async (id: number) => {
  const response = await service.getStyleById(id)
  return response.data
}

export const getStyleActive = async () => {
  const response = await service.getStyleActive()
  return response.data
}

export const createStyle = async (newStyleData: StyleBase) => {
  const response = await service.createStyle(newStyleData)
  return response.data
}

export const updateStyle = async (id: number, updatedStyleData: StyleBase) => {
  const response = await service.updateStyle(id, updatedStyleData)
  return response.data
}

export const setActiveStyle = async (id: number) => {
  const response = await service.setActive(id)
  return response.data
}

export const deleteStyle = async (id: number) => {
  const response = await service.deleteStyle(id)
  return response.data
}
