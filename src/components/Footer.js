const Footer = () => {

    return (
        <footer className="mt-5">
            <div className="text-center footer_style" style={{backgroundColor: '#2b2b2a'}}>
                <div className="logo_socmed">
                    <a href='https://youtube.com/'><i className="fa-brands fa-youtube fa-lg"></i></a>
                    <a href='https://instagram.com/'><i className="fa-brands fa-instagram fa-lg"></i></a>
                    <a href='https://facebook.com/'><i className="fa-brands fa-facebook-square fa-lg"></i></a>
                    <a href='https://twitter.com/'><i className="fa-brands fa-twitter fa-lg"></i></a>
                </div>
                <div className="footer_text">
                    <a href="https://movielist-react.vercel.app/">Conditions of Use</a>
                    <a href="https://movielist-react.vercel.app/">Privacy & Policy</a>
                    <a href="https://movielist-react.vercel.app/">About Us</a>
                </div>
                <p className="mt-2 text-white">Copyright &copy; 2022 View. All Right Reserved.</p>
            </div>
        </footer>
    )
    
}

export default Footer;