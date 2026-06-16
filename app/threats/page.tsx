'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Fish, 
  Smartphone, 
  CreditCard, 
  Bug, 
  Wifi, 
  Users,
  ChevronDown,
  Shield,
  AlertTriangle,
  CheckCircle,
  X
} from 'lucide-react'
import Link from 'next/link'

const threats = [
  {
    id: 'phishing',
    icon: Fish,
    name: 'Phishing',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    shortDesc: 'Fraudulent attempts to steal sensitive information through deceptive emails and websites.',
    fullDesc: 'Phishing is a type of social engineering attack where criminals send fraudulent communications that appear to come from a reputable source. The goal is to steal sensitive data like login credentials, credit card numbers, or install malware on the victim\'s system.',
    examples: [
      'Fake bank emails asking to verify account details',
      'Impersonated login pages for popular services',
      'Urgent messages claiming account suspension',
    ],
    prevention: [
      'Always verify sender email addresses',
      'Never click links in suspicious emails',
      'Use two-factor authentication',
      'Check URL before entering credentials',
    ],
  },
  {
    id: 'juice-jacking',
    icon: Smartphone,
    name: 'Juice Jacking',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    shortDesc: 'Malicious USB charging stations that steal data or install malware on your device.',
    fullDesc: 'Juice jacking occurs when attackers compromise public USB charging stations or cables to steal data from connected devices or install malware. When you plug your phone into a compromised port, it can transfer data both ways.',
    examples: [
      'Compromised airport charging stations',
      'Modified USB cables given as "free" gifts',
      'Public kiosk charging points',
    ],
    prevention: [
      'Use your own charger and AC outlet',
      'Carry a portable power bank',
      'Use USB data blockers',
      'Disable data transfer when charging',
    ],
  },
  {
    id: 'web-skimming',
    icon: CreditCard,
    name: 'Web Skimming',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    shortDesc: 'Malicious code injected into e-commerce sites to steal payment information.',
    fullDesc: 'Web skimming (also known as Magecart attacks) involves injecting malicious JavaScript code into e-commerce checkout pages. This code captures payment card details and sends them to attackers in real-time.',
    examples: [
      'Compromised online store payment forms',
      'Third-party script injection attacks',
      'Fake payment overlays',
    ],
    prevention: [
      'Use virtual credit cards for online shopping',
      'Shop on trusted, verified websites',
      'Monitor bank statements regularly',
      'Use payment services like PayPal',
    ],
  },
  {
    id: 'malware-links',
    icon: Bug,
    name: 'Malware Links',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    shortDesc: 'Links that download malicious software designed to damage or gain unauthorized access.',
    fullDesc: 'Malware links redirect users to websites that automatically download malicious software. This can include ransomware, spyware, keyloggers, or trojans that can steal data, encrypt files, or give attackers remote access.',
    examples: [
      'Drive-by download websites',
      'Fake software update prompts',
      'Malicious email attachments',
    ],
    prevention: [
      'Keep software and OS updated',
      'Use reputable antivirus software',
      'Scan downloads before opening',
      'Disable automatic downloads',
    ],
  },
  {
    id: 'mitm',
    icon: Wifi,
    name: 'Man-in-the-Middle',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    shortDesc: 'Attackers intercept communications between two parties to steal or alter data.',
    fullDesc: 'In a Man-in-the-Middle (MITM) attack, the attacker secretly intercepts and potentially alters communications between two parties who believe they are communicating directly with each other. This is common on unsecured public WiFi networks.',
    examples: [
      'Evil twin WiFi hotspots',
      'SSL stripping attacks',
      'ARP spoofing on networks',
    ],
    prevention: [
      'Avoid public WiFi for sensitive tasks',
      'Use a VPN on public networks',
      'Ensure HTTPS on all websites',
      'Verify SSL certificates',
    ],
  },
  {
    id: 'social-engineering',
    icon: Users,
    name: 'Social Engineering',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    shortDesc: 'Psychological manipulation to trick people into revealing confidential information.',
    fullDesc: 'Social engineering exploits human psychology rather than technical vulnerabilities. Attackers manipulate people into breaking security procedures, revealing sensitive information, or performing actions that compromise security.',
    examples: [
      'Pretexting phone calls from "IT support"',
      'Baiting with infected USB drives',
      'Quid pro quo service offers',
    ],
    prevention: [
      'Verify identity before sharing info',
      'Be skeptical of unsolicited contact',
      'Follow security procedures strictly',
      'Report suspicious interactions',
    ],
  },
]

export default function ThreatsPage() {
  const [expandedThreat, setExpandedThreat] = useState<string | null>(null)

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-red-500/30 mb-6"
          >
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <span className="text-sm font-medium text-red-400">Cyber Threats</span>
          </motion.div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Know Your <span className="text-primary text-glow-cyan">Threats</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Understanding cyber threats is the first step to protecting yourself. 
            Learn about common attack methods and how to stay safe.
          </p>
        </motion.div>

        {/* Threat Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {threats.map((threat, index) => (
            <motion.div
              key={threat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <motion.div
                whileHover={{ y: -5 }}
                className={`glass rounded-2xl p-6 h-full cursor-pointer border-2 transition-colors ${
                  expandedThreat === threat.id ? threat.borderColor : 'border-transparent hover:border-border'
                }`}
                onClick={() => setExpandedThreat(expandedThreat === threat.id ? null : threat.id)}
              >
                <div className={`inline-flex p-3 rounded-xl ${threat.bgColor} mb-4`}>
                  <threat.icon className={`h-6 w-6 ${threat.color}`} />
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {threat.name}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4">
                  {threat.shortDesc}
                </p>

                <div className="flex items-center gap-2 text-sm text-primary">
                  <span>Learn more</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${
                    expandedThreat === threat.id ? 'rotate-180' : ''
                  }`} />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Expanded Threat Details Modal */}
        <AnimatePresence>
          {expandedThreat && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
              onClick={() => setExpandedThreat(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glass rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto gradient-border"
              >
                {(() => {
                  const threat = threats.find((t) => t.id === expandedThreat)!
                  return (
                    <>
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl ${threat.bgColor}`}>
                            <threat.icon className={`h-8 w-8 ${threat.color}`} />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold">{threat.name}</h2>
                            <p className="text-muted-foreground">Cyber Threat</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setExpandedThreat(null)}
                          className="p-2 hover:bg-secondary rounded-lg transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {threat.fullDesc}
                      </p>

                      <div className="space-y-6">
                        <div>
                          <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-400" />
                            Common Examples
                          </h3>
                          <ul className="space-y-2">
                            {threat.examples.map((example) => (
                              <li key={example} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                                {example}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <Shield className="h-5 w-5 text-green-400" />
                            How to Protect Yourself
                          </h3>
                          <ul className="space-y-2">
                            {threat.prevention.map((tip) => (
                              <li key={tip} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-border">
                        <Link
                          href="/scanner"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:scale-105 transition-transform"
                        >
                          <Shield className="h-5 w-5" />
                          Scan a Suspicious URL
                        </Link>
                      </div>
                    </>
                  )
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 lg:p-12 gradient-border"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              General Security Tips
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow these best practices to stay safe from all types of cyber threats.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { tip: 'Use strong, unique passwords', icon: '🔐' },
              { tip: 'Enable two-factor authentication', icon: '🛡️' },
              { tip: 'Keep software updated', icon: '🔄' },
              { tip: 'Verify before you trust', icon: '✅' },
            ].map((item, index) => (
              <motion.div
                key={item.tip}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-4 rounded-xl bg-secondary/50 border border-border text-center"
              >
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <p className="text-sm font-medium">{item.tip}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
