import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        <p>Contact us: +234 903 237 3430 Gidalo &copy; {currentYear}</p>

                        <a 
                            href="https://wa.me/message/NZPNDMFH4CE7M1" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn btn-success"
                        >
                            <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp Us
                        </a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;

