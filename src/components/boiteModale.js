import AjoutProduit from "./ajoutProduit";

const BoiteModale = ({isOpen, onClose, onAdd}) => {

    if(!isOpen){

        return null;
    }

    return (
        <dialog className={isOpen ? "afficher modale" : ""}>
            <div className="modale-contenu">
            <AjoutProduit onAdd={onAdd}/>
            <button onClick={onClose}>Annuler</button>
            </div>
        </dialog>
    )
}

export default BoiteModale;