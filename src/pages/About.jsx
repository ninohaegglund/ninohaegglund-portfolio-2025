import './pages.css'

export default function About() {
  return (
    <section className="section">
      <div className="container">
        <header className="page-header">
          <h1 className="page-title">About</h1>
          <p className="page-subtitle">A bit about who I am and how I work.</p>
        </header>

        <p>
          I recently completed my .NET web development studies in Stockholm, focusing on C#, ASP.NET Core, MVC,
          and modern frontend technologies. I enjoy building both full-stack applications and well-structured backend
          systems. My experience also includes working with React, Tailwind CSS, and Unity for 2D game development.
          In addition, I’ve worked with cloud deployment using Azure, implemented CI/CD pipelines, and gained
          hands-on experience with CMS platforms like Umbraco and Optimizely.
        </p>

        <p>
          I’m driven by clean code, problem-solving, and continuous learning — especially through real-world
          projects. I’m now looking for a junior .NET developer role where I can contribute to meaningful
          development work, grow as a developer, and collaborate with experienced professionals.
        </p>
      </div>
    </section>
  )
}