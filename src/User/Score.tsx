import React, { useState, useEffect } from 'react'

export default function Score(props : {user : string}) {

    const [score, setScore] = useState<number>(0)

    useEffect(() => {
        let u = props.user
        if (props.user === undefined || props.user.length === 0) u = 'me'
        fetch('/i/score/' + props.user).then(res => {
            if (res.status !== 200) return
            return res.json()
        }).then(scoreData => {
            setScore(scoreData.points)
        })
    }, [])


    return (
        <div>{score}</div>
    )
}