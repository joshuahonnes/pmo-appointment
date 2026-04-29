import React, { useState } from 'react'
import DetailModal from './DetailModal'
import styles from './AdminDashboard.module.css'

function initials(name) {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
}

const FILTERS = [
  { key: 'all',      label: 'All' },
  { key: 'pending',  label: 'Pending' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
]

export default function AdminDashboard({ appointments, onApprove, onReject }) {
  const [filter, setFilter]   = useState('all')
  const [search, setSearch]   = useState('')
  const [detail, setDetail]   = useState(null)

  const counts = {
    all:      appointments.length,
    pending:  appointments.filter(a => a.status === 'pending').length,
    approved: appointments.filter(a => a.status === 'approved').length,
    rejected: appointments.filter(a => a.status === 'rejected').length,
  }

  const list = appointments.filter(a => {
    const matchStatus = filter === 'all' || a.status === filter
    const q = search.toLowerCase()
    const matchSearch = !q ||
      a.name.toLowerCase().includes(q) ||
      a.org.toLowerCase().includes(q) ||
      a.id.toLowerCase().includes(q)
    return matchStatus && matchSearch
  })

  function handleApprove(id) {
    onApprove(id)
    setDetail(prev => prev?.id === id ? { ...prev, status: 'approved' } : prev)
  }
  function handleReject(id) {
    onReject(id)
    setDetail(prev => prev?.id === id ? { ...prev, status: 'rejected' } : prev)
  }

  return (
    <div className={styles.page}>
      <DetailModal
        appointment={detail}
        onClose={() => setDetail(null)}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      {/* Page header */}
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageTitle}>Appointment Dashboard</h2>
          <p className={styles.pageDesc}>Review, approve, or reject appointment requests</p>
        </div>
        <span className={styles.todayBadge}>
          {new Date().toLocaleDateString('en-PG', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        {[
          { key: 'all',      label: 'Total',    icon: '📋' },
          { key: 'pending',  label: 'Pending',  icon: '⏳' },
          { key: 'approved', label: 'Approved', icon: '✅' },
          { key: 'rejected', label: 'Rejected', icon: '❌' },
        ].map(s => (
          <div
            key={s.key}
            className={`${styles.statCard} ${styles['stat_' + s.key]}`}
            onClick={() => setFilter(s.key)}
            role="button"
            tabIndex={0}
          >
            <div className={styles.statIcon}>{s.icon}</div>
            <div className={styles.statNum}>{counts[s.key]}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.filterGroup}>
          {FILTERS.map(f => (
            <button
              key={f.key}
              className={`${styles.filterBtn} ${filter === f.key ? styles.filterActive : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
              <span className={styles.filterCount}>{counts[f.key]}</span>
            </button>
          ))}
        </div>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            className={styles.search}
            type="search"
            placeholder="Search name, org or reference..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* List */}
      {list.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyIcon}>📭</p>
          <p className={styles.emptyText}>No appointments match your current filter.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {list.map(a => (
            <div key={a.id} className={`${styles.card} card`}>
              <div className={styles.cardLeft}>
                <div className={styles.avatar}>{initials(a.name)}</div>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <div>
                    <span className={styles.cardName}>{a.name}</span>
                    <span className={styles.cardOrg}>{a.org}</span>
                  </div>
                  <span className={`badge badge-${a.status}`}>{a.status}</span>
                </div>
                <div className={styles.cardMeta}>
                  <span className={styles.metaItem}>📅 <strong>{a.date}</strong> at <strong>{a.time}</strong></span>
                  <span className={styles.metaItem}>🏷 {a.type}</span>
                  <span className={styles.metaRef}>{a.id}</span>
                </div>
                <p className={styles.cardPurpose}>{a.purpose}</p>
                <div className={styles.cardActions}>
                  <button className="btn btn-outline" onClick={() => setDetail(a)}>View Details</button>
                  {a.status === 'pending' && (
                    <>
                      <button className="btn btn-approve" onClick={() => onApprove(a.id)}>✓ Approve</button>
                      <button className="btn btn-reject"  onClick={() => onReject(a.id)}>✕ Reject</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
