
export function LongTxt({ txt, length = 19 }) {

    if (txt.length <= length) return <section>{txt}</section>
    else return <section>{txt.substring(0, length) + '...'}</section>
}