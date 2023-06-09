import {useState, useEffect} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/header";
import ProduitsTotaux from "./components/produits";
import BoiteModale from "./components/boiteModale";
import Footer from "./components/footer";

import './App.css';

function App() {

  const [produits, setProduits] = useState([])
  const [isModaleOuverte, setIsModaleOuverte] = useState(false)

  const ouvreModale = () => {
    setIsModaleOuverte(true)
  }

  const fermeModale = () => {
    setIsModaleOuverte(false)
  }

  //? version serveur distant
  useEffect(() =>{

    const getProduits = async () => {
      
      const produitsServeur = await fetchProduits()
      setProduits(produitsServeur)
    }
    
    getProduits()
  }, [])

  const fetchProduits = async () => {

    //* fetch local fichier json direct
    // const res = await fetch("http://localhost:3000/data/test.json")

    //* fetch local fichier json sur webdev
    // const res = await fetch("https://e2296082.webdev.cmaisonneuve.qc.ca/tp2react/data/test.json")

    //* fetch via serveur déployé localement
    const res = await fetch("http://localhost:5000/produits")


    const data = await res.json()
    return data
    }




    //* suppression dans la variable produits générée sur le fetch local
    // const supprimerProduit = (id) => {

    //   setProduits(produits.filter((produit) => produit.id !== id))
    // }

    //* suppression d'un produit en fetch sur le serveur déployé localement
    const supprimerProduit = async (id) => {

      await fetch(`http://localhost:5000/produits/${id}`, {
        method: 'DELETE'
      })

      setProduits(produits.filter((produit) => produit.id !== id))
    }

    //* modification dans la variable produits générée sur le fetch local
    // const modifProduit = (produit) => {

    //   const produitAJour = produits.map((produitUnique) => {

    //     if(produitUnique.id === produit.id){

    //       return produit
    //     }

    //     return produitUnique
    //   })

    //   setProduits(produitAJour);
    // }

    //* modification d'un produit sur le serveur déployé localement
    const modifProduit = async (produit) => {

      const res = await fetch(`http://localhost:5000/produits/${produit.id}`,{
        method: 'PUT',
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify(produit)
      })

      const data = await res.json()

      setProduits(produits.map((item) => item.id === data.id ? {...item, ...data} : item))
    }

    //* ajout d'un produit dans la variable produits générée sur le fetch local
    // const ajoutProduit = (nouveauProduit) => {

    //   setProduits([...produits, nouveauProduit])
    //   fermeModale()
    // }

    //* ajout d'un produit sur le serveur déployé localement
    const ajoutProduit = async (nouveauProduit) => {

      const res = await fetch('http://localhost:5000/produits', {
        method: 'POST',
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify(nouveauProduit)
      })

      const retourProduit = await res.json()

      setProduits([...produits, retourProduit])
      fermeModale()
    }

  return (
    <BrowserRouter>
      <div className="App">
          <Routes>
            <Route path="/tp2react" element={[<Header/>, <Footer/>]}></Route>
          </Routes>
          <Routes>
            <Route path="/" element={[<Header/>, <Footer/>]}></Route>
          </Routes>
            {produits.length > 0 ?(
            <Routes>
              <Route path="/produits" element={[<Header titre="liste des produits disponibles"/>,<button onClick={ouvreModale}>Ajouter un produit</button>,<ProduitsTotaux produits={produits} deleteProduits={supprimerProduit} modifProduit={modifProduit}/>, <Footer/>]}></Route>
              </Routes>
              ):(
                <Routes>
                  <Route path="/produits" element={[<Header titre="liste des produits indisponibles"/>,<button onClick={ouvreModale}>Ajouter un produit</button>,<p className="non-disponible">aucun produit à afficher</p>, <Footer/>]}></Route>
                </Routes>
              )
            }
          {/* </Routes> */}
          {isModaleOuverte && (
          <BoiteModale isOpen={isModaleOuverte} onClose={fermeModale} onAdd={ajoutProduit} />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
