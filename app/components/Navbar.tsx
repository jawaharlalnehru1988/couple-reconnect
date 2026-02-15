
import React from 'react';

const Navbar = () => {
    return (
        <nav className="fixed w-full z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="material-icons text-white text-xl">favorite</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                        Reconnect
                    </span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
                    <a className="hover:text-primary transition-colors" href="#">How it Works</a>
                    <a className="hover:text-primary transition-colors" href="#">Our Approach</a>
                    <a className="hover:text-primary transition-colors" href="#">Resources</a>
                    <a className="hover:text-primary transition-colors" href="#">Pricing</a>
                </div>
                <div className="flex items-center gap-4">
                    <button className="hidden sm:block px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                        Log In
                    </button>
                    <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-primary/20 cursor-pointer">
                        Start Healing
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
