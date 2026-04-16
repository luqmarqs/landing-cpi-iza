function InfoSection({ title, text }) {
  return (
    <section className="content-section">
      <div className="container content-grid">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
      </div>
    </section>
  )
}

export default InfoSection