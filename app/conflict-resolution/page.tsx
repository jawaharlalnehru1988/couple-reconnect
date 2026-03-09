'use client';

import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Data Structure for Conflict Scenarios
interface ConflictScenario {
    id: string;
    category: 'Mindset' | 'Habit' | 'Communication';
    title: string;
    upbringing_context: string;
    conflict_manifestation: string;
    management_strategies: {
        for_husband: string[];
        for_wife: string[];
    };
}

interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: ConflictScenario[];
}

export default function ConflictResolutionPage() {
    const [conflictScenarios, setConflictScenarios] = useState<ConflictScenario[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState<'All' | 'Mindset' | 'Habit' | 'Communication'>('All');
    const [selectedScenario, setSelectedScenario] = useState<ConflictScenario | null>(null);

    useEffect(() => {
        const fetchScenarios = async () => {
            try {
                const response = await fetch('https://couple.asknehru.com/api/conflict-scenarios/');
                const data: ApiResponse = await response.json();
                setConflictScenarios(data.results);
            } catch (error) {
                console.error("Error fetching conflict scenarios:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchScenarios();
    }, []);

    const filteredScenarios = activeCategory === 'All'
        ? conflictScenarios
        : conflictScenarios.filter(s => s.category === activeCategory);

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display flex flex-col">
            <Navbar />

            <main className="flex-grow pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    {!selectedScenario && (
                        <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
                            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-4 block">Resolution Tools</span>
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                                Managing Conflict & Upbringing
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                                Understanding how our different pasts create friction in our present, and practical strategies to bridge the gap.
                            </p>
                        </div>
                    )}

                    {/* Back Button for Detail View */}
                    {selectedScenario && (
                        <button
                            onClick={() => setSelectedScenario(null)}
                            className="flex items-center gap-2 text-primary font-semibold mb-8 hover:gap-3 transition-all duration-300 group"
                        >
                            <span className="material-icons text-xl group-hover:-translate-x-1 transition-transform">arrow_back</span>
                            Back to All Scenarios
                        </button>
                    )}

                    {/* Filters - Only show in Grid View */}
                    {!selectedScenario && !loading && (
                        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-in fade-in duration-700 delay-200">
                            {['All', 'Mindset', 'Habit', 'Communication'].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat as any)}
                                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === cat
                                        ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Content Section */}
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : selectedScenario ? (
                        /* Detail View */
                        <div className="animate-in fade-in zoom-in-95 duration-500">
                            <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">
                                <div className="p-8 md:p-12">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                                        <div>
                                            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${selectedScenario.category === 'Mindset' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300' :
                                                selectedScenario.category === 'Habit' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300' :
                                                    'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300'
                                                }`}>
                                                {selectedScenario.category} Conflict
                                            </span>
                                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                                                {selectedScenario.title}
                                            </h2>
                                        </div>
                                    </div>

                                    <div className="grid lg:grid-cols-2 gap-8 mb-12">
                                        <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                                            <h4 className="flex items-center gap-3 font-bold text-slate-800 dark:text-slate-100 mb-4 text-lg">
                                                <span className="material-icons text-amber-500 scale-110">history_edu</span>
                                                The Upbringing Context
                                            </h4>
                                            <p className="text-slate-600 dark:text-slate-400 italic text-lg leading-relaxed">
                                                "{selectedScenario.upbringing_context}"
                                            </p>
                                        </div>
                                        <div className="bg-rose-50 dark:bg-rose-900/10 p-8 rounded-2xl border border-rose-100 dark:border-rose-900/20">
                                            <h4 className="flex items-center gap-3 font-bold text-rose-700 dark:text-rose-300 mb-4 text-lg">
                                                <span className="material-icons text-rose-500 scale-110">warning</span>
                                                How it Manifests
                                            </h4>
                                            <p className="text-rose-800 dark:text-rose-200 text-lg leading-relaxed">
                                                {selectedScenario.conflict_manifestation}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="border-t border-slate-100 dark:border-slate-800 pt-10">
                                        <h4 className="text-xl font-bold text-primary mb-8 flex items-center gap-3">
                                            <span className="material-icons bg-primary/10 p-2 rounded-lg">handshake</span>
                                            Management Strategies
                                        </h4>
                                        <div className="grid md:grid-cols-2 gap-10">
                                            <div className="space-y-6">
                                                <h5 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                                    <div className="w-1 h-6 bg-primary rounded-full"></div>
                                                    For The Husband
                                                </h5>
                                                <ul className="space-y-4">
                                                    {selectedScenario.management_strategies.for_husband.map((strategy, idx) => (
                                                        <li key={idx} className="flex items-start gap-4 text-slate-600 dark:text-slate-300">
                                                            <div className="mt-1 bg-primary/10 p-1 rounded-full">
                                                                <span className="material-icons text-primary text-sm block">check</span>
                                                            </div>
                                                            <span className="text-base">{strategy}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="space-y-6">
                                                <h5 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                                    <div className="w-1 h-6 bg-primary rounded-full"></div>
                                                    For The Wife
                                                </h5>
                                                <ul className="space-y-4">
                                                    {selectedScenario.management_strategies.for_wife.map((strategy, idx) => (
                                                        <li key={idx} className="flex items-start gap-4 text-slate-600 dark:text-slate-300">
                                                            <div className="mt-1 bg-primary/10 p-1 rounded-full">
                                                                <span className="material-icons text-primary text-sm block">check</span>
                                                            </div>
                                                            <span className="text-base">{strategy}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Grid View */
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                            {filteredScenarios.map((scenario) => (
                                <div
                                    key={scenario.id}
                                    onClick={() => setSelectedScenario(scenario)}
                                    className="group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer flex flex-col justify-between"
                                >
                                    <div>
                                        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 ${scenario.category === 'Mindset' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300' :
                                            scenario.category === 'Habit' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300' :
                                                'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300'
                                            }`}>
                                            {scenario.category}
                                        </span>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors duration-300 line-clamp-2">
                                            {scenario.title}
                                        </h3>
                                    </div>
                                    <div className="mt-6 flex items-center justify-between text-primary font-bold text-sm">
                                        <span>View Details</span>
                                        <span className="material-icons group-hover:translate-x-1 transition-transform duration-300">arrow_forward</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
