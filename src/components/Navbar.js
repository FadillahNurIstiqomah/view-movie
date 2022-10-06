import React from "react"
import '../App.css'

const HeaderNavbar = () => {
    return(
        <div>
            <div className="nav-area">
                <nav className="navbar navbar-expand-lg text-white bg-transparant">
                    <a className="navbar-brand" href='https://www.youtube.com/watch?v=aWzlQ2N6qqg'><img src='https://movielist-react-app.netlify.app/static/media/Logo.eeba5c17ddf85f2145e83dd963662921.svg' alt=""/></a>
                    <form>
                    <input 
                        className="form-control me-2 search-bar" 
                        type="search" 
                        placeholder="What do you want to watch?" 
                        aria-label="Search"
                        // onChange={searchBar}
                    />
                    {/* <FontAwesomeIcon icon={faSearch}/> */}
                    </form>
                    <div className="navbar-right">
                    <button className='button-login'>Login</button>
                    <button className='button-reg'>Register</button>
                    </div>
                </nav>
            </div>
        </div>
    )
}
export default HeaderNavbar;