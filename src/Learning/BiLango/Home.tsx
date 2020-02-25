import React, { useEffect, useState } from 'react'

export default function Home() {

    const [sheets, setSheets] = useState<Object[]>()

    useEffect(() => {
        const reqHeaders = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }
        fetch('/l/bi/all', reqHeaders).then(res => res.json()).then(sheets => {
            setSheets(sheets)
        })
    }, [])

    return (
        <div>{(sheets === undefined) ? null : sheets.map((sheet : any) => {
            return <div><a href={`/learn/bi/${sheet._id}`}>{sheet.title}</a></div>
        })}</div>
    )
}