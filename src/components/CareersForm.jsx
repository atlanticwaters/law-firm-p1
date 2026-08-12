import { useState } from 'react'
import { useFormSubmit } from '../hooks/useFormSubmit'

const EMPTY = { name: '', email: '', position: '', portfolioUrl: '', message: '', company: '' }

export default function CareersForm() {
  const [form, setForm] = useState(EMPTY)
  const { status, error, submit } = useFormSubmit('/api/inquiry')
  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
  const handleSubmit = async (e) => { e.preventDefault(); await submit({ type: 'careers', ...form }) }

  if (status === 'success') {
    return (
      <div className="form-success">
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: 'var(--space-sm)' }}>
          Application received.
        </p>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-light)' }}>
          A member of the firm will respond in due course.
        </p>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="c-name">Full Name</label>
        <input id="c-name" name="name" type="text" value={form.name} onChange={handleChange} required autoComplete="name" />
      </div>
      <div className="form-group">
        <label htmlFor="c-email">Email</label>
        <input id="c-email" name="email" type="email" value={form.email} onChange={handleChange} required autoComplete="email" />
      </div>
      <div className="form-group">
        <label htmlFor="c-position">Position of Interest</label>
        <input id="c-position" name="position" type="text" value={form.position} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="c-portfolio">Portfolio or Résumé URL</label>
        <input id="c-portfolio" name="portfolioUrl" type="url" value={form.portfolioUrl} onChange={handleChange} placeholder="https://" />
      </div>
      <div className="form-group">
        <label htmlFor="c-message">Message</label>
        <textarea id="c-message" name="message" value={form.message} onChange={handleChange} required />
      </div>
      <input type="text" name="company" value={form.company} onChange={handleChange}
        tabIndex={-1} autoComplete="off" aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }} />
      <button type="submit" className="form-submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Submitting' : 'Submit Application'}
      </button>
      {status === 'error' && <p className="form-error">{error}</p>}
    </form>
  )
}
