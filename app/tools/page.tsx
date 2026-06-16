'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ExternalLink, 
  Shield, 
  Search, 
  Eye,
  Lock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Lightbulb,
  Globe,
  KeyRound
} from 'lucide-react'
import Link from 'next/link'

const externalTools = [
  {
    name: 'Have I Been Pwned',
    description: 'Check if your email or phone has been compromised in a data breach.',
    url: 'https://haveibeenpwned.com',
    icon: Eye,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  {
    name: 'VirusTotal',
    description: 'Analyze suspicious files, domains, IPs and URLs to detect malware.',
    url: 'https://www.virustotal.com',
    icon: Search,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
  {
    name: 'Google Safe Browsing',
    description: 'Check if a site is listed as suspicious by Google.',
    url: 'https://transparencyreport.google.com/safe-browsing/search',
    icon: Globe,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
  },
]

const securityTips = [
  {
    category: 'Passwords',
    icon: KeyRound,
    tips: [
      'Use a unique password for each account',
      'Make passwords at least 12 characters long',
      'Include numbers, symbols, and mixed case',
      'Use a password manager to store them securely',
      'Never share passwords via email or text',
    ],
  },
  {
    category: 'Online Safety',
    icon: Globe,
    tips: [
      'Always check for HTTPS before entering data',
      'Be wary of too-good-to-be-true offers',
      'Verify website URLs carefully',
      'Avoid clicking links in unsolicited emails',
      'Keep your browser and extensions updated',
    ],
  },
  {
    category: 'Device Security',
    icon: Shield,
    tips: [
      'Keep your operating system updated',
      'Install reputable antivirus software',
      'Enable firewall protection',
      'Encrypt sensitive data and backups',
      'Use screen lock on all devices',
    ],
  },
]

export default function ToolsPage() {
  const [password, setPassword] = useState('')
  const [strength, setStrength] = useState({ score: 0, label: '', color: '' })

  const checkPasswordStrength = (pass: string) => {
    let score = 0
    
    if (pass.length >= 8) score++
    if (pass.length >= 12) score++
    if (/[a-z]/.test(pass)) score++
    if (/[A-Z]/.test(pass)) score++
    if (/[0-9]/.test(pass)) score++
    if (/[^a-zA-Z0-9]/.test(pass)) score++

    const labels = [
      { score: 0, label: 'Enter a password', color: 'text-muted-foreground' },
      { score: 1, label: 'Very Weak', color: 'text-red-400' },
      { score: 2, label: 'Weak', color: 'text-red-400' },
      { score: 3, label: 'Fair', color: 'text-yellow-400' },
      { score: 4, label: 'Good', color: 'text-yellow-400' },
      { score: 5, label: 'Strong', color: 'text-green-400' },
      { score: 6, label: 'Very Strong', color: 'text-green-400' },
    ]

    const result = labels.find((l) => l.score === score) || labels[0]
    setStrength({ score, label: result.label, color: result.color })
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6"
          >
            <Lock className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Security Tools</span>
          </motion.div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Security <span className="text-primary text-glow-cyan">Resources</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Use these tools and tips to strengthen your online security 
            and protect yourself from cyber threats.
          </p>
        </motion.div>

        {/* External Tools */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">External Security Tools</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {externalTools.map((tool, index) => (
              <motion.a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass rounded-2xl p-6 gradient-border group block"
              >
                <div className={`inline-flex p-3 rounded-xl ${tool.bgColor} mb-4`}>
                  <tool.icon className={`h-6 w-6 ${tool.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                  {tool.name}
                  <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-muted-foreground text-sm">
                  {tool.description}
                </p>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Password Strength Checker */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 gradient-border max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <KeyRound className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Password Strength Checker</h2>
                <p className="text-sm text-muted-foreground">Test how strong your password is</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    checkPasswordStrength(e.target.value)
                  }}
                  placeholder="Enter a password to test..."
                  className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>

              {/* Strength Bar */}
              <div className="space-y-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5, 6].map((level) => (
                    <div
                      key={level}
                      className={`h-2 flex-1 rounded-full transition-colors ${
                        level <= strength.score
                          ? strength.score <= 2
                            ? 'bg-red-500'
                            : strength.score <= 4
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                          : 'bg-secondary'
                      }`}
                    />
                  ))}
                </div>
                <p className={`text-sm font-medium ${strength.color}`}>
                  {strength.label}
                </p>
              </div>

              {/* Password Tips */}
              <div className="pt-4 border-t border-border space-y-2">
                <p className="text-sm font-medium mb-2">Password Requirements:</p>
                {[
                  { check: password.length >= 8, text: 'At least 8 characters' },
                  { check: password.length >= 12, text: '12+ characters for extra security' },
                  { check: /[a-z]/.test(password), text: 'Lowercase letter' },
                  { check: /[A-Z]/.test(password), text: 'Uppercase letter' },
                  { check: /[0-9]/.test(password), text: 'Number' },
                  { check: /[^a-zA-Z0-9]/.test(password), text: 'Special character' },
                ].map((req) => (
                  <div key={req.text} className="flex items-center gap-2 text-sm">
                    {req.check ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className={req.check ? 'text-foreground' : 'text-muted-foreground'}>
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Security Tips */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-center">Security Best Practices</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {securityTips.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 gradient-border"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">{category.category}</h3>
                </div>
                <ul className="space-y-3">
                  {category.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Lightbulb className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass rounded-3xl p-12 max-w-2xl mx-auto gradient-border animate-border-glow">
            <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Check a Suspicious URL
            </h2>
            <p className="text-muted-foreground mb-8">
              Use our URL scanner to analyze potentially dangerous links before clicking.
            </p>
            <Link
              href="/scanner"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-primary-foreground bg-primary rounded-xl hover:scale-105 transition-transform glow-cyan"
            >
              <Search className="h-5 w-5" />
              Scan URL
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
