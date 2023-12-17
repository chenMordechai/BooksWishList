import { useState, useEffect } from 'react'
import { BookList } from '../cmps/BookList.jsx'
import { BookWishList } from '../cmps/BookWishList.jsx'
import { BookSort } from '../cmps/BookSort.jsx'
import { bookService } from "../services/book.service-local"

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [booksWishList, setBooksWishList] = useState([])
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [sortBy, setSortBy] = useState(bookService.getDefaultSort())
    const [pageCount, setPageCount] = useState()
    const [showLeftBtn, setShowLeftBtn] = useState(false)
    const [showRightBtn, setShowRightBtn] = useState(true)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        bookService.query(filterBy)
            .then((data => {
                setBooks(data.booksToDisplay)
                setPageCount(data.pageCount)
                return books
            }))

    }, [filterBy])

    useEffect(() => {
        bookService.queryWishList(sortBy)
            .then((books) => {
                setBooksWishList(books)
            })
    }, [sortBy])

    useEffect(() => {
        sumTotalWishList()
    }, [booksWishList])

    function sumTotalWishList() {
        const sum = booksWishList.reduce((acc, b) => {
            acc += +b.price
            return acc
        }, 0)
        setTotalPrice(sum)
    }

    function onSetPageIdx(diff) {
        setFilterBy(prevFilter => {
            setShowLeftBtn(true)
            setShowRightBtn(true)

            let newPageIdx = prevFilter.pageIdx + diff
            if (newPageIdx <= 0) setShowLeftBtn(false)
            if (newPageIdx >= pageCount - 1) setShowRightBtn(false)

            return { ...prevFilter, pageIdx: newPageIdx }
        })
    }

    function onSetWishList(isChecked, bookId) {
        if (isChecked) {
            bookService.getById(bookId)
                .then(book => {
                    bookService.saveToWishList(book)
                        .then(() => {
                            setBooksWishList(prev => [book, ...prev])
                            sumTotalWishList()
                        })
                })
        } else {
            onRemoveFromWishList(bookId)
        }

    }

    function onRemoveFromWishList(bookId) {
        bookService.removeFromWishList(bookId)
            .then(() => {
                setBooksWishList(prev => prev.filter(book => book._id !== bookId))
                sumTotalWishList()
            })
    }

    function onSetSortBy(type) {
        setSortBy(prevSort => ({ ...prevSort, type }))
    }


    if (!books) return ''
    return (
        <section className="book-index">
            <section className="preview-container" >
                {showLeftBtn && <button onClick={() => {
                    onSetPageIdx(-1)
                }}>&lt;</button>}
                <BookList books={books} onSetWishList={onSetWishList} booksWishList={booksWishList} />
                {showRightBtn && <button onClick={() => {
                    onSetPageIdx(1)
                }}>&gt;</button>}
            </section>

            <section className="wish-list-container">
                <section>
                    <BookSort sortBy={sortBy} onSetSortBy={onSetSortBy} />
                    <BookWishList books={booksWishList} onRemoveFromWishList={onRemoveFromWishList} />
                </section>
                <h2 className="blue"> Total: ${totalPrice.toFixed(2)}</h2>
            </section>
        </section>
    )
}