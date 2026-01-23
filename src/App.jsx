import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import AnimatedBackground from './components/AnimatedBackground.jsx'

export default function App() {
  return (
    <div className="app">
      <AnimatedBackground fullScreen gridSize={80} intensity={1} />
      <div className="app-content">
        <Navbar />
        <main className="main">
          <Home />
        </main>
        <Footer />
      </div>
    </div>
  )
}