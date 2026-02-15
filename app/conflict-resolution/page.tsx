
'use client';

import React, { useState } from 'react';
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

// Hardcoded Data
const conflictScenarios: ConflictScenario[] = [
    {
        id: '1',
        category: 'Mindset',
        title: 'Spending vs. Saving (Financial Values)',
        upbringing_context: 'One partner grew up in a household where money was tight and saving was survival. The other grew up where money was abundant or used freely to enjoy life.',
        conflict_manifestation: 'Arguments over "unnecessary" purchases vs. "being cheap". The saver feels anxious when money is spent; the spender feels controlled or restricted.',
        management_strategies: {
            for_husband: [
                'Understand that her need to save (or spend) is likely rooted in childhood security or freedom, not just stubbornness.',
                'Instead of criticizing a purchase, ask "What does this purchase mean to you?" to understand the emotional value.',
                'Agree on a "fun money" budget that requires no accountability to reduce friction.'
            ],
            for_wife: [
                'Recognize that his anxiety about spending might be a fear of not being able to provide or protect the family.',
                'Frame budget discussions around "goals" (like a house or trip) rather than restrictive "limits".',
                'Appreciate his intent to enjoy life (if spender) or secure the future (if saver) before critiquing the method.'
            ]
        }
    },
    {
        id: '2',
        category: 'Habit',
        title: 'Cleanliness Standards (Order vs. Comfort)',
        upbringing_context: 'One partner was raised in an immaculate home where mess was equated with laziness. The other came from a "lived-in" home where comfort was prioritized over tidy surfaces.',
        conflict_manifestation: 'Constant nagging about socks on the floor or unwashed dishes. One feels disrespected by the mess; the other feels unable to relax in their own home.',
        management_strategies: {
            for_husband: [
                'If you need order, explain it as a mental health need ("clutter makes me anxious") rather than a moral failing of hers.',
                'Don\'t just clean up after her with a sigh; establish a specific "reset time" (e.g., 15 mins before bed) you do together.',
                'Acknowledge that her tolerance for mess might actually bring a relaxed warmth to the home that you struggle to create.'
            ],
            for_wife: [
                'Understand that his request for tidiness is often a request for peace of mind, not an attempt to control you.',
                'Agree on "sacred zones" (like the bedroom or kitchen sink) that must be kept clear, while allowing relaxation in others.',
                'Communicate when you are too tired to clean, so he knows it\'s temporary fatigue, not disrespect.'
            ]
        }
    },
    {
        id: '3',
        category: 'Communication',
        title: 'Direct vs. Indirect Communication (Tone & Words)',
        upbringing_context: 'One family communicated loudly and bluntly ("Tell it like it is"). The other family used hints, silence, or soft suggestions to avoid conflict.',
        conflict_manifestation: 'The direct partner is seen as rude or aggressive. The indirect partner is seen as passive-aggressive or secretive. Simple requests turn into fights about "tone".',
        management_strategies: {
            for_husband: [
                'If you are direct: Soften your opener. Use "I feel" instead of "You are". Your volume might be registering as anger to her.',
                'If you are indirect: Understand that she might not "get the hint". It\'s safer to say "I am hurt by X" than to withdraw into silence.',
                'Validate her feelings before explaining your intent. "I didn\'t mean to sound harsh, but I see that I scared you."'
            ],
            for_wife: [
                'If you are direct: realize he might shut down if he feels attacked. Ask, "Is this a good time to talk?" to lower defenses.',
                'If you are indirect: He likely cannot read your mind. Expressing a need clearly ("I need you to do the dishes") is often welcomed over a heavy sigh.',
                'Don\'t assume his bluntness is lack of love. It might just be his efficient way of solving problems.'
            ]
        }
    },
    {
        id: '4',
        category: 'Communication',
        title: 'Slang & " disrespectful" words',
        upbringing_context: 'In one family, words like "stupid", "shut up", or swearing were casual banter. In the other, these were strict taboo or signs of deep disrespect.',
        conflict_manifestation: 'One partner uses a word they think is harmless, and the other is deeply wounded. The user defends ("It\'s just a word!"), invalidating the hurt.',
        management_strategies: {
            for_husband: [
                'Accept that words carry different weights in different families. If it hurts her, it\'s too heavy, regardless of your intent.',
                'Create a "red flag" word list together. Agree that these words act as an immediate pause button for the argument.',
                'Apologize for the impact ("I hurt you"), not just the intent ("I was just joking").'
            ],
            for_wife: [
                'Explain clearly *why* a word triggers you (e.g., "In my house, that word meant someone was despised"). Give him context.',
                'Differentiate between a slip-up in heat and a pattern of verbal abuse. Address the specific word choice calmly when things cool down.',
                'If you use "softer" language that hides the severity of an issue, try to use more concrete words so he understands the gravity.'
            ]
        }
    },

];

export default function ConflictResolutionPage() {
    const [activeCategory, setActiveCategory] = useState<'All' | 'Mindset' | 'Habit' | 'Communication'>('All');

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
                </div>
            </main>

            <Footer />
        </div>
    );
}
