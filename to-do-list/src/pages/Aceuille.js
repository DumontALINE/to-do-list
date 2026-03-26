import '../asset/CSS/App.css';
import monIcone from '../asset/image/modifier.png'
import data from '../data.json';
import { ETATS, ETAT_TERMINE } from '../Etat.js'
import { useState, useEffect } from 'react';

function AddTaskPopup({ onClose, onAdd, folders  }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date_echeance: '',
        etat: 'Nouveau',
        dossier_id: ''
    });

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = () => {
        if (!formData.title || !formData.date_echeance) {
            alert('Veuillez remplir tous les champs');
            return;
        }
        onAdd(formData);
        onClose();
    };

    return (
        <div className="backdrop" onClick={onClose}>
            <div className="popup" onClick={e => e.stopPropagation()}>
                <div className="popup-header">
                    <h2>Nouvelle tâche</h2>
                    <button className="btn-close" onClick={onClose}>✕</button>
                </div>
                <label>Titre <span>*</span></label>
                <input name="title" placeholder="Ex: Faire les courses" value={formData.title} onChange={handleChange} />
                <label>Description</label>
                <textarea name="description" placeholder="Décrivez la tâche..." value={formData.description} onChange={handleChange} />
                <label>Date d'échéance <span>*</span></label>
                <input name="date_echeance" type="date" value={formData.date_echeance} onChange={handleChange} />
                <label>Dossier</label>
                <select name="dossierId" value={formData.dossierId} onChange={handleChange}>
                    <option value=''>Aucun dossier</option>
                    {folders.map(f => (
                        <option key={f.id} value={f.id}>{f.title}</option>
                    ))}
                </select>
                <div className="popup-buttons">
                    <button className="btn-annuler" onClick={onClose}>Annuler</button>
                    <button className="btn-confirmer" onClick={handleSubmit}>Créer</button>
                </div>
            </div>
        </div>
    );
}

const COULEURS = ['orange', 'pink', 'bluesky', 'green'];
function AddFolderPopup({ onClose, onAdd }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        color: 'bluesky'
    });
    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = () => {
        if (!formData.title) { alert('Veuillez remplir tous les champs'); return; }
        onAdd(formData)
        onClose()
    };
    return (
        <div className="backdrop" onClick={onClose}>
            <div className="popup" onClick={e => e.stopPropagation()}>
                <div className="popup-header">
                    <h2>Nouveau dossier</h2>
                    <button className="btn-close" onClick={onClose}>✕</button>
                </div>
                <label>Titre <span>*</span></label>
                <input name="title" placeholder="Ex: Travail" value={formData.title} onChange={handleChange} />
                <label>Description</label>
                <textarea name="description" placeholder="Décrivez le dossier..." value={formData.description} onChange={handleChange} />
                <label>Couleur</label>
                <select name="color" value={formData.color} onChange={handleChange}>
                    <option value="orange">Orange</option>
                    <option value="pink">Rose</option>
                    <option value="bluesky">Bleu</option>
                    <option value="green">Vert</option>
                </select>
                <div className="popup-buttons">
                    <button className="btn-annuler" onClick={onClose}>Annuler</button>
                    <button className="btn-confirmer" onClick={handleSubmit}>Créer</button>
                </div>
            </div>
        </div>
    );
}

function ModifTaskPopup({ onClose, onUpdate, task, folders, relations }) {
    const relationActuelle = relations.find(r => r.tache === task.id)
    const [formData, setFormData] = useState({
        title: task.title,
        description: task.description,
        date_echeance: task.date_echeance,
        etat: task.etat,
        dossierId: relationActuelle ? relationActuelle.categorie : ''
    });

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = () => {
        if (!formData.title || !formData.date_echeance) {
            alert('Veuillez remplir tous les champs');
            return;
        }
        onUpdate(formData);
        onClose();
    };

    return (
        <div className="backdrop" onClick={onClose}>
            <div className="popup" onClick={e => e.stopPropagation()}>
                <div className="popup-header">
                    <h2>Modifier la tâche</h2>
                    <button className="btn-close" onClick={onClose}>✕</button>
                </div>
                <label>Titre <span>*</span></label>
                <input name="title" placeholder="Ex: Faire les courses" value={formData.title} onChange={handleChange} />
                <label>Description</label>
                <textarea name="description" placeholder="Décrivez la tâche..." value={formData.description} onChange={handleChange} />
                <label>Date d'échéance <span>*</span></label>
                <input name="date_echeance" type="date" value={formData.date_echeance} onChange={handleChange} />
                <label>État</label>
                <select name="etat" value={formData.etat} onChange={handleChange}>
                    <option value={ETATS.NOUVEAU}>{ETATS.NOUVEAU}</option>
                    <option value={ETATS.EN_COURS}>{ETATS.EN_COURS}</option>
                    <option value={ETATS.EN_ATTENTE}>{ETATS.EN_ATTENTE}</option>
                    <option value={ETATS.ABANDONNE}>{ETATS.ABANDONNE}</option>
                </select>
                <label>Dossier</label>
                <select name="dossierId" value={formData.dossierId} onChange={handleChange}>
                    <option value=''>Aucun dossier</option>
                    {folders.map(f => (
                        <option key={f.id} value={f.id}>{f.title}</option>
                    ))}
                </select>
                <div className="popup-buttons">
                    <button className="btn-annuler" onClick={onClose}>Annuler</button>
                    <button className="btn-confirmer" onClick={handleSubmit}>Modifier</button>
                </div>
            </div>
        </div>
    );
}

