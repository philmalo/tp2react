import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Header = ({titre}) => {

    return (
        <header className="header">
            <nav>
                <Link to="/">Accueil</Link>
                <Link to="/produits">Liste des items</Link>
            </nav>
            <picture><img src="./img/logo.jpeg" alt="logo du site"></img></picture>
            <h1>{titre}</h1>
        </header>
    )
}

Header.defaultProps = {
    titre : "Site de e-commerce"
}

Header.propTypes = {
    titre : PropTypes.string.isRequired
}
export default Header