import { useEffect, useState } from 'react'
import Fuse from 'fuse.js'
import cidadesBR from '../data/cidadesBR.json'
import { submitFormData } from '../utils/formSubmission'

function FormSection({ formIntegration, formCheckboxText, onShare, onOpenPrivacy }) {
  const [form, setForm] = useState({
    nome: '',
    nascimento: '',
    whatsapp: '',
    email: '',
    uf: '',
    cidade: '',
    lgpd: false,
  })

  const [telefoneErro, setTelefoneErro] = useState('')
  const [emailErro, setEmailErro] = useState('')
  const [cidadeErro, setCidadeErro] = useState('')
  const [cidadeBusca, setCidadeBusca] = useState('')
  const [cidadesFiltradas, setCidadesFiltradas] = useState([])
  const [fuse, setFuse] = useState(null)
  const [ufs, setUfs] = useState([])
  const [cidades, setCidades] = useState([])

  const normalizar = (texto) =>
    texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
      .then((res) => res.json())
      .then((data) => setUfs(data))
  }, [])

  useEffect(() => {
    setCidadeBusca('')
    setCidadesFiltradas([])
    setCidadeErro('')
    setForm((currentForm) => ({ ...currentForm, cidade: '' }))
  }, [form.uf])

  useEffect(() => {
    if (!form.uf) {
      setCidades([])
      setFuse(null)
      return
    }

    const cidadesFiltradasUF = cidadesBR.filter((cidade) => cidade.uf === form.uf)
    const cidadesPreparadas = cidadesFiltradasUF.map((cidade) => ({
      ...cidade,
      nomeBusca: normalizar(cidade.nome),
    }))

    setCidades(cidadesPreparadas)
    setFuse(
      new Fuse(cidadesPreparadas, {
        keys: ['nomeBusca'],
        threshold: 0.3,
        ignoreLocation: true,
      }),
    )
  }, [form.uf])

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

    if (!validarTelefoneBR(form.whatsapp)) {
      window.alert('Telefone invalido')
      return
    }

    if (!validarCidade(form.cidade)) {
      window.alert('Selecione uma cidade valida.')
      return
    }

    if (!form.lgpd) {
      window.alert('Voce precisa aceitar a politica de privacidade.')
      return
    }

    await submitFormData(formIntegration, form)

    setForm({
      nome: '',
      nascimento: '',
      whatsapp: '',
      email: '',
      uf: '',
      cidade: '',
      lgpd: false,
    })
    setCidadeBusca('')
    setCidadesFiltradas([])
    setTelefoneErro('')
    setEmailErro('')
    setCidadeErro('')

    if (
      window.confirm(
        'Assinatura registrada com sucesso!\n\nDeseja compartilhar este abaixo-assinado no WhatsApp?',
      )
    ) {
      onShare()
    }
  }

  return (
    <>
      <section id="assinar" className="form-section">
        <div className="container">
          <div className="form-card">
            <h2>Junte-se a esse movimento</h2>

            <form onSubmit={handleSubmit}>
              <input
                name="nome"
                placeholder="Nome completo"
                value={form.nome}
                onChange={(event) => setForm({ ...form, nome: event.target.value })}
                required
              />

              <label className="date-label">
                <span className="date-icon">📅</span>
                Data de nascimento
              </label>

              <input
                type="date"
                name="nascimento"
                value={form.nascimento}
                onChange={(event) =>
                  setForm({ ...form, nascimento: event.target.value })
                }
                required
              />

              <input
                name="whatsapp"
                placeholder="WhatsApp"
                value={form.whatsapp}
                inputMode="numeric"
                autoComplete="tel"
                onChange={(event) => {
                  const masked = formatPhone(event.target.value)
                  const numero = masked.replace(/\D/g, '')

                  setForm({ ...form, whatsapp: masked })

                  if (numero.length > 0 && numero.length < 10) {
                    setTelefoneErro('Telefone incompleto')
                    return
                  }

                  if (numero.length === 10 || numero.length === 11) {
                    if (!validarTelefoneBR(masked)) {
                      setTelefoneErro('Telefone invalido')
                    } else {
                      setTelefoneErro('')
                    }
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
                placeholder="E-mail"
                value={form.email}
                autoComplete="email"
                onInput={(event) => {
                  const value = event.target.value

                  setForm({ ...form, email: value })

                  if (value.length > 3) {
                    if (!validarEmail(value)) {
                      setEmailErro('E-mail invalido')
                    } else {
                      setEmailErro('')
                    }
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
                <option value="">Estado</option>

                {ufs.map((uf) => (
                  <option key={uf.id} value={uf.sigla}>
                    {uf.nome}
                  </option>
                ))}
              </select>

              <div className="cidade-field">
                <input
                  placeholder="Cidade"
                  value={cidadeBusca}
                  autoComplete="off"
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

                      if (!existe) {
                        setCidadeErro('Selecione uma cidade valida')
                      } else {
                        setCidadeErro('')
                        setCidadesFiltradas([])
                      }
                    } else {
                      setCidadeErro('')
                    }
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      setCidadesFiltradas([])
                    }
                  }}
                  required
                />

                {cidadeErro && <p className="field-error">{cidadeErro}</p>}

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
                  onChange={(event) => setForm({ ...form, lgpd: event.target.checked })}
                />

                <span>
                  {formCheckboxText}{' '}
                  <span className="privacy-link" onClick={onOpenPrivacy}>
                    politica de privacidade
                  </span>
                </span>
              </label>

              <button type="submit" className="glow form-submit">
                Assine
              </button>

              <button
                type="button"
                className="whatsapp-share glow"
                onClick={onShare}
              >
                Compartilhar no WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default FormSection