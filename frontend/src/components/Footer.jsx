import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    const currentYear = new Date().getFullYear()
  return (
    <footer>
        <Container>
            <Row>
                <Col className='text-center py-3'>
                    <p>Contact us: +234 903 237 3430<br></br>Gidalo &copy; {currentYear}</p>
                </Col>
            </Row>
        </Container>
    </footer>
    
  )
}

export default Footer