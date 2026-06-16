'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Shield, 
  Loader2, 
  AlertTriangle, 
  CheckCircle, 
  Globe, 
  Link2, 
  ArrowRight,
  Zap,
  Eye,
  Lock,
  Radar
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ParticleField } from '@/components/particle-field'

const recentThreats = [
  { url: 'paypa1-secure.com/login', risk: 95, type: 'Phishing' },
  { url: 'amaz0n-deals.xyz', risk: 88, type: 'Impersonation' },
  { url: 'ngrok.io/banking', risk: 72, type: 'Suspicious Domain' },
  { url: 'bit.ly/free-prize', risk: 65, type: 'Shortened URL' },
]

const scanFeatures = [
  { icon: Link2, label: 'URL Expansion', desc: 'Reveal hidden destinations' },
  { icon: Eye, label: 'Pattern Analysis', desc: 'Detect phishing patterns' },
  { icon: Lock, label: 'Domain Check', desc: 'Verify domain safety' },
  { icon: Radar, label: 'Threat Score', desc: 'Calculate risk level' },
]

export default function ScannerPage() {
  const [url, setUrl] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanStage, setScanStage] = useState('')
  const router = useRouter()

  const stages = [
    'Validating URL format...',
    'Expanding shortened links...',
    'Analyzing URL patterns...',
    'Checking domain reputation...',
    'Detecting suspicious keywords...',
    'Calculating threat score...',
    'Generating report...',
  ]

const handleScan = async () => {
  if (!url.trim()) return

  setIsScanning(true)
  setScanProgress(0)

  try {
    // Fake scanning animation
    for (let i = 0; i < stages.length; i++) {
      setScanStage(stages[i])
      await new Promise((resolve) => setTimeout(resolve, 400))
      setScanProgress(((i + 1) / stages.length) * 100)
    }

    // REAL backend API call
    const response = await fetch("https://shield-phishing-detection.onrender.com/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })

    if (!response.ok) {
      throw new Error("Backend request failed")
    }

    const data = await response.json()

    // Store result
    localStorage.setItem("scanResult", JSON.stringify(data))

    // Redirect to results page
    router.push("/scanner/results")

  } catch (error) {
    console.error("Scan Error:", error)
    alert("Failed to analyze URL")
  } finally {
    setIsScanning(false)
  }
}


  return (
    <div className="relative min-h-screen pt-24 pb-16">
      <ParticleField />
      
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Panel - Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6"
              >
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Advanced URL Analysis</span>
              </motion.div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Analyze Any <span className="text-primary text-glow-cyan">Suspicious URL</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our AI-powered scanner analyzes URLs for phishing patterns, malicious content, 
                and suspicious behaviors to keep you safe online.
              </p>
            </div>

            {/* Scan Features */}
            <div className="grid grid-cols-2 gap-4">
              {scanFeatures.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl glass border border-border/50"
                >
                  <feature.icon className="h-6 w-6 text-primary mb-2" />
                  <h3 className="font-medium mb-1">{feature.label}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent Threats */}
            <div className="hidden lg:block">
              <h3 className="text-lg font-semibold mb-4">Recently Detected Threats</h3>
              <div className="space-y-3">
                {recentThreats.map((threat, index) => (
                  <motion.div
                    key={threat.url}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg glass border border-red-500/20"
                  >
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      <span className="font-mono text-sm truncate max-w-[200px]">{threat.url}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">{threat.type}</span>
                      <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium">
                        {threat.risk}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Panel - Scanner */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="sticky top-28"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-3xl" />
              
              <div className="relative z-50 glass rounded-2xl p-8 gradient-border animate-border-glow">
                {/* Shield Animation */}
                <div className="flex justify-center mb-8">
                  <motion.div
                    animate={isScanning ? { 
                      rotate: 360,
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={isScanning ? { 
                      rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
                      scale: { duration: 1, repeat: Infinity }
                    } : {}}
                    className="relative"
                  >
                    <Shield className="h-20 w-20 text-primary" />
                    <motion.div
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-primary/30 blur-xl rounded-full"
                    />
                    {isScanning && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-0 border-2 border-primary rounded-full"
                      />
                    )}
                  </motion.div>
                </div>

                {/* Scanner Input */}
                <div className="space-y-6">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Enter URL to analyze..."
                      disabled={isScanning}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground font-mono text-sm disabled:opacity-50"
                      onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                    />
                    {url && !isScanning && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-y-0 right-4 flex items-center"
                      >
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </motion.div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <AnimatePresence>
                    {isScanning && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-3"
                      >
                        <div className="h-2 rounded-full bg-secondary overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${scanProgress}%` }}
                            className="h-full rounded-full bg-gradient-to-r from-primary to-cyan-400"
                          />
                        </div>
                        <p className="text-sm text-center text-muted-foreground font-mono">
                          {scanStage}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Scan Button */}
                  <button
                    type="button"
                    onClick={handleScan}
                    disabled={!url.trim() || isScanning}
                    className="relative z-50 w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100 glow-cyan"
                  >
                    {isScanning ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Analyzing URL...
                      </>
                    ) : (
                      <>
                        <Search className="h-5 w-5" />
                        Analyze URL
                      </>
                    )}
                  </button>

                  <p className="text-xs text-center text-muted-foreground">
                    Your URL will be analyzed securely. We do not store personal data.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
