import React, { useState } from 'react'
import Container from './Container'
import Welcome from './pages/Welcome'
import Objective from './pages/Objective'

export default function Walkthrough() {
    const [page, setPage] = useState<number>(0)
    const pages = [
        <Welcome />,
        <Objective />
    ]

    function nextPage() {
        let p = page + 1
        if (p > pages.length - 1) p = page
        setPage(p)
    }

    function prevPage() {
        let p = page - 1
        if (p < 0) p = 0
        setPage(p)
    }

    return (
        <Container onNext={nextPage} onPrev={prevPage} first={page === 0}>
            {pages[page]}
        </Container>
    )
}