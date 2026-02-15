
import React from 'react';

const TestimonialSection = () => {
    return (
        <section className="py-24 bg-primary/5">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <span className="material-icons text-5xl text-primary/30 mb-8">format_quote</span>
                <p className="text-2xl md:text-3xl font-medium text-white italic leading-snug mb-8">
                    "The biggest hurdle wasn't that we didn't love each other, it was that we didn't know how to stop hurting each other. Reconnect provided the guardrails we desperately needed."
                </p>
                <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center font-bold text-primary">
                        SC
                    </div>
                    <div className="text-left">
                        <div className="font-bold text-white">Sarah & Chris M.</div>
                        <div className="text-sm text-slate-400">Married 14 years • Reconciled in 2023</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
