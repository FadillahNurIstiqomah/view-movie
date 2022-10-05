import React from "react"
import '../App.css'
import Homepage from "./Homepage"

const HeaderNavbar = () => {
    return(
        <div>
            <div className="nav-area">
                <nav class="navbar navbar-expand-lg text-white bg-transparant">
                    <a class="navbar-brand" href={Homepage}><img src='https://movielist-react-app.netlify.app/static/media/Logo.eeba5c17ddf85f2145e83dd963662921.svg' alt=""/></a>
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
                    {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button> */}
                    {/* <form class="form-inline my-2 my-lg-0 bg-transparant">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    </form> */}
                </nav>
            </div>
        </div>
    )
}
export default HeaderNavbar;