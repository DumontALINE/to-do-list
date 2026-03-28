import {useEffect, useState} from "react";
import data from "../../../donnee/data.json";
import {ETATS} from "../../../donnee/Etat";
import '../../../asset/CSS/global.css';
import '../../../asset/CSS/pop-ups.css';

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
export default ModifTaskPopup