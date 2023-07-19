import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook,faTwitter,faLinkedin,faGithub } from '@fortawesome/free-brands-svg-icons';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import About from '../pages/about';
import Contact from './contact';
import Blog from '../pages/blog';
import Faq from '../pages/faq';

function Footer(){

    return(
        <footer class="footer-distributed">
			<Routes>
				<Route path="/blog" element={<Blog></Blog>} />
				<Route path="/about" element={<About></About>} />
				<Route path="/faq" element={<Faq></Faq>} />
				<Route path="/contact" element={<Contact></Contact>} />
			</Routes>
			<div class="footer-right">

				<a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
				<a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
				<a href="#"><FontAwesomeIcon icon={faLinkedin} /></a>
				<a href="#"><FontAwesomeIcon icon={faGithub} /></a>

			</div>

			<div class="footer-left">

				<p class="footer-links">
					<a style={{marginLeft:'0'}} class="link-1" href="/">Home</a>

					<Link to="/blog">Blog</Link>

					<Link to="">Pricing</Link>

					<Link to="/about">About</Link>

					<Link to="/faq">Faq</Link>

					<Link to="/contact">Contact</Link>
				</p>

				<p>Expense Tracker &copy; 2022</p>
			</div>

		</footer>
    );
}

export default Footer;