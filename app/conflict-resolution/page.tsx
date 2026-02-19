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
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold tracking-widest text-sm uppercase mb-4 block">Resolution Tools</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            Managing Conflict & Upbringing
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                            Understanding how our different pasts create friction in our present, and practical strategies to bridge the gap.
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
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

                    {/* Content Grid */}
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <div className="grid gap-8">
                            {filteredScenarios.map((scenario) => (
                                <div key={scenario.id} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-primary/30 transition-all shadow-sm hover:shadow-md">
                                    <div className="p-8">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                            <div>
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${scenario.category === 'Mindset' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300' :
                                                    scenario.category === 'Habit' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300' :
                                                        'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300'
                                                    }`}>
                                                    {scenario.category} Conflict
                                                </span>
                                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                                    {scenario.title}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                                            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl">
                                                <h4 className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-200 mb-3">
                                                    <span className="material-icons text-amber-500">history_edu</span>
                                                    The Upbringing Context
                                                </h4>
                                                <p className="text-slate-600 dark:text-slate-400 italic">
                                                    "{scenario.upbringing_context}"
                                                </p>
                                            </div>
                                            <div className="bg-rose-50 dark:bg-rose-900/10 p-6 rounded-xl">
                                                <h4 className="flex items-center gap-2 font-bold text-rose-700 dark:text-rose-300 mb-3">
                                                    <span className="material-icons text-rose-500">warning</span>
                                                    How it Manifests
                                                </h4>
                                                <p className="text-rose-800 dark:text-rose-200">
                                                    {scenario.conflict_manifestation}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="border-t border-slate-100 dark:border-slate-800 pt-8">
                                            <h4 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                                                <span className="material-icons">handshake</span>
                                                Management Strategies
                                            </h4>
                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div>
                                                    <h5 className="font-semibold text-slate-900 dark:text-white mb-4 border-b border-primary/20 pb-2 inline-block">
                                                        For The Husband
                                                    </h5>
                                                    <ul className="space-y-3">
                                                        {scenario.management_strategies.for_husband.map((strategy, idx) => (
                                                            <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-slate-300 text-sm">
                                                                <span className="material-icons text-primary text-base mt-0.5">check</span>
                                                                {strategy}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h5 className="font-semibold text-slate-900 dark:text-white mb-4 border-b border-primary/20 pb-2 inline-block">
                                                        For The Wife
                                                    </h5>
                                                    <ul className="space-y-3">
                                                        {scenario.management_strategies.for_wife.map((strategy, idx) => (
                                                            <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-slate-300 text-sm">
                                                                <span className="material-icons text-primary text-base mt-0.5">check</span>
                                                                {strategy}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
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
