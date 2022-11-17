import React, {useState, useEffect} from "react"
import { useDispatch} from 'react-redux'
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faEnvelope, faUser, faUserCircle} from '@fortawesome/free-solid-svg-icons'
import { useNavigate} from "react-router-dom"
import { Button, Modal, Form, Input, Dropdown, Menu, Space } from 'antd'
import 'antd/dist/antd.css'
import Swal from 'sweetalert2'
// import ava from '../img/profile_picture.png'
// import logo from '../img/logo.png'
import { getLogin } from "../stores/loginSlice"
import { getRegister } from "../stores/registerSlice"
import { getLoginGoogle } from "../stores/loginGoogleSlice"

const HeaderNavbar = () => {
    const [search, setSearch] = useState([])
    const [isLoginOpen, setisLoginOpen] = useState(false);
    const [isRegisterOpen, setisRegisterOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [login, setLogin] = useState(false);
    const [user,setUser] = useState();
    // const [user,  setUser, loading, error] = useAuthState(auth);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    // const [lastname, setLastname] = useState("");
    // const [passwordConf, setPasswordConf] = useState("");

    let token = localStorage.getItem("user")
    let image = localStorage.getItem("image")
    let displayName = localStorage.getItem("displayName")


    //Modal Search
    const showSearch = () => {
      setSearchOpen(true)
      setisLoginOpen(false)
    };
    const handleCancel = () => {setSearchOpen(false)}

    //Login Google
    const signInWithGoogle = async () => {
        dispatch(getLoginGoogle())
        setisLoginOpen(false)
        setLogin(true);
        setUser(JSON.parse(localStorage.getItem("login_data")));
    }
    // Login
    const showLogin = () =>{
      setisLoginOpen(true)
      setSearchOpen(false)
    };
    const handleCancelLogin = () => setisLoginOpen(false);
    const handleSubmitLogin = async () => {
        dispatch(getLogin({email, password}));
        setisLoginOpen(false)
        setLogin(true);
        setUser(JSON.parse(localStorage.getItem("login_data")));
    };

    //Logout
    const handleLogout = () => {
        Swal.fire({
          title: "Do you want to Log Out?",
          showDenyButton: true,
          confirmButtonText: "Yes",
          denyButtonText: `No`,
        }).then((result) => {
          if (result.isConfirmed) {
            setTimeout(function () {
              window.location.reload(1);
            }, 2000);
            localStorage.clear();
          } else if (result.isDenied) {
            Swal.fire("Log Out Failed!", "", "info");
          }
        });
    };
    

    // Register
    const showRegister = () => setisRegisterOpen(true);
    const handleCancelRegister = () => setisRegisterOpen(false);
    const handleSubmitRegister = async () => {
        dispatch(getRegister({name, email, password}))
        setisRegisterOpen(false)
        setisLoginOpen(true);
    };

    //Dropdown Menu
    const menu = (
        <Menu
            style={{width: '8rem', marginLeft:'19rem'}}
          items={[
            {
              label: <a onClick={handleLogout}>Logout</a>,
              key: '0',
            },
          ]}
        />
    );

    //Search
    const submit = (e) => {
        navigate(`/search/${search}`)
        window.location.reload(1);
    }

    //Keep Login
    useEffect(() => {
        setLogin(JSON.parse(localStorage.getItem("login_data")));
        setLogin(true);
        const user = JSON.parse(localStorage.getItem("login_data"));
        // setUser(user);
    }, [login]);

    return(
      <div>
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark p-3">
            <div className="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <button className="navbar-brand nav-button" onClick={() => navigate(`/`)} style={{color: 'red', fontSize: '1.5rem'}}><strong>VIEW</strong></button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                          <button className="nav-link nav-button active" aria-current="page" onClick={() => navigate(`/`)}>Home</button>
                      </li>
                      <li className="nav-item">
                          <button className="nav-link nav-button active" aria-current="page">Genres</button>
                      </li>
                  </ul>
                </div>
                <div className='d-flex gap-2'>
                  <button className='button-search' onClick={showSearch}>
                    <i className='fa fa-search fa-lg'></i>
                  </button>
                  <Modal
                    open={searchOpen}
                    title="Search Movie"
                    onCancel={handleCancel}
                    footer={null}
                  >
                    <form className="search_group" onSubmit={submit}>
                        <input 
                            className="search-bar" 
                            type="text"
                            value={search.name} 
                            placeholder="What do you want to watch?" 
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <FontAwesomeIcon onClick={submit} icon={faSearch} className='icon-search'/>
                    </form>
                  </Modal>
                  {/* <a onClick={showLogin}>
                    <i className='fas fa-sharp fa-solid fa-circle-user fa-xl text-light mr-4'></i>
                  </a> */}
                  <button className='button-login' onClick={showLogin}><i className='fas fa-sharp fa-solid fa-circle-user fa-xl text-light'></i></button>
                  <Modal
                    open={isLoginOpen}
                    title="Log In to Your Account"
                    onCancel={handleCancelLogin}
                    footer={[
                      <div className="login_modal">
                          <Button
                            type="submit"
                            onClick={handleSubmitLogin}
                            htmlType="submit" 
                            className="login-form-button text-white"
                            style={{backgroundColor:'#e7394b', marginRight:'26rem', borderRadius: '30px', alignContent: 'center'}}
                          >
                            Login
                          </Button>
                          <Button
                            type="submit"
                            onClick={signInWithGoogle}
                            htmlType="submit" 
                            className="login-form-button text-white"
                            style={{backgroundColor:'#e7394b', marginLeft:'-25.5rem', borderRadius: '30px', alignContent: 'center'}}
                          >
                            Login with Google
                          </Button>
                      </div>
                    ]}
                  >
                    <Form
                      name="basic"
                      wrapperCol={{
                        span: 25,
                      }}
                      style={{marginBottom:'-2rem'}}
                    >
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                          },
                          {
                            required: true,
                            message: 'Please input your E-mail!',
                          },
                        ]}
                      >
                        <Input 
                          placeholder="Email Address" 
                          style={{borderRadius: '30px'}}
                          suffix={<FontAwesomeIcon icon={faEnvelope}/>}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Item>

                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your password!',
                          },
                        ]}
                      >
                        <Input.Password 
                          placeholder="Password" 
                          style={{borderRadius: '30px'}}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Form.Item>
                    </Form>
                  </Modal>
                </div>
            </div>
        </nav>
      </div>
    )
}
export default HeaderNavbar;
