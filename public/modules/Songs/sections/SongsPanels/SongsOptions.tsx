import BibleIcon from "public/common/Icons/misc/bible"
import ConfigIcon from "public/common/Icons/misc/config"
import PhotoIcon from "public/common/Icons/misc/photo"
import ProfileIcon from "public/common/Icons/misc/profile"
import SongIcon from "public/common/Icons/misc/song"

const SongsOptions = () => {
  return (
    <div className="pb-4 flex justify-between w-full">
      <div className="grid-cols-5 grid gap-4 self-center">
        <SongIcon />
        <BibleIcon />
        <PhotoIcon />
        <ConfigIcon />
        <ProfileIcon />
      </div>
      <span>Ordenar por</span>
    </div>
  )
}

export default SongsOptions
