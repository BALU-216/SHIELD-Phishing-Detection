'use client'

import { motion } from 'framer-motion'

import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Link2,
  Copy,
  ArrowLeft,
  AlertOctagon
} from 'lucide-react'

import Link from 'next/link'

import { useState, useEffect } from 'react'

function ResultsContent() {

  const [analysis, setAnalysis] = useState<any>(null)

  const [copied, setCopied] = useState(false)

  useEffect(() => {

    const stored = localStorage.getItem('scanResult')

    if (stored) {

      const data = JSON.parse(stored)

      const transformed = {

        originalUrl: data.original_url,

        expandedUrl: data.expanded_url,

        score: data.score,

        riskLevel:
          data.risk === 'High Risk'
            ? 'high'
            : data.risk === 'Suspicious'
            ? 'suspicious'
            : 'safe',

        indicators: data.reasons.map((reason: string) => ({
          name: reason,
          detected: true,
          severity: 'medium',
        })),
      }

      setAnalysis(transformed)
    }

  }, [])

  const copyToClipboard = () => {

    navigator.clipboard.writeText(analysis.originalUrl)

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  if (!analysis) {

    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Shield className="h-12 w-12 text-primary" />
        </motion.div>

      </div>
    )
  }

  const riskColors = {

    safe: {
      bg: 'bg-green-500',
      text: 'text-green-400',
    },

    suspicious: {
      bg: 'bg-yellow-500',
      text: 'text-yellow-400',
    },

    high: {
      bg: 'bg-red-500',
      text: 'text-red-400',
    },
  }

  const colors =
    riskColors[analysis.riskLevel as keyof typeof riskColors]

  return (

    <div className="min-h-screen pt-24 pb-16">

      <div className="container mx-auto px-4 lg:px-8">

        <div className="mb-8">

          <Link
            href="/scanner"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >

            <ArrowLeft className="h-4 w-4" />

            Back to Scanner

          </Link>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-6">

            <div className="glass rounded-2xl p-8 gradient-border">

              <div className="flex flex-col lg:flex-row items-center gap-8">

                <div className="relative w-48 h-48 flex-shrink-0">

                  <svg className="w-full h-full transform -rotate-90">

                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="12"
                      className="text-secondary"
                    />

                    <motion.circle
                      cx="96"
                      cy="96"
                      r="80"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="12"
                      strokeLinecap="round"
                      className={colors.text}
                      strokeDasharray={502}
                      initial={{ strokeDashoffset: 502 }}
                      animate={{
                        strokeDashoffset:
                          502 - (502 * analysis.score) / 100,
                      }}
                      transition={{
                        duration: 1.5,
                        ease: 'easeOut',
                      }}
                    />

                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">

                    <span
                      className={`text-5xl font-bold ${colors.text}`}
                    >
                      {analysis.score}
                    </span>

                    <span className="text-sm text-muted-foreground">
                      Threat Score
                    </span>

                  </div>

                </div>

                <div className="flex-1 text-center lg:text-left">

                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${colors.bg}/10 border border-current ${colors.text} mb-4`}
                  >

                    {analysis.riskLevel === 'safe' && (
                      <CheckCircle className="h-5 w-5" />
                    )}

                    {analysis.riskLevel === 'suspicious' && (
                      <AlertTriangle className="h-5 w-5" />
                    )}

                    {analysis.riskLevel === 'high' && (
                      <AlertOctagon className="h-5 w-5" />
                    )}

                    <span className="font-semibold capitalize">
                      {analysis.riskLevel} Risk
                    </span>

                  </div>

                  <h2 className="text-2xl font-bold mb-2">

                    {analysis.riskLevel === 'safe' &&
                      'This URL appears safe'}

                    {analysis.riskLevel === 'suspicious' &&
                      'Suspicious patterns detected'}

                    {analysis.riskLevel === 'high' &&
                      'High-risk phishing URL detected'}

                  </h2>

                </div>

              </div>

            </div>

            <div className="glass rounded-2xl p-6 gradient-border">

              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">

                <Link2 className="h-5 w-5 text-primary" />

                URL Details

              </h3>

              <div className="space-y-4">

                <div>

                  <label className="text-sm text-muted-foreground mb-1 block">
                    Original URL
                  </label>

                  <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50 border border-border">

                    <code className="flex-1 text-sm font-mono truncate">
                      {analysis.originalUrl}
                    </code>

                    <button
                      onClick={copyToClipboard}
                      className="p-2 hover:bg-secondary rounded-lg transition-colors"
                    >

                      {copied ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-muted-foreground" />
                      )}

                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default function ResultsPage() {
  return <ResultsContent />
}