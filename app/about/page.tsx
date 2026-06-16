'use client'

import { motion } from 'framer-motion'
import { 
  Shield, 
  Target, 
  Users, 
  Zap, 
  Github, 
  Mail,
  Globe,
  Code,
  Lock,
  Heart
} from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To make the internet safer by providing free, accessible tools for detecting phishing URLs and raising cyber security awareness.',
  },
  {
    icon: Users,
    title: 'Who We Help',
    description: 'Students, professionals, organizations, and anyone who wants to protect themselves from online threats.',
  },
  {
    icon: Zap,
    title: 'Our Approach',
    description: 'Using advanced pattern recognition, heuristics, and URL analysis to identify potential threats in real-time.',
  },
]

const techStack = [
  { name: 'React', desc: 'Frontend Framework' },
  { name: 'Next.js', desc: 'Full-stack Framework' },
  { name: 'Tailwind CSS', desc: 'Styling' },
  { name: 'Framer Motion', desc: 'Animations' },
  { name: 'TypeScript', desc: 'Type Safety' },
]

const team = [
  { name: 'Security Research', icon: Lock },
  { name: 'Frontend Development', icon: Code },
  { name: 'Threat Intelligence', icon: Shield },
]

export default function AboutPage() {
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
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex p-4 rounded-2xl glass border border-primary/30 mb-6"
          >
            <Shield className="h-12 w-12 text-primary" />
          </motion.div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            About <span className="text-primary text-glow-cyan">SHIELD</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-4">
            Secure Heuristic Intelligent Engine for Link Detection
          </p>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            SHIELD is an advanced phishing URL detection platform designed to help users 
            identify and avoid malicious links before they become victims of cyber attacks.
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-6 gradient-border text-center"
            >
              <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* What We Do */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="glass rounded-3xl p-8 lg:p-12 gradient-border">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">What We Do</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    SHIELD analyzes URLs using multiple layers of detection to identify phishing 
                    attempts, malicious redirects, and suspicious patterns that could indicate 
                    a threat to your security.
                  </p>
                  <p>
                    Our platform expands shortened URLs, detects suspicious domain patterns, 
                    analyzes URL structures, and calculates threat scores based on multiple 
                    indicators to give you a comprehensive risk assessment.
                  </p>
                  <p>
                    Beyond URL scanning, we provide educational resources about various cyber 
                    threats to help users understand and recognize potential attacks.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'URLs Analyzed', value: '2.8M+' },
                  { label: 'Threats Detected', value: '156K+' },
                  { label: 'Users Protected', value: '89K+' },
                  { label: 'Detection Rate', value: '98.7%' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-4 rounded-xl bg-secondary/50 border border-border text-center"
                  >
                    <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Built With</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 rounded-xl glass border border-border"
              >
                <span className="font-semibold">{tech.name}</span>
                <span className="text-muted-foreground text-sm ml-2">{tech.desc}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team/Focus Areas */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Our Focus Areas</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {team.map((area, index) => (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-6 text-center gradient-border"
              >
                <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-3">
                  <area.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">{area.name}</h3>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass rounded-3xl p-12 max-w-2xl mx-auto gradient-border animate-border-glow">
            <Heart className="h-12 w-12 text-red-400 mx-auto mb-6" />
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Built for Cyber Awareness
            </h2>
            <p className="text-muted-foreground mb-8">
              SHIELD is a project dedicated to improving online safety through 
              education and accessible security tools.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/scanner"
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-primary-foreground bg-primary rounded-xl hover:scale-105 transition-transform glow-cyan"
              >
                <Shield className="h-5 w-5" />
                Try Scanner
              </Link>
              <Link
                href="/threats"
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold border border-border rounded-xl hover:bg-secondary/50 transition-colors"
              >
                <Globe className="h-5 w-5" />
                Learn About Threats
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
