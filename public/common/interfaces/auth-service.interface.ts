export interface RefreshTokenResponse extends Response {
  data: Data
}

export interface AuthenticateResponse extends Response {
  token: string
}

export interface RegisterResponse extends Response {
  data: Data
}

export interface IsAuthenticatedResponse extends Response {
  data: null
}

export interface Data {
  token: string
}

export interface RegisterPayload {
  name: string
  username: string
  email: string
  password: string
}

export interface RecuperationPayload {
  email: string
  gRecaptchaResponse: string
}

export interface ResetPasswordPayload {
  token: string
  password: string
}
