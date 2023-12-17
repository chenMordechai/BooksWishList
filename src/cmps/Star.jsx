
import starUrl from '../assets/img/star.png'
import starEmptyUrl from '../assets/img/star-empty.png'

export function Star ({length}){
    const stars = ['s','s','s','s','s']

    return (
        <span className="star">
            {stars.map((s,i)=>{
                if((i+1)<length)  return  <img key={i} src={starUrl}/>
                else return  <img key={i} src={starEmptyUrl}/>
            })}
        </span>
    )
}