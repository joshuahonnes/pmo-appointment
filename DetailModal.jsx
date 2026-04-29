import React from 'react'
import styles from './DetailModal.module.css'

export default function DetailModal({ appointment, onClose, onApprove, onReject }) {
  if (!appointment) return null

  function Row({ label, children }) {
    return (
      <div className={styles.row}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{children}</span>
      </div>
    )
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div>
            <p className={styles.modalRef}>{appointment.id}</p>
            <h3 className={styles.modalTitle}>Appointment Details</h3>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className={styles.statusBar}>
          <span className={`badge badge-${appointment.status}`}>{appointment.status}</span>
          <span className={styles.submitted}>Submitted: {appointment.submitted}</span>
        </div>

        <div className={styles.modalBody}>
          <p className={styles.section}>Applicant</p>
          <Row label="Full Name">{appointment.name}</Row>
          <Row label="Organisation">{appointment.org}</Row>
          <Row label="Email">{appointment.email}</Row>
          <Row label="Phone">{appointment.phone}</Row>

          <p className={styles.section}>Appointment</p>
          <Row label="Date & Time">{appointment.date} at {appointment.time}</Row>
          <Row label="Type">{appointment.type}</Row>
          <Row label="Delegates">{appointment.delegates ?? '—'}</Row>

          <p className={styles.section}>Purpose</p>
          <div className={styles.purposeBox}>{appointment.purpose}</div>
        </div>

        {appointment.status === 'pending' && (
          <div className={styles.modalFooter}>
            <button className={`btn btn-approve ${styles.actionBtn}`}
              onClick={() => { onApprove(appointment.id); onClose() }}>
              ✓ Approve Appointment
            </button>
            <button className={`btn btn-reject ${styles.actionBtn}`}
              onClick={() => { onReject(appointment.id); onClose() }}>
              ✕ Reject
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
