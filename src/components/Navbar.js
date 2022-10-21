import React, {useState, useEffect} from "react"
import axios from "axios"
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faEnvelope, faUser} from '@fortawesome/free-solid-svg-icons'
import { useNavigate} from "react-router-dom"
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Button, Modal, Form, Input, Dropdown, Menu, Space } from 'antd'
import 'antd/dist/antd.css'
import Swal from 'sweetalert2'
import ava from '../img/profile_picture.png'

const HeaderNavbar = () => {
    const [search, setSearch] = useState([])
    const navigate = useNavigate()
    const [isLoginOpen, setisLoginOpen] = useState(false);
    const [isRegisterOpen, setisRegisterOpen] = useState(false);
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [passwordConf, setPasswordConf] = useState("");

    let token = localStorage.getItem("user")
    let image = localStorage.getItem("image")
    let first_name = localStorage.getItem("first_name")
  
    // Login
    const showLogin = () =>setisLoginOpen(true);
    const handleCancelLogin = () => setisLoginOpen(false);
    const handleSubmitLogin = async () => {
        try {
            const res = await axios.post("https://notflixtv.herokuapp.com/api/v1/users/login",
            {
                email: email,
                password: password,
            });
            setUser(res.data.data);
            localStorage.setItem("login_data", JSON.stringify(res.data.data));
            localStorage.setItem("user", JSON.stringify(res.data.data.token));
            localStorage.setItem("image", JSON.stringify(res.data.data.image));
            localStorage.setItem("first_name", JSON.stringify(res.data.data.first_name));
            setEmail("");
            setPassword("");
            setisLoginOpen(false);
            setLogin(true);
            Swal.fire("Horeee!", "Login Berhasil!", "success")
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Email atau Password Salah!"
            })
        }
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
        try {
            const res = await axios.post("https://notflixtv.herokuapp.com/api/v1/users",
            {
                first_name: firstname,
                last_name: lastname,
                email: email,
                password: password,
                password_confirmation: passwordConf,
            });
            setisRegisterOpen(false);
            Swal.fire("Horeee!", "Registrasi Berhasil!", "success")
            setisLoginOpen(true);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Kamu sudah pernah registrasi!"
            })
        }
    };

    //Dropdown Menu
    const menu = (
        <Menu
            style={{width: '10rem', marginLeft:'15rem'}}
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
    }

    //Keep Login
    useEffect(() => {
        setLogin(JSON.parse(localStorage.getItem("login_data")));
        setLogin(true);
        const user = JSON.parse(localStorage.getItem("login_data"));
        setUser(user);
    }, [login]);

    return(
    <GoogleOAuthProvider clientId='1088647031321-7t974eqjek1n0tjthtgmipfmjngkq451.apps.googleusercontent.com'>
        <div>
            <div className="nav-area">
                <nav className="navbar navbar-expand-lg text-white bg-transparant">
                    {/* Logo */}
                    <a className="navbar-brand" href='https://movielist-react.vercel.app/'><img src='https://movielist-react-app.netlify.app/static/media/Logo.eeba5c17ddf85f2145e83dd963662921.svg' alt=""/></a>
                    
                    {/* Search */}
                    <div className="search_group">
                        <input 
                            className="search-bar" 
                            type="text"
                            value={search.name} 
                            placeholder="What do you want to watch?" 
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <FontAwesomeIcon onClick={submit} icon={faSearch} className='icon-search'/>
                    </div>

                    {/* After Login */}
                    {token && login && token.length ? (
                        <Dropdown overlay={menu} trigger={['click']}>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <div className="navbar-changed" style={{display: 'flex', gap: '1rem'}}>
                                        {user.image ? (
                                            <img
                                                src={JSON.parse(image)}
                                                alt=""
                                                className="img-ava"
                                            />
                                        ): (
                                            <img src={ava} alt="" className="img-ava"/>
                                        )}

                                        <h2 className="text-white name-ava">
                                            {JSON.parse(first_name) || JSON.parse(user.first_name)}
                                            {/* {JSON.parse(last_name)} */}
                                        </h2>
                                    </div>
                            </Space>
                            </a>
                        </Dropdown>
                    ) : (
                    // Login
                    <div className="navbar-right">
                        <button className='button-login' onClick={showLogin}>Login</button>
                        <Modal
                            open={isLoginOpen}
                            title="Log In to Your Account"
                            onCancel={handleCancelLogin}
                            footer={[
                                <div className="login_modal">
                                    <Button 
                                    htmlType="submit" 
                                    className="login-form-button text-white"
                                    style={{backgroundColor:'#e7394b', marginRight:'26rem', borderRadius: '30px', alignContent: 'center'}}
                                    onClick={handleSubmitLogin}
                                    >
                                    Login
                                    </Button>
                                    <div className="google_login">
                                        <GoogleLogin
                                            onSuccess={credentialResponse => {
                                                localStorage.setItem("login_data", JSON.stringify(credentialResponse));
                                                localStorage.setItem("user", JSON.stringify(credentialResponse.credential));
                                                localStorage.setItem("image", JSON.stringify(''));
                                                localStorage.setItem("first_name", JSON.stringify('Google User'));
                                                setisLoginOpen(false);
                                                setLogin(true);
                                                setUser(credentialResponse);
                                                Swal.fire("Horeee!", "Login Berhasil!", "success")
                                            }}
                                            onError={() => {
                                                console.log('Login Failed');
                                            }}
                                        />
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
                        <button className='button-reg' onClick={showRegister}>Register</button>
                        <Modal
                            open={isRegisterOpen}
                            title="Create Account"
                            onCancel={handleCancelRegister}
                            footer={[
                            <Button 
                                key="submit" 
                                style={{backgroundColor:'#e7394b', marginRight:'23rem', marginBottom:'1rem',borderRadius: '30px'}}
                                className='text-white'
                                onClick={handleSubmitRegister}
                            >
                            Register Now
                            </Button>,
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
                                    name="firstname"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please input your firstname!',
                                    },
                                    ]}
                                >
                                    <Input 
                                        placeholder="First Name" 
                                        style={{borderRadius: '30px'}}
                                        suffix={<FontAwesomeIcon icon={faUser}/>}
                                        onChange={(e) => setFirstname(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="lastname"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please input your lastname!',
                                    },
                                    ]}
                                >
                                    <Input 
                                        placeholder="Last Name" 
                                        style={{borderRadius: '30px'}}
                                        suffix={<FontAwesomeIcon icon={faUser}/>}
                                        onChange={(e) => setLastname(e.target.value)}
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
                                <Form.Item
                                    name="confirm"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                        },
                                    }),
                                    ]}
                                >
                                    <Input.Password placeholder="Confirm Password" style={{borderRadius: '30px'}} onChange={(e) => setPasswordConf(e.target.value)}/>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                    )}
                </nav>
            </div>
        </div>
    </GoogleOAuthProvider>
    )
}
export default HeaderNavbar;