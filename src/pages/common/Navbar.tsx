import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../models/Category';

interface INavbar {
    categories: Category[];
}

const Navbar: React.FC<INavbar> = props => {

    const closeNavbar = () => { if (window.innerWidth < 992) (document.querySelector(".navbar-toggler") as HTMLElement).click() }

    const categories = (
        <li className="nav-item dropdown" key='catDropdown'>
            <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Categories
            </span>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {props.categories.map(e => (
                    <Link className="dropdown-item" to={`/category/${e.id}`} key={`cat${e.id}`}
                        onClick={closeNavbar}>
                        {e.name}
                    </Link>))
                }
            <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to='/' onClick={closeNavbar}>
                    Newest
                </Link>
            </div>
        </li>
    );

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark boxrow header">
            <div className="container">
                <Link className="navbar-brand" to="/">Forum</Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">


                    <ul className="navbar-nav ml-auto">
                        {categories}
                        <Link to='/categories' className="nav-link" onClick={closeNavbar}>
                            Login
                        </Link>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
