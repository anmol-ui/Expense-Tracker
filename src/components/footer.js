import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook,faTwitter,faLinkedin,faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer(){

    return(
        <footer class="footer-distributed">

			<div class="footer-right">

				<a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
				<a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
				<a href="#"><FontAwesomeIcon icon={faLinkedin} /></a>
				<a href="#"><FontAwesomeIcon icon={faGithub} /></a>

			</div>

			<div class="footer-left">

				<p class="footer-links">
					<a style={{marginLeft:'0'}} class="link-1" href="#">Home</a>

					<a href="#">Blog</a>

					<a href="#">Pricing</a>

					<a href="#">About</a>

					<a href="#">Faq</a>

					<a href="#">Contact</a>
				</p>

				<p>Expense Tracker &copy; 2022</p>
			</div>

		</footer>
    );
}

export default Footer;