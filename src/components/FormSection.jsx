import { useEffect, useState } from 'react'
import Fuse from 'fuse.js'
import { submitFormData } from '../utils/formSubmission'
import landingConfig from '../config/landingConfig'

// Fora do componente — criada uma única vez, não em cada render
const normalizar = (texto) =>
  texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

const formatDateInput = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

const validarData = (display) => {
  if (display.length < 10) return false
  const [d, m, y] = display.split('/').map(Number)
  if (!d || !m || !y || y < 1900) return false
  const date = new Date(y, m - 1, d)
  return (
    date.getDate() === d &&
    date.getMonth() === m - 1 &&
    date.getFullYear() === y &&
    date <= new Date()
  )
}

const toISODate = (display) => {
  const [d, m, y] = display.split('/')
  return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`
}

function FormSection({ formIntegration, formCheckboxText, onShare, onOpenPrivacy }) {
  const [form, setForm] = useState({
    nome: '',
    nascimento: '',
    whatsapp: '',
    email: '',
    uf: '',
    cidade: '',
    lgpd: true,
  })

  const [telefoneErro, setTelefoneErro] = useState('')
  const [dataErro, setDataErro] = useState('')
  const [nascimentoDisplay, setNascimentoDisplay] = useState('')
  const [emailErro, setEmailErro] = useState('')
  const [cidadeErro, setCidadeErro] = useState('')
  const [lgpdErro, setLgpdErro] = useState('')
  const [submitErro, setSubmitErro] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [cidadeBusca, setCidadeBusca] = useState('')
  const [cidadesFiltradas, setCidadesFiltradas] = useState([])
  const [fuse, setFuse] = useState(null)

  const [ufs, setUfs] = useState([])
  const [ufsErro, setUfsErro] = useState(false)

  const [cidades, setCidades] = useState([])
  const [cidadesCarregando, setCidadesCarregando] = useState(false)
  const [cidadesErro, setCidadesErro] = useState(false)

  // Carrega estados via IBGE com timeout
  useEffect(() => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome', {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => setUfs(data))
      .catch((err) => {
        if (err.name !== 'AbortError') setUfsErro(true)
      })
      .finally(() => clearTimeout(timeout))

    return () => {
      clearTimeout(timeout)
      controller.abort()
    }
  }, [])

  // Carrega cidades via IBGE quando UF muda — com reset, timeout e feedback de erro
  useEffect(() => {
    setCidadeBusca('')
    setCidadesFiltradas([])
    setCidadeErro('')
    setCidades([])
    setFuse(null)
    setCidadesErro(false)
    setForm((f) => ({ ...f, cidade: '' }))

    if (!form.uf) return

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)
    setCidadesCarregando(true)

    fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${form.uf}/municipios?orderBy=nome`,
      { signal: controller.signal },
    )
      .then((res) => res.json())
      .then((data) => {
        const preparadas = data.map((c) => ({
          id: c.id,
          nome: c.nome,
          uf: form.uf,
          nomeBusca: normalizar(c.nome),
        }))
        setCidades(preparadas)
        setFuse(
          new Fuse(preparadas, {
            keys: ['nomeBusca'],
            threshold: 0.3,
            ignoreLocation: true,
          }),
        )
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setCidadesErro(true)
      })
      .finally(() => {
        clearTimeout(timeout)
        setCidadesCarregando(false)
      })

    return () => {
      clearTimeout(timeout)
      controller.abort()
    }
  }, [form.uf])

  // Filtra cidades com Fuse conforme busca
  useEffect(() => {
    if (!fuse || cidadeBusca.length < 2) {
      setCidadesFiltradas([])
      return
    }

    const termo = normalizar(cidadeBusca)
    const resultado = fuse.search(termo).slice(0, 6).map((result) => result.item)

    if (resultado.length === 1 && normalizar(resultado[0].nome) === termo) {
      setCidadesFiltradas([])
      return
    }

    setCidadesFiltradas(resultado)
  }, [cidadeBusca, fuse])

  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 11)
    if (digits.length <= 2) return digits
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    if (digits.length <= 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
    }
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  }

  const validarTelefoneBR = (telefone) => {
    const numero = telefone.replace(/\D/g, '')
    if (numero.length !== 10 && numero.length !== 11) return false
    if (/^(\d)\1+$/.test(numero)) return false
    const ddd = parseInt(numero.substring(0, 2), 10)
    if (ddd < 11 || ddd > 99) return false
    if (numero.length === 11 && numero[2] !== '9') return false
    if (numero.length === 10) {
      const primeiro = parseInt(numero[2], 10)
      if (primeiro < 2 || primeiro > 5) return false
    }
    return true
  }

  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const validarCidade = (cidade) => {
    if (!cidade) return false
    const termo = normalizar(cidade)
    return cidades.some((item) => normalizar(item.nome) === termo)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSubmitting) return

    // Validações inline — sem window.alert
    if (!validarTelefoneBR(form.whatsapp)) {
      setTelefoneErro(landingConfig.formValidation.telefoneInvalido)
      return
    }
    if (!validarCidade(form.cidade)) {
      setCidadeErro(landingConfig.formValidation.cidadeInvalida)
      return
    }
    if (!form.lgpd) {
      setLgpdErro(landingConfig.formValidation.lgpdRequired)
      return
    }

    setIsSubmitting(true)
    setSubmitErro('')

    try {
      await submitFormData(formIntegration, form)

      // Reset apenas em caso de sucesso real
      setForm({ nome: '', nascimento: '', whatsapp: '', email: '', uf: '', cidade: '', lgpd: true })
      setNascimentoDisplay('')
      setCidadeBusca('')
      setCidadesFiltradas([])
      setTelefoneErro('')
      setDataErro('')
      setEmailErro('')
      setCidadeErro('')
      setLgpdErro('')

      if (window.confirm(landingConfig.formSection.successMessage)) {
        onShare()
      }
    } catch {
      setSubmitErro('Erro ao enviar. Verifique sua conexão e tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <section id="assinar" className="form-section">
        <div className="container">
          <div className="form-card">
            <h2>{landingConfig.formSection.title}</h2>

            <form onSubmit={handleSubmit}>
              <input
                name="nome"
                placeholder={landingConfig.formFields.nome.placeholder}
                value={form.nome}
                onChange={(event) => setForm({ ...form, nome: event.target.value })}
                required
              />

              <label className="date-label">
                <span className="date-icon">{landingConfig.formFields.nascimento.icon}</span>
                {landingConfig.formFields.nascimento.label}
              </label>

              <input
                type="text"
                name="nascimento"
                placeholder="DD/MM/AAAA"
                value={nascimentoDisplay}
                inputMode="numeric"
                maxLength={10}
                onChange={(event) => {
                  const formatted = formatDateInput(event.target.value)
                  setNascimentoDisplay(formatted)
                  if (formatted.length === 10) {
                    if (validarData(formatted)) {
                      setForm({ ...form, nascimento: toISODate(formatted) })
                      setDataErro('')
                    } else {
                      setForm({ ...form, nascimento: '' })
                      setDataErro('Data inválida')
                    }
                  } else {
                    setForm({ ...form, nascimento: '' })
                    setDataErro('')
                  }
                }}
                required
              />
              {dataErro && <p className="field-error">{dataErro}</p>}

              <input
                name="whatsapp"
                placeholder={landingConfig.formFields.whatsapp.placeholder}
                value={form.whatsapp}
                inputMode="numeric"
                autoComplete="tel"
                onChange={(event) => {
                  const masked = formatPhone(event.target.value)
                  const numero = masked.replace(/\D/g, '')

                  setForm({ ...form, whatsapp: masked })

                  if (numero.length > 0 && numero.length < 10) {
                    setTelefoneErro(landingConfig.formValidation.telefoneIncompleto)
                    return
                  }
                  if (numero.length === 10 || numero.length === 11) {
                    setTelefoneErro(
                      validarTelefoneBR(masked) ? '' : landingConfig.formValidation.telefoneInvalido,
                    )
                  } else {
                    setTelefoneErro('')
                  }
                }}
                required
              />
              {telefoneErro && <p className="field-error">{telefoneErro}</p>}

              <input
                type="email"
                name="email"
                placeholder={landingConfig.formFields.email.placeholder}
                value={form.email}
                autoComplete="email"
                onChange={(event) => {
                  const value = event.target.value
                  setForm({ ...form, email: value })
                  if (value.length > 3) {
                    setEmailErro(validarEmail(value) ? '' : landingConfig.formValidation.emailInvalido)
                  } else {
                    setEmailErro('')
                  }
                }}
                required
              />
              {emailErro && <p className="field-error">{emailErro}</p>}

              <select
                value={form.uf}
                onChange={(event) => setForm({ ...form, uf: event.target.value })}
                required
              >
                <option value="">{landingConfig.formFields.uf.placeholder}</option>
                {ufs.map((uf) => (
                  <option key={uf.id} value={uf.sigla}>
                    {uf.nome}
                  </option>
                ))}
              </select>
              {ufsErro && (
                <p className="field-error">
                  Não foi possível carregar os estados. Recarregue a página.
                </p>
              )}

              <div className="cidade-field">
                <input
                  placeholder={
                    cidadesCarregando
                      ? 'Carregando cidades...'
                      : !form.uf
                        ? 'Selecione um estado primeiro'
                        : landingConfig.formFields.cidade.placeholder
                  }
                  value={cidadeBusca}
                  autoComplete="off"
                  disabled={!form.uf || cidadesCarregando}
                  onClick={(event) => event.stopPropagation()}
                  onBlur={() => setTimeout(() => setCidadesFiltradas([]), 150)}
                  onChange={(event) => {
                    const value = event.target.value
                    setCidadeBusca(value)
                    setForm({ ...form, cidade: value })

                    if (value.length > 2) {
                      const existe = cidades.some(
                        (cidade) => normalizar(cidade.nome) === normalizar(value),
                      )
                      setCidadeErro(existe ? '' : landingConfig.formValidation.cidadeInvalida)
                      if (existe) setCidadesFiltradas([])
                    } else {
                      setCidadeErro('')
                    }
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') setCidadesFiltradas([])
                  }}
                  required
                />

                {cidadeErro && <p className="field-error">{cidadeErro}</p>}
                {cidadesErro && (
                  <p className="field-error">
                    Não foi possível carregar as cidades. Tente novamente.
                  </p>
                )}

                {cidadesFiltradas.length > 0 && (
                  <div
                    className="cidade-sugestoes"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {cidadesFiltradas.map((cidade, index) => (
                      <div
                        key={cidade.id || cidade.nome || index}
                        className="cidade-item"
                        onMouseDown={() => {
                          setForm({ ...form, cidade: cidade.nome })
                          setCidadeBusca(cidade.nome)
                          setCidadeErro('')
                          setCidadesFiltradas([])
                        }}
                      >
                        {cidade.nome}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <label className="lgpd">
                <input
                  type="checkbox"
                  name="lgpd"
                  checked={form.lgpd}
                  onChange={(event) => {
                    setForm({ ...form, lgpd: event.target.checked })
                    if (event.target.checked) setLgpdErro('')
                  }}
                />
                <span>
                  {formCheckboxText}{' '}
                  <button type="button" className="privacy-link" onClick={onOpenPrivacy}>
                    {landingConfig.formCheckboxLinkText}
                  </button>
                </span>
              </label>
              {lgpdErro && <p className="field-error">{lgpdErro}</p>}

              {submitErro && <p className="field-error">{submitErro}</p>}

              <button type="submit" className="glow form-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : landingConfig.formSection.ctaButtonText}
              </button>

              <button type="button" className="whatsapp-share glow" onClick={onShare}>
                {landingConfig.formSection.whatsappButtonText}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default FormSection
