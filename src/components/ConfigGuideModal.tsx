import React, { useEffect, useState } from 'react';
import { portfolioConfig } from '../portfolio.config';
import { X, Check, Copy, Terminal, ExternalLink, ShieldCheck, Rocket, Code, FileText } from 'lucide-react';

interface ConfigGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfigGuideModal: React.FC<ConfigGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'placeholders' | 'contact' | 'deployment' | 'analytics'>('placeholders');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const copySnippet = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-title"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-3xl bg-[#0D0F16] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-zinc-900/40">
          <div>
            <div className="text-xs font-mono text-[#BEF264] uppercase tracking-wider mb-1">
              Developer Guide & Customization
            </div>
            <h3 id="guide-title" className="text-xl font-bold text-white">
              Portfolio Configuration & Deployment
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg border border-white/10 hover:border-white/20 transition-colors"
            aria-label="Close guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center overflow-x-auto border-b border-white/10 px-6 bg-zinc-900/20 text-xs font-medium">
          <button
            onClick={() => setActiveTab('placeholders')}
            className={`py-3 px-4 border-b-2 font-mono whitespace-nowrap transition-colors ${
              activeTab === 'placeholders'
                ? 'border-[#BEF264] text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            01. Personal Placeholders
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`py-3 px-4 border-b-2 font-mono whitespace-nowrap transition-colors ${
              activeTab === 'contact'
                ? 'border-[#BEF264] text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            02. Contact Provider Setup
          </button>
          <button
            onClick={() => setActiveTab('deployment')}
            className={`py-3 px-4 border-b-2 font-mono whitespace-nowrap transition-colors ${
              activeTab === 'deployment'
                ? 'border-[#BEF264] text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            03. GitHub & Vercel Deploy
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-3 px-4 border-b-2 font-mono whitespace-nowrap transition-colors ${
              activeTab === 'analytics'
                ? 'border-[#BEF264] text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            04. Web Analytics & Privacy
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-zinc-300">
          
          {/* TAB 1: PLACEHOLDERS */}
          {activeTab === 'placeholders' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5">
                <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                  <Code className="w-4 h-4 text-[#BEF264]" />
                  <span>Config File Location</span>
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                  src/portfolio.config.ts
                </p>
                <p className="text-xs text-zinc-400 mt-2">
                  All personal details, URLs, and projects are isolated in this single file. You never need to hunt through component files to change links.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                  Summary of Placeholder Items to Update:
                </h4>
                <div className="space-y-3">
                  <div className="p-3.5 rounded-lg bg-zinc-950 border border-emerald-500/30 flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-medium text-white flex items-center gap-2">
                        <span>GitHub Profile URL</span>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded flex items-center gap-1">
                          <Check className="w-3 h-3" /> Active & Connected
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 font-mono mt-1 break-all">
                        {portfolioConfig.personal.githubUrl}
                      </p>
                    </div>
                    <span className="text-xs text-zinc-500 font-mono">portfolio.config.ts</span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-zinc-950 border border-emerald-500/30 flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-medium text-white flex items-center gap-2">
                        <span>LinkedIn Profile URL</span>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded flex items-center gap-1">
                          <Check className="w-3 h-3" /> Active & Connected
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 font-mono mt-1 break-all">
                        {portfolioConfig.personal.linkedinUrl}
                      </p>
                    </div>
                    <span className="text-xs text-zinc-500 font-mono">portfolio.config.ts</span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-zinc-950 border border-emerald-500/30 flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-medium text-white flex items-center gap-2">
                        <span>Resume Google Drive Link</span>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded flex items-center gap-1">
                          <Check className="w-3 h-3" /> Active & Connected
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 font-mono mt-1 break-all line-clamp-1">
                        {portfolioConfig.personal.resumeUrl}
                      </p>
                    </div>
                    <span className="text-xs text-zinc-500 font-mono">portfolio.config.ts</span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-zinc-950 border border-white/10 flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-medium text-white flex items-center gap-2">
                        <span>Project Source Code Repositories</span>
                        <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded">Optional</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1">
                        Gatherly live deployment is active (<a href="https://gatherly-green.vercel.app/" target="_blank" rel="noreferrer" className="text-[#BEF264] underline">gatherly-green.vercel.app</a>). When you push code repositories for FinSathi, FoodSwap, etc., you can toggle <code className="text-zinc-200">isSourcePlaceholder: false</code> in <code className="text-[#BEF264]">src/portfolio.config.ts</code>.
                      </p>
                    </div>
                    <span className="text-xs text-zinc-500 font-mono">portfolio.config.ts</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONTACT PROVIDER */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5">
                <h4 className="text-sm font-semibold text-white mb-1">
                  Zero Simulation Policy
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  As required, this app does not fabricate email delivery. By default, it uses a rich <code className="text-[#BEF264]">mailto:</code> trigger and clipboard formatter. To connect automated form delivery without exposing API keys:
                </p>
              </div>

              {/* Formspree Option */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono text-[#BEF264] uppercase tracking-wider">
                    Option A: Formspree (Client-Side, Free Tier)
                  </h4>
                  <a
                    href="https://formspree.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
                  >
                    <span>formspree.io</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-xs text-zinc-300">
                  <li>Register for a free account at Formspree.</li>
                  <li>Create a new form and copy your endpoint ID (e.g. <code className="text-zinc-200">f/xzyq1234</code>).</li>
                  <li>In your form submit handler, send a POST request with JSON payload:</li>
                </ol>
                <div className="relative">
                  <pre className="p-3 rounded-lg bg-zinc-900 text-xs font-mono text-zinc-300 overflow-x-auto">
{`await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});`}
                  </pre>
                  <button
                    onClick={() => copySnippet(`await fetch('https://formspree.io/f/YOUR_FORM_ID', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });`, 'formspree')}
                    className="absolute top-2 right-2 p-1.5 text-zinc-400 hover:text-white rounded bg-zinc-800"
                  >
                    {copiedCode === 'formspree' ? <Check className="w-3.5 h-3.5 text-[#BEF264]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Resend Option */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                    Option B: Resend (Backend Express Proxy)
                  </h4>
                  <a
                    href="https://resend.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
                  >
                    <span>resend.com</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-zinc-400">
                  Keep your RESEND_API_KEY server-side. Add this route to <code className="text-zinc-200">server.ts</code>:
                </p>
                <div className="relative">
                  <pre className="p-3 rounded-lg bg-zinc-900 text-xs font-mono text-zinc-300 overflow-x-auto">
{`// server.ts
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to: 'er.aniket200@gmail.com',
    subject: \`[Portfolio] \${subject}\`,
    text: \`From: \${name} (\${email})\\n\\n\${message}\`
  });
  res.json({ success: true });
});`}
                  </pre>
                  <button
                    onClick={() => copySnippet(`// server.ts snippet for Resend`, 'resend')}
                    className="absolute top-2 right-2 p-1.5 text-zinc-400 hover:text-white rounded bg-zinc-800"
                  >
                    {copiedCode === 'resend' ? <Check className="w-3.5 h-3.5 text-[#BEF264]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DEPLOYMENT */}
          {activeTab === 'deployment' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  1. Push to GitHub
                </h4>
                <div className="relative">
                  <pre className="p-3 rounded-lg bg-zinc-950 border border-white/10 text-xs font-mono text-zinc-300 space-y-1">
git remote add origin https://github.com/AniketOfficial26/aniket-portfolio.git
git branch -M main
git push -u origin main
                  </pre>
                  <button
                    onClick={() => copySnippet(`git remote add origin https://github.com/AniketOfficial26/aniket-portfolio.git\ngit branch -M main\ngit push -u origin main`, 'git')}
                    className="absolute top-2 right-2 p-1.5 text-zinc-400 hover:text-white rounded bg-zinc-800"
                  >
                    {copiedCode === 'git' ? <Check className="w-3.5 h-3.5 text-[#BEF264]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  2. Deploy to Vercel (Recommended)
                </h4>
                <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 space-y-2 text-xs text-zinc-300">
                  <p><strong>Option A (CLI):</strong></p>
                  <pre className="p-2.5 rounded bg-zinc-900 font-mono text-zinc-200">
npm i -g vercel
vercel
                  </pre>
                  <p className="pt-2"><strong>Option B (Web Dashboard):</strong></p>
                  <ol className="list-decimal list-inside space-y-1 text-zinc-400">
                    <li>Go to <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-[#BEF264] underline">vercel.com</a> and click <strong>Add New Project</strong>.</li>
                    <li>Import your GitHub repository.</li>
                    <li>Framework Preset is auto-detected as <strong>Vite</strong>.</li>
                    <li>Click <strong>Deploy</strong>. Your site goes live in ~45 seconds!</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: VERCEL WEB ANALYTICS & PRIVACY */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#BEF264] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Integrated Official Package: @vercel/analytics</span>
                </div>
                <h4 className="text-sm font-semibold text-white">
                  Real Website Traffic Insights (Private to Your Dashboard)
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  The official <code className="text-[#BEF264]">@vercel/analytics</code> package has been installed and mounted as <code className="text-zinc-200">&lt;Analytics /&gt;</code> in your root <code className="text-zinc-200">src/App.tsx</code>. It tracks page views and client-side navigation automatically when deployed on Vercel.
                </p>
              </div>

              {/* Step by step enablement */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 space-y-3">
                <h5 className="text-xs font-mono text-white uppercase tracking-wider">
                  How to Enable in Your Vercel Project
                </h5>
                <ol className="list-decimal list-inside space-y-2 text-xs text-zinc-300">
                  <li>Deploy your repository to Vercel (or link your existing project).</li>
                  <li>In your Vercel Project Dashboard, navigate to the <strong className="text-white">Analytics</strong> tab at the top.</li>
                  <li>Click <strong className="text-[#BEF264]">"Enable Web Analytics"</strong>.</li>
                  <li>Vercel will immediately start aggregating real visitor counts, top referrers, device breakdown, and geographic regions.</li>
                </ol>
              </div>

              {/* Free Allowance & Safeguards */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 space-y-2 text-xs text-zinc-300">
                <h5 className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                  Free Vercel Hobby Tier & Safeguards
                </h5>
                <p className="leading-relaxed text-zinc-400">
                  Under Vercel's official documentation (<a href="https://vercel.com/docs/analytics" target="_blank" rel="noreferrer" className="text-[#BEF264] underline">vercel.com/docs/analytics</a>), the free Hobby plan includes up to <strong className="text-white">50,000 analytics events per month</strong>. If the allowance is ever reached, collection gracefully pauses for the remainder of the month with zero surprise costs.
                </p>
              </div>

              {/* Privacy & No-PII Guarantee */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-emerald-500/20 space-y-2 text-xs text-zinc-300">
                <h5 className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                  Privacy & Data Protection Standards
                </h5>
                <ul className="space-y-1.5 text-zinc-400 list-disc list-inside">
                  <li><strong className="text-zinc-200">Zero Personal Data:</strong> Form inputs (names, emails, subjects, messages) are strictly excluded. Analytics only tracks high-level aggregated page views and anonymous device types.</li>
                  <li><strong className="text-zinc-200">Cookieless:</strong> Vercel Web Analytics does not place third-party tracking cookies on visitors' devices, respecting GDPR and privacy preferences.</li>
                  <li><strong className="text-zinc-200">Private Dashboard:</strong> Statistics are never displayed publicly on your portfolio—you view them securely in your private Vercel dashboard.</li>
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-5 border-t border-white/10 bg-zinc-900/40 flex items-center justify-between text-xs text-zinc-400">
          <span>Single configuration source: <code className="text-zinc-200">src/portfolio.config.ts</code></span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#090A0F] bg-[#BEF264] hover:bg-[#d9f99d] rounded-lg transition-colors"
          >
            Got it
          </button>
        </div>

      </div>
    </div>
  );
};
