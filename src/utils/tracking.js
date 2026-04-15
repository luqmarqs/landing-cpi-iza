function injectScript(id, src, onLoad) {
  if (document.getElementById(id)) return

  const script = document.createElement('script')
  script.id = id
  script.async = true
  script.src = src

  if (onLoad) {
    script.onload = onLoad
  }

  document.head.appendChild(script)
}

function initGoogleAnalytics(googleAnalytics = {}) {
  const { enabled, measurementId } = googleAnalytics

  if (!enabled) return
  if (!measurementId) {
    console.warn('Google Analytics habilitado, mas measurementId nao foi informado.')
    return
  }

  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments) }

  injectScript(
    'ga-gtag-script',
    `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`,
    () => {
      window.gtag('js', new Date())
      window.gtag('config', measurementId)
    },
  )
}

function initMetaPixel(metaPixel = {}) {
  const { enabled, pixelId } = metaPixel

  if (!enabled) return
  if (!pixelId) {
    console.warn('Meta Pixel habilitado, mas pixelId nao foi informado.')
    return
  }

  if (!window.fbq) {
    const fbq = function fbqProxy() {
      if (fbq.callMethod) {
        fbq.callMethod.apply(fbq, arguments)
      } else {
        fbq.queue.push(arguments)
      }
    }

    fbq.push = fbq
    fbq.loaded = true
    fbq.version = '2.0'
    fbq.queue = []
    window.fbq = fbq
  }

  injectScript('meta-pixel-script', 'https://connect.facebook.net/en_US/fbevents.js')

  window.fbq('init', pixelId)
  window.fbq('track', 'PageView')
}

export function initTracking(analytics = {}) {
  if (window.__trackingInitialized) return
  window.__trackingInitialized = true

  initGoogleAnalytics(analytics.googleAnalytics)
  initMetaPixel(analytics.metaPixel)
}
