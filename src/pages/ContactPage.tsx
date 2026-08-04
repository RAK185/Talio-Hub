import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Building2,
  Headphones,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('technical');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does Gemini AI resume vector matching work?',
      a: 'When you upload a resume, our server proxy passes the text to Gemini 2.5 Flash to generate structured skill vectors and compare them directly against recruiter requirements for precise match scores.',
    },
    {
      q: 'How fast do recruiters respond to applications?',
      a: 'All recruiters on Talio Hub are verified. Over 85% of applicants receive initial feedback or interview scheduling invites within 48 hours via our real-time notification engine.',
    },
    {
      q: 'Is posting jobs free for recruiters?',
      a: 'Recruiters can publish up to 3 verified positions for free with standard AI match processing. Enterprise packages include dedicated talent partners and API integration.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const ticketId = `TICKET-#${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedMessage(`Support ticket ${ticketId} created. Response dispatched to ${email}`);
      showToast('System inquiry dispatched! Check your email for ticket confirmation.', 'success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 700);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 font-sans transition-colors">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-200 dark:bg-[#1C1917] border border-stone-300 dark:border-white/10 text-stone-900 dark:text-[#D4F268] text-xs font-mono font-semibold tracking-wider uppercase">
          <Headphones className="w-3.5 h-3.5 text-stone-900 dark:text-[#D4F268]" /> [SYSTEM_SUPPORT] CONTACT ENG TEAM
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif italic text-stone-900 dark:text-white">
          Direct Technical <span className="not-italic font-sans text-stone-900 dark:text-[#D4F268]">Communication</span>
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
          Have inquiries regarding API integration, recruiter verification, or candidate profile vectoring? Dispatch a direct query to our engineering team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column Info Cards */}
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-white/10 shadow-md flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-[#D4F268] border border-stone-200 dark:border-white/10 shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-mono text-stone-500 uppercase">Support Dispatch</p>
              <p className="text-sm font-bold text-stone-900 dark:text-white">support@taliohub.com</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-white/10 shadow-md flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-[#D4F268] border border-stone-200 dark:border-white/10 shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-mono text-stone-500 uppercase">Direct Protocol Line</p>
              <p className="text-sm font-bold text-stone-900 dark:text-white">+1 (800) 555-TALIO</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-white/10 shadow-md flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-[#D4F268] border border-stone-200 dark:border-white/10 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-mono text-stone-500 uppercase">Engineering HQ</p>
              <p className="text-sm font-bold text-stone-900 dark:text-white">San Francisco, CA 94105</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-stone-900 text-stone-200 border border-stone-800 shadow-md space-y-2 font-mono">
            <div className="flex items-center gap-2 text-[#D4F268] text-xs font-bold">
              <Clock className="w-4 h-4" /> Avg SLA Response
            </div>
            <p className="text-2xl font-bold text-white">&lt; 2.4 Hours</p>
            <p className="text-[11px] text-stone-400">Engineering support online 24/7/365.</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 space-y-6">
          <form
            onSubmit={handleSubmit}
            className="p-8 rounded-3xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-white/10 shadow-xl space-y-5"
          >
            {submittedMessage && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-[#D4F268] text-xs font-mono flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Message Dispatched!</p>
                  <p className="text-[11px] opacity-90">{submittedMessage}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-medium text-stone-700 dark:text-stone-300 mb-1.5 uppercase">
                  Candidate / Recruiter Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Morgan"
                  className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-white/10 text-xs text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:border-stone-900 dark:focus:border-[#D4F268] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-stone-700 dark:text-stone-300 mb-1.5 uppercase">
                  Verified Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@domain.com"
                  className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-white/10 text-xs text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:border-stone-900 dark:focus:border-[#D4F268] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-medium text-stone-700 dark:text-stone-300 mb-1.5 uppercase">
                  Inquiry Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-white/10 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-stone-900 dark:focus:border-[#D4F268] transition-colors cursor-pointer"
                >
                  <option value="technical">Technical & API Support</option>
                  <option value="recruiter">Recruiter Ledger Verification</option>
                  <option value="candidate">Candidate Profile & Skill Analysis</option>
                  <option value="billing">Enterprise & Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-stone-700 dark:text-stone-300 mb-1.5 uppercase">
                  Subject Headline
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Requesting recruiter API key setup"
                  className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-white/10 text-xs text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:border-stone-900 dark:focus:border-[#D4F268] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-stone-700 dark:text-stone-300 mb-1.5 uppercase">
                Detailed Inquiry Message
              </label>
              <textarea
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your technical inquiry or platform question in detail..."
                className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-white/10 text-xs text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:border-stone-900 dark:focus:border-[#D4F268] transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-stone-900 text-white dark:bg-[#D4F268] dark:text-[#0C0A09] text-xs font-bold shadow-lg hover:bg-stone-800 dark:hover:bg-lime-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Transmitting Query...' : 'Dispatch Ticket To Engineering'}</span>
            </button>
          </form>
        </div>

      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-6 pt-6 border-t border-stone-200 dark:border-white/10">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-serif italic text-stone-900 dark:text-white">System FAQs</h2>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 font-mono">
            Quick answers regarding platform capabilities and vector evaluation
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-white/10 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full p-5 flex items-center justify-between text-left cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-900/50"
              >
                <span className="text-xs font-bold text-stone-900 dark:text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-stone-800 dark:text-[#D4F268]" />
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openFaq === index && (
                <div className="px-5 pb-5 text-xs text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
