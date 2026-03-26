import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import './asset/CSS/App.css'
import Aceuille from './pages/Aceuille'
import Dossiers from './pages/Dossiers'
import Corbeille from "./pages/Corbeille";


function App() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => setIsOpen(!isOpen)
    const closeMenu = () => setIsOpen(false)

    return (
        <BrowserRouter>
            <div className="App">
                <nav>
                    <button className={`burger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                        <span/><span/><span/>
                    </button>
                </nav>

                <div className={`menu-overlay ${isOpen ? 'open' : ''}`}>
                    <ul>
                        <li><Link to="/" onClick={closeMenu}>Accueil</Link></li>
                        <li><Link to="/dossiers" onClick={closeMenu}>Dossiers</Link></li>
                        <li><Link to="/corbeille" onClick={closeMenu}>Corbeille</Link></li>
                    </ul>
                </div>

                <Routes>
                    <Route path="/" element={<Aceuille />} />
                    <Route path="/dossiers" element={<Dossiers />} />
                    <Route path="/corbeille" element={<Corbeille />} />
                </Routes>

            </div>
        </BrowserRouter>
    )
}

export default App