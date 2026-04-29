import React, { useState } from 'react'
import Header from './components/Header'
import AppointmentForm from './components/AppointmentForm'
import AdminDashboard from './components/AdminDashboard'
import { SAMPLE_APPOINTMENTS } from './data/sampleData'
import styles from './App.module.css'

export default function App() {
  const [activeTab, setActiveTab]       = useState('request')
  const [appointments, setAppointments] = useState(SAMPLE_APPOINTMENTS)

  function handleSubmit(appointment) {
    setAppointments(prev => [appointment, ...prev])
    // Optionally auto-switch to admin: setActiveTab('admin')
  }

  function handleApprove(id) {
    setAppointments(prev =>
      prev.map(a => a.id === id ? { ...a, status: 'approved' } : a)
    )
  }

  function handleReject(id) {
    setAppointments(prev =>
      prev.map(a => a.id === id ? { ...a, status: 'rejected' } : a)
    )
  }

  return (
    <div className={styles.app}>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className={styles.main}>
        {activeTab === 'request' ? (
          <AppointmentForm onSubmit={handleSubmit} />
        ) : (
          <AdminDashboard
            appointments={appointments}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        )}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.footerLeft}>
            © {new Date().getFullYear()} Office of the Prime Minister — Independent State of Papua New Guinea
          </p>
          <p className={styles.footerRight}>
            Developed by Niu Age Tek &nbsp;|&nbsp; ict@pmo.gov.pg
          </p>
        </div>
      </footer>
    </div>
  )
}
