
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-background-dark border-t border-primary/10 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
                <div className="col-span-2 lg:col-span-2">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="material-icons text-white text-xl">favorite</span>
                        </div>
                        <span className="text-xl font-bold text-white">Reconnect</span>
                    </div>
                    <p className="text-slate-400 max-w-xs mb-8">
                        The science-backed platform dedicated to ending the divorce crisis through compassionate communication and mediation.
                    </p>
                    <div className="flex gap-4">
                        <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-primary transition-colors border border-white/10" href="#">
                            <span className="material-icons text-xl">facebook</span>
                        </a>
                        <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-primary transition-colors border border-white/10" href="#">
                            <span className="material-icons text-xl">alternate_email</span>
                        </a>
                        <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-primary transition-colors border border-white/10" href="#">
                            <span className="material-icons text-xl">language</span>
                        </a>
                    </div>
                </div>
                <div>
                    <h5 className="text-white font-bold mb-6">Product</h5>
                    <ul className="space-y-4 text-slate-400 text-sm">
                        <li><a className="hover:text-primary transition-colors" href="#">How it Works</a></li>
                        <li><a className="hover:text-primary transition-colors" href="#">For Couples</a></li>
                        <li><a className="hover:text-primary transition-colors" href="#">Mediation Tools</a></li>
                        <li><a className="hover:text-primary transition-colors" href="#">App Download</a></li>
                    </ul>
                </div>
                <div>
                    <h5 className="text-white font-bold mb-6">Company</h5>
                    <ul className="space-y-4 text-slate-400 text-sm">
                        <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
                        <li><a className="hover:text-primary transition-colors" href="#">Science & Methodology</a></li>
                        <li><a className="hover:text-primary transition-colors" href="#">Counselor Network</a></li>
                        <li><a className="hover:text-primary transition-colors" href="#">Success Stories</a></li>
                    </ul>
                </div>
                <div>
                    <h5 className="text-white font-bold mb-6">Legal</h5>
                    <ul className="space-y-4 text-slate-400 text-sm">
                        <li><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
                        <li><a className="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
                        <li><a className="hover:text-primary transition-colors" href="#">HIPAA Compliance</a></li>
                        <li><a className="hover:text-primary transition-colors" href="#">Cookie Policy</a></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-slate-500 text-sm">© 2024 Reconnect Inc. All rights reserved.</p>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1 text-slate-500 text-sm">
                        <span className="material-icons text-xs">public</span>
                        English (US)
                    </div>
                    <div className="flex items-center gap-1 text-slate-500 text-sm">
                        <span className="material-icons text-xs text-primary">shield</span>
                        Secure & Encrypted
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
