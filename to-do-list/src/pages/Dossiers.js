import { useState } from 'react';
import data from '../donnee/data.json';
import '../asset/CSS/App.css';
import '../asset/CSS/global.css';
import '../asset/CSS/Dossier.css';

function Dossiers({setTaskSelectionne }) {

    const [relations] = useState(() => {
        const s = localStorage.getItem('relations')
        return s ? JSON.parse(s) : data.relations
    });

    const [tasks] = useState(() => {
        const s = localStorage.getItem('tasks')
        return s ? JSON.parse(s) : data.tasks
    });

    const [folder] = useState(() =>{
        const s = localStorage.getItem('folders')
        return s ? JSON.parse(s) : data.categories
    });
    const [Open, SetOpen] = useState(null);

    const toggle = (id) => {
        SetOpen(Open === id ? null : id)
    }

    const getTaches = (dossierId) => {
        const tacheIds = relations
            .filter(r => r.categorie === dossierId)
            .map(r => r.tache)
        return tasks.filter(t => tacheIds.includes(t.id))
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1 className="title">Vos dossiers</h1>
                <div className="info-tache">
                    <p>{folder.length} dossiers</p>
                </div>
            </header>

            <div className="folder-list">
                {folder.map(folders => {
                    const taches = getTaches(folders.id);

                    return (
                        <div className={`folder-card folder-${folders.color}`} key={folders.id}>
                            <div className="folder-card-header">
                                <div>
                                    <h3 className="folder-title">{folders.title}</h3>
                                    {folders.description && <p className="folder-desc">{folders.description}</p>}
                                    <p className="folder-count">{taches.length} tâche{taches.length !== 1 ? 's' : ''}</p>
                                </div>
                                <button className="folder-toggle-btn" onClick={() => toggle(folders.id)}>
                                    {Open === folders.id ? '▲' : '▼'}
                                </button>
                            </div>

                            {Open === folders.id && (
                                <div className="folder-tasks">
                                    {taches.length === 0 ? (
                                        <p className="folder-empty">Aucune tâche</p>
                                    ) : (
                                        taches.map(task => (
                                            <button key={task.id} className="folder-task-item" onClick={() => setTaskSelectionne(task)}>
                                                <div>
                                                    <p className="folder-task-title">{task.title}</p>
                                                    <p className="folder-desc">{task.date_echeance}</p>
                                                </div>
                                                <span className="etat-badge">{task.etat}</span>
                                            </button>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Dossiers;