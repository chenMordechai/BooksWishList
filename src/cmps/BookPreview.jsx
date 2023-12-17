import {Star} from './Star'
import {LongTxt} from './LongTxt.jsx'

export function BookPreview({book , onSetWishList ,booksWishList}) {
  
  function isBookInWishList(){
    if(!booksWishList) return false
   const foundedBook =  booksWishList.find(b => b._id === book._id)
   if(foundedBook) return true
   return false
  }

    return (
        <section className="book-preview">
          <h2> <LongTxt txt={book.title} length="27" />
          <input type="checkbox" 
                 checked={isBookInWishList()}
                 onChange={()=>onSetWishList(event.target.checked,book._id)} />
          </h2>
          <hr />
          <h3 className="blue">{book.author}</h3>
          <p className="description">{book.description}</p>
          <p className="blue">Rating: <Star length={book.rating}/></p>
          <p className="blue">Price:${book.price}</p>
        </section>
    )
}