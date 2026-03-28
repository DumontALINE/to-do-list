import {useState} from "react";
import {ETATS} from "../../../donnee/Etat";
import '../../../asset/CSS/pop-ups.css';

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
export default AddTaskPopup