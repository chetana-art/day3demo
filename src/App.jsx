import { useState } from 'react'
import './App.css'

const navItems = [
  { label: 'Overview', icon: 'grid' },
  { label: 'Analytics', icon: 'chart' },
  { label: 'Projects', icon: 'folder' },
  { label: 'Notebooks', icon: 'book' },
]

const chartValues = [34, 42, 37, 55, 48, 64, 58, 74, 67, 82, 73, 91]
const chartPoints = chartValues.map((value, index) => `${index * 80},${120 - value}`).join(' ')

function Icon({ name, size = 18 }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
    chart: <><path d="M4 19V5" /><path d="M4 19h17" /><path d="m7 15 4-4 3 2 6-7" /></>,
    folder: <><path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z" /><path d="M3 10h18" /></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5z" /><path d="M4 16a3 3 0 0 1 3-3h13" /><path d="M8 7h7" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1a1.7 1.7 0 0 1-2.4 2.4l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a1.7 1.7 0 0 1-3.4 0v-.2a1.7 1.7 0 0 0-2.9-1.2l-.1.1a1.7 1.7 0 0 1-2.4-2.4l.1-.1a1.7 1.7 0 0 0-1.2-2.9H4a1.7 1.7 0 0 1 0-3.4h.2a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a1.7 1.7 0 0 1 2.4-2.4l.1.1a1.7 1.7 0 0 0 2.9-1.2V2a1.7 1.7 0 0 1 3.4 0v.2a1.7 1.7 0 0 0 2.9 1.2l.1-.1a1.7 1.7 0 0 1 2.4 2.4l-.1.1a1.7 1.7 0 0 0 1.2 2.9h.2a1.7 1.7 0 0 1 0 3.4h-.2a1.7 1.7 0 0 0-1.2 2.9z" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
    bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    arrow: <><path d="M7 17 17 7" /><path d="M7 7h10v10" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
  }

  return (
    <svg
      aria-hidden="true"
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

function App() {
  const [activePage, setActivePage] = useState('Overview')
  const [period, setPeriod] = useState('Last 12 months')

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <a className="brand" href="#overview" aria-label="PyDash home">
          <span className="brand-mark">Py</span>
          <span>pydash<span className="brand-period">.</span></span>
        </a>

        <div className="workspace-label">WORKSPACE</div>
        <button className="workspace-switcher" type="button">
          <span className="workspace-avatar">S</span>
          <span className="workspace-copy"><strong>Studio workspace</strong><small>Free plan</small></span>
          <span className="switcher-caret">⌄</span>
        </button>

        <div className="workspace-label nav-label">MENU</div>
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              className={`nav-link${activePage === item.label ? ' active' : ''}`}
              key={item.label}
              onClick={() => setActivePage(item.label)}
              type="button"
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
              {item.label === 'Notebooks' && <span className="nav-count">4</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon">✳</div>
            <strong>Need a hand?</strong>
            <p>Visit our help center for tips and guides.</p>
            <a href="#help">Get support <span>↗</span></a>
          </div>
          <button className="nav-link settings-link" onClick={() => setActivePage('Settings')} type="button">
            <Icon name="settings" /><span>Settings</span>
          </button>
          <div className="user-profile">
            <div className="profile-avatar">JD</div>
            <div className="profile-copy"><strong>Jordan Davis</strong><small>jordan@studio.io</small></div>
            <Icon name="more" size={20} />
          </div>
        </div>
      </aside>

      <main className="main-content" id="overview">
        <header className="topbar">
          <div className="breadcrumbs"><span>Workspace</span><Icon name="chevron" size={14} /><strong>{activePage}</strong></div>
          <div className="topbar-actions">
            <button className="search-button" type="button"><Icon name="search" /><span>Search anything...</span><kbd>⌘ K</kbd></button>
            <button className="notification-button" type="button" aria-label="Notifications"><Icon name="bell" /><i /></button>
            <div className="topbar-avatar">JD</div>
          </div>
        </header>

        <div className="page-content">
          <section className="welcome-row">
            <div>
              <div className="eyebrow"><span className="live-dot" /> YOUR WORKSPACE</div>
              <h1>Good morning, Jordan <span className="wave">✳</span></h1>
              <p className="welcome-subtitle">Here’s what’s happening with your projects today.</p>
            </div>
            <button className="primary-button" type="button"><Icon name="plus" size={17} /> New project</button>
          </section>

          <section className="metrics-grid" aria-label="Workspace metrics">
            <article className="metric-card">
              <div className="metric-top"><span>Active projects</span><span className="metric-icon purple"><Icon name="folder" /></span></div>
              <div className="metric-value">12 <span className="metric-change"><Icon name="arrow" size={14} /> 16.8%</span></div>
              <div className="metric-foot">Compared to last month</div>
              <div className="sparkline spark-purple"><svg viewBox="0 0 110 32" preserveAspectRatio="none"><path d="M1 26 15 21 27 24 40 14 52 19 66 9 78 14 91 5 109 8" /></svg></div>
            </article>
            <article className="metric-card">
              <div className="metric-top"><span>Notebooks run</span><span className="metric-icon blue"><Icon name="book" /></span></div>
              <div className="metric-value">2,847 <span className="metric-change"><Icon name="arrow" size={14} /> 12.4%</span></div>
              <div className="metric-foot">Compared to last month</div>
              <div className="sparkline spark-blue"><svg viewBox="0 0 110 32" preserveAspectRatio="none"><path d="M1 23 15 25 27 16 40 20 52 11 66 14 78 8 91 12 109 3" /></svg></div>
            </article>
            <article className="metric-card">
              <div className="metric-top"><span>Data processed</span><span className="metric-icon orange">◈</span></div>
              <div className="metric-value">84.2 <small>GB</small><span className="metric-change"><Icon name="arrow" size={14} /> 8.2%</span></div>
              <div className="metric-foot">Compared to last month</div>
              <div className="sparkline spark-orange"><svg viewBox="0 0 110 32" preserveAspectRatio="none"><path d="M1 27 15 20 27 22 40 15 52 18 66 8 78 13 91 6 109 9" /></svg></div>
            </article>
            <article className="metric-card">
              <div className="metric-top"><span>Team members</span><span className="metric-icon green">♧</span></div>
              <div className="metric-value">8 <span className="metric-change"><Icon name="arrow" size={14} /> 2 new</span></div>
              <div className="metric-foot">Since your last visit</div>
              <div className="team-avatars"><span>JD</span><span>AM</span><span>SK</span><span>+5</span></div>
            </article>
          </section>

          <section className="overview-grid">
            <article className="panel activity-panel">
              <div className="panel-heading">
                <div><h2>Project activity</h2><p>Keep track of your workspace progress</p></div>
                <select aria-label="Activity time period" value={period} onChange={(event) => setPeriod(event.target.value)}>
                  <option>Last 12 months</option><option>Last 6 months</option><option>Last 30 days</option>
                </select>
              </div>
              <div className="chart-legend"><span><i className="legend-purple" /> Projects</span><span><i className="legend-blue" /> Notebook runs</span></div>
              <div className="chart-wrap">
                <div className="chart-y-labels"><span>400</span><span>300</span><span>200</span><span>100</span><span>0</span></div>
                <svg className="activity-chart" viewBox="0 0 880 150" preserveAspectRatio="none" role="img" aria-label={`Project and notebook activity for ${period.toLowerCase()}`}>
                  <defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#7357ee" stopOpacity=".16" /><stop offset="100%" stopColor="#7357ee" stopOpacity="0" /></linearGradient></defs>
                  <path className="grid-line" d="M0 10H880M0 42H880M0 74H880M0 106H880M0 138H880" />
                  <path className="chart-area" d={`M${chartPoints.replaceAll(' ', ' L')} L880 150 L0 150 Z`} />
                  <polyline className="chart-line chart-line-purple" points={chartPoints} />
                  <polyline className="chart-line chart-line-blue" points="0,105 80,98 160,106 240,88 320,92 400,69 480,78 560,58 640,72 720,49 800,55 880,34" />
                  <circle className="chart-point" cx="640" cy="53" r="4" />
                </svg>
                <div className="chart-x-labels"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span></div>
              </div>
            </article>

            <article className="panel activity-feed">
              <div className="panel-heading feed-heading"><div><h2>Recent activity</h2><p>What’s happening in your workspace</p></div><button aria-label="More activity options" className="icon-button" type="button"><Icon name="more" /></button></div>
              <div className="feed-list">
                <div className="feed-item"><div className="feed-avatar avatar-lavender">AM</div><div className="feed-copy"><p><strong>Alex Morgan</strong> updated <a href="#project">Sales forecast</a></p><span><Icon name="clock" size={13} /> 12 minutes ago</span></div></div>
                <div className="feed-item"><div className="feed-avatar avatar-peach">SK</div><div className="feed-copy"><p><strong>Sam Kim</strong> ran a notebook in <a href="#project">Customer churn</a></p><span><Icon name="clock" size={13} /> 48 minutes ago</span></div></div>
                <div className="feed-item"><div className="feed-avatar avatar-mint">JD</div><div className="feed-copy"><p>You created a new project <a href="#project">Web traffic analysis</a></p><span><Icon name="clock" size={13} /> 2 hours ago</span></div></div>
                <div className="feed-item"><div className="feed-avatar avatar-sky">RL</div><div className="feed-copy"><p><strong>Riley Lee</strong> shared a notebook with you</p><span><Icon name="clock" size={13} /> Yesterday</span></div></div>
              </div>
              <a className="view-all" href="#activity">View all activity <Icon name="chevron" size={14} /></a>
            </article>
          </section>

          <section className="panel projects-panel">
            <div className="panel-heading projects-heading">
              <div><h2>Your projects</h2><p>Pick up where you left off</p></div>
              <a className="view-all desktop-view-all" href="#projects">View all projects <Icon name="chevron" size={14} /></a>
            </div>
            <div className="project-table-wrap">
              <table>
                <thead><tr><th>PROJECT NAME</th><th>STATUS</th><th>LAST UPDATED</th><th>CREATED BY</th><th /></tr></thead>
                <tbody>
                  <tr><td><span className="project-icon project-purple">▥</span><span className="project-name"><strong>Sales forecast</strong><small>12 notebooks · 4.8 GB</small></span></td><td><span className="status-badge in-progress"><i /> In progress</span></td><td>Today, 10:42 AM</td><td><span className="creator-avatar">AM</span> Alex Morgan</td><td><button className="icon-button row-more" aria-label="Sales forecast options" type="button"><Icon name="more" /></button></td></tr>
                  <tr><td><span className="project-icon project-orange">◉</span><span className="project-name"><strong>Customer churn analysis</strong><small>8 notebooks · 2.1 GB</small></span></td><td><span className="status-badge completed"><i /> Completed</span></td><td>Yesterday, 4:18 PM</td><td><span className="creator-avatar creator-peach">SK</span> Sam Kim</td><td><button className="icon-button row-more" aria-label="Customer churn analysis options" type="button"><Icon name="more" /></button></td></tr>
                  <tr><td><span className="project-icon project-blue">⌁</span><span className="project-name"><strong>Web traffic analysis</strong><small>5 notebooks · 1.6 GB</small></span></td><td><span className="status-badge in-progress"><i /> In progress</span></td><td>Oct 21, 2024</td><td><span className="creator-avatar creator-mint">JD</span> Jordan Davis</td><td><button className="icon-button row-more" aria-label="Web traffic analysis options" type="button"><Icon name="more" /></button></td></tr>
                </tbody>
              </table>
            </div>
          </section>
          <footer className="page-footer"><span>© 2024 pydash</span><span>Made for curious minds <b>✳</b></span></footer>
        </div>
      </main>
    </div>
  )
}

export default App
