import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import {useEffect, useState} from 'react'
import './asset/CSS/App.css'
import './asset/CSS/global.css';
import Aceuille from './pages/Aceuille'
import Dossiers from './pages/Dossiers'
import Corbeille from "./pages/Corbeille";
import data from "./donnee/data.json";
import ETATS  from "./donnee/Etat"
import AddTaskPopup  from "./components/Pop-ups/AddTask/AddTask"
import ModifTaskPopup from "./components/Pop-ups/ModifTaskPopup/ModifTaskPopup"
import AddFolderPopup from "./components/Pop-ups/AddFolderPopup/AddFolderPopup";

function ShowReset({onClose, onReset }) {
    return(
        <div className="backdrop" onClick={onClose}>
            <div className="popup">
                <h2>Voulez-vous tout reset ?</h2>
                <button onClick={onReset}>oui</button>
                <button onClick={onClose}>non</button>
            </div>
        </div>
    )
}

function App() {
    const [taskSelectionne, setTaskSelectionne] = useState(null);
    const [onReset, setonReset] = useState(() => {
        return !sessionStorage.getItem('dejaDemarre')
    })

    useEffect(() => {
        sessionStorage.setItem('dejaDemarre', 'true')
    }, [])

    const handleReset = () => {
        localStorage.removeItem('tasks')
        localStorage.removeItem('folders')
        localStorage.removeItem('relations')
        setTasks(data.tasks)
        setFolders(data.categories)
        setRelations(data.relations)
        setonReset(false)
    }

    const [tasks, setTasks] = useState(() => {
        const sauvegarde = localStorage.getItem('tasks')
        return sauvegarde ? JSON.parse(sauvegarde) : data.tasks
    })

    const [isOpen, setIsOpen] = useState(false)
    const [popupOpen, setPopupOpen] = useState(null)
    const toggleMenu = () => setIsOpen(!isOpen)
    const closeMenu = () => setIsOpen(false)

    const addTask = (task) => {
        const newId = Date.now()
        const newTask = { ...task, id: newId, date_creation: new Date().toISOString().split('T')[0] }
        setTasks([...tasks, newTask])

        if (task.dossierId) {
            setRelations([...relations, { tache: newId, categorie: Number(task.dossierId) }])
        }
    }

    const updateTask = (nouvellesDonnees) => {
        setTasks(tasks.map(task =>
            task.id === taskSelectionne.id
                ? { ...task, ...nouvellesDonnees }
                : task
        ))
        const Relation = relations.filter(r => r.tache !== taskSelectionne.id)
        if (nouvellesDonnees.dossierId) {
            setRelations([...Relation, { tache: taskSelectionne.id, categorie: Number(nouvellesDonnees.dossierId) }])
        } else {
            setRelations(Relation)
        }
        setTaskSelectionne(null)
    }

    const [folders, setFolders] = useState(() => {
        const s = localStorage.getItem('folders')
        return s ? JSON.parse(s) : data.categories
    })

    const [relations, setRelations] = useState(() => {
        const s = localStorage.getItem('relations')
        return s ? JSON.parse(s) : data.relations
    })

    useEffect(() => {
        localStorage.setItem('relations', JSON.stringify(relations))
    }, [relations])

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    useEffect(() => {
        localStorage.setItem('folders', JSON.stringify(folders))
    }, [folders])

    const addFolder = (newFolder) => {
        const nouveau = { ...newFolder, id: Date.now(), icon: '', type: '' }
        setFolders([...folders, nouveau])
    }

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
                    <Route path="/" element={<Aceuille tasks={tasks} setTasks={setTasks} folders={folders} relations={relations} setRelations={setRelations} setTaskSelectionne={setTaskSelectionne} />} />
                    <Route path="/dossiers" element={<Dossiers folders={folders} relations={relations} tasks={tasks} setTaskSelectionne={setTaskSelectionne} />} />
                    <Route path="/corbeille" element={<Corbeille tasks={tasks} setTasks={setTasks} setTaskSelectionne={setTaskSelectionne} />} />
                </Routes>

            <footer className="footer-conteneur">
                <a href="#" onClick={() => setPopupOpen('task')}>Nouvelle tâche</a>
                <a href="#" onClick={() => setPopupOpen('folder')}>Nouveau Dossier</a>
            </footer>
                {popupOpen === 'task' && <AddTaskPopup onClose={() => setPopupOpen(null)} onAdd={addTask} folders={folders} />}
                {popupOpen === 'folder' && <AddFolderPopup onClose={() => setPopupOpen(null)} onAdd={addFolder} />}
                {onReset && <ShowReset  onClose={() => setonReset(false)} onReset={handleReset} />}
                {taskSelectionne && <ModifTaskPopup task={taskSelectionne} onClose={() => setTaskSelectionne(null)} onUpdate={updateTask} folders={folders} relations={relations} />}
         </div>

        </BrowserRouter>
    )
}

export default App