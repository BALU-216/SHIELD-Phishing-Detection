'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Github,
  Chrome,
  User,
  CheckCircle,
  XCircle
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const passwordRequirements = [
    { check: password.length >= 8, text: 'At least 8 characters' },
    { check: /[A-Z]/.test(password), text: 'One uppercase letter' },
    { check: /[a-z]/.test(password), text: 'One lowercase letter' },
    { check: /[0-9]/.test(password), text: 'One number' },
    { check: /[^a-zA-Z0-9]/.test(password), text: 'One special character' },
  ]

  const passwordStrength = passwordRequirements.filter((r) => r.check).length
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordStrength < 4 || !passwordsMatch) return
    
    setIsLoading(true)
    
    // Simulate registration - replace with actual auth logic
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Illustration/Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:block"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-3xl" />
            
            <div className="relative glass rounded-3xl p-12 gradient-border">
              <div className="text-center mb-8">
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-block relative"
                >
                  <Shield className="h-24 w-24 text-primary" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-primary/30 blur-2xl rounded-full"
                  />
                </motion.div>
              </div>
              
              <h2 className="text-2xl font-bold text-center mb-4">
                Join SHIELD Today
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                Create an account to unlock advanced features and protect yourself from cyber threats.
              </p>

              <div className="space-y-4">
                {[
                  'Unlimited URL scans',
                  'Complete scan history',
                  'Real-time threat alerts',
                  'Priority support',
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3 text-sm"
                  >
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Register Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="glass rounded-2xl p-8 gradient-border animate-border-glow">
            <div className="text-center mb-6">
              <Link href="/" className="inline-flex items-center gap-2 mb-4">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">SHIELD</span>
              </Link>
              <h1 className="text-2xl font-bold mb-2">Create Account</h1>
              <p className="text-muted-foreground text-sm">
                Sign up to start protecting yourself online
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    required
                    className="w-full pl-12 pr-12 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                    )}
                  </button>
                </div>
                
                {/* Password Strength */}
                {password && (
                  <div className="space-y-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1.5 flex-1 rounded-full transition-colors ${
                            level <= passwordStrength
                              ? passwordStrength <= 2
                                ? 'bg-red-500'
                                : passwordStrength <= 3
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                              : 'bg-secondary'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {passwordRequirements.map((req) => (
                        <div key={req.text} className="flex items-center gap-1.5 text-xs">
                          {req.check ? (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          ) : (
                            <XCircle className="h-3 w-3 text-muted-foreground" />
                          )}
                          <span className={req.check ? 'text-foreground' : 'text-muted-foreground'}>
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                    className={`w-full pl-12 pr-12 py-3 rounded-xl bg-secondary/50 border outline-none transition-all ${
                      confirmPassword
                        ? passwordsMatch
                          ? 'border-green-500 focus:ring-2 focus:ring-green-500/20'
                          : 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
                    }`}
                  />
                  {confirmPassword && (
                    <div className="absolute inset-y-0 right-4 flex items-center">
                      {passwordsMatch ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || passwordStrength < 4 || !passwordsMatch}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100 glow-cyan"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-card text-muted-foreground">Or sign up with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-border hover:bg-secondary/50 transition-colors">
                <Github className="h-5 w-5" />
                <span className="text-sm font-medium">GitHub</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-border hover:bg-secondary/50 transition-colors">
                <Chrome className="h-5 w-5" />
                <span className="text-sm font-medium">Google</span>
              </button>
            </div>

            {/* Login Link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
