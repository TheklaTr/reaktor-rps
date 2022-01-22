import { Container } from 'react-bootstrap'
import CurrentGame from './components/CurrentGame'
import Footer from './components/Footer'
import Header from './components/Header'
import Stats from './components/Stats'

const App = () => {
   return (
      <Container style={{ textAlign: 'center' }}>
         <Header />
         <br />
         <CurrentGame />
         <br />
         <Stats />
         <br />
         <br />
         <br />
         <Footer />
      </Container>
   )
}

export default App
