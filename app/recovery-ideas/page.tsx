
'use client';

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Data structure as requested by the user
interface RecoveryIdea {
    id: number;
    victimGender: 'male' | 'female';
    addictedTo: string;
    recoveryArticle: string;
    title: string;
    summary: string;
    icon: string;
}

export default function RecoveryIdeasPage() {
    const [ideas, setIdeas] = useState<RecoveryIdea[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedIdea, setSelectedIdea] = useState<RecoveryIdea | null>(null);
    const [filterGender, setFilterGender] = useState<'all' | 'male' | 'female'>('all');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [readSubtopics, setReadSubtopics] = useState<string[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('readSubtopics');
        if (saved) {
            try {
                setReadSubtopics(JSON.parse(saved));
            } catch (e) {
                console.error("Error parsing read subtopics", e);
            }
        }
    }, []);

    const toggleReadStatus = (id: string) => {
        setReadSubtopics(prev => {
            const updated = prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id];
            localStorage.setItem('readSubtopics', JSON.stringify(updated));
            return updated;
        });
    };

    useEffect(() => {
        const fetchIdeas = async () => {
            try {
                const response = await fetch('https://couple.asknehru.com/api/habit-recoveries/');
                const data = await response.json();
                setIdeas(data);
            } catch (error) {
                console.error("Error fetching recovery ideas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchIdeas();
    }, []);

    const categories = ['all', ...Array.from(new Set(ideas.map(idea => idea.addictedTo)))];

    const filteredIdeas = ideas.filter(idea => {
        const matchesGender = filterGender === 'all' || idea.victimGender === filterGender;
        const matchesCategory = selectedCategory === 'all' || idea.addictedTo === selectedCategory;
        return matchesGender && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display flex flex-col">
            <Navbar />

            <main className="flex-grow pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Header */}
                    <div className="text-center mb-16 relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
                        <span className="text-primary font-bold tracking-widest text-sm uppercase mb-4 block">Guided Healing</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            Recovery & Transformation
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                            Bring your partner back to the right path with compassion, wisdom, and spiritual insight. 
                            Discover how Krishna consciousness can transform habits into higher tastes.
                        </p>
                    </div>

                    {/* Filter Section */}
                    <div className="flex flex-col items-center gap-8 mb-16">
                        {/* Gender Tabs */}
                        <div className="bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 flex gap-1 shadow-sm">
                            {(['all', 'male', 'female'] as const).map((gender) => (
                                <button
                                    key={gender}
                                    onClick={() => setFilterGender(gender)}
                                    className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all relative ${
                                        filterGender === gender 
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                                        : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`}
                                >
                                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Category Pills */}
                        {!loading && categories.length > 2 && (
                            <div className="flex flex-wrap justify-center gap-3 max-w-4xl">
                                {categories.map((cat) => {
                                    const count = cat === 'all' 
                                        ? (filterGender === 'all' ? ideas.length : ideas.filter(i => i.victimGender === filterGender).length)
                                        : ideas.filter(i => i.addictedTo === cat && (filterGender === 'all' || i.victimGender === filterGender)).length;
                                    
                                    if (count === 0 && cat !== 'all') return null;

                                    return (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`px-5 py-2 rounded-full text-xs font-bold transition-all border flex items-center gap-2 ${
                                                selectedCategory === cat
                                                ? 'bg-primary/10 border-primary text-primary shadow-sm'
                                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-primary/40 hover:text-primary'
                                            }`}
                                        >
                                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                            <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                                                selectedCategory === cat ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                                            }`}>
                                                {count}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Ideas Grid */}
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredIdeas.length > 0 ? (
                                filteredIdeas.map((idea, index) => (
                                    <div 
                                        key={idea.id || index}
                                        onClick={() => setSelectedIdea(idea)}
                                        className="group bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all cursor-pointer relative overflow-hidden"
                                    >
                                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all"></div>
                                        
                                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                            <span className="material-icons text-3xl">{idea.icon}</span>
                                        </div>

                                        <div className="flex items-center gap-2 mb-4">
                                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
                                                idea.victimGender === 'male' 
                                                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                                                : 'bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400'
                                            }`}>
                                                Target: {idea.victimGender}
                                            </span>
                                            <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 px-2 py-1 rounded-md">
                                                {idea.addictedTo}
                                            </span>
                                            {readSubtopics.includes(String(idea.id)) && (
                                                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-tight bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md">
                                                    Read
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-primary transition-colors">
                                            {idea.title}
                                        </h3>
                                        
                                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                                            {idea.summary}
                                        </p>

                                        <div className="flex items-center text-primary font-bold text-sm gap-2 mt-auto">
                                            Read Recovery Guide
                                            <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center">
                                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <span className="material-icons text-slate-400 text-3xl">search_off</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No transformation guides found</h3>
                                    <p className="text-slate-500 mb-8">Try adjusting your filters or search for another category.</p>
                                    <button 
                                        onClick={() => {setFilterGender('all'); setSelectedCategory('all');}}
                                        className="px-6 py-2 bg-primary/10 text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-all"
                                    >
                                        Reset All Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>

            <Footer />

            {/* Modal for Article */}
            {selectedIdea && (() => {
                const currentIndex = filteredIdeas.findIndex(i => i.id === selectedIdea.id);
                const prevIdea = currentIndex > 0 ? filteredIdeas[currentIndex - 1] : null;
                const nextIdea = currentIndex < filteredIdeas.length - 1 ? filteredIdeas[currentIndex + 1] : null;

                return (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
                        <div className="bg-white dark:bg-background-dark w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden relative border border-primary/20 max-h-[90vh] flex flex-col">
                            <button
                                onClick={() => setSelectedIdea(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors z-10"
                            >
                                <span className="material-icons text-xl">close</span>
                            </button>

                            <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar">
                                <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-primary prose-strong:text-slate-900 dark:prose-strong:text-white prose-p:leading-relaxed prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-1 prose-blockquote:rounded-r-lg">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {ideaToMarkdown(selectedIdea)}
                                    </ReactMarkdown>
                                </article>

                                {/* Navigation Suggestions */}
                                {(prevIdea || nextIdea) && (
                                    <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800">
                                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 text-center">Continue Transformation</h4>
                                        <div className={`grid gap-4 ${prevIdea && nextIdea ? 'md:grid-cols-2' : 'grid-cols-1 max-w-md mx-auto'}`}>
                                            {prevIdea && (
                                                <button
                                                    onClick={() => {
                                                        setSelectedIdea(prevIdea);
                                                        const modalContent = document.querySelector('.custom-scrollbar');
                                                        if (modalContent) modalContent.scrollTo({ top: 0, behavior: 'smooth' });
                                                    }}
                                                    className="flex items-center gap-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-left group"
                                                >
                                                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-primary transition-colors">
                                                        <span className="material-icons">arrow_back</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Previous Guide</span>
                                                        <p className="font-bold text-slate-700 dark:text-slate-300 text-sm line-clamp-1">{prevIdea.title}</p>
                                                    </div>
                                                </button>
                                            )}
                                            {nextIdea && (
                                                <button
                                                    onClick={() => {
                                                        setSelectedIdea(nextIdea);
                                                        const modalContent = document.querySelector('.custom-scrollbar');
                                                        if (modalContent) modalContent.scrollTo({ top: 0, behavior: 'smooth' });
                                                    }}
                                                    className="flex items-center justify-between gap-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-right group"
                                                >
                                                    <div className="flex-1 min-w-0">
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Next Transformation</span>
                                                        <p className="font-bold text-slate-700 dark:text-slate-300 text-sm line-clamp-1">{nextIdea.title}</p>
                                                    </div>
                                                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-primary transition-colors">
                                                        <span className="material-icons">arrow_forward</span>
                                                    </div>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                                
                                <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <span className="material-icons text-sm">auto_awesome</span>
                                        </div>
                                        <p className="text-sm text-slate-500">Traditional Wisdom for Modern Healing</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            if (selectedIdea) {
                                                const idStr = String(selectedIdea.id);
                                                if (!readSubtopics.includes(idStr)) {
                                                    toggleReadStatus(idStr);
                                                }
                                            }
                                            setSelectedIdea(null);
                                        }}
                                        className="w-full sm:w-auto px-10 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                                    >
                                        <span className="material-icons text-xl">check_circle</span>
                                        Finished Reading
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}

// Helper to ensure markdown is formatted correctly if we want to add dynamic bits
function ideaToMarkdown(idea: RecoveryIdea) {
    return idea.recoveryArticle;
}
