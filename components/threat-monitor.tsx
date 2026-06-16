'use client'

import { motion } from 'framer-motion'
import { Shield, Activity, AlertTriangle, CheckCircle, Globe, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'

const threats = [
  { domain: 'bit.ly/3xK9m2P', status: 'scanning', risk: null },
  { domain: 'secure-paypa1.com/login', status: 'high', risk: 92 },
  { domain: 'amazon.com/orders', status: 'safe', risk: 5 },
  { domain: 'googIe.com/auth', status: 'high', risk: 88 },
  { domain: 'github.com/repo', status: 'safe', risk: 2 },
  { domain: 'ngrok.io/d7h2k', status: 'suspicious', risk: 67 },
]

export function ThreatMonitor() {
  const [activeScans, setActiveScans] = useState(247)
  const [blockedToday, setBlockedToday] = useState(1832)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScans((prev) => prev + Math.floor(Math.random() * 5))
      setBlockedToday((prev) => prev + Math.floor(Math.random() * 3))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-3xl" />
      
      <motion.div
        className="relative glass rounded-2xl p-6 gradient-border animate-border-glow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Shield className="h-8 w-8 text-primary" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-primary/30 rounded-full blur-md"
              />
            </div>
            <div>
              <h3 className="font-semibold">Live Threat Monitor</h3>
              <p className="text-xs text-muted-foreground">Real-time detection</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-xs font-medium text-green-400">Active</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-secondary/50 border border-border/50">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Activity className="h-4 w-4" />
              <span className="text-xs">Active Scans</span>
            </div>
            <div className="text-2xl font-bold text-primary">{activeScans}</div>
          </div>
          <div className="p-4 rounded-xl bg-secondary/50 border border-border/50">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs">Blocked Today</span>
            </div>
            <div className="text-2xl font-bold text-destructive">{blockedToday}</div>
          </div>
        </div>

        {/* Detection Rate */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Detection Accuracy</span>
            <span className="text-sm font-medium text-primary">98.7%</span>
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '98.7%' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-cyan-400"
            />
          </div>
        </div>

        {/* Recent Threats */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Recent Scans</span>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            {threats.slice(0, 4).map((threat, index) => (
              <motion.div
                key={threat.domain}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/30 border border-border/30"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Globe className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm font-mono truncate">{threat.domain}</span>
                </div>
                <StatusBadge status={threat.status} risk={threat.risk} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function StatusBadge({ status, risk }: { status: string; risk: number | null }) {
  if (status === 'scanning') {
    return (
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-blue-500/10 border border-blue-500/30">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="h-3 w-3 border-2 border-blue-500 border-t-transparent rounded-full"
        />
        <span className="text-xs font-medium text-blue-400">Scanning</span>
      </div>
    )
  }

  if (status === 'safe') {
    return (
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/30">
        <CheckCircle className="h-3 w-3 text-green-500" />
        <span className="text-xs font-medium text-green-400">Safe</span>
      </div>
    )
  }

  if (status === 'suspicious') {
    return (
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30">
        <AlertTriangle className="h-3 w-3 text-yellow-500" />
        <span className="text-xs font-medium text-yellow-400">{risk}%</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-red-500/10 border border-red-500/30">
      <AlertTriangle className="h-3 w-3 text-red-500" />
      <span className="text-xs font-medium text-red-400">{risk}%</span>
    </div>
  )
}
