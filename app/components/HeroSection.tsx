
import React from 'react';

const HeroSection = () => {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    alt="A couple talking peacefully"
                    className="w-full h-full object-cover opacity-20 grayscale"
                    data-alt="A couple talking peacefully in a soft focus setting"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7bX8Vn6YDEFcYS_-vH2B4-nR_3YJtCDtb1ITKziL0cYLL6VOC93ifm8HvVXwtxbKJDKlwT2Eo64VhZurc89ovsJnz45JOC3W5vsgzT-ZPwF_hiGDAZ8BAqOJoc48v03YzGV0kV0zIhET6aObbu3VWp1xzTv-55WlPbcjdA2w8ypas_hmee3A5uTcxI-xZT_RBnPJiCt-3vgEdVMVN9Adh2rrjKuDn9w5HVa_dLkytLEC6VgaKAfg5H8lIu2Eg1Ix9LnAxvZ_xPEQk"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background-dark/50 via-background-dark to-background-dark"></div>
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Restoring Hope
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]">
                    Healing the Heart of <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                        Your Relationship
                    </span>
                </h1>
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
                    Guided tools and professional mediation to help you navigate crisis, rediscover your connection, and build a lasting future together.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-xl text-lg font-bold hover:scale-105 transition-transform shadow-xl shadow-primary/30 cursor-pointer">
                        Begin Free Consultation
                    </button>
                    <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-xl text-lg font-bold backdrop-blur-sm transition-all cursor-pointer">
                        Watch How it Works
                    </button>
                </div>
                <div className="mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="flex items-center gap-2">
                        <span className="material-icons text-2xl">verified_user</span>
                        <span className="font-semibold">Licensed Therapists</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-icons text-2xl">security</span>
                        <span className="font-semibold">End-to-End Privacy</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-icons text-2xl">psychology</span>
                        <span className="font-semibold">Science-Based Tools</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
