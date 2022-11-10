const Footer = () => {

    return (
        <footer className="mt-5">
            <div className="text-center footer_style" style={{backgroundColor: '#2b2b2a'}}>
                <div className="logo_socmed">
                    <a href='https://movielist-react.vercel.app/'><i className="fa-brands fa-youtube fa-lg"></i></a>
                    <a href='https://movielist-react.vercel.app/'><i className="fa-brands fa-instagram fa-lg"></i></a>
                    <a href='https://movielist-react.vercel.app/'><i className="fa-brands fa-facebook-square fa-lg"></i></a>
                    <a href='https://movielist-react.vercel.app/'><i className="fa-brands fa-twitter fa-lg"></i></a>
                </div>
                <div className="footer_text">
                    <a href="https://movielist-react.vercel.app/">Conditions of Use</a>
                    <a href="https://movielist-react.vercel.app/">Privacy & Policy</a>
                    <a href="https://movielist-react.vercel.app/">Press Room</a>
                </div>
                <p className="mt-2 text-white">Copyright &copy; 2022 MovieList. All Right Reserved.</p>
            </div>
        </footer>
    )
    
}

export default Footer;