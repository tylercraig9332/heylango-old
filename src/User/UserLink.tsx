import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
export default function UserLink(props: {authorID: string}) {

    const [author, setAuthor] = useState<string>('author')

    useEffect(() => {
        // TODO: retrieve Author Info based on the id
    }, [])

    return <Link to={`/profile/${props.authorID}`}>{author}</Link>
}