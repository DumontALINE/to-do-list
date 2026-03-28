import '../asset/CSS/App.css';
import '../asset/CSS/global.css'
import '../asset/CSS/Aceuille.css';
import monIcone from '../asset/image/modifier.png'
import { ETATS, ETAT_TERMINE } from '../donnee/Etat.js'
import { useState, useEffect } from 'react';

function Aceuille({ tasks, setTasks, folders, relations, setRelations, setTaskSelectionne  }) {
    const [shearche, setShearche] = useState('');
    const [tri, setTri] = useState('date_creation');
    const [filtreStatuts, setFiltreStatuts] = useState([ETATS.NOUVEAU, ETATS.EN_COURS, ETATS.EN_ATTENTE]);
    const [filtreDossier, setFiltreDossier] = useState([]);

    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id
                ? { ...task, etat: task.etat === 'Reussi' ? 'Nouveau' : 'Reussi' }
                : task
        ))
    };

    const tasksFiltres = tasks
        .filter(task => task.title.toLowerCase().includes(shearche.toLowerCase()))
        .filter(task => filtreStatuts.length === 0 || filtreStatuts.includes(task.etat))
        .filter(task => {
            if (filtreDossier.length === 0) return true
            const tacheDossierIds = relations
                .filter(r => r.tache === task.id)
                .map(r => r.categorie)
            return filtreDossier.some(id => tacheDossierIds.includes(id))
        })
        .sort((a, b) => {
            if (tri === 'date_creation') return new Date(a.date_creation) - new Date(b.date_creation);
            if (tri === 'date_echeance') return new Date(a.date_echeance) - new Date(b.date_echeance);
            if (tri === 'title') return a.title.localeCompare(b.title);
            return 0;
        });

    return (
        <div className="App">
            <header className="App-header">
                <h1 className="title">Bienvenue sur teendőlista</h1>
                <div className="info-tache">
                    <p>Vous comptez au total : {tasks.length} tâches</p>
                    <p>Il vous reste : {tasks.filter(task => task.etat !== 'Reussi' && task.etat !== 'Abandoné').length} tâches restantes</p>
                </div>
            </header>

            <div className="filtres-conteneur">
                <input
                    className="barre-recherche"
                    type="text"
                    placeholder="Rechercher une tâche..."
                    value={shearche}
                    onChange={e => setShearche(e.target.value)}
                />

                <select className="tri-select" value={tri} onChange={e => setTri(e.target.value)}>
                    <option value="date_creation">Date de création</option>
                    <option value="date_echeance">Date d'échéance</option>
                    <option value="title">Nom</option>
                </select>

                <span className="filtres-label">États :</span>
                <select className="tri-select" value={filtreStatuts.length === 1 ? filtreStatuts[0] : ''} onChange={e => {
                    if (e.target.value === '') {
                        setFiltreStatuts([])
                    } else {
                        setFiltreStatuts([e.target.value])
                    }
                }}>
                    <option value=''>Tous</option>
                    {Object.values(ETATS).map(etat => (
                        <option key={etat} value={etat}>{etat}</option>
                    ))}
                </select>

                <span className="filtres-label">Dossiers :</span>
                <select className="tri-select" value={filtreDossier.length === 1 ? filtreDossier[0] : ''} onChange={e => {
                    if (e.target.value === '') {
                        setFiltreDossier([])
                    } else {
                        setFiltreDossier([Number(e.target.value)])
                    }
                }}>
                    <option value=''>Tous</option>
                    {folders.map(f => (
                        <option key={f.id} value={f.id}>{f.title}</option>
                    ))}
                </select>
            </div>

            <div className="taches-grid">
                {tasksFiltres.map(task => (
                    <div className="tache" key={task.id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Créée le : {task.date_creation}</p>
                        <p>Échéance : {task.date_echeance}</p>
                        <span className="etat-badge">{task.etat}</span>
                        <div className="tache-actions">
                            <input type="checkbox" className="check" checked={task.etat === 'Reussi'} onChange={() => toggleTask(task.id)} />
                            <button className="btn-modifier" onClick={() => setTaskSelectionne(task)}>
                                <img src={monIcone} alt="modifier" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Aceuille;