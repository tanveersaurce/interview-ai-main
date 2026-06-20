import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../../auth/auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import { toast } from 'react-hot-toast'

const Register = () => {
    const navigate = useNavigate()
    const { loading, handleRegister } = useAuth()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [usernameError, setUsernameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")

    const validateUsername = (val) => {
        if (!val) { setUsernameError("Username is required"); return false }
        if (val.length < 3) { setUsernameError("Username must be at least 3 characters"); return false }
        setUsernameError(""); return true
    }

    const validateEmail = (val) => {
        if (!val) { setEmailError("Email is required"); return false }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(val)) { setEmailError("Invalid email format"); return false }
        setEmailError(""); return true
    }

    const validatePassword = (val) => {
        if (!val) { setPasswordError("Password is required"); return false }
        if (val.length < 6) { setPasswordError("Password must be at least 6 characters"); return false }
        setPasswordError(""); return true
    }

    const validateConfirmPassword = (val, pass) => {
        if (!val) { setConfirmPasswordError("Please confirm your password"); return false }
        if (val !== pass) { setConfirmPasswordError("Passwords do not match"); return false }
        setConfirmPasswordError(""); return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const isUsernameValid = validateUsername(username)
        const isEmailValid = validateEmail(email)
        const isPasswordValid = validatePassword(password)
        const isConfirmPasswordValid = validateConfirmPassword(confirmPassword, password)

        if (!isUsernameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
            if (password !== confirmPassword) {
                toast.error("Passwords do not match.", { id: "register-toast" })
            } else {
                toast.error("Please fill in all fields correctly.", { id: "register-toast" })
            }
            return
        }

        const registerPromise = new Promise(async (resolve, reject) => {
            try {
                const res = await handleRegister({ username, email, password })
                if (res.success) resolve(res)
                else reject(new Error(res.error))
            } catch (err) { reject(err) }
        })

        toast.promise(registerPromise, {
            loading: "Creating your account...",
            success: "Account created successfully!",
            error: (err) => err.message || "Registration failed. Please try again.",
        }, { id: "register-toast" })

        try { await registerPromise; navigate("/") } catch (err) {}
    }

    return (
        <main className="auth-page">
            {/* Left Panel */}
            <div className="auth-visual-panel">
                <div className="circuit-bg">
                    <svg className="circuit-svg" viewBox="0 0 500 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="80" y1="0" x2="80" y2="200" stroke="#e1034d" strokeWidth="1" strokeOpacity="0.4" className="circuit-line"/>
                        <line x1="80" y1="200" x2="200" y2="200" stroke="#e1034d" strokeWidth="1" strokeOpacity="0.4" className="circuit-line"/>
                        <circle cx="200" cy="200" r="4" fill="#e1034d" className="circuit-node"/>
                        <line x1="200" y1="200" x2="200" y2="350" stroke="#e1034d" strokeWidth="1" strokeOpacity="0.4" className="circuit-line"/>
                        <line x1="200" y1="350" x2="350" y2="350" stroke="#e1034d" strokeWidth="1" strokeOpacity="0.4" className="circuit-line"/>
                        <circle cx="350" cy="350" r="4" fill="#e1034d" className="circuit-node"/>
                        <line x1="350" y1="350" x2="350" y2="500" stroke="#e1034d" strokeWidth="1" strokeOpacity="0.4" className="circuit-line"/>
                        <line x1="150" y1="0" x2="150" y2="100" stroke="#e1034d" strokeWidth="0.5" strokeOpacity="0.25" className="circuit-line"/>
                        <line x1="150" y1="100" x2="320" y2="100" stroke="#e1034d" strokeWidth="0.5" strokeOpacity="0.25" className="circuit-line"/>
                        <circle cx="320" cy="100" r="3" fill="#e1034d" fillOpacity="0.5" className="circuit-node"/>
                        <line x1="320" y1="100" x2="320" y2="280" stroke="#e1034d" strokeWidth="0.5" strokeOpacity="0.25" className="circuit-line"/>
                        <line x1="320" y1="280" x2="450" y2="280" stroke="#e1034d" strokeWidth="0.5" strokeOpacity="0.25" className="circuit-line"/>
                        <line x1="420" y1="0" x2="420" y2="160" stroke="#e1034d" strokeWidth="0.5" strokeOpacity="0.2" className="circuit-line"/>
                        <circle cx="420" cy="160" r="3" fill="#e1034d" fillOpacity="0.4" className="circuit-node"/>
                        <line x1="420" y1="160" x2="500" y2="160" stroke="#e1034d" strokeWidth="0.5" strokeOpacity="0.2" className="circuit-line"/>
                    </svg>

                    <div className="ai-head-wrapper">
                        <div className="ai-head">
                            <div className="ai-head-glow"></div>
                            <svg className="ai-head-svg" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 20 C55 20 30 55 30 100 C30 145 50 175 80 188 L80 210 L120 210 L120 188 C150 175 170 145 170 100 C170 55 145 20 100 20Z" fill="url(#headGrad2)" stroke="#e1034d" strokeWidth="1.5" strokeOpacity="0.6"/>
                                <path d="M55 85 C55 70 70 60 100 60 C130 60 145 70 145 85 L145 115 C145 130 130 140 100 140 C70 140 55 130 55 115Z" fill="url(#visorGrad2)" stroke="#e1034d" strokeWidth="1" strokeOpacity="0.8"/>
                                <ellipse cx="80" cy="98" rx="12" ry="8" fill="#e1034d" fillOpacity="0.9" className="eye-glow"/>
                                <ellipse cx="120" cy="98" rx="12" ry="8" fill="#e1034d" fillOpacity="0.9" className="eye-glow"/>
                                <ellipse cx="80" cy="98" rx="5" ry="4" fill="#fff" fillOpacity="0.9"/>
                                <ellipse cx="120" cy="98" rx="5" ry="4" fill="#fff" fillOpacity="0.9"/>
                                <line x1="100" y1="20" x2="100" y2="40" stroke="#e1034d" strokeWidth="1" strokeOpacity="0.5"/>
                                <line x1="80" y1="188" x2="80" y2="210" stroke="#e1034d" strokeWidth="1" strokeOpacity="0.5"/>
                                <line x1="120" y1="188" x2="120" y2="210" stroke="#e1034d" strokeWidth="1" strokeOpacity="0.5"/>
                                <line x1="85" y1="160" x2="115" y2="160" stroke="#e1034d" strokeWidth="1" strokeOpacity="0.4"/>
                                <line x1="90" y1="170" x2="110" y2="170" stroke="#e1034d" strokeWidth="0.8" strokeOpacity="0.3"/>
                                <defs>
                                    <linearGradient id="headGrad2" x1="30" y1="20" x2="170" y2="240" gradientUnits="userSpaceOnUse">
                                        <stop offset="0%" stopColor="#1a0a10"/>
                                        <stop offset="100%" stopColor="#0d0305"/>
                                    </linearGradient>
                                    <linearGradient id="visorGrad2" x1="55" y1="60" x2="145" y2="140" gradientUnits="userSpaceOnUse">
                                        <stop offset="0%" stopColor="#2a0810" stopOpacity="0.9"/>
                                        <stop offset="100%" stopColor="#0a0205" stopOpacity="0.7"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="panel-brand">
                    <div className="auth-logo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#e1034d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                        </svg>
                    </div>
                    <h1 className="auth-brand">Interview<span>AI</span></h1>
                </div>

                <div className="panel-tagline">
                    <p>Start your journey to <br/><strong>interview success</strong></p>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="auth-form-panel">
                <div className="form-container">
                    <div className="form-header">
                        <p className="form-eyebrow">Get started</p>
                        <h2>Create Account ✨</h2>
                        <p className="form-subtext">Join thousands preparing smarter with AI-powered strategies.</p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
                        {/* Username */}
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                </span>
                                <input
                                    value={username}
                                    onChange={(e) => { setUsername(e.target.value); if (usernameError) validateUsername(e.target.value) }}
                                    onBlur={(e) => validateUsername(e.target.value)}
                                    type="text" id="username" name='username'
                                    placeholder='Enter username'
                                    disabled={loading}
                                    className={usernameError ? "input-error" : ""}
                                />
                            </div>
                            {usernameError && <span className="field-error-text" role="alert">{usernameError}</span>}
                        </div>

                        {/* Email */}
                        <div className="input-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                                </span>
                                <input
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); if (emailError) validateEmail(e.target.value) }}
                                    onBlur={(e) => validateEmail(e.target.value)}
                                    type="email" id="email" name='email'
                                    placeholder='name@example.com'
                                    disabled={loading}
                                    className={emailError ? "input-error" : ""}
                                />
                            </div>
                            {emailError && <span className="field-error-text" role="alert">{emailError}</span>}
                        </div>

                        {/* Password */}
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-wrapper password-wrapper">
                                <span className="input-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                </span>
                                <input
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); if (passwordError) validatePassword(e.target.value) }}
                                    onBlur={(e) => validatePassword(e.target.value)}
                                    type={showPassword ? "text" : "password"}
                                    id="password" name='password'
                                    placeholder='••••••••'
                                    disabled={loading}
                                    className={passwordError ? "input-error" : ""}
                                />
                                <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"} disabled={loading}>
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                    )}
                                </button>
                            </div>
                            {passwordError && <span className="field-error-text" role="alert">{passwordError}</span>}
                        </div>

                        {/* Confirm Password */}
                        <div className="input-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="input-wrapper password-wrapper">
                                <span className="input-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                </span>
                                <input
                                    value={confirmPassword}
                                    onChange={(e) => { setConfirmPassword(e.target.value); if (confirmPasswordError) validateConfirmPassword(e.target.value, password) }}
                                    onBlur={(e) => validateConfirmPassword(e.target.value, password)}
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword" name='confirmPassword'
                                    placeholder='••••••••'
                                    disabled={loading}
                                    className={confirmPasswordError ? "input-error" : ""}
                                />
                                <button type="button" className="password-toggle-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"} disabled={loading}>
                                    {showConfirmPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                    )}
                                </button>
                            </div>
                            {confirmPasswordError && <span className="field-error-text" role="alert">{confirmPasswordError}</span>}
                        </div>

                        <button type="submit" className='button primary-button auth-submit-btn' disabled={loading} aria-busy={loading}>
                            {loading ? <span className="spinner" aria-hidden="true"></span> : "Create Account"}
                        </button>
                    </form>

                    <p className="auth-footer-text" style={{ marginTop: '1.5rem' }}>
                        Already have an account? <Link to={"/login"}>Sign In</Link>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Register