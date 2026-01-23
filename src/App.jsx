import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <Home />
      </main>
      <Footer />
    </div>
  )
}