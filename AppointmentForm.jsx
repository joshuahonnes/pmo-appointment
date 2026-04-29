import React, { useState } from 'react'
import { APPOINTMENT_TYPES } from '../data/sampleData'
import styles from './AppointmentForm.module.css'

function genRef() {
  return 'APT-' + new Date().getFullYear() + '-' + (Math.floor(Math.random() * 9000) + 1000)
}

const REQUIRED = ['name', 'org', 'email', 'phone', 'date', 'time', 'type', 'purpose']

const INITIAL = {
  name: '', org: '', email: '', phone: '',
  date: '', time: '', type: '', delegates: '', purpose: '',
}

export default function AppointmentForm({ onSubmit }) {
  const [form, setForm]         = useState(INITIAL)
  const [errors, setErrors]     = useState({})
  const [confirmed, setConfirmed] = useState(null)

  function validate() {
    const e = {}
    REQUIRED.forEach(k => { if (!form[k].trim()) e[k] = 'Required' })
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    const ref = genRef()
    onSubmit({
      id: ref,
      ...form,
      delegates: Number(form.delegates) || 1,
      status: 'pending',
      submitted: new Date().toISOString().substring(0, 10),
    })
    setConfirmed(ref)
    setForm(INITIAL)
    setErrors({})
  }

  function Field({ id, label, required: req, children, full }) {
    return (
      <div className={`${styles.field} ${full ? styles.full : ''}`}>
        <label htmlFor={id} className="form-label">
          {label} {req && <span className="req">*</span>}
        </label>
        {children}
        {errors[id] && <span className={styles.err}>{errors[id]}</span>}
      </div>
    )
  }

  return (
    <div className={styles.page}>
      {/* Hero banner */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Papua New Guinea</p>
          <h2 className={styles.heroTitle}>Request an Appointment</h2>
          <p className={styles.heroDesc}>
            Submit a formal request to meet with the Rt. Hon. James Marape,
            Prime Minister of the Independent State of Papua New Guinea.
          </p>
        </div>
        <div className={styles.heroDecor}>
          <div className={styles.decorCircle} />
          <div className={styles.decorCircle2} />
        </div>
      </div>

      {/* Confirmation */}
      {confirmed && (
        <div className={styles.confirmation}>
          <div className={styles.confirmIcon}>✓</div>
          <div>
            <strong>Appointment request submitted</strong>
            <p>
              Reference: <strong>{confirmed}</strong> — The PM's Office will contact you
              within 5 working days to confirm or reschedule.
            </p>
          </div>
          <button className={styles.confirmClose} onClick={() => setConfirmed(null)}>×</button>
        </div>
      )}

      {/* Form card */}
      <div className={`${styles.formCard} card`}>
        <div className={styles.formHeading}>
          <span className={styles.formHeadingLine} />
          <h3 className={styles.formHeadingText}>Applicant Information</h3>
        </div>

        <form onSubmit={handleSubmit} noValidate className={styles.form}>
          <div className={styles.grid}>
            <Field id="name" label="Full Name" required>
              <input id="name" name="name" type="text" className="form-control"
                placeholder="e.g. Peter Kuman" value={form.name} onChange={handleChange} />
            </Field>

            <Field id="org" label="Organisation / Institution" required>
              <input id="org" name="org" type="text" className="form-control"
                placeholder="e.g. National Research Institute" value={form.org} onChange={handleChange} />
            </Field>

            <Field id="email" label="Email Address" required>
              <input id="email" name="email" type="email" className="form-control"
                placeholder="name@organisation.pg" value={form.email} onChange={handleChange} />
            </Field>

            <Field id="phone" label="Phone Number" required>
              <input id="phone" name="phone" type="tel" className="form-control"
                placeholder="+675 xxx xxxx" value={form.phone} onChange={handleChange} />
            </Field>
          </div>

          <hr className={`divider ${styles.sep}`} />

          <div className={styles.formHeading} style={{ marginTop: 0 }}>
            <span className={styles.formHeadingLine} />
            <h3 className={styles.formHeadingText}>Appointment Details</h3>
          </div>

          <div className={styles.grid}>
            <Field id="date" label="Preferred Date" required>
              <input id="date" name="date" type="date" className="form-control"
                value={form.date} onChange={handleChange} />
            </Field>

            <Field id="time" label="Preferred Time" required>
              <input id="time" name="time" type="time" className="form-control"
                value={form.time} onChange={handleChange} />
            </Field>

            <Field id="type" label="Type of Appointment" required>
              <select id="type" name="type" className="form-control"
                value={form.type} onChange={handleChange}>
                <option value="">— Select appointment type —</option>
                {APPOINTMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>

            <Field id="delegates" label="Number of Delegates">
              <input id="delegates" name="delegates" type="number" className="form-control"
                placeholder="e.g. 3" min="1" max="20" value={form.delegates} onChange={handleChange} />
            </Field>

            <Field id="purpose" label="Purpose & Agenda" required full>
              <textarea id="purpose" name="purpose" className="form-control"
                placeholder="Briefly describe the purpose, agenda items, and expected outcomes of this appointment request..."
                value={form.purpose} onChange={handleChange} />
            </Field>
          </div>

          <div className={styles.formFooter}>
            <p className={styles.disclaimer}>
              Fields marked <span style={{ color: 'var(--gold-500)' }}>*</span> are mandatory.
              Submission of false information constitutes an offence under the laws of Papua New Guinea.
            </p>
            <button type="submit" className={`btn btn-gold ${styles.submitBtn}`}>
              Submit Appointment Request →
            </button>
          </div>
        </form>
      </div>

      {/* Info row */}
      <div className={styles.infoRow}>
        {[
          { icon: '📋', title: 'Processing Time', desc: '5 working days for review and response' },
          { icon: '📞', title: 'Enquiries', desc: 'Call +675 327 6800 (Mon–Fri, 8am–4pm)' },
          { icon: '📧', title: 'Email Support', desc: 'appointments@pmo.gov.pg' },
        ].map(info => (
          <div key={info.title} className={styles.infoCard}>
            <span className={styles.infoIcon}>{info.icon}</span>
            <div>
              <strong className={styles.infoTitle}>{info.title}</strong>
              <p className={styles.infoDesc}>{info.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
