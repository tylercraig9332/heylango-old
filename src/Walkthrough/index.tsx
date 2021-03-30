import React, { useState } from 'react'
import Container from './Container'
/* Pages */
import Welcome from './pages/Welcome'
import Objective from './pages/Objective'
import Input from './pages/Input'

export default function Walkthrough() {
    const [page, setPage] = useState<number>(2)
    const pages = [
        <Welcome />,
        <Objective />,
        <Input />
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