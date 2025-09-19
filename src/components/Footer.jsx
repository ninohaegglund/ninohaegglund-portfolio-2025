export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {year} MySite. All rights reserved.</p>
        <ul className="footer-links">

        </ul>
      </div>
    </footer>
  )
}