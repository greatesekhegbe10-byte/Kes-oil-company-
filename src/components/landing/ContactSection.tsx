import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { addEnquiry } = usePlatform();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    category: 'Engineering & Design',
    location: 'Lagos / Niger Delta',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = addEnquiry({
      clientName: formData.name,
      clientCompany: formData.company,
      clientEmail: formData.email,
      clientPhone: formData.phone,
      title: `${formData.category} Request - ${formData.company}`,
      serviceCategory: formData.category,
      location: formData.location,
      budgetEstimate: 'Under Evaluation',
      description: formData.message,
      status: 'New',
      priority: 'High',
    });
    setRefNumber(ref);
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#F4F7FB] text-[#071629]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Direct Office Locations */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5 text-[#153C65] text-[11px] font-black uppercase tracking-[0.25em] mb-4">
              <span className="w-8 h-[2px] bg-[#F4B323]" />
              <span>COMMERCIAL & OPERATIONS CONTACT</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#071629] leading-tight mb-6">
              Connect with our senior engineering team.
            </h2>

            <p className="text-sm text-[#64748B] leading-relaxed mb-10">
              Whether you are preparing a Capex tender, require an emergency subsea intervention, or wish to explore technical collaboration, our leadership team is at your service.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white border border-[#DFE6EF] flex items-center justify-center text-[#2563EB] shadow-sm flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#071629] uppercase tracking-wider">Corporate Headquarters</h4>
                  <p className="text-sm text-[#526379] mt-0.5">Plot 14, Adeola Odeku Street, Victoria Island, Lagos, Nigeria</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white border border-[#DFE6EF] flex items-center justify-center text-[#2563EB] shadow-sm flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#10B981]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#071629] uppercase tracking-wider">Eastern Operations Base</h4>
                  <p className="text-sm text-[#526379] mt-0.5">Plot 88, Trans-Amadi Industrial Layout, Port Harcourt, Rivers State</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white border border-[#DFE6EF] flex items-center justify-center text-[#2563EB] shadow-sm flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#F4B323]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#071629] uppercase tracking-wider">Direct Telephone</h4>
                  <p className="text-sm text-[#526379] mt-0.5">+234 (0) 1 270 0000 / +234 803 555 0192</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white border border-[#DFE6EF] flex items-center justify-center text-[#2563EB] shadow-sm flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#8B5CF6]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#071629] uppercase tracking-wider">Operations & RFQs</h4>
                  <p className="text-sm text-[#526379] mt-0.5">projects@kesenergy.com · info@kesenergy.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct RFP Submission Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-xl border border-[#DFE6EF] shadow-lg">
            {formSubmitted ? (
              <div className="py-12 text-center animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-[#10B981]/10 text-[#10B981] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#071629] mb-2">Request Logged in Operations System</h3>
                <p className="text-sm text-[#64748B] max-w-md mx-auto mb-4">
                  Thank you, <span className="font-semibold text-[#071629]">{formData.name}</span>. Your enquiry has been assigned reference number:
                </p>
                <div className="inline-block bg-[#071629] text-[#F4B323] font-mono text-sm font-bold px-4 py-2 rounded mb-6 tracking-wider">
                  {refNumber}
                </div>
                <p className="text-xs text-[#94A3B8] mb-6">
                  You can now track this enquiry in the Operations Portal or Client Workspace.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({
                      name: '',
                      company: '',
                      email: '',
                      phone: '',
                      category: 'Engineering & Design',
                      location: 'Lagos / Niger Delta',
                      message: '',
                    });
                  }}
                  className="px-6 py-2.5 bg-[#153C65] text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-[#071629] transition-colors"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-[#071629]">Submit Technical Enquiry or RFQ</h3>
                  <p className="text-xs text-[#64748B] mt-1">Our commercial engineering desk responds within 24 hours.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#071629] uppercase tracking-wider mb-1.5">
                      Contact Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Engr. Austin Nwachukwu"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-11 px-3.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-sm text-[#071629] focus:bg-white focus:border-[#2563EB] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#071629] uppercase tracking-wider mb-1.5">
                      Company / Organization *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Chevron Nigeria / Shell"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full h-11 px-3.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-sm text-[#071629] focus:bg-white focus:border-[#2563EB] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#071629] uppercase tracking-wider mb-1.5">
                      Corporate Work Email *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-11 px-3.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-sm text-[#071629] focus:bg-white focus:border-[#2563EB] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#071629] uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+234 800 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-11 px-3.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-sm text-[#071629] focus:bg-white focus:border-[#2563EB] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#071629] uppercase tracking-wider mb-1.5">
                      Service Requirement *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full h-11 px-3.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-sm text-[#071629] focus:bg-white focus:border-[#2563EB] transition-colors"
                    >
                      <option>Engineering & Design</option>
                      <option>Procurement & Supply</option>
                      <option>Project Services & EPC</option>
                      <option>Asset Integrity & Maintenance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#071629] uppercase tracking-wider mb-1.5">
                      Project Location / Field
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Escravos, Bonny, Delta"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full h-11 px-3.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-sm text-[#071629] focus:bg-white focus:border-[#2563EB] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#071629] uppercase tracking-wider mb-1.5">
                    Technical Scope Overview *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide scope overview, equipment specifications, pipe sizes, or target delivery schedule..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-sm text-[#071629] focus:bg-white focus:border-[#2563EB] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-[#071629] hover:bg-[#153C65] text-white font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2.5 transition-all shadow-md"
                >
                  <Send className="w-4 h-4 text-[#F4B323]" />
                  <span>Transmit RFQ to KES Engineering</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

