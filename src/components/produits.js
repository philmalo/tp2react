import Produit from "./produit";

const ProduitsTotaux = ({produits, deleteProduits, modifProduit}) => {

    return (
        <div className="produits">{produits.map((produit) => (<Produit key={produit.id} produit={produit} deleteProduit={deleteProduits} modifProduit={modifProduit}/>))}</div>
    )
}

export default ProduitsTotaux