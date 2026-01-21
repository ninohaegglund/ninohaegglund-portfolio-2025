import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import CustomCursor from './components/CustomCursor.jsx'

export default function App() {
  return (
    <div className="app">
      <CustomCursor />
      <Navbar />
      <main className="main">
        <Home />
      </main>
      <Footer />
    </div>
  )
}