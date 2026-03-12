'use client';

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
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
    const [nextUrl, setNextUrl] = useState<string | null>(null);
    const [prevUrl, setPrevUrl] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [readScenarios, setReadScenarios] = useState<string[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('readScenarios');
        if (saved) {
            try {
                setReadScenarios(JSON.parse(saved));
            } catch (e) {
                console.error("Error parsing read scenarios", e);
            }
        }
    }, []);

    const toggleReadStatus = (id: string) => {
        setReadScenarios(prev => {
            const updated = prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id];
            localStorage.setItem('readScenarios', JSON.stringify(updated));
            return updated;
        });
    };

    const fetchScenarios = async (url: string = 'https://couple.asknehru.com/api/conflict-scenarios/') => {
        setLoading(true);
        try {
            const response = await fetch(url);
            const data: ApiResponse = await response.json();
            setConflictScenarios(data.results);
            setNextUrl(data.next);
            setPrevUrl(data.previous);
            setTotalCount(data.count);

            // Extract page number from the URL
            const urlObj = new URL(url);
            const pageParam = urlObj.searchParams.get('page');
            setCurrentPage(pageParam ? parseInt(pageParam) : 1);

            // Scroll to top when page changes
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error("Error fetching conflict scenarios:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
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
                                            <div className="text-slate-600 dark:text-slate-400 italic text-lg leading-relaxed prose prose-slate dark:prose-invert max-w-none">
                                                <ReactMarkdown>
                                                    {`"${selectedScenario.upbringing_context}"`}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                        <div className="bg-rose-50 dark:bg-rose-900/10 p-8 rounded-2xl border border-rose-100 dark:border-rose-900/20">
                                            <h4 className="flex items-center gap-3 font-bold text-rose-700 dark:text-rose-300 mb-4 text-lg">
                                                <span className="material-icons text-rose-500 scale-110">warning</span>
                                                How it Manifests
                                            </h4>
                                            <div className="text-rose-800 dark:text-rose-200 text-lg leading-relaxed prose prose-rose dark:prose-invert max-w-none">
                                                <ReactMarkdown>
                                                    {selectedScenario.conflict_manifestation}
                                                </ReactMarkdown>
                                            </div>
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

                                    {/* Action Footer */}
                                    <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-8">
                                        <div className="flex flex-wrap items-center justify-between gap-4">
                                            <button
                                                onClick={() => toggleReadStatus(selectedScenario.id)}
                                                className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg ${readScenarios.includes(selectedScenario.id)
                                                    ? 'bg-emerald-500 text-white shadow-emerald-500/25 hover:bg-emerald-600'
                                                    : 'bg-primary text-white shadow-primary/25 hover:bg-primary/90 hover:-translate-y-0.5'
                                                    }`}
                                            >
                                                <span className="material-icons">
                                                    {readScenarios.includes(selectedScenario.id) ? 'check_circle' : 'done'}
                                                </span>
                                                {readScenarios.includes(selectedScenario.id) ? 'Conflict Solved!' : 'Mark as Completed'}
                                            </button>

                                            <div className="flex items-center gap-3">
                                                <span className="text-slate-400 text-sm italic">Status:</span>
                                                <span className={`text-sm font-bold uppercase tracking-wider ${readScenarios.includes(selectedScenario.id) ? 'text-emerald-500' : 'text-amber-500'}`}>
                                                    {readScenarios.includes(selectedScenario.id) ? 'Read' : 'In Progress'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Prev/Next Navigation */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                            {/* Previous Button */}
                                            {(() => {
                                                const currentIndex = conflictScenarios.findIndex(s => s.id === selectedScenario.id);
                                                const prevItem = currentIndex > 0 ? conflictScenarios[currentIndex - 1] : null;

                                                if (prevItem) {
                                                    return (
                                                        <button
                                                            onClick={() => {
                                                                setSelectedScenario(prevItem);
                                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                                            }}
                                                            className="flex flex-col items-start p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 text-left transition-all duration-300 group bg-slate-50/50 dark:bg-slate-800/20"
                                                        >
                                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1 group-hover:text-primary transition-colors">
                                                                <span className="material-icons text-sm">arrow_back</span>
                                                                Previous Strategy
                                                            </span>
                                                            <span className="text-slate-900 dark:text-white font-bold line-clamp-1">{prevItem.title}</span>
                                                        </button>
                                                    );
                                                }
                                                return <div className="hidden md:block" />;
                                            })()}

                                            {/* Next Button */}
                                            {(() => {
                                                const currentIndex = conflictScenarios.findIndex(s => s.id === selectedScenario.id);
                                                const nextItem = currentIndex < conflictScenarios.length - 1 ? conflictScenarios[currentIndex + 1] : null;

                                                if (nextItem) {
                                                    return (
                                                        <button
                                                            onClick={() => {
                                                                setSelectedScenario(nextItem);
                                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                                            }}
                                                            className="flex flex-col items-end p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 text-right transition-all duration-300 group bg-slate-50/50 dark:bg-slate-800/20 shadow-sm hover:shadow-md"
                                                        >
                                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1 group-hover:text-primary transition-colors">
                                                                Next Challenge
                                                                <span className="material-icons text-sm">arrow_forward</span>
                                                            </span>
                                                            <span className="text-slate-900 dark:text-white font-bold line-clamp-1">{nextItem.title}</span>
                                                        </button>
                                                    );
                                                }
                                                return <div className="hidden md:block" />;
                                            })()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Grid View */
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                                {filteredScenarios.map((scenario) => (
                                    <div
                                        key={scenario.id}
                                        onClick={() => setSelectedScenario(scenario)}
                                        className="group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="flex justify-between items-start mb-4">
                                                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${scenario.category === 'Mindset' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300' :
                                                    scenario.category === 'Habit' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300' :
                                                        'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300'
                                                    }`}>
                                                    {scenario.category}
                                                </span>
                                                {readScenarios.includes(scenario.id) && (
                                                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md">
                                                        <span className="material-icons text-[12px]">check_circle</span>
                                                        READ
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className={`text-xl font-bold transition-colors duration-300 line-clamp-2 ${readScenarios.includes(scenario.id) ? 'text-slate-400 dark:text-slate-500 italic' : 'text-slate-900 dark:text-white group-hover:text-primary'}`}>
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

                            {/* Pagination Controls */}
                            {activeCategory === 'All' && (nextUrl || prevUrl) && (
                                <div className="mt-16 flex items-center justify-center gap-6 animate-in fade-in duration-700 delay-500">
                                    <button
                                        onClick={() => prevUrl && fetchScenarios(prevUrl)}
                                        disabled={!prevUrl}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${!prevUrl
                                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-200 dark:border-slate-700'
                                            : 'bg-white dark:bg-slate-900 text-primary border border-primary/20 hover:border-primary hover:bg-primary/5 active:scale-95 shadow-sm'
                                            }`}
                                    >
                                        <span className="material-icons">chevron_left</span>
                                        Previous
                                    </button>

                                    <div className="flex flex-col items-center gap-1">
                                        <div className="text-slate-900 dark:text-white font-bold text-lg">
                                            Page {currentPage} <span className="text-slate-400 font-normal mx-1">/</span> {Math.ceil(totalCount / 10)}
                                        </div>
                                        <div className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">
                                            {conflictScenarios.length} Scenarios Listed
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => nextUrl && fetchScenarios(nextUrl)}
                                        disabled={!nextUrl}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${!nextUrl
                                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-200 dark:border-slate-700'
                                            : 'bg-primary text-white hover:bg-primary/90 active:scale-95 shadow-lg shadow-primary/25'
                                            }`}
                                    >
                                        Next
                                        <span className="material-icons">chevron_right</span>
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
