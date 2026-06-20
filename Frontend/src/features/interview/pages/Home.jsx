import React, { useState, useRef } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'

const Home = () => {
    const { loading, generateReport, reports } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [dragActive, setDragActive] = useState(false)
    const [resumeFile, setResumeFile] = useState(null)
    const resumeInputRef = useRef()
    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const file = resumeFile || resumeInputRef.current.files[0]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile: file })
        if (data && data._id) {
            navigate(`/interview/${data._id}`)
        }
    }

    const handleDrag = (e) => {
        e.preventDefault(); e.stopPropagation()
        setDragActive(e.type === "dragenter" || e.type === "dragover")
    }

    const handleDrop = (e) => {
        e.preventDefault(); e.stopPropagation()
        setDragActive(false)
        const file = e.dataTransfer.files[0]
        if (file) setResumeFile(file)
    }

    const handleFileInput = (e) => {
        const file = e.target.files[0]
        if (file) setResumeFile(file)
    }

    const jobDescLen = jobDescription.length

    if (loading) {
        return (
            <main className='loading-screen'>
                <div className='loading-inner'>
                    <div className='loading-spinner'></div>
                    <h1>Generating your interview plan<span className='loading-dots'></span></h1>
                    <p>Our AI is analyzing the job requirements and your profile</p>
                </div>
            </main>
        )
    }

    return (
        <div className='home-page'>

            {/* Top Nav */}
            <nav className='home-nav'>
                <div className='nav-brand'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e1034d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                    </svg>
                    <span>Interview<b>AI</b></span>
                </div>
                <div className='nav-links'>
                    <a href='#'>Help Center</a>
                    <a href='#'>Privacy</a>
                </div>
            </nav>

            {/* Hero Header */}
            <header className='page-header'>
                <div className='header-eyebrow'>
                    <span className='pulse-dot'></span>
                    AI-Powered Interview Strategy
                </div>
                <h1>
                    Build Your Custom <br/>
                    <span className='highlight'>Interview Plan</span>
                </h1>
                <p>Paste the job description, share your profile — our AI crafts a winning strategy tailored to you.</p>
            </header>

            {/* Main Card */}
            <div className='interview-card'>
                <div className='interview-card__body'>

                    {/* Left Panel — Job Description */}
                    <div className='panel panel--left'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                                </svg>
                            </span>
                            <div>
                                <h2>Target Job Description</h2>
                                <p className='panel__subtitle'>Paste the full JD for best results</p>
                            </div>
                            <span className='badge badge--required'>Required</span>
                        </div>
                        <textarea
                            onChange={(e) => setJobDescription(e.target.value)}
                            value={jobDescription}
                            className='panel__textarea'
                            placeholder={`Paste the full job description here...\n\ne.g. "Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design..."`}
                            maxLength={5000}
                        />
                        <div className='char-counter'>
                            <span className={jobDescLen > 4500 ? 'char-counter--warn' : ''}>{jobDescLen}</span> / 5000
                        </div>
                    </div>

                    {/* Divider */}
                    <div className='panel-divider'>
                        <div className='divider-line'></div>
                        <div className='divider-icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                        </div>
                        <div className='divider-line'></div>
                    </div>

                    {/* Right Panel — Profile */}
                    <div className='panel panel--right'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                                </svg>
                            </span>
                            <div>
                                <h2>Your Profile</h2>
                                <p className='panel__subtitle'>Resume or self-description needed</p>
                            </div>
                        </div>

                        {/* Drop Zone */}
                        <div className='upload-section'>
                            <label className='section-label'>
                                Upload Resume
                                <span className='badge badge--best'>Best Results</span>
                            </label>
                            <div
                                className={`dropzone ${dragActive ? 'dropzone--active' : ''} ${resumeFile ? 'dropzone--filled' : ''}`}
                                onDragEnter={handleDrag}
                                onDragOver={handleDrag}
                                onDragLeave={handleDrag}
                                onDrop={handleDrop}
                                onClick={() => resumeInputRef.current.click()}
                            >
                                {resumeFile ? (
                                    <div className='dropzone__file-info'>
                                        <span className='dropzone__file-icon'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e1034d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                                        </span>
                                        <div>
                                            <p className='dropzone__filename'>{resumeFile.name}</p>
                                            <p className='dropzone__filesize'>{(resumeFile.size / 1024).toFixed(0)} KB · Click to change</p>
                                        </div>
                                        <span className='dropzone__check'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e1034d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                        </span>
                                    </div>
                                ) : (
                                    <>
                                        <span className='dropzone__icon'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>
                                        </span>
                                        <p className='dropzone__title'>Click to upload or drag &amp; drop</p>
                                        <p className='dropzone__subtitle'>PDF or DOCX · Max 5MB</p>
                                    </>
                                )}
                                <input
                                    ref={resumeInputRef}
                                    hidden type='file' id='resume' name='resume'
                                    accept='.pdf,.docx'
                                    onChange={handleFileInput}
                                />
                            </div>
                        </div>

                        {/* OR */}
                        <div className='or-divider'><span>or describe yourself</span></div>

                        {/* Self Description */}
                        <div className='self-description'>
                            <label className='section-label' htmlFor='selfDescription'>Quick Self-Description</label>
                            <textarea
                                onChange={(e) => setSelfDescription(e.target.value)}
                                id='selfDescription'
                                name='selfDescription'
                                className='panel__textarea panel__textarea--short'
                                placeholder="e.g. 5 years of React/Node.js experience, worked at early-stage startups, strong in system design..."
                            />
                        </div>

                        {/* Info Box */}
                        <div className='info-box'>
                            <span className='info-box__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                            </span>
                            <p>At least a <strong>Resume</strong> or <strong>Self-Description</strong> is required along with the Job Description.</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className='interview-card__footer'>
                    <span className='footer-info'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        Approx 30s to generate
                    </span>
                    <button onClick={handleGenerateReport} className='generate-btn'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
                        </svg>
                        Generate Interview Strategy
                    </button>
                </div>
            </div>

            {/* Recent Reports */}
            {reports.length > 0 && (
                <section className='recent-reports'>
                    <div className='section-heading'>
                        <h2>Recent Interview Plans</h2>
                        <span className='report-count'>{reports.length} plan{reports.length > 1 ? 's' : ''}</span>
                    </div>
                    <ul className='reports-list'>
                        {reports.map(report => (
                            <li
                                key={report._id}
                                className='report-item'
                                onClick={() => navigate(`/interview/${report._id}`)}
                            >
                                <div className='report-item__left'>
                                    <div className='report-item__icon'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                                    </div>
                                    <div>
                                        <h3>{report.title || 'Untitled Position'}</h3>
                                        <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                                    </div>
                                </div>
                                <div className='report-item__right'>
                                    <span className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>
                                        {report.matchScore}% Match
                                    </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Footer */}
            <footer className='page-footer'>
                <a href='#'>Privacy Policy</a>
                <a href='#'>Terms of Service</a>
                <a href='#'>Help Center</a>
            </footer>
        </div>
    )
}

export default Home