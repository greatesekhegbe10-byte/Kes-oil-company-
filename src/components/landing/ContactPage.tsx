import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { CorporateFooter } from './CorporateFooter';
import { usePlatform } from '../../context/PlatformContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Building2 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addToast, setSurface } = usePlatform();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    serviceCategory: 'FEED & Engineering',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Enquiry Transmitted', 'Your formal operational request has been routed to commercial tenders.', 'success');
  };

  return (
    <div className="min-h-screen bg-[#071629] text-white flex flex-col">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-[#071629]">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="/hero/hero3.jpg"
            alt="KES Infrastructure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071629] via-[#071629]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#153C65]/80 border border-[#2563EB]/40 text-[#F4B323] text-xs font-black uppercase tracking-[0.2em] mb-4">
              <span>Direct Commercial Intake</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight mb-6">
              Connect with KES <br />
              <span className="text-[#38BDF8]">Operations HQ.</span>
            </h1>
            <p className="text-lg text-[#CBD5E1] leading-relaxed">
              Reach our tender desk, technical directors, and supply chain managers for formal RFQs, vendor pre-qualification, and commercial partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* Form & Info Section */}
      <section className="py-20 bg-[#F8FAFC] text-[#071629]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#071629] text-white p-8 rounded-3xl shadow-sm space-y-6">
              <h3 className="text-2xl font-black text-white">Commercial Hubs</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Operating facilities with direct port and swamp access in Nigeria's leading oil and gas operational centers.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#38BDF8] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm font-bold text-white">Lagos Corporate Head Office</strong>
                    <span className="text-xs text-slate-400">Plot 14, Victoria Island Commercial District, Lagos, Nigeria</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-[#F4B323] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm font-bold text-white">Port Harcourt Operations Yard</strong>
                    <span className="text-xs text-slate-400">Trans-Amadi Industrial Layout, Port Harcourt, Rivers State</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                  <div>
                    <strong className="block text-sm font-bold text-white">Direct Line</strong>
                    <span className="text-xs text-slate-400">+234 803 555 0123 / +234 1 290 8820</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#38BDF8] flex-shrink-0" />
                  <div>
                    <strong className="block text-sm font-bold text-white">Tenders & Inquiries</strong>
                    <span className="text-xs text-slate-400">commercial@kesenergy.com</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>NUPRC & NIPEX Verified</span>
                <span className="text-emerald-400 font-bold">Desk Open 24/7</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">RFQ Successfully Received</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Your commercial inquiry has been logged. A lead project engineer will review your technical specifications within 4 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-[#2563EB] text-white text-xs font-bold rounded-xl"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-black text-slate-900 mb-2">Request Technical Quotation / Meeting</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Engr. Alex Okoro"
                      className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Corporate Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="a.okoro@energycorp.ng"
                      className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Company / Operating Asset</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Seplat / Chevron JV"
                      className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Scope Category</label>
                    <select
                      value={formData.serviceCategory}
                      onChange={e => setFormData({ ...formData, serviceCategory: e.target.value })}
                      className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#2563EB]"
                    >
                      <option value="FEED & Engineering">FEED & Engineering Design</option>
                      <option value="EPC Pipeline Delivery">EPC Pipeline & Fabrication</option>
                      <option value="Procurement & API Valves">Procurement & API Valves</option>
                      <option value="Asset Integrity & NDT">Asset Integrity & NDT Scans</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Scope Description / Requirements</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details regarding asset location, schedule, technical specifications, and expected handover dates..."
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Technical Enquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <CorporateFooter />
    </div>
  );
};

