import {LongTxt} from './LongTxt.jsx'

export function BookWishList({books, onRemoveFromWishList}) {
    if(!books) return ''
    return (
        <section className="book-wish-list">
            <ul>
                {books.map((book,i)=><li key={book._id}>
                    <LongTxt txt={book.title} />
                    <button onClick={()=>{
                        onRemoveFromWishList(book._id)
                    }}>X</button>
                    </li>)}
            </ul>
        </section>
    )
}