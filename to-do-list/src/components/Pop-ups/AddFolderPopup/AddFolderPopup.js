import {useEffect, useState} from "react";
import '../../../asset/CSS/global.css';
import '../../../asset/CSS/pop-ups.css';
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
export default AddFolderPopup