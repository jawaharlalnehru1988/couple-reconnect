
import React from 'react';

const CtaSection = () => {
    return (
        <section className="py-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="relative bg-primary rounded-3xl overflow-hidden p-8 md:p-16 text-center">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">Don't wait until it's too late</h2>
                    <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 relative z-10 leading-relaxed">
                        Most relationships don't end because of a lack of love, but because of a lack of tools. Take the first step toward healing today.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                        <button className="bg-white text-primary px-10 py-4 rounded-xl text-lg font-bold hover:bg-slate-100 transition-colors shadow-xl cursor-pointer">
                            Start Your Free Trial
                        </button>
                        <button className="bg-primary/20 border border-white/20 text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-primary/30 transition-colors backdrop-blur-sm cursor-pointer">
                            Speak with a Counselor
                        </button>
                    </div>
                    <p className="mt-8 text-white/60 text-sm">Join over 12,000 couples who saved their marriage this year.</p>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
