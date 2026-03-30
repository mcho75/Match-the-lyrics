import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './style.css'
import Root from './pages/Root.jsx'
import Search from './pages/Search.jsx'
import Game from './pages/Game.jsx'
import ErrorPage from './pages/Error.jsx'
import Header from './features/match-lyrics/components/Header.jsx'

// le double chargement est a piori causé par le StrictMode en mode développement, 
// donc n'aura pas lieu pendant un usage classique.
createRoot(document.getElementById('root')).render(
    <StrictMode>

        <BrowserRouter>

            <Header/>

            <main>
                <Routes>
                    <Route path="/" element={ <Root/> } />
                    <Route path="/search/:query" element={ <Search/> } />
                    <Route path="/song/:id" element={ <Game/> } />
                </Routes>
            </main>

        </BrowserRouter>

    </StrictMode>,
)
