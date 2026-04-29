import React from 'react'
import styles from './Header.module.css'

export default function Header({ activeTab, onTabChange }) {
  return (
    <header className={styles.header}>
      {/* Top gold accent bar */}
      <div className={styles.topBar} />

      <div className={styles.inner}>
        {/* Crest */}
        <div className={styles.crestWrap}>
          <div className={styles.crest}>🦅</div>
        </div>

        {/* Title */}
        <div className={styles.titleBlock}>
          <p className={styles.eyebrow}>Independent State of Papua New Guinea</p>
          <h1 className={styles.title}>Office of the Prime Minister</h1>
          <p className={styles.subtitle}>PMO Appointment Management System</p>
        </div>

        {/* Official badge */}
        <div className={styles.officialBadge}>
          <span className={styles.dot} />
          Official System
        </div>
      </div>

      {/* Navigation */}
      <nav className={styles.nav} role="navigation" aria-label="Main navigation">
        <button
          className={`${styles.navBtn} ${activeTab === 'request' ? styles.active : ''}`}
          onClick={() => onTabChange('request')}
        >
          Request Appointment
        </button>
        <button
          className={`${styles.navBtn} ${activeTab === 'admin' ? styles.active : ''}`}
          onClick={() => onTabChange('admin')}
        >
          Admin Dashboard
        </button>
      </nav>
    </header>
  )
}
