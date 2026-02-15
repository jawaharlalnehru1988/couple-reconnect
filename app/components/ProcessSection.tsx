
import React from 'react';

const ProcessSection = () => {
    return (
        <section className="py-24 border-t border-primary/10">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                <div className="order-2 md:order-1 relative">
                    <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-white/5">
                        <img
                            alt="Calm reflective environment"
                            className="w-full h-full object-cover"
                            data-alt="A peaceful living room with warm soft lighting"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxyCCjnpa4hbIEn86ml3YBYJjHHllKg3eXMJpdQyTgZdAg_FEnk40IBgE0xKG0FrGV5Qm415Q5bIcPTQ0Fk3eQku0Do-cjHcrBggspmsm7ck3fGL4P6jbie5sv1-xVUonHXKrE3gDWXHyw-AmYCNIh7rPGluEKEmpChTqtXpMcsI75JvzztT9JCk3KVKajQ3EBcaC7YilNONYNq7hUm7z0c33f6G60vMpX7d9ScdFyOwOtGm4pQhbmvFq2UcxnvpkTwDkOJhLGUWGO"
                        />
                    </div>
                    {/* Float card */}
                    <div className="absolute -bottom-6 -right-6 md:right-12 bg-background-dark border border-white/10 p-6 rounded-xl shadow-2xl max-w-xs">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                <span className="material-icons">volunteer_activism</span>
                            </div>
                            <span className="font-bold text-white">Trust Restored</span>
                        </div>
                        <p className="text-sm text-slate-400 italic">
                            "We were weeks away from signing papers. Reconnect gave us the language to find our way back."
                        </p>
                        <div className="mt-4 flex gap-1">
                            <span className="material-icons text-xs text-yellow-500">star</span>
                            <span className="material-icons text-xs text-yellow-500">star</span>
                            <span className="material-icons text-xs text-yellow-500">star</span>
                            <span className="material-icons text-xs text-yellow-500">star</span>
                            <span className="material-icons text-xs text-yellow-500">star</span>
                        </div>
                    </div>
                </div>
                <div className="order-1 md:order-2">
                    <span className="text-primary font-bold tracking-widest text-sm uppercase mb-4 block">Our Method</span>
                    <h2 className="text-4xl font-bold mb-8 leading-tight">A Gentle, Non-Threatening Path to Resolution</h2>
                    <div className="space-y-8">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center text-sage-400">
                                <span className="font-bold text-lg">01</span>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold mb-2">Safe Assessment</h4>
                                <p className="text-slate-400">
                                    Both partners complete individual profiles to identify core triggers and needs in a private, blame-free environment.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center text-sage-400">
                                <span className="font-bold text-lg">02</span>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold mb-2">Neutral Ground</h4>
                                <p className="text-slate-400">
                                    Our AI-assisted mediation platform suggests communication patterns that prevent escalation before it starts.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center text-sage-400">
                                <span className="font-bold text-lg">03</span>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold mb-2">Rebuilding Rituals</h4>
                                <p className="text-slate-400">
                                    Establish small, actionable daily habits that rebuild intimacy and safety at your own pace.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
