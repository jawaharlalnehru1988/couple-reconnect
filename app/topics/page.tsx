
'use client';

import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Define the data structures based on the API response
interface Conversation {
    id: number;
    kind: string;
    sample: string;
    audio: string | null;
    order: number;
}

interface Solution {
    article: string;
    article_audio: string | null;
    wrong_conversations: Conversation[];
    perfect_conversations: Conversation[];
}

interface Subtopic {
    subtopic_id: string;
    subtopic: string;
    solution: Solution;
}

interface Topic {
    topic_id: string;
    topic: string;
    subtopics: Subtopic[];
}

interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Topic[];
}

// Subtopic Modal Component
const SubtopicModal = ({ subtopic, onClose }: { subtopic: Subtopic, onClose: () => void }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white dark:bg-background-dark w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden relative border border-primary/20 max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-primary/10 flex justify-between items-start bg-primary/5">
                    <div>
                        <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2 block">Solution Guide</span>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{subtopic.subtopic}</h3>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-500 dark:text-slate-400 transition-colors z-10"
                >
                    <span className="material-icons">close</span>
                </button>

                {/* Content */}
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    {/* Article Section */}
                    {subtopic.solution.article && (
                        <div className="mb-10 prose dark:prose-invert max-w-none">
                            <h4 className="flex items-center gap-2 text-xl font-bold text-primary mb-4">
                                <span className="material-icons">article</span>
                                Understanding the Issue
                            </h4>
                            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700/50 whitespace-pre-wrap text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                                {subtopic.solution.article}
                            </div>
                        </div>
                    )}

                    {/* Conversations Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Wrong Way */}
                        {subtopic.solution.wrong_conversations && subtopic.solution.wrong_conversations.length > 0 && (
                            <div>
                                <h4 className="flex items-center gap-2 text-lg font-bold text-rose-500 mb-4">
                                    <span className="material-icons">cancel</span>
                                    The Common Pattern (Avoid)
                                </h4>
                                <div className="space-y-4">
                                    {subtopic.solution.wrong_conversations.map((conv) => (
                                        <div key={conv.id} className="bg-rose-50 dark:bg-rose-900/10 p-5 rounded-xl border border-rose-100 dark:border-rose-900/30">
                                            <div className="whitespace-pre-wrap text-sm text-rose-900 dark:text-rose-100 italic">
                                                "{conv.sample}"
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Right Way */}
                        {subtopic.solution.perfect_conversations && subtopic.solution.perfect_conversations.length > 0 && (
                            <div>
                                <h4 className="flex items-center gap-2 text-lg font-bold text-emerald-500 mb-4">
                                    <span className="material-icons">check_circle</span>
                                    The Healthy Approach (Try This)
                                </h4>
                                <div className="space-y-4">
                                    {subtopic.solution.perfect_conversations.map((conv) => (
                                        <div key={conv.id} className="bg-emerald-50 dark:bg-emerald-900/10 p-5 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                                            <div className="whitespace-pre-wrap text-sm text-emerald-900 dark:text-emerald-100">
                                                "{conv.sample}"
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function TopicsPage() {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [selectedSubtopic, setSelectedSubtopic] = useState<Subtopic | null>(null);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await fetch('https://couple.asknehru.com/api/topics/');
                const data: ApiResponse = await response.json();
                setTopics(data.results);
            } catch (error) {
                console.error("Error fetching topics:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopics();
    }, []);

    const handleTopicClick = (topicId: string) => {
        setSelectedTopic(selectedTopic === topicId ? null : topicId);
    };

    const handleSubtopicClick = (subtopic: Subtopic) => {
        setSelectedSubtopic(subtopic);
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display flex flex-col">
            <Navbar />

            <main className="flex-grow pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold tracking-widest text-sm uppercase mb-4 block">Library</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            Relationship Topics
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                            Explore common challenges and discover guided paths to better understanding and connection.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {topics.map((topic) => (
                                <div
                                    key={topic.topic_id}
                                    className={`bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border transition-all duration-300 ${selectedTopic === topic.topic_id
                                            ? 'border-primary shadow-xl shadow-primary/10 ring-1 ring-primary'
                                            : 'border-slate-200 dark:border-slate-800 hover:border-primary/50'
                                        }`}
                                >
                                    {/* Topic Header */}
                                    <div
                                        onClick={() => handleTopicClick(topic.topic_id)}
                                        className="p-6 md:p-8 cursor-pointer flex items-center justify-between group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${selectedTopic === topic.topic_id ? 'bg-primary text-white' : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white'
                                                }`}>
                                                <span className="material-icons text-2xl">category</span>
                                            </div>
                                            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                                {topic.topic}
                                            </h2>
                                        </div>
                                        <span className={`material-icons text-2xl transition-transform duration-300 ${selectedTopic === topic.topic_id ? 'rotate-180 text-primary' : 'text-slate-400'
                                            }`}>
                                            expand_more
                                        </span>
                                    </div>

                                    {/* Subtopics List (Collapsible) */}
                                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${selectedTopic === topic.topic_id ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                                        }`}>
                                        <div className="p-6 md:p-8 pt-0 border-t border-slate-100 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-900/50">
                                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6 ml-1">Specific Scenarios</h3>
                                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {topic.subtopics.map((subtopic) => (
                                                    <div
                                                        key={subtopic.subtopic_id}
                                                        onClick={() => handleSubtopicClick(subtopic)}
                                                        className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group"
                                                    >
                                                        <div className="flex items-start justify-between gap-3 mb-3">
                                                            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 group-hover:bg-primary group-hover:text-white transition-colors">
                                                                <span className="material-icons text-xl">psychology</span>
                                                            </div>
                                                            <span className="material-icons text-slate-300 group-hover:text-primary transition-colors">arrow_forward</span>
                                                        </div>
                                                        <p className="font-medium text-slate-800 dark:text-slate-200 line-clamp-2">
                                                            {subtopic.subtopic}
                                                        </p>
                                                    </div>
                                                ))}
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

            {/* Modal for Subtopic Details */}
            {selectedSubtopic && (
                <SubtopicModal subtopic={selectedSubtopic} onClose={() => setSelectedSubtopic(null)} />
            )}
        </div>
    );
}
