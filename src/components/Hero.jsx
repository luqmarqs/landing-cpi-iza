function Hero({
  heroImage,
  heroImageMobile,
  heroTitle,
  heroSubtitle,
  signaturesCount,
  onSignClick,
  onShare,
  backgroundColor,
  counterLabel,
  ctaButtonText,
  whatsappButtonText,
}) {
  return (
    <section className="hero" aria-label="Hero da campanha" style={{ backgroundColor }}>
      <picture>
        <source media="(max-width: 768px)" srcSet={heroImageMobile} />
        <img src={heroImage} alt={heroTitle} className="hero-image" />
      </picture>

      <div className="hero-overlay">
        <div className="container hero-content">
          <h1>{heroTitle}</h1>
          <p className="subtitle">{heroSubtitle}</p>

          <div className="hero-actions">
            <div className="counter">
              <strong>{signaturesCount.toLocaleString('pt-BR')} {counterLabel}</strong>
            </div>

            <a
              href="#assinar"
              className="cta glow"
              onClick={(event) => {
                event.preventDefault()
                onSignClick()
              }}
            >
              {ctaButtonText}
            </a>

            <button type="button" className="cta whatsapp glow" onClick={onShare}>
              {whatsappButtonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero