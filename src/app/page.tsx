"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BarChart3,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  Star
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1 text-sm font-medium text-blue-400 mb-6 glass">
            <Zap className="mr-2 h-4 w-4" />
            <span>AI-Powered Review Excellence</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-8">
            Manage your reputation at <span className="gradient-text">scale</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            The enterprise review management platform for multi-branch businesses.
            Powered by Gemini AI for sentiment analysis and auto-replies.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center transition-all shadow-xl shadow-blue-500/20 group"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/submit"
              className="glass px-8 py-4 rounded-2xl font-bold text-white hover:bg-white/10 transition-all"
            >
              View Demo Form
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {[
          {
            title: "Multi-Branch Support",
            desc: "Centralize reviews from hundreds of locations into one premium dashboard.",
            icon: Globe,
            color: "text-blue-400"
          },
          {
            title: "AI Sentiment Analysis",
            desc: "Automatically categorize reviews and detect urgency using Gemini AI.",
            icon: BarChart3,
            color: "text-purple-400"
          },
          {
            title: "Smart Escalations",
            desc: "Instantly alert branch managers for critical negative feedback.",
            icon: Shield,
            color: "text-emerald-400"
          }
        ].map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-all group"
          >
            <div className={`p-3 bg-white/5 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform`}>
              <feature.icon className={`w-8 h-8 ${feature.color}`} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </section>

      {/* Social Proof / Mockup Section */}
      <section className="py-20 w-full">
        <div className="glass p-4 rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/5 to-transparent relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-500/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl">
            <div className="bg-slate-900 aspect-video flex items-center justify-center p-12">
              <div className="text-center">
                <Star className="w-16 h-16 text-blue-500/50 mx-auto mb-6 animate-pulse" />
                <h4 className="text-2xl font-bold text-white/50">Dashboard Preview</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 w-full text-center">
        <div className="glass p-12 rounded-[3rem] border border-blue-500/20 bg-blue-500/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px]" />
          <h2 className="text-4xl font-bold text-white mb-6">Ready to transform your reputation?</h2>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
            Join 500+ branches already using ReviewFlow to deliver world-class customer experiences.
          </p>
          <Link
            href="/dashboard"
            className="bg-white text-slate-950 hover:bg-slate-200 px-10 py-4 rounded-2xl font-bold transition-all inline-block"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-muted-foreground text-sm border-t border-white/5 w-full text-center">
        <p>© 2026 ReviewFlow Inc. Built for the billion-dollar future.</p>
      </footer>
    </div>
  );
}
