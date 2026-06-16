'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Activity,
  Globe,
  ExternalLink,
  Trash2,
  Eye,
  BarChart3,
  PieChart,
  User,
  Settings,
  LogOut
} from 'lucide-react'
import Link from 'next/link'

// Mock scan history data
const scanHistory = [
  {
    id: 1,
    url: 'https://paypa1-secure.com/verify',
    scannedAt: '2024-01-15 14:32',
    riskLevel: 'high',
    score: 92,
  },
  {
    id: 2,
    url: 'https://google.com/search?q=security',
    scannedAt: '2024-01-15 12:15',
    riskLevel: 'safe',
    score: 5,
  },
  {
    id: 3,
    url: 'https://bit.ly/3xK9m2P',
    scannedAt: '2024-01-14 18:45',
    riskLevel: 'suspicious',
    score: 67,
  },
  {
    id: 4,
    url: 'https://amaz0n-deals.xyz/offer',
    scannedAt: '2024-01-14 10:22',
    riskLevel: 'high',
    score: 88,
  },
  {
    id: 5,
    url: 'https://github.com/repo/security',
    scannedAt: '2024-01-13 16:08',
    riskLevel: 'safe',
    score: 3,
  },
  {
    id: 6,
    url: 'https://ngrok.io/tunnel/abc123',
    scannedAt: '2024-01-13 09:30',
    riskLevel: 'suspicious',
    score: 72,
  },
]

const stats = [
  { label: 'Total Scans', value: '156', icon: Search, color: 'text-primary' },
  { label: 'Safe URLs', value: '98', icon: CheckCircle, color: 'text-green-400' },
  { label: 'Suspicious', value: '42', icon: AlertTriangle, color: 'text-yellow-400' },
  { label: 'High Risk', value: '16', icon: Shield, color: 'text-red-400' },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'history' | 'stats'>('history')

  const getRiskBadge = (level: string, score: number) => {
    const styles = {
      safe: 'bg-green-500/10 text-green-400 border-green-500/30',
      suspicious: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
      high: 'bg-red-500/10 text-red-400 border-red-500/30',
    }
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[level as keyof typeof styles]}`}>
        {score}% Risk
      </span>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here&apos;s your security overview.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/scanner"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:scale-105 transition-transform glow-cyan-sm"
            >
              <Search className="h-5 w-5" />
              New Scan
            </Link>
            <button className="p-2.5 rounded-xl border border-border hover:bg-secondary/50 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-6 gradient-border"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <TrendingUp className="h-4 w-4 text-green-400" />
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Scan History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-2xl gradient-border overflow-hidden">
              {/* Tabs */}
              <div className="flex items-center border-b border-border">
                <button
                  onClick={() => setActiveTab('history')}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === 'history'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="h-4 w-4" />
                    Scan History
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('stats')}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === 'stats'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Statistics
                  </div>
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'history' ? (
                  <div className="space-y-3">
                    {scanHistory.map((scan, index) => (
                      <motion.div
                        key={scan.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-colors group"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <div className={`p-2 rounded-lg ${
                            scan.riskLevel === 'safe' ? 'bg-green-500/10' :
                            scan.riskLevel === 'suspicious' ? 'bg-yellow-500/10' : 'bg-red-500/10'
                          }`}>
                            {scan.riskLevel === 'safe' ? (
                              <CheckCircle className="h-5 w-5 text-green-400" />
                            ) : scan.riskLevel === 'suspicious' ? (
                              <AlertTriangle className="h-5 w-5 text-yellow-400" />
                            ) : (
                              <Shield className="h-5 w-5 text-red-400" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              <span className="font-mono text-sm truncate max-w-[300px]">
                                {scan.url}
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {scan.scannedAt}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {getRiskBadge(scan.riskLevel, scan.score)}
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            </button>
                            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                              <Trash2 className="h-4 w-4 text-muted-foreground" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Risk Distribution */}
                    <div>
                      <h3 className="font-semibold mb-4">Risk Distribution</h3>
                      <div className="flex items-center gap-4">
                        <div className="relative w-32 h-32">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="64"
                              cy="64"
                              r="56"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="16"
                              className="text-green-500/30"
                            />
                            <circle
                              cx="64"
                              cy="64"
                              r="56"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="16"
                              strokeDasharray="352"
                              strokeDashoffset="132"
                              className="text-green-500"
                            />
                            <circle
                              cx="64"
                              cy="64"
                              r="56"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="16"
                              strokeDasharray="352"
                              strokeDashoffset="258"
                              className="text-yellow-500"
                            />
                            <circle
                              cx="64"
                              cy="64"
                              r="56"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="16"
                              strokeDasharray="352"
                              strokeDashoffset="316"
                              className="text-red-500"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold">156</span>
                          </div>
                        </div>
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-3 h-3 rounded-full bg-green-500" />
                              <span className="text-sm">Safe</span>
                            </div>
                            <span className="text-sm font-medium">63%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-3 h-3 rounded-full bg-yellow-500" />
                              <span className="text-sm">Suspicious</span>
                            </div>
                            <span className="text-sm font-medium">27%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-3 h-3 rounded-full bg-red-500" />
                              <span className="text-sm">High Risk</span>
                            </div>
                            <span className="text-sm font-medium">10%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Weekly Activity */}
                    <div>
                      <h3 className="font-semibold mb-4">Weekly Activity</h3>
                      <div className="flex items-end gap-2 h-32">
                        {[40, 65, 45, 80, 55, 90, 70].map((height, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center gap-2">
                            <div
                              className="w-full bg-primary/20 rounded-t-lg relative overflow-hidden"
                              style={{ height: `${height}%` }}
                            >
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: '100%' }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="absolute inset-x-0 bottom-0 bg-primary rounded-t-lg"
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* User Profile Card */}
            <div className="glass rounded-2xl p-6 gradient-border">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">John Doe</div>
                  <div className="text-sm text-muted-foreground">john@example.com</div>
                </div>
              </div>
              <div className="pt-4 border-t border-border space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Member since</span>
                  <span>Jan 2024</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Plan</span>
                  <span className="text-primary">Free</span>
                </div>
              </div>
              <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-secondary/50 transition-colors">
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>

            {/* Recent Threats */}
            <div className="glass rounded-2xl p-6 gradient-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-red-400" />
                Recent Threats
              </h3>
              <div className="space-y-3">
                {scanHistory
                  .filter((s) => s.riskLevel !== 'safe')
                  .slice(0, 3)
                  .map((scan) => (
                    <div
                      key={scan.id}
                      className="p-3 rounded-lg bg-red-500/5 border border-red-500/20"
                    >
                      <div className="font-mono text-xs truncate mb-1">{scan.url}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{scan.scannedAt}</span>
                        <span className="text-xs text-red-400">{scan.score}% Risk</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass rounded-2xl p-6 gradient-border">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link
                  href="/scanner"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <Search className="h-5 w-5 text-primary" />
                  <span className="text-sm">Scan New URL</span>
                </Link>
                <Link
                  href="/threats"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm">Learn About Threats</span>
                </Link>
                <Link
                  href="/tools"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <Shield className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Security Tools</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
