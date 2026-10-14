import React, { useState } from 'react';
import { portfolioConfig } from '../portfolio.config';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  AlertCircle, 
  Github, 
  Linkedin, 
  FileText, 
  ExternalLink,
  Settings2,
  CheckCircle2
} from 'lucide-react';

interface ContactProps {
  onOpenGuide: () => void;
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC<ContactProps> = ({ onOpenGuide }) => {
  const { personal, contactProviderDocs } = portfolioConfig;

  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  // Accessible client-side validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g., name@domain.com).';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject line is required.';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject should be at least 3 characters.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide a message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for edited field
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Prepare real mailto URI
    const encodedSubject = encodeURIComponent(formData.subject.trim());
    const encodedBody = encodeURIComponent(
      `Hello Aniket,\n\nName: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}`
    );
    const mailtoUrl = `mailto:${personal.email}?subject=${encodedSubject}&body=${encodedBody}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Trigger user's mail client directly
      window.location.href = mailtoUrl;
    }, 400);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyFormattedMessage = () => {
    const formatted = `To: ${personal.email}\nFrom: ${formData.name} <${formData.email}>\nSubject: ${formData.subject}\n\n${formData.message}`;
    navigator.clipboard.writeText(formatted);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header with Fluid Clamp Scale */}
        <div className="max-w-2xl mb-16">
          <div className="text-[clamp(0.6875rem,0.8vw,0.8125rem)] font-mono tracking-wider uppercase text-[#BEF264] mb-3">
            05. Contact & Collaboration
          </div>
          <h2 className="text-[clamp(2.15rem,4vw+0.25rem,3.15rem)] font-bold tracking-tight text-white mb-4">
            Let's Connect
          </h2>
          <p className="text-[clamp(1rem,1.1vw+0.15rem,1.15rem)] text-zinc-300 leading-relaxed">
            Have a question about my projects, interested in discussing software architecture, or want to exchange ideas on practical innovation? Reach out directly.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Channels & Profiles */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Email Card */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[#BEF264] uppercase tracking-wider">
                  Direct Inquiries
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#BEF264]" />
                      <span className="text-[#BEF264]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href={`mailto:${personal.email}`}
                className="text-lg sm:text-xl font-bold text-white hover:text-[#BEF264] transition-colors break-all block mb-2"
              >
                {personal.email}
              </a>

              <p className="text-xs text-zinc-400 leading-relaxed">
                Preferred for technical inquiries, discussions, and project collaboration.
              </p>
            </div>

            {/* Social Channels & Resume */}
            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5 space-y-4">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Profiles & Credentials
              </div>

              {/* GitHub */}
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <div className="flex items-center gap-2.5 text-sm text-zinc-300">
                  <Github className="w-4 h-4 text-zinc-400" />
                  <span>GitHub</span>
                  {personal.isGithubPlaceholder && (
                    <span className="text-[10px] text-zinc-500 font-mono">(placeholder)</span>
                  )}
                </div>
                <a
                  href={personal.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Visit</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* LinkedIn */}
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <div className="flex items-center gap-2.5 text-sm text-zinc-300">
                  <Linkedin className="w-4 h-4 text-zinc-400" />
                  <span>LinkedIn</span>
                  {personal.isLinkedinPlaceholder && (
                    <span className="text-[10px] text-zinc-500 font-mono">(placeholder)</span>
                  )}
                </div>
                <a
                  href={personal.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Connect</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Resume */}
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2.5 text-sm text-zinc-300">
                  <FileText className="w-4 h-4 text-zinc-400" />
                  <span>Resume</span>
                  {personal.isResumePlaceholder && (
                    <span className="text-[10px] text-amber-400/80 font-mono">(pending link)</span>
                  )}
                </div>
                {personal.isResumePlaceholder ? (
                  <button
                    onClick={onOpenGuide}
                    className="text-xs text-[#BEF264] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Add Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                ) : (
                  <a
                    href={personal.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#BEF264] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Resume</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            {/* Provider Setup Documentation Trigger */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-white/10 flex items-start justify-between gap-4">
              <div>
                <h4 className="text-xs font-semibold text-white mb-1 flex items-center gap-2">
                  <Settings2 className="w-3.5 h-3.5 text-[#BEF264]" />
                  <span>Configuring Form Delivery</span>
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Need automatic form routing without opening a mail client? Follow the Formspree or Resend integration guide.
                </p>
              </div>
              <button
                onClick={onOpenGuide}
                className="shrink-0 px-3 py-1.5 text-xs font-medium text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors border border-white/10"
              >
                View Docs
              </button>
            </div>

          </div>

          {/* Right Column: Real Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-white/10 relative">
              
              <h3 className="text-lg font-bold text-white mb-6">
                Send a Direct Message
              </h3>

              {submitSuccess ? (
                <div className="p-6 rounded-xl bg-zinc-950 border border-[#BEF264]/30 space-y-4">
                  <div className="flex items-center gap-2.5 text-[#BEF264]">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span className="font-semibold text-sm">Message Prepared Successfully</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    Your default mail client was triggered with your message pre-populated for <strong className="text-white">{personal.email}</strong>.
                  </p>
                  <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleCopyFormattedMessage}
                      className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg border border-white/10 transition-colors"
                    >
                      {copiedMessage ? <Check className="w-3.5 h-3.5 text-[#BEF264]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedMessage ? 'Message Copied!' : 'Copy Formatted Text'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setSubmitSuccess(false);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="px-3.5 py-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                    >
                      Write Another Note
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  
                  {/* Name Field */}
                  <div>
                    <label 
                      htmlFor="name" 
                      className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2"
                    >
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Morgan"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-white text-sm placeholder:text-zinc-600 focus:ring-1 focus:ring-[#BEF264] transition-colors ${
                        errors.name ? 'border-red-500/70 focus:border-red-500' : 'border-white/10 focus:border-[#BEF264]'
                      }`}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label 
                      htmlFor="email" 
                      className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2"
                    >
                      Your Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@example.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-white text-sm placeholder:text-zinc-600 focus:ring-1 focus:ring-[#BEF264] transition-colors ${
                        errors.email ? 'border-red-500/70 focus:border-red-500' : 'border-white/10 focus:border-[#BEF264]'
                      }`}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label 
                      htmlFor="subject" 
                      className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2"
                    >
                      Subject <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Software Engineering Opportunity / Collaboration"
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? 'subject-error' : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-white text-sm placeholder:text-zinc-600 focus:ring-1 focus:ring-[#BEF264] transition-colors ${
                        errors.subject ? 'border-red-500/70 focus:border-red-500' : 'border-white/10 focus:border-[#BEF264]'
                      }`}
                    />
                    {errors.subject && (
                      <p id="subject-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label 
                      htmlFor="message" 
                      className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2"
                    >
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your note or opportunity details..."
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-white text-sm placeholder:text-zinc-600 focus:ring-1 focus:ring-[#BEF264] transition-colors resize-none ${
                        errors.message ? 'border-red-500/70 focus:border-red-500' : 'border-white/10 focus:border-[#BEF264]'
                      }`}
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Form Submission Actions */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-[#090A0F] bg-[#BEF264] hover:bg-[#d9f99d] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all shadow-sm"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-[#090A0F] border-t-transparent rounded-full animate-spin" />
                          <span>Preparing...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Open Email Client</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (validateForm()) {
                          handleCopyFormattedMessage();
                        }
                      }}
                      className="w-full sm:w-auto text-xs text-zinc-400 hover:text-white flex items-center justify-center gap-1.5 py-2 transition-colors"
                      title="Validate and copy formatted message to clipboard"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedMessage ? 'Copied to clipboard!' : 'Copy to clipboard'}</span>
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
