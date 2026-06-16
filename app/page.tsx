'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { 
  Shield, 
  Link2, 
  Regex, 
  Gauge, 
  Globe, 
  History, 
  BookOpen,
  ArrowRight,
  Activity,
  AlertTriangle,
  CheckCircle,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import { ParticleField } from '@/components/particle-field'
import { AnimatedCounter } from '@/components/animated-counter'
import { FeatureCard } from '@/components/feature-card'
import { ThreatMonitor } from '@/components/threat-monitor'

const features = [
  {
    icon: Link2,
    title: 'URL Expansion',
    description: 'Reveal hidden destinations behind shortened URLs like bit.ly, tinyurl, and more.',
  },
  {
    icon: Regex,
    title: 'Regex Pattern Detection',
    description: 'Detect suspicious structures, phishing tricks, and malicious URL patterns.',
  },
  {
    icon: Gauge,
    title: 'Threat Score Engine',
    description: 'Generate risk scores based on multiple phishing indicators and heuristics.',
  },
  {
    icon: Globe,
    title: 'Suspicious Domain Detection',
    description: 'Detect ngrok, trycloudflare, serveo, duckdns, and phishing-related domains.',
  },
  {
    icon: History,
    title: 'Scan History',
    description: 'Store previous scans securely in your dashboard for future reference.',
  },
  {
    icon: BookOpen,
    title: 'Cyber Awareness',
    description: 'Educate yourself about phishing, skimming, juice jacking, and online scams.',
  },
]

const stats = [
  { label: 'URLs Scanned', value: 2847593, suffix: '+' },
  { label: 'Threats Detected', value: 156842, suffix: '+' },
  { label: 'Users Protected', value: 89421, suffix: '+' },
  { label: 'Uptime', value: 99.9, suffix: '%' },
]

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20">
        <ParticleField />
        
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"
          />
        </div>

        <motion.div style={{ y, opacity }} className="relative z-10 container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-sm font-medium text-primary">AI-Powered Protection</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-balance"
              >
                Detect Phishing Links{' '}
                <span className="text-primary text-glow-cyan">Before They Attack</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed"
              >
                Analyze suspicious URLs, detect phishing patterns, expand shortened links, 
                and improve cyber security awareness in real time.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/scanner"
                  className="group relative inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-primary-foreground bg-primary rounded-xl overflow-hidden transition-transform hover:scale-105"
                >
                  <span className="relative z-10">Start Scanning</span>
                  <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-foreground border border-border rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>

            {/* Threat Monitor Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="hidden lg:block"
            >
              <ThreatMonitor />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-primary/50 flex justify-center pt-2"
          >
            <motion.div
              animate={{ opacity: [1, 0], y: [0, 16] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-primary rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 border-y border-border/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-primary text-glow-cyan">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Advanced Threat Detection{' '}
              <span className="text-primary">Features</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Our comprehensive suite of security tools helps you identify and prevent 
              phishing attacks before they can cause harm.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 lg:p-16 text-center max-w-4xl mx-auto gradient-border animate-border-glow"
          >
            <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Secure Your Links?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start analyzing URLs today and protect yourself from phishing attacks. 
              Our advanced detection system is free to use.
            </p>
            <Link
              href="/scanner"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-primary-foreground bg-primary rounded-xl hover:scale-105 transition-transform glow-cyan"
            >
              Start Free Scan
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold">SHIELD</span>
              <span className="text-sm text-muted-foreground">
                - Secure Heuristic Intelligent Engine for Link Detection
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
              <Link href="/how-it-works" className="hover:text-foreground transition-colors">How It Works</Link>
              <Link href="/threats" className="hover:text-foreground transition-colors">Threats</Link>
              <Link href="/tools" className="hover:text-foreground transition-colors">Tools</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/30 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} SHIELD. All rights reserved. Built for cyber awareness.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
