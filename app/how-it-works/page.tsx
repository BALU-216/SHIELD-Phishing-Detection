'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { 
  Upload, 
  Link2, 
  Regex, 
  Search, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Zap
} from 'lucide-react'
import Link from 'next/link'

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'URL Submission',
    description: 'Enter any suspicious URL into our scanner. We accept full URLs, shortened links, and even encoded URLs.',
    details: ['Supports HTTP and HTTPS', 'Handles URL-encoded strings', 'Accepts shortened URLs'],
  },
  {
    number: '02',
    icon: Link2,
    title: 'URL Expansion',
    description: 'Our system automatically expands shortened URLs to reveal their true destinations.',
    details: ['Follows redirect chains', 'Reveals hidden destinations', 'Detects redirect loops'],
  },
  {
    number: '03',
    icon: Regex,
    title: 'Regex Analysis',
    description: 'Advanced pattern matching algorithms scan for known phishing URL structures.',
    details: ['50+ regex patterns', 'Custom rule engine', 'Real-time pattern updates'],
  },
  {
    number: '04',
    icon: Search,
    title: 'Keyword Detection',
    description: 'Identifies suspicious keywords commonly used in phishing attempts.',
    details: ['Brand impersonation detection', 'Urgency keyword scanning', 'Multilingual support'],
  },
  {
    number: '05',
    icon: Shield,
    title: 'Structure Detection',
    description: 'Analyzes URL structure for anomalies like excessive subdomains or suspicious TLDs.',
    details: ['Domain reputation check', 'TLD analysis', 'Subdomain inspection'],
  },
  {
    number: '06',
    icon: AlertTriangle,
    title: 'Threat Score Calculation',
    description: 'All indicators are weighted and combined into a comprehensive threat score.',
    details: ['ML-powered scoring', 'Weighted indicators', 'Confidence levels'],
  },
  {
    number: '07',
    icon: CheckCircle,
    title: 'Result Generation',
    description: 'A detailed report is generated with actionable recommendations.',
    details: ['Visual risk indicator', 'Detailed breakdown', 'Safety recommendations'],
  },
]

export default function HowItWorksPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  return (
    <div className="min-h-screen pt-24 pb-16" ref={containerRef}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6"
          >
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Our Process</span>
          </motion.div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            How <span className="text-primary text-glow-cyan">SHIELD</span> Works
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our advanced URL analysis system uses multiple layers of detection to identify 
            phishing attempts and protect you from online threats.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary to-primary/50" />
          
          {/* Animated Progress */}
          <motion.div
            className="absolute left-8 lg:left-1/2 top-0 w-px bg-primary glow-cyan"
            style={{
              height: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
            }}
          />

          {/* Steps */}
          <div className="space-y-12 lg:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
                className={`relative flex items-start gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Node */}
                <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    whileInView={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="w-16 h-16 rounded-full glass border-2 border-primary flex items-center justify-center glow-cyan"
                  >
                    <step.icon className="h-7 w-7 text-primary" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className={`flex-1 ml-24 lg:ml-0 ${
                  index % 2 === 0 ? 'lg:pr-32 lg:text-right' : 'lg:pl-32'
                }`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass rounded-2xl p-6 gradient-border"
                  >
                    <span className="text-5xl font-bold text-primary/20">{step.number}</span>
                    <h3 className="text-xl font-bold mt-2 mb-3">{step.title}</h3>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    <ul className={`space-y-2 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-center gap-2 text-sm text-muted-foreground">
                          {index % 2 !== 0 && <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />}
                          <span className={index % 2 === 0 ? 'lg:ml-auto' : ''}>{detail}</span>
                          {index % 2 === 0 && <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 hidden lg:block" />}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden lg:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-24"
        >
          <div className="glass rounded-3xl p-12 max-w-2xl mx-auto gradient-border animate-border-glow">
            <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Try It?
            </h2>
            <p className="text-muted-foreground mb-8">
              Experience our advanced URL analysis system firsthand. 
              Scan any suspicious link for free.
            </p>
            <Link
              href="/scanner"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-primary-foreground bg-primary rounded-xl hover:scale-105 transition-transform glow-cyan"
            >
              Start Scanning
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
