
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Topics", href: "/topics" },
        { name: "Recovery Ideas", href: "/recovery-ideas" },
        { name: "Conflict Resolution", href: "https://conflict.asknehru.com/" },
        { name: "How it Works", href: "#how-it-works" },
        { name: "Our Approach", href: "#our-approach" },
        { name: "Resources", href: "#resources" },
        { name: "Pricing", href: "#pricing" },
    ];

    return (
        <>
            <nav className="fixed w-full z-[60] bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="material-icons text-white text-xl">favorite</span>
                            </div>
                            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                                Reconnect
                            </span>
                        </Link>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
                        {navLinks.slice(0, 6).map((link) => (
                            <Link key={link.name} href={link.href} className="hover:text-primary transition-colors">{link.name}</Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="hidden sm:block px-4 py-2 text-sm font-medium hover:text-primary transition-colors cursor-pointer text-slate-600 dark:text-slate-300">
                            Log In
                        </button>
                        
                        {/* Hamburger Menu Button */}
                        <button 
                            onClick={toggleSidebar}
                            className="w-11 h-11 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl flex items-center justify-center transition-all cursor-pointer relative z-50"
                            aria-label="Toggle Menu"
                        >
                            <span className="material-icons text-2xl">
                                {isSidebarOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Sidebar Overlay */}
            <div 
                className={`fixed inset-0 bg-background-dark/40 backdrop-blur-sm z-[70] transition-opacity duration-300 ${
                    isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={toggleSidebar}
            />

            {/* Side Navigation Bar */}
            <aside 
                className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white/90 dark:bg-background-dark/95 backdrop-blur-xl z-[80] shadow-2xl border-l border-primary/10 transition-transform duration-500 ease-in-out transform ${
                    isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="p-8 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="material-icons text-white text-xl">favorite</span>
                            </div>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">Menu</span>
                        </div>
                        <button 
                            onClick={toggleSidebar}
                            className="p-2 text-slate-400 hover:text-primary transition-colors cursor-pointer"
                        >
                            <span className="material-icons">close</span>
                        </button>
                    </div>

                    <nav className="flex flex-col gap-2">
                        {navLinks.map((link, idx) => (
                            <Link 
                                key={link.name} 
                                href={link.href}
                                onClick={toggleSidebar}
                                className="group flex items-center justify-between p-4 rounded-2xl hover:bg-primary/5 transition-all"
                                style={{ transitionDelay: `${idx * 50}ms` }}
                            >
                                <span className="text-lg font-semibold text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
                                    {link.name}
                                </span>
                                <span className="material-icons text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all">
                                    chevron_right
                                </span>
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-auto space-y-4">
                        <button className="w-full py-4 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all cursor-pointer">
                            Start Healing
                        </button>
                        <p className="text-center text-xs text-slate-400">
                            Join over 12,000 couples restoring hope today.
                        </p>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Navbar;
