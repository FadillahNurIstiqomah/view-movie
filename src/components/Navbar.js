import React, {useState, useEffect} from "react"
import { useDispatch} from 'react-redux'
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faEnvelope, faUser} from '@fortawesome/free-solid-svg-icons'
import { useNavigate} from "react-router-dom"
import { Button, Modal, Form, Input} from 'antd'
import ava from '../img/profile_picture.png'
import 'antd/dist/antd.css'
import { getLogin } from "../stores/loginSlice"
import { getRegister } from "../stores/registerSlice"
import { getLoginGoogle } from "../stores/loginGoogleSlice"

const HeaderNavbar = () => {
    const [search, setSearch] = useState([])
    const [isLoginOpen, setisLoginOpen] = useState(false);
    const [isRegisterOpen, setisRegisterOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [login, setLogin] = useState(false);
    const [setUser] = useState();

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    let token = localStorage.getItem("user")
    let image = localStorage.getItem("image")


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
      setisRegisterOpen(false)
    };
    const handleCancelLogin = () => setisLoginOpen(false);
    const handleSubmitLogin = async () => {
        dispatch(getLogin({email, password}));
        setisLoginOpen(false)
        setLogin(true);
        setUser(JSON.parse(localStorage.getItem("login_data")));
    };

    // Register
    const showRegister = () => {
      setisRegisterOpen(true)
      setisLoginOpen(false)
    }
    const handleCancelRegister = () => setisRegisterOpen(false);
    const handleSubmitRegister = async () => {
        dispatch(getRegister({name, email, password}))
        setisRegisterOpen(false)
        setisLoginOpen(true);
    };

    //Search
    const submit = (e) => {
        navigate(`/search/${search}`)
        window.location.reload(1);
    }

    //Keep Login
    useEffect(() => {
        setLogin(JSON.parse(localStorage.getItem("login_data")));
        setLogin(true);
    }, [login]);

    return(
      <div>
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark p-3">
            <div className="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <button className="navbar-brand" onClick={() => navigate(`/`)} style={{color: 'red', fontSize: '1.5rem'}}><strong>VIEW</strong></button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                          <button className="nav-link nav-button active" aria-current="page" onClick={() => navigate(`/`)}>Home</button>
                      </li>
                      <li className="nav-item">
                          <button className="nav-link nav-button active" aria-current="page" onClick={() => navigate(`/genres`)}>Genres</button>
                      </li>
                  </ul>
                </div>
                <button className='button-search ml-6' onClick={showSearch}>
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
                {/* After Login */}
                {token && login && token.length ? (
                  <div style={{display: 'flex', gap: '1rem'}} onClick={() => navigate(`/profile`)}>
                    {image !== null ? (
                      <img
                        src={JSON.parse(image)}
                        alt=""
                        className="img-ava"
                      />
                      ) : (
                        <img src={ava} alt="" className="img-ava"/>
                      )}
                  </div>
                ) : (
                <div className='d-flex gap-2'>

                  <button className='button-login' onClick={showLogin}>Sign In</button>
                  <Modal
                    open={isLoginOpen}
                    title="Log In to Your Account"
                    onCancel={handleCancelLogin}
                    footer={[
                      <div>
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
                        <div className="register">
                          <h6>Create New Account?</h6>
                          <p className="btn-register" onClick={showRegister}>Register</p>
                        </div>
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

                  {/* Register */}
                  <Modal
                    open={isRegisterOpen}
                    title="Create Account"
                    onCancel={handleCancelRegister}
                    footer={[
                      <div>
                        <Button 
                          key="submit" 
                          style={{backgroundColor:'#e7394b', marginRight:'23rem', marginBottom:'1rem',borderRadius: '30px'}}
                          className='text-white'
                          onClick={handleSubmitRegister}
                        >
                          Register Now
                        </Button>
                        <div className="register">
                          <h6>Already have an account?</h6>
                          <p className="btn-register" onClick={showLogin}>Login</p>
                        </div>
                      </div>
                    ]}
                  >
                    <Form
                      name="basic"
                      wrapperCol={{span: 25}}
                      style={{marginBottom:'-2rem'}}
                    >
                      <Form.Item
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your firstname!',
                          },
                        ]}
                      >
                        <Input 
                          placeholder="Name" 
                          style={{borderRadius: '30px'}}
                          suffix={<FontAwesomeIcon icon={faUser}/>}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Form.Item>
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
                        hasFeedback
                      >
                        <Input.Password placeholder="Password" style={{borderRadius: '30px'}} onChange={(e) => setPassword(e.target.value)}/>
                      </Form.Item>
                    </Form>
                  </Modal>
                </div>
              )}
            </div>
        </nav>
      </div>
    )
}
export default HeaderNavbar;
