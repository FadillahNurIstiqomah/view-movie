import React, {useState} from "react"
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from "react-router-dom"

const HeaderNavbar = () => {
    const [search, setSearch] = useState([])
    const navigate = useNavigate()


    const submit = (e) => {
        navigate(`/search/${search}`)
    }

    return(
        <div>
            <div className="nav-area">
                <nav className="navbar navbar-expand-lg text-white bg-transparant">
                    <a className="navbar-brand" href='https://movielist-react.vercel.app/'><img src='https://movielist-react-app.netlify.app/static/media/Logo.eeba5c17ddf85f2145e83dd963662921.svg' alt=""/></a>
                    <div className="search_group">
                        <input 
                            className="form-control me-2 search-bar" 
                            type="text"
                            value={search.name} 
                            placeholder="What do you want to watch?" 
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <FontAwesomeIcon onClick={submit} icon={faSearch} className='icon-search'/>
                    </div>
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