import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../../auth/auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import { toast } from 'react-hot-toast'

const Login = () => {
    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        const isEmailValid = validateEmail(email)
        const isPasswordValid = validatePassword(password)
        if (!isEmailValid || !isPasswordValid) {
            toast.error("Please fill in all fields correctly.", { id: "login-toast" })
            return
        }
        const loginPromise = new Promise(async (resolve, reject) => {
            try {
                const res = await handleLogin({ email, password })
                if (res.success) resolve(res)
                else reject(new Error(res.error))
            } catch (err) { reject(err) }
        })
        toast.promise(loginPromise, {
            loading: "Logging in...",
            success: "Welcome back!",
            error: (err) => err.message || "Login failed. Please try again.",
        }, { id: "login-toast" })
        try { await loginPromise; navigate('/') } catch (err) {}
    }

    return (
        <main className="auth-page">
            {/* Left Panel */}
            <div className="auth-visual-panel">
                <div className="circuit-bg">
                    {/* Animated circuit lines */}
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

                    {/* Abstract AI head */}
                    <div className="ai-head-wrapper">
                        <div className="ai-head">
                            <div className="ai-head-glow"></div>
                            <svg className="ai-head-svg" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Head shape */}
                                <path d="M100 20 C55 20 30 55 30 100 C30 145 50 175 80 188 L80 210 L120 210 L120 188 C150 175 170 145 170 100 C170 55 145 20 100 20Z" fill="url(#headGrad)" stroke="#e1034d" strokeWidth="1.5" strokeOpacity="0.6"/>
                                {/* Visor */}
                                <path d="M55 85 C55 70 70 60 100 60 C130 60 145 70 145 85 L145 115 C145 130 130 140 100 140 C70 140 55 130 55 115Z" fill="url(#visorGrad)" stroke="#e1034d" strokeWidth="1" strokeOpacity="0.8"/>
                                {/* Eyes */}
                                <ellipse cx="80" cy="98" rx="12" ry="8" fill="#e1034d" fillOpacity="0.9" className="eye-glow"/>
                                <ellipse cx="120" cy="98" rx="12" ry="8" fill="#e1034d" fillOpacity="0.9" className="eye-glow"/>
                                {/* Inner eye */}
                                <ellipse cx="80" cy="98" rx="5" ry="4" fill="#fff" fillOpacity="0.9"/>
                                <ellipse cx="120" cy="98" rx="5" ry="4" fill="#fff" fillOpacity="0.9"/>
                                {/* Circuit lines on head */}
                                <line x1="100" y1="20" x2="100" y2="40" stroke="#e1034d" strokeWidth="1" strokeOpacity="0.5"/>
                                <line x1="80" y1="188" x2="80" y2="210" stroke="#e1034d" strokeWidth="1" strokeOpacity="0.5"/>
                                <line x1="120" y1="188" x2="120" y2="210" stroke="#e1034d" strokeWidth="1" strokeOpacity="0.5"/>
                                {/* Chin detail */}
                                <line x1="85" y1="160" x2="115" y2="160" stroke="#e1034d" strokeWidth="1" strokeOpacity="0.4"/>
                                <line x1="90" y1="170" x2="110" y2="170" stroke="#e1034d" strokeWidth="0.8" strokeOpacity="0.3"/>

                                <defs>
                                    <linearGradient id="headGrad" x1="30" y1="20" x2="170" y2="240" gradientUnits="userSpaceOnUse">
                                        <stop offset="0%" stopColor="#1a0a10"/>
                                        <stop offset="100%" stopColor="#0d0305"/>
                                    </linearGradient>
                                    <linearGradient id="visorGrad" x1="55" y1="60" x2="145" y2="140" gradientUnits="userSpaceOnUse">
                                        <stop offset="0%" stopColor="#2a0810" stopOpacity="0.9"/>
                                        <stop offset="100%" stopColor="#0a0205" stopOpacity="0.7"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Brand on left panel */}
                <div className="panel-brand">
                    <div className="auth-logo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#e1034d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                        </svg>
                    </div>
                    <h1 className="auth-brand">Interview<span>AI</span></h1>
                </div>

                <div className="panel-tagline">
                    <p>Your AI-powered <br/><strong>interview coach</strong></p>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="auth-form-panel">
                <div className="form-container">
                    <div className="form-header">
                        <p className="form-eyebrow">Welcome back</p>
                        <h2>Hello! 👋</h2>
                        <p className="form-subtext">Sign in to access your interview strategy dashboard.</p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
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
                                    placeholder='Enter Email'
                                    disabled={loading}
                                    className={emailError ? "input-error" : ""}
                                />
                            </div>
                            {emailError && <span className="field-error-text" role="alert">{emailError}</span>}
                        </div>

                        <div className="input-group">
                            <div className="label-row">
                                <label htmlFor="password">Password</label>
                                <a href="#" className="forgot-link">Forgot Password?</a>
                            </div>
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

                        <button type="submit" className='button primary-button auth-submit-btn' disabled={loading} aria-busy={loading}>
                            {loading ? <span className="spinner" aria-hidden="true"></span> : "Sign In"}
                        </button>
                    </form>

                    <div className="social-divider">
                        <span>Or continue with</span>
                    </div>

                    <div className="social-buttons">
                        <button type="button" className="social-btn facebook-btn" aria-label="Continue with Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                        </button>
                        <button type="button" className="social-btn apple-btn" aria-label="Continue with Apple">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>
                        </button>
                        <button type="button" className="social-btn google-btn" aria-label="Continue with Google">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                        </button>
                    </div>

                    <p className="auth-footer-text">
                        Don't have an account? <Link to={"/register"}>Create Account</Link>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Login