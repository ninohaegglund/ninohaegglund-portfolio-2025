export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {year} Nino Hägglund — Portfolio All rights reserved.</p>
        <ul className="footer-links">

        </ul>
      </div>
    </footer>
  )
}