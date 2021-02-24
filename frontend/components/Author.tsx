import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function Author() {
    return (
        <div className="w-full flex flex-col text-center md:text-left md:flex-row shadow bg-white mt-10 mb-10 p-6">
            <div className="w-full md:w-1/5 flex justify-center md:justify-start pb-4">
                <img src="https://source.unsplash.com/collection/1346951/150x150?sig=1" width="150" height="150" className="rounded-full shadow h-32 w-32" alt="Avatar"/>
            </div>
            <div className="flex-1 flex flex-col justify-center md:justify-start">
                <p className="font-semibold text-2xl">David</p>
                <p className="pt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel neque non libero suscipit suscipit eu eu urna.</p>
                <div className="flex items-center justify-center md:justify-start text-2xl no-underline text-blue-800 pt-4">
                    <a className="pl-4" target="_blank" rel="noreferrer" href="http://www.facebook.com" title="Facebook"><FontAwesomeIcon icon={faFacebook} title="Facebook"/></a>
                    <a className="pl-4" target="_blank" rel="noreferrer" href="http://www.instagram.com" title="Instagram"><FontAwesomeIcon icon={faInstagram} title="Instagram"/></a>
                    <a className="pl-4" target="_blank" rel="noreferrer" href="http://www.twitter.com" title="Twitter"><FontAwesomeIcon icon={faTwitter} title="Twitter"/></a>
                    <a className="pl-4" target="_blank" rel="noreferrer" href="http://www.linkedin.com" title="Linkedin"><FontAwesomeIcon icon={faLinkedin} title="Linkedin"/></a>
                </div>
            </div>
        </div>
    );

}