function Aceuille() {
    const [tasks, setTasks] = useState(() => {
        const sauvegarde = localStorage.getItem('tasks')
        return sauvegarde ? JSON.parse(sauvegarde) : data.tasks
    })
    const addTask = (task) => {
        const newId = Date.now()
        const newTask = { ...task, id: newId, date_creation: new Date().toISOString().split('T')[0] }
        setTasks([...tasks, newTask])

        if (task.dossierId) {
            setRelations([...relations, { tache: newId, categorie: Number(task.dossierId) }])
        }
    }
    const [popupOpen, setPopupOpen] = useState(null);
    const [taskSelectionne, setTaskSelectionne] = useState(null);
    const [shearche, setShearche] = useState('');
    const [tri, setTri] = useState('date_creation');
    const [filtreStatuts, setFiltreStatuts] = useState([ETATS.NOUVEAU, ETATS.EN_COURS, ETATS.EN_ATTENTE]);

    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id
                ? { ...task, etat: task.etat === 'Reussi' ? 'Nouveau' : 'Reussi' }
                : task
        ))
    };

    const updateTask = (nouvellesDonnees) => {
        setTasks(tasks.map(task =>
            task.id === taskSelectionne.id
                ? { ...task, ...nouvellesDonnees }
                : task
        ))
        const relSansCette = relations.filter(r => r.tache !== taskSelectionne.id)
        if (nouvellesDonnees.dossierId) {
            setRelations([...relSansCette, { tache: taskSelectionne.id, categorie: Number(nouvellesDonnees.dossierId) }])
        } else {
            setRelations(relSansCette)
        }
        setTaskSelectionne(null)
    }

    const toggleFiltre = (etat) => {
        if (filtreStatuts.includes(etat)) {
            setFiltreStatuts(filtreStatuts.filter(s => s !== etat));
        } else {
            setFiltreStatuts([...filtreStatuts, etat]);
        }
    };

    const tasksFiltres = tasks
        .filter(task => task.title.toLowerCase().includes(shearche.toLowerCase()))
        .filter(task => filtreStatuts.includes(task.etat))
        .sort((a, b) => {
            if (tri === 'date_creation') return new Date(a.date_creation) - new Date(b.date_creation);
            if (tri === 'date_echeance') return new Date(a.date_echeance) - new Date(b.date_echeance);
            if (tri === 'title') return a.title.localeCompare(b.title);
            return 0;
        });

    const addFolder = (newFolder) => {
        const nouveau = { ...newFolder, id: Date.now(), icon: '', type: '' }
        setFolders([...folders, nouveau])
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

    return (
        <div className="App">
            <header className="App-header">
                <h1 className="title">Bienvenue sur teendőlista</h1>
                <div className="info-tache">
                    <p>Vous comptez au total : {tasks.length} tâches</p>
                    <p>Il vous reste : {tasks.filter(task => task.etat !== 'Reussi' && task.etat !== 'Abandonné').length} tâches restantes</p>
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
            <footer className="footer-conteneur">
                <a href="#" onClick={() => setPopupOpen('task')}>Nouvelle tâche</a>
                <a href="#" onClick={() => setPopupOpen('folder')}>Nouveau Dossier</a>
            </footer>

            {popupOpen === 'folder' && <AddFolderPopup onClose={() => setPopupOpen(null)} onAdd={addFolder} />}
            {popupOpen === 'task' && <AddTaskPopup onClose={() => setPopupOpen(null)} onAdd={addTask} folders={folders} />}
            {taskSelectionne && <ModifTaskPopup task={taskSelectionne} onClose={() => setTaskSelectionne(null)} onUpdate={updateTask} folders={folders} relations={relations} />}
        </div>
    );
}

export default Aceuille;