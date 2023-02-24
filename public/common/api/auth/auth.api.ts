import { RegisterPayload } from "@interfaces/auth-service.interface"
import AuthenticationService from "@services/user/auth.service"
import { TOKEN_NAME } from "public/common/constants/auth"
import { getToken } from "public/common/helpers/auth.helper"
import { HttpStatusCode } from "public/common/helpers/response-status-code.helper"

const service = new AuthenticationService()

export const isAuthenticated = async () => {
  const jwt = getToken()
  const response = await service.isAuthenticated(jwt)

  if (response.status === HttpStatusCode.UNAUTHORIZED) return false
  return response.status === HttpStatusCode.OK
}

export const logout = () => localStorage.removeItem(TOKEN_NAME)

export const login = (token: string) => localStorage.setItem(TOKEN_NAME, token)

export const authenticate = async (username: string, password: string) => {
  const response = await service.authenticate(username, password)
  const jwt = response.data?.token

  if (!jwt) {
    logout()
    throw new Error("Something went wrong...")
  }

  login(`Bearer ${jwt}`)
  service.useToken(jwt)

  return response
}

export const registration = async (payload: RegisterPayload) => {
  const response = await service.register(payload)
  const jwt = response.data?.token

  if (!jwt) {
    logout()
    throw new Error("Something went wrong...")
  }

  login(`Bearer ${jwt}`)
  service.useToken(jwt)

  return response
}