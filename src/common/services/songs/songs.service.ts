import HttpRequest from "src/common/services/http-request"
import { ServiceResponse } from "src/common/services/response"
import { getToken } from "src/common/helpers/auth.helper"
import { Song, SongBase } from "@interfaces/song.interface"

const SONGS_ENDPOINT = "songs"

export default class SongsService extends HttpRequest {
  async getSongs() {
    this.useToken(getToken())

    this.configRequest({
      endpoint: SONGS_ENDPOINT,
    })

    const response = await this.get<Song[]>()
    return new ServiceResponse(response.data)
  }

  async getActive() {
    this.useToken(getToken())

    this.configRequest({
      endpoint: `${SONGS_ENDPOINT}/active`,
    })

    const response = await this.get<Song>()
    return new ServiceResponse(response.data)
  }

  async getSongById(id: number) {
    this.useToken(getToken())

    this.configRequest({
      endpoint: `${SONGS_ENDPOINT}/${id}`,
    })

    const response = await this.get<Partial<Song>>()
    return new ServiceResponse(response.data)
  }

  async createSongs(newSongData: SongBase) {
    this.useToken(getToken())

    this.configRequest({
      endpoint: SONGS_ENDPOINT,
    })

    const response = await this.post<SongBase>(newSongData)
    return new ServiceResponse(response.data)
  }

  async updateSong(songId: number, updatedData: Partial<SongBase>) {
    this.useToken(getToken())

    this.configRequest({
      endpoint: `${SONGS_ENDPOINT}/${songId}`,
    })

    const response = await this.patch<Partial<SongBase>>(updatedData)
    return new ServiceResponse(response.data)
  }

  async deleteSong(songId: number) {
    this.useToken(getToken())

    this.configRequest({
      endpoint: `${SONGS_ENDPOINT}/${songId}`,
    })

    const response = await this.delete()
    return new ServiceResponse(response.data)
  }

  async setActive(id: number) {
    this.useToken(getToken())
    this.configRequest({
      endpoint: `${SONGS_ENDPOINT}/active/${id}`,
    })

    const response = await this.patch<SongBase>({ active: true })
    return new ServiceResponse(response.data)
  }

  async desactivateAllSongs() {
    this.useToken(getToken())

    this.configRequest({
      endpoint: `${SONGS_ENDPOINT}/desactivateAllSongs`,
    })

    const response = await this.post<SongBase>({})
    return new ServiceResponse(response.data)
  }
}
