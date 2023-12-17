import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onSetWishList, booksWishList }) {
    return (
        <section className="book-list">
            {books.map((book, i) =>
                <BookPreview key={book._id} book={book} onSetWishList={onSetWishList} booksWishList={booksWishList} />
            )}
        </section>
    )
}