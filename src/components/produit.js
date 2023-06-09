import {useState} from "react";

const Produit = ({produit, deleteProduit, modifProduit}) => {

    // active et désactive le mode de modification d'un produit ainsi que les classes css de l'affichage
    const [estModifie, setEstModifie] = useState(false);

    const [nom, setNom] = useState(produit.nom);
    const [categorie, setCategorie] = useState(produit.categorie);
    const [description, setDescription] = useState(produit.description);
    const [prix, setPrix] = useState(produit.prix);


    const actionModif = () => {
        // activation du mode de modification
        setEstModifie(true);
    };
    
    const actionEnregistrer = () => {

        const nouveauProduit = {
            id: produit.id,
            nom: nom,
            categorie: categorie,
            description: description,
            prix: prix
        }
        // envoi de l'information à mettre à jour vers la méthode de modification
        modifProduit(nouveauProduit);
        // désactivation du mode de modification
        setEstModifie(false);
    };


    return(
        <div className={estModifie ? 'modifProduit' : ''}>
            {estModifie ? (
            <div>
                <input value={nom} onChange={(e) => setNom(e.target.value)} />
                <input value={categorie} onChange={(e) => setCategorie(e.target.value)} />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                <input value={prix} onChange={(e) => setPrix(e.target.value)} />
                <button onClick={actionEnregistrer}>Enregistrer</button>
            </div>
            ) : (
            <div className={estModifie ? '' : 'produit'}>
                <div className="boutonModif">
                    <button onClick={actionModif}>Modifier</button>
                    <button onClick={() => deleteProduit(produit.id)}>Supprimer</button>
                </div>
                <h3>{nom}</h3>
                <small>{categorie}</small>
                <p>{description}</p>
                <strong>{prix}$</strong>
            <div>
            
            </div>
            </div>
            )}
        </div>
    )
}

export default Produit;