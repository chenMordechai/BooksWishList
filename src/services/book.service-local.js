
import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'bookDB'
const PAGE_SIZE = 1

export const bookService = {
    query,
    getById,
    getDefaultFilter,
    getDefaultSort,
    queryWishList,
    saveToWishList,
    removeFromWishList
}


function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(books => {
                const booksData ={
                    allBooksCount : books.length,
                    booksToDisplay:[],
                    pageCount:0
                }
                let booksToDisplay = books.slice()
                const pageCount = Math.ceil(booksToDisplay.length / PAGE_SIZE)
                if (filterBy.pageIdx !== undefined) {
                    let start = filterBy.pageIdx * PAGE_SIZE 
                    booksToDisplay = booksToDisplay.slice(start, start + PAGE_SIZE)
                }
                booksData.pageCount = pageCount
                booksData.booksToDisplay = booksToDisplay
            return booksData
        })
}

function getById(bookId) {
    return storageService.get(STORAGE_KEY, bookId)
}

function queryWishList(sortBy={}) {
        return storageService.query('wishListDB')  
        .then(books =>{
             if (sortBy.type) {
                if (sortBy.type === 'title') {
                    books.sort(((b1, b2) => b1.title.localeCompare(b2.title) ))
                } else {
                    books.sort(((b1, b2) => (b1[sortBy.type] - b2[sortBy.type]) ))
                }
            }
            return books
        })    
    }

function saveToWishList(book){
    return storageService.post('wishListDB', book)
    .then((savedBook) => {
        return savedBook
    })
}

function removeFromWishList(bookId){
    return storageService.remove('wishListDB', bookId)
}

function getDefaultFilter() {
    return { title: '',  price: '', pageIdx:0 }
}

function getDefaultSort() {
    return { type: '', desc: 1 }
}


// ( async function () {
// const  books= [
//     {
//     title: "Sea of Death",
//     description: "Written in 1936 when Amado was twenty-four years old, Sea of Death tells the dockside tales of Bahia. Sailors and their wives, steeped in the rich mythology surrounding the goddess Iemanj?, are at the heart of this novel, a lyrical and tragic portrayal of the workers� daily struggle for survival. Sea of Death narrates the story of Guma and L?via, lovers whose triumphs and tribulations mirror the dark imperatives of the world around them.",
//     rating: "4.2",
//     author: "Jorge Amado",
//     price: "16.35"
//     },
//     {
//     title: "The Day Lasts More than a Hundred Years",
//     description: "Set in the vast windswept Central Asian steppes and the infinite reaches of galactic space, this powerful novel offers a vivid view of the culture and values of the Soviet Union�s Central Asian peoples.",
//     rating: "4.5",
//     author: "Chingiz Aitmatov",
//     price: "24"
//     },
//     {
//     title: "The Element of Surprise: Navy SEALS in Vietnam",
//     description: "t used to be said that the night belonged to Charlie. But that wasn't true where SEALs patrolled. For six months in 1970, fourteen men in Juliett Platoon of the Navy's SEAL Team One--incuding the author--carried out over a hundred missions in the Mekong Delta without a single platoon fatality. Their primary mission: kidnap enemy soldiers--alive--for interrogation.",
//     rating: "4.3",
//     author: "Darryl Young",
//     price: "7.99"
//     },
//     {
//     title: "The Hobbit",
//     description: "Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar. But his contentment is disturbed when the wizard Gandalf and a company of dwarves arrive on his doorstep one day to whisk him away on an adventure. They have launched a plot to raid the treasure hoard guarded by Smaug the Magnificent, a large and very dangerous dragon. Bilbo reluctantly joins their quest, unaware that on his journey to the Lonely Mountain he will encounter both a magic ring and a frightening creature known as Gollum.",
//     rating: "4.7",
//     author: "J.R.R. Tolkien",
//     price: "10.63"
//     },
//     {
//     title: "Only a Whisper",
//     description: "Called in the night to transcribe the bedridden confession of a dying man, federal agent Rae Phillips lost her heart to a voice in the darkness, a hero whose face she never saw�",
//     rating: "2.1",
//     author: "Gayle Wilson",
//     price: "2.78"
//     },
//     {
//     title: "Autobiography of a Yogi",
//     description: "Autobiography of a Yogi is at once a beautifully written account of an exceptional life and a profound introduction to the ancient science of Yoga and its time-honored tradition of meditation",
//     rating: "4.6",
//     author: "Paramahansa Yogananda",
//     price: "18"
//     },
//     {
//     title: "Out There",
//     description: "Out There is a celebration of books that have a made a difference in our lives.",
//     rating: "3.2",
//     author: "Sarah Stark",
//     price: "10.14"
//     },
//     {
//     title: "Crafting with Cat Hair: Cute Handicrafts to Make with Your Cat",
//     description: "Got fur balls?",
//     rating: "3.6",
//     author: "Kaori Tsutaya",
//     price: "9.97"
//     },
//     {
//     title: "The Yiddish Policemen's Union Kindle Edition",
//     description: "Set in the Jewish homeland of � Alaska, this is a brilliantly original novel from Michael Chabon, author of THE ADVENTURES OF KAVALIER & CLAY and WONDER BOYS.",
//     rating: "3.7",
//     author: "Michael Chabon",
//     price: "21.33"
//     },
//     {
//     title: "One More Day",
//     description: "Carrie Morgan's son disappears. Rumors start to circulate through Carrie's small town. Her husband and friends start to think she's crazy. As the investigation heats up, Carrie must decide what to share, and why.",
//     rating: "3.1",
//     author: "Kelly Simmons",
//     price: "25.82"
//     },
//     {
//     title: "The Laundry Room",
//     description: "The Laundry Room dramatizes a fascinating moment in the history of the founding of Israel as a self-ruling nation.",
//     rating: "4",
//     author: "Lynda Lippman-Lockhart",
//     price: "17.5"
//     }]
     
//         for(var i = 0 ; i < books.length ; i++){
//             await save(books[i])
//         }
    
 
// }())
