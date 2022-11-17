import React from "react"
import HeaderNavbar from '../components/Navbar'
import Footer from '../components/Footer'
import Swal from 'sweetalert2'
import { useNavigate} from "react-router-dom"
import ava from '../img/profile_picture.png'

export default function Profile (){
    const navigate = useNavigate()

    let image = localStorage.getItem("image")
    let displayName = localStorage.getItem("displayName")
    let email = localStorage.getItem("email")

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
            navigate(`/`)
              window.location.reload(1);
            }, 2000);
            localStorage.clear();
          } else if (result.isDenied) {
            Swal.fire("Log Out Failed!", "", "info");
          }
        });
    };

  return (
    <div style={{backgroundColor: '#171715'}}>
        <HeaderNavbar />
        <div className="card bg-dark profile">
            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/0ef67cc5-0aa7-47cf-87bd-7f595afc7cfb/ec167b0e-b99a-424f-8794-aba149ead9ab/ID-en-20221107-popsignuptwoweeks-perspective_alpha_website_large.jpg" className="card-img" alt="..."/>
            <div className="card card-profile card-img-overlay mx-auto my-auto">
                {image !== null ? (
                    <img
                        src={JSON.parse(image)}
                        alt=""
                        className="img-profile mx-auto"
                    />
                    ) : (
                    <img src={ava} alt="" className="img-ava"/>
                )}
                <h5 className="card-title mx-auto mt-3">{JSON.parse(displayName)}</h5>
                <p className="card-text mx-auto">{JSON.parse(email)}</p>
                <button onClick={handleLogout} className="button-logout mx-auto"> Log Out</button>
            </div>
        </div>
        <Footer/>
    </div>
  );
}