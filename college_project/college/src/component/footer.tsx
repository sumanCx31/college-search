import { MapPin, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        {/* Brand Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">CollegeFinder Nepal</h2>
          <p className="text-sm leading-relaxed">
            Your trusted partner in navigating the landscape of higher education in Nepal. 
            Providing verified data, fee structures, and expert guidance for your future.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-6">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            {['Home', 'Colleges', 'Compare', 'About Us', 'Privacy Policy'].map((link) => (
              <li key={link}><a href="#" className="hover:text-emerald-400 transition">{link}</a></li>
            ))}
          </ul>
        </div>

        {/* Faculties */}
        <div>
          <h3 className="text-white font-semibold mb-6">Faculties</h3>
          <ul className="space-y-3 text-sm">
            {['Engineering', 'Management', 'Information Tech', 'Medical', 'Humanities'].map((fac) => (
              <li key={fac}><a href="#" className="hover:text-emerald-400 transition">{fac}</a></li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 text-sm">
          <h3 className="text-white font-semibold mb-6">Contact Us</h3>
          <div className="flex items-center gap-3"><MapPin size={18} /> Kathmandu, Nepal</div>
          <div className="flex items-center gap-3"><Mail size={18} /> info@collegefindernepal.np</div>
          <div className="flex items-center gap-3"><Phone size={18} /> +977 1-4000000</div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs">&copy; 2026 CollegeFinder Nepal. All rights reserved.</p>
        {/* <div className="flex gap-6"> */}
          {/* {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
            <a key={i} href="#" className="hover:text-emerald-400 transition">
              <Icon size={20} />
            </a>
          ))} */}
        {/* </div> */}
      </div>
    </footer>
  );
};