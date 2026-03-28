import monIcone from "../asset/image/modifier.png";
import { useState } from "react";
import data from "../donnee/data.json";
import { ETATS } from "../donnee/Etat";
import "../asset/CSS/App.css";
import '../asset/CSS/global.css';
import '../asset/CSS/Corbeille.css';

function Corbeille({ tasks, setTasks, setTaskSelectionne  }) {
    const [filtreStatuts, setFiltreStatuts] = useState([ETATS.REUSSI, ETATS.ABANDONNE]);

    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id
                ? { ...task, etat: task.etat === 'Reussi' ? 'Nouveau' : 'Reussi' }
                : task
        ))
    };

    // ← manquait : tasksFiltres jamais calculé
    const tasksFiltres = tasks
        .filter(task => filtreStatuts.includes(task.etat))
        .sort((a, b) => new Date(b.date_echeance) - new Date(a.date_echeance));

    return (
        <div className="App">
            <header className="App-header">
                <h1 className="title">Corbeille</h1>
                <div className="info-tache">
                    <p>{tasksFiltres.length} tâche{tasksFiltres.length !== 1 ? 's' : ''}</p>
                </div>
            </header>

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

export default Corbeille;