
export function BookSort({ sortBy, onSetSortBy }) {

  return (
    <section className="book-sort">
      <button className={sortBy.type === 'title' ? 'active' : ''} onClick={() => {
        onSetSortBy('title')
      }}>Title</button>
      <button className={sortBy.type === 'price' ? 'active' : ''} onClick={() => {
        onSetSortBy('price')
      }}>Price</button>
      <button className={sortBy.type === 'rating' ? 'active' : ''} onClick={() => {
        onSetSortBy('rating')
      }}>Rating</button>
    </section>
  )
}