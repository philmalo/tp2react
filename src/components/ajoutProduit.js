import { useState } from "react";

const AjoutProduit = ({onAdd}) => {

    const [nom, setNom] = useState("")
    const [categorie, setCategorie] = useState("");
    const [description, setDescription] = useState("");
    const [prix, setPrix] = useState("");

    const soumission = (e) => {
        e.preventDefault()

        if(!nom || !categorie || !description || !prix){

            alert("Veuillez remplir tous les champs")
            return
        }

        onAdd({nom, categorie, description, prix})
    }


    return (
        <form onSubmit={soumission}>
            <h3>Ajouter un produit</h3>
            <div>
                <label>Nom</label>
                <input type="text" placeholder="Nom de l'article" onChange={(e)=> setNom(e.target.value)}/>
            </div>
            <div>
                <label>Categorie</label>
                <input type="text" placeholder="Catégorie de l'article" onChange={(e)=> setCategorie(e.target.value)}/>
            </div>
            <div>
                <label>Description</label>
                <textarea rows="8" cols="30" placeholder="Description de l'article" onChange={(e)=> setDescription(e.target.value)}></textarea>
            </div>
            <div>
                <label>Prix</label>
                <input type="number" step="0.01" onChange={(e)=> setPrix(e.target.value)}/>
            </div>
            <input type="submit" value="Enregister"/>
        </form>
    )
}

export default AjoutProduit