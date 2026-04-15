import { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import InfoSection from '../components/InfoSection'
import FormSection from '../components/FormSection'
import PrivacySection from '../components/PrivacySection'
import Footer from '../components/Footer'
import landingConfig from '../config/landingConfig'

function Home() {
  const [assinaturas, setAssinaturas] = useState(900)
  const [target, setTarget] = useState(null)
  const [showPrivacy, setShowPrivacy] = useState(false)

  useEffect(() => {
    let frame
    let contador = assinaturas

    function animar() {
      setAssinaturas((prev) => {
        if (target !== null) {
          if (prev >= target) return target
          return prev + Math.ceil((target - prev) / 25)
        }

        contador += 0.2
        return Math.floor(contador)
      })

      frame = requestAnimationFrame(animar)
    }

    frame = requestAnimationFrame(animar)

    return () => cancelAnimationFrame(frame)
  }, [target])

  useEffect(() => {
    async function carregarAssinaturas() {
      try {
        const response = await fetch(landingConfig.counterReferenceUrl)
        const data = await response.json()

        setTarget(Number(data.assinaturas))
      } catch {
        console.log('Erro ao carregar contador')
      }
    }

    carregarAssinaturas()
  }, [])

  const scrollToForm = () => {
    document.getElementById('assinar')?.scrollIntoView({ behavior: 'smooth' })
  }

  const shareWhatsApp = () => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(landingConfig.whatsappText)

    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank')
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
        <Hero
          heroImage={landingConfig.heroImage}
          heroImageMobile={landingConfig.heroImageMobile}
          heroTitle={landingConfig.heroTitle}
          heroSubtitle={landingConfig.heroSubtitle}
          signaturesCount={assinaturas}
          onSignClick={scrollToForm}
          onShare={shareWhatsApp}
          backgroundColor={landingConfig.backgroundColors?.hero}
        />

        <InfoSection
          title={landingConfig.contentSection.title}
          text={landingConfig.contentSection.text}
          image={landingConfig.contentSection.image}
        />

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

      <PrivacySection
        isOpen={showPrivacy}
        privacyPolicy={landingConfig.privacyPolicy}
        onClose={() => setShowPrivacy(false)}
      />
    </div>
  )
}

export default Home