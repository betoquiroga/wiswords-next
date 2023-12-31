import { BookContext } from "src/common/context/BookContext"
import { Book } from "src/common/interfaces/book.interface"
import classNames from "classnames"
import { useContext } from "react"
import { ChapterContext } from "@context/ChapterContext"
import { Chapter } from "@interfaces/chapter.interface"
import { ColumnContext } from "@context/ColumnContext"

const BooksItem = ({ bookData }: BooksItemProps) => {
  const { book, setBook } = useContext(BookContext)
  const { setChapter, setVerses } = useContext(ChapterContext)
  const { setActiveColumn } = useContext(ColumnContext)

  const handleClick = async () => {
    localStorage?.setItem("currentBook", JSON.stringify(bookData))
    setBook(bookData)
    setChapter({} as Chapter)
    setVerses([])
    setActiveColumn(2)
  }

  const { title, section, abbreviation } = bookData
  return (
    <div
      onClick={handleClick}
      className={classNames(
        "book p-2 border-t-2 border-t-ww-alt hover:bg-ww-alt cursor-pointer flex items-center justify-items-stretch",
        {
          "bg-ww-green-800 hover:bg-ww-green-800":
            book?.abbreviation === bookData?.abbreviation,
        }
      )}
    >
      <div
        className={classNames(
          "flex justify-center self-center h-full min-w-[6rem] text-3xl p-4",
          {
            "bg-ww-green-700": book?.abbreviation === bookData?.abbreviation,
            "bg-ww-scroll": book?.abbreviation !== bookData?.abbreviation,
          }
        )}
      >
        <span>{abbreviation}</span>
      </div>
      <div className="pl-4">
        <p className="text-ww-normal">{title}</p>
        <span className="text-ww-lighter">{section}</span>
      </div>
    </div>
  )
}

type BooksItemProps = {
  bookData: Book
}

export default BooksItem
