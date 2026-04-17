import { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import InfoSection from '../components/InfoSection'
import FormSection from '../components/FormSection'
import PrivacySection from '../components/PrivacySection'
import Footer from '../components/Footer'
import landingConfig from '../config/landingConfig'

function Home() {
  const [assinaturas, setAssinaturas] = useState(400)
  const [target, setTarget] = useState(null)
  const [showPrivacy, setShowPrivacy] = useState(false)

  useEffect(() => {
    let frame
    let done = false
    let contador = assinaturas

    function animar() {
      if (done) return

      setAssinaturas((prev) => {
        if (target !== null) {
          if (prev >= target) {
            done = true
            return target
          }
          const incremento = Math.max(4, Math.round((target - prev) * 0.18))
          return Math.min(prev + incremento, target)
        }
        contador += 0.5
        return Math.floor(contador)
      })

      frame = requestAnimationFrame(animar)
    }

    frame = requestAnimationFrame(animar)

    return () => {
      done = true
      cancelAnimationFrame(frame)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])

  useEffect(() => {
    async function carregarAssinaturas() {
      try {
        const response = await fetch(landingConfig.counterReferenceUrl)
        const data = await response.json()

        setTarget(Number(data.assinaturas))
      } catch (err) {
        console.error('[Counter] Falha ao carregar assinaturas:', err)
      }
    }

    carregarAssinaturas()
  }, [])

  const scrollToForm = () => {
    document.getElementById('assinar')?.scrollIntoView({ behavior: 'smooth' })
  }

  const shareWhatsApp = () => {
    const fullText = `${landingConfig.whatsappText}\n${window.location.href}`
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(fullText)}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <div
      className="page"
      style={{
        '--page-bg-color': landingConfig.backgroundColors?.page,
        '--page-bg-image': `url(${landingConfig.backgroundImage})`,
      }}
    >
      <main>
        {/* SEÇÃO 1: HERO COM CHAMADA PRINCIPAL */}
        <Hero
          heroImage={landingConfig.heroImage}
          heroImageMobile={landingConfig.heroImageMobile}
          heroTitle={landingConfig.heroTitle}
          heroSubtitle={landingConfig.heroSubtitle}
          signaturesCount={assinaturas}
          onSignClick={scrollToForm}
          onShare={shareWhatsApp}
          backgroundColor={landingConfig.backgroundColors?.hero}
          counterLabel={landingConfig.counterLabel}
          ctaButtonText={landingConfig.heroActions.ctaButtonText}
          whatsappButtonText={landingConfig.heroActions.whatsappButtonText}
        />

        {/* SEÇÃO 2: CONTEXTO (PROBLEMA) */}
        <InfoSection
          title={landingConfig.contextSection.title}
          text={landingConfig.contextSection.text}
        />

        {/* SEÇÃO 3: 5 MOTIVOS (BLOCOS VISUAIS) */}
        <section className="reasons-section">
          <div className="container">
            <h2>{landingConfig.reasonsSection.title}</h2>
            <div className="reasons-grid">
              {landingConfig.reasons.map((reason, index) => (
                <div key={index} className="reason-card">
                  <div className="reason-icon">{reason.icon}</div>
                  <h3>{reason.title}</h3>
                  <p>{reason.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEÇÃO 4: REFORÇO (POR QUE A CPI É NECESSÁRIA) */}
        <section className="reinforcement-section">
          <div className="container">
            <h2>{landingConfig.reinforcementSection.title}</h2>
            <p className="reinforcement-text">{landingConfig.reinforcementSection.text}</p>
            <div className="highlights">
              {landingConfig.reinforcementSection.highlights.map((highlight, index) => (
                <div key={index} className="highlight-item">
                  {highlight}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEÇÃO 5: CTA FORTE ANTES DO FORMULÁRIO */}
        <section className="cta-section">
          <div className="container">
            <h2>{landingConfig.ctaSection.title}</h2>
            <p>{landingConfig.ctaSection.text}</p>
            <button
              className="cta cta-button"
              onClick={scrollToForm}
            >
              {landingConfig.ctaSection.buttonText}
            </button>
          </div>
        </section>

        {/* FORMULÁRIO */}
        <FormSection
          formIntegration={landingConfig.formIntegration}
          formCheckboxText={landingConfig.formCheckboxText}
          onShare={shareWhatsApp}
          onOpenPrivacy={() => setShowPrivacy(true)}
        />
      </main>

      <Footer
        logo={landingConfig.footer.logo}
        text={landingConfig.footer.text}
        instagram={landingConfig.footer.instagram}
        instagramLabel={landingConfig.footer.instagramLabel}
        onOpenPrivacy={() => setShowPrivacy(true)}
        backgroundColor={landingConfig.backgroundColors?.footer}
      />

      {/* BOTÃO FLUTUANTE WHATSAPP */}
      {landingConfig.whatsappContact?.number && (
        <a
          href={`https://wa.me/${landingConfig.whatsappContact.number}?text=${encodeURIComponent(landingConfig.whatsappContact.message)}`}
          className="whatsapp-float"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Fale conosco pelo WhatsApp"
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span>Fale conosco</span>
        </a>
      )}

      <PrivacySection
        isOpen={showPrivacy}
        privacyPolicy={landingConfig.privacyPolicy}
        onClose={() => setShowPrivacy(false)}
      />
    </div>
  )
}

export default Home