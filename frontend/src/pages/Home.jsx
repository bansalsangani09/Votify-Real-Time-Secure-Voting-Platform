import React, { useEffect, useState, useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    AnimatePresence,
    useReducedMotion
} from "framer-motion";
import {
    ArrowRight,
    ShieldCheck,
    Users,
    Zap,
    Fingerprint,
    Globe,
    Database,
    Menu,
    X,
    Sparkles,
    Terminal,
    HelpCircle,
    Check
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import SEO from "../components/SEO";

/**
 * Ultra-performance hardware-accelerated Cursor Glow.
 * Bypasses React's render loop entirely, updating transform coordinates via direct DOM reference.
 */
function CursorGlow() {
    const glowRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (glowRef.current) {
                glowRef.current.style.transform = `translate3d(${e.clientX - 250}px, ${e.clientY - 250}px, 0)`;
            }
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div
            ref={glowRef}
            className="fixed w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-500/5 blur-[120px] rounded-full pointer-events-none -z-10 hidden md:block will-change-transform"
            style={{
                left: 0,
                top: 0,
                transform: 'translate3d(-1000px, -1000px, 0)',
                transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
        />
    );
}

export default function Home() {
    const shouldReduceMotion = useReducedMotion();
    const { scrollY } = useScroll();
    const navigate = useNavigate();

    /* NAVBAR SCROLL TRANSFORMS */
    const navHeight = useTransform(scrollY, [0, 80], [80, 64]);

    /* MOBILE DRAWER MENU STATE */
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    /* LIVE INTERACTIVE DEMO STATES */
    const [votes, setVotes] = useState({ candidateA: 488, candidateB: 512 });
    const [isVoting, setIsVoting] = useState(false);
    const [voteLog, setVoteLog] = useState([
        { id: 1, user: "0x8f2d...b1a2", action: "Vote encrypted and cast", time: "Just now" },
        { id: 2, user: "0x3e1a...f8c9", action: "Vote received and verified", time: "1m ago" },
        { id: 3, user: "0x9c4f...d3e2", action: "Vote logged to audit ledger", time: "3m ago" }
    ]);

    const handleCastDemoVote = (candidate) => {
        if (isVoting) return;
        setIsVoting(candidate);
        setTimeout(() => {
            setVotes(prev => ({
                ...prev,
                [candidate]: prev[candidate] + 1
            }));
            const randomHash = "0x" + Math.random().toString(16).substring(2, 6) + "..." + Math.random().toString(16).substring(2, 6);
            setVoteLog(prev => [
                { id: Date.now(), user: randomHash, action: "Vote encrypted and verified", time: "Just now" },
                ...prev.slice(0, 2)
            ]);
            setIsVoting(false);
        }, 800);
    };

    return (
        <div className="relative bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden min-h-screen font-inter transition-colors duration-300 selection:bg-blue-500/30">
            
            {/* Dynamic SEO Meta Tags */}
            <SEO 
                title="Secure Digital Voting and Election Management"
                description="Votify is a secure, verifiable digital voting platform built on tamper-resistant architecture to guarantee voter privacy and real-time audited results."
                keywords="secure voting, digital voting, election management, secure elections, digital governance, Votify, SaaS"
            />

            {/* Zero-render Cursor Glow */}
            <CursorGlow />

            {/* ===== Grid & Ambience Atmosphere ===== */}
            <div className="absolute inset-0 -z-20 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute w-[800px] h-[800px] bg-indigo-500/5 dark:bg-indigo-500/5 blur-[140px] rounded-full -top-96 -left-48" />
                <div className="absolute w-[700px] h-[700px] bg-blue-500/5 dark:bg-blue-500/5 blur-[120px] rounded-full top-[30%] -right-48" />
            </div>

            {/* ===== STICKY NAVBAR ===== */}
            <motion.header
                style={{ height: navHeight }}
                className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-slate-100/80 dark:border-slate-900/50 bg-white/70 dark:bg-slate-950/70 transition-colors duration-300"
            >
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <div 
                        className="flex items-center gap-3 cursor-pointer" 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-900 dark:bg-white p-1.5 shadow-md shadow-slate-900/5 dark:shadow-white/5">
                            <img src={logo} alt="Votify logo" className="w-full h-full invert dark:invert-0" />
                        </div>
                        <span className="text-base font-black tracking-tight text-slate-950 dark:text-white uppercase">
                            Votify
                        </span>
                    </div>

                    <nav className="hidden lg:flex gap-8 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
                        <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2">Protocol</a>
                        <a href="#analytics" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2">Product</a>
                        <a href="#security" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2">Cryptography</a>
                        <a href="#faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2">FAQ</a>
                    </nav>

                    <div className="hidden sm:flex items-center gap-4">
                        <button
                            onClick={() => navigate("/login")}
                            className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 focus-visible:outline-none rounded-lg"
                        >
                            Sign In
                        </button>
                        <motion.button
                            whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                            onClick={() => navigate("/register")}
                            className="bg-slate-950 dark:bg-white text-white dark:text-slate-950 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 focus-visible:outline-none"
                        >
                            Join Portal
                        </motion.button>
                    </div>

                    <button 
                        onClick={() => setMobileMenuOpen(true)}
                        className="lg:hidden p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-all focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 focus-visible:outline-none"
                        aria-label="Toggle menu"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
            </motion.header>

            {/* ===== MOBILE DRAWER MENU ===== */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md lg:hidden"
                    >
                        <motion.div 
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute top-0 right-0 w-80 h-full bg-white dark:bg-slate-950 shadow-2xl p-6 flex flex-col border-l border-slate-100 dark:border-slate-900"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-sm font-black uppercase tracking-widest text-slate-500">Navigation</span>
                                <button 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900/50 text-slate-500 dark:text-slate-400"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-6 text-sm font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">
                                <a href="#features" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400 py-2 border-b border-slate-50 dark:border-slate-900">Protocol</a>
                                <a href="#analytics" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400 py-2 border-b border-slate-50 dark:border-slate-900">Analytics</a>
                                <a href="#security" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400 py-2 border-b border-slate-50 dark:border-slate-900">Cryptography</a>
                                <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400 py-2 border-b border-slate-50 dark:border-slate-900">FAQ</a>
                            </nav>

                            <div className="mt-auto space-y-4">
                                <button
                                    onClick={() => { setMobileMenuOpen(false); navigate("/login"); }}
                                    className="w-full py-4 text-xs font-black uppercase tracking-widest border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 focus-visible:outline-none"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => { setMobileMenuOpen(false); navigate("/register"); }}
                                    className="w-full py-4 text-xs font-black uppercase tracking-widest bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-xl focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 focus-visible:outline-none"
                                >
                                    Join Portal
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ===== HERO SECTION WITH DUAL COLUMN LAYOUT ===== */}
            <section className="pt-36 pb-20 px-6 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left Column (Core Messaging) */}
                    <div className="lg:col-span-7 space-y-8 text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/10 dark:border-blue-500/20 rounded-full text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.25em]"
                        >
                            <Sparkles className="w-3 h-3 text-blue-500 dark:text-blue-400 animate-pulse" />
                            Enterprise Digital Voting Platform
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tighter text-slate-950 dark:text-white"
                        >
                            Secure Digital Voting
                            <br />
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600 dark:from-blue-400 dark:via-blue-300 dark:to-indigo-400 bg-clip-text text-transparent italic">
                                for Modern Organizations.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.7 }}
                            className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-xl font-medium leading-relaxed"
                        >
                            Secure digital voting and election management built on verifiable, tamper-resistant architecture. Guarantee voter privacy and get real-time, audited results.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25, duration: 0.7 }}
                            className="flex flex-col sm:flex-row items-center gap-4"
                        >
                            <motion.button
                                whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -2 }}
                                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                                onClick={() => navigate("/register")}
                                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-blue-500/10 transition-all font-black text-xs uppercase tracking-widest cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 focus-visible:outline-none"
                            >
                                Launch Workspace <ArrowRight size={14} />
                            </motion.button>
                            <motion.button
                                whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -2 }}
                                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                                className="w-full sm:w-auto px-8 py-4 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-300 bg-white/50 dark:bg-slate-900/30 backdrop-blur-sm font-black text-xs uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-900 transition-all flex items-center justify-center cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 focus-visible:outline-none"
                            >
                                View Protocol
                            </motion.button>
                        </motion.div>

                    </div>

                    {/* Right Column (Live Interactive Sandbox Mockup) */}
                    <div className="lg:col-span-5 relative mt-6 lg:mt-0">
                        {/* Soft Glow */}
                        <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/5 blur-3xl rounded-[3rem] -z-10" />

                        {/* Sandbox Card Container */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/80 rounded-[2.5rem] p-6 md:p-8 backdrop-blur-2xl shadow-xl dark:shadow-black/30 w-full"
                        >
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/60 dark:border-slate-800/80">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[8px] font-black uppercase tracking-wider rounded-md">
                                    <span className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" />
                                    Live Demo
                                </div>
                            </div>

                            {/* Demo Voting */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Try a live voting simulation:</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        onClick={() => handleCastDemoVote('candidateA')}
                                        className="p-4 bg-white dark:bg-slate-900/80 hover:bg-blue-500/5 dark:hover:bg-blue-500/5 border border-slate-200 dark:border-slate-800 rounded-2xl text-left transition-all active:scale-95 flex flex-col justify-between h-28 group focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 focus-visible:outline-none"
                                    >
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Candidate A</span>
                                        <div className="flex justify-between items-end w-full">
                                            <span className="text-2xl font-black text-slate-900 dark:text-white">{votes.candidateA}</span>
                                            <span className="text-[10px] font-bold text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">Vote +1</span>
                                        </div>
                                    </button>
                                    <button 
                                        onClick={() => handleCastDemoVote('candidateB')}
                                        className="p-4 bg-white dark:bg-slate-900/80 hover:bg-blue-500/5 dark:hover:bg-blue-500/5 border border-slate-200 dark:border-slate-800 rounded-2xl text-left transition-all active:scale-95 flex flex-col justify-between h-28 group focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 focus-visible:outline-none"
                                    >
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Candidate B</span>
                                        <div className="flex justify-between items-end w-full">
                                            <span className="text-2xl font-black text-slate-900 dark:text-white">{votes.candidateB}</span>
                                            <span className="text-[10px] font-bold text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">Vote +1</span>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Live Verification log */}
                            <div className="mt-6 space-y-3">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Live Activity Feed</span>
                                <div className="bg-white dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/80 rounded-xl p-3.5 space-y-2.5 font-mono text-[9px]">
                                    {isVoting && (
                                        <div className="flex items-center gap-2 text-blue-500 dark:text-blue-400">
                                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" />
                                            <span>Encrypting vote for Candidate {isVoting === 'candidateA' ? 'A' : 'B'}...</span>
                                        </div>
                                    )}
                                    {voteLog.map((log) => (
                                        <div key={log.id} className="flex justify-between text-slate-500 dark:text-slate-400">
                                            <span className="text-slate-800 dark:text-slate-200">{log.user}</span>
                                            <span>{log.action}</span>
                                            <span className="text-[8px] opacity-60">{log.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </section>

            {/* ===== PRODUCT METRICS & STATS ===== */}
            <Reveal>
                <section className="pb-32 px-6">
                    <div className="max-w-6xl mx-auto bg-white/50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/80 rounded-[2.5rem] p-10 md:p-14 backdrop-blur-xl relative overflow-hidden shadow-xl dark:shadow-black/20">
                        {/* Status bar */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-blue-500/10 border-b border-x border-blue-500/20 text-blue-600 dark:text-blue-400 text-[9px] font-black uppercase tracking-[0.25em] px-4 py-1.5 rounded-b-2xl flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                            Security Verified
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 mt-4">
                                <Stat title="Active Nodes" value="320 Nodes" icon={<Globe className="w-4 h-4" />} />
                                <Stat title="Verified Voters" value="12K+ IDs" icon={<Users className="w-4 h-4" />} />
                                <Stat title="Consensus Records" value="250K+ Blocks" icon={<Database className="w-4 h-4" />} blue />
                                <Stat title="Integrity Score" value="100% Valid" icon={<ShieldCheck className="w-4 h-4" />} blue />
                            </div>
                    </div>
                </section>
            </Reveal>

            {/* ===== DETAILED FEATURE GRID ===== */}
            <Reveal>
                <section id="features" className="py-24 px-6 bg-slate-50/50 dark:bg-slate-900/10 border-y border-slate-100/80 dark:border-slate-900/50 relative overflow-hidden">
                    <div className="max-w-6xl mx-auto text-center mb-20">
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">Platform Features</span>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-950 dark:text-white mt-3 mb-6 tracking-tight">
                            Enterprise Capabilities
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-medium text-sm md:text-base">
                            Built with security and speed to handle digital voting at any scale.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <Card
                            icon={<ShieldCheck className="w-5 h-5 text-blue-500" />}
                            title="Audit Trail"
                            description="Every vote is assigned a unique cryptographic signature, allowing end-to-end verification without compromising ballot privacy."
                        />
                        <Card
                            icon={<Fingerprint className="w-5 h-5 text-indigo-500" />}
                            title="Ballot Privacy"
                            description="Advanced cryptographic methods prove a vote is valid without revealing the voter's identity or selection."
                        />
                        <Card
                            icon={<Zap className="w-5 h-5 text-amber-500" />}
                            title="Real-Time Tracking"
                            description="View participation rates and election results as they are verified and tallied in real-time."
                        />
                        <Card
                            icon={<Users className="w-5 h-5 text-emerald-500" />}
                            title="Access Management"
                            description="Easily configure permissions for election administrators, candidates, and voters."
                        />
                        <Card
                            icon={<Database className="w-5 h-5 text-rose-500" />}
                            title="Detailed Activity Logs"
                            description="Track all administrative changes, node syncs, and election milestones for transparency."
                        />
                        <Card
                            icon={<Terminal className="w-5 h-5 text-slate-500" />}
                            title="API Integrations"
                            description="Sync voter rolls directly with your existing user directories or single sign-on providers."
                        />
                    </div>
                </section>
            </Reveal>

            {/* ===== CRYPTOGRAPHY / PROTOCOL EXPLANATION ===== */}
            <Reveal>
                <section id="security" className="py-24 px-6 max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-5 space-y-6 text-left">
                            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">ZK-Snark Proofs</span>
                            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-950 dark:text-white">Verifiable governance infrastructure built for secure digital voting.</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                                Votify removes the need to trust a centralized authority. Through cryptographic verification, voters can verify that their ballot was cast, counted, and correctly tallied without exposing their personal selection.
                            </p>
                            <div className="space-y-3.5">
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center"><Check size={12} className="stroke-[3]" /></div>
                                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Individual ballot verification</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center"><Check size={12} className="stroke-[3]" /></div>
                                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Distributed node verification</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center"><Check size={12} className="stroke-[3]" /></div>
                                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Immutable audit log</span>
                                </div>
                            </div>
                        </div>

                        {/* High-Fidelity Audit Ledger Screenshot Mockup */}
                        <div className="lg:col-span-7 relative group">
                            <div className="absolute inset-0 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            <div className="bg-slate-900 border border-slate-200/10 dark:border-slate-800 rounded-[2rem] p-2 shadow-2xl overflow-hidden">
                                <img 
                                    src="/assets/audit_mockup.webp" 
                                    alt="Votify Security Audit Ledger Screenshot" 
                                    className="w-full h-auto rounded-[1.5rem] object-cover hover:scale-[1.01] transition-transform duration-500"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </Reveal>

            {/* ===== ANALYTICS PREVIEW SECTION ===== */}
            <Reveal>
                <section id="analytics" className="py-24 px-6 bg-slate-50/50 dark:bg-slate-900/10 border-y border-slate-100/80 dark:border-slate-900/50">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
                        
                        {/* High-Fidelity Dashboard Screenshot Mockup */}
                        <div className="lg:col-span-7 relative group">
                            <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-500/10 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            <div className="bg-slate-900 border border-slate-200/10 dark:border-slate-800 rounded-[2rem] p-2 shadow-2xl overflow-hidden">
                                <img 
                                    src="/assets/dashboard_mockup.webp" 
                                    alt="Votify Analytics Dashboard Screenshot" 
                                    className="w-full h-auto rounded-[1.5rem] object-cover hover:scale-[1.01] transition-transform duration-500"
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        <div className="lg:col-span-5 space-y-6 text-left">
                            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">Election Monitoring</span>
                            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-950 dark:text-white">Election Monitoring Dashboard</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                                Monitor voter turnout, track node statuses, and analyze participation rates in real-time. Votify gives administrators instant access to election data while ensuring voter confidentiality.
                            </p>
                        </div>
                    </div>
                </section>
            </Reveal>

            {/* ===== TESTIMONIALS ===== */}
            <Reveal>
                <section className="py-24 px-6 max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">Validated Feedback</span>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-950 dark:text-white mt-3 tracking-tight">Loved by modern teams</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <TestimonialCard 
                            quote="Votify transformed our shareholder votes. We went from manual spreadsheets to instant, auditable results that everyone on the board can verify."
                            author="Sarah Jenkins"
                            role="Operations Director"
                            avatar="SJ"
                        />
                        <TestimonialCard 
                            quote="The platform's accessibility and speed are impressive. Voter verification works seamlessly across devices, and the audit trail is completely transparent."
                            author="Alex Rivera"
                            role="Security Engineering Lead"
                            avatar="AR"
                        />
                        <TestimonialCard 
                            quote="Votify's cryptographic audit logs made it easy to satisfy our internal compliance requirements. It has become our standard tool for governance votes."
                            author="Marcus Vance"
                            role="Governance Administrator"
                            avatar="MV"
                        />
                    </div>
                </section>
            </Reveal>

            {/* ===== SLICK FAQ ACCORDION SECTION ===== */}
            <Reveal>
                <section id="faq" className="py-24 px-6 bg-slate-50/50 dark:bg-slate-900/10 border-y border-slate-100/80 dark:border-slate-900/50">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">Got Questions?</span>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-950 dark:text-white mt-3 tracking-tight">Frequently Asked Questions</h2>
                        </div>

                        <div className="space-y-4">
                            <FAQItem 
                                question="How does Votify protect voter privacy?"
                                answer="Votify uses zero-knowledge cryptography. This mathematically proves that a ballot has been correctly counted in the election totals without linking the voter's identity to their selection."
                            />
                            <FAQItem 
                                question="Does Votify require blockchain nodes?"
                                answer="Votify records election milestones on a distributed ledger. This ensures that no single administrator or server can modify historical records or alter votes after they are cast."
                            />
                            <FAQItem 
                                question="Is the platform accessible on mobile?"
                                answer="Yes. Votify is built from the ground up to be responsive and fully accessible. It supports screen readers, keyboard-only navigation, and is optimized for all mobile screens."
                            />
                            <FAQItem 
                                question="How do we integrate custom identity systems?"
                                answer="Votify provides standard REST APIs and Webhooks. You can connect your existing user directories, single sign-on providers (like Okta), or database tools to sync voter lists automatically."
                            />
                        </div>
                    </div>
                </section>
            </Reveal>

            {/* ===== ENTERPRISE CTA SECTION ===== */}
            <Reveal>
                <section className="py-24 px-6 max-w-6xl mx-auto">
                    <div className="bg-slate-950 dark:bg-slate-900 border border-slate-900 dark:border-slate-800 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full -mr-48 -mt-48 blur-[100px] group-hover:scale-110 transition-transform duration-1000" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full -ml-48 -mb-48 blur-[100px] group-hover:scale-110 transition-transform duration-1000" />

                        <div className="relative z-10 flex flex-col items-center">
                            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-blue-500 mb-6">Secure Your Next Election</span>
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-none">Start your next election with confidence.</h2>
                            <p className="text-slate-400 text-sm md:text-base mb-10 max-w-lg mx-auto font-medium">
                                Create an account to set up your first election, or schedule a demo to discuss custom integrations for your organization.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <motion.button
                                    whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                                    whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                                    onClick={() => navigate("/register")}
                                    className="bg-white text-slate-950 px-10 py-4.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 focus-visible:outline-none"
                                >
                                    Get Started Free
                                </motion.button>
                                <motion.button
                                    whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                                    whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                                    onClick={() => navigate("/login")}
                                    className="px-10 py-4.5 text-xs font-black uppercase tracking-widest text-white border border-white/20 rounded-2xl hover:bg-white/10 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 focus-visible:outline-none"
                                >
                                    Talk to Sales
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </section>
            </Reveal>

            {/* ===== REDESIGNED MULTI-COLUMN FOOTER ===== */}
            <footer className="py-20 border-t border-slate-100 dark:border-slate-900 bg-slate-50 dark:bg-slate-950/40 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-10 text-left">
                    
                    {/* Brand column */}
                    <div className="col-span-2 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-900 dark:bg-white p-1">
                                <img src={logo} alt="Votify" className="w-full h-full invert dark:invert-0" />
                            </div>
                            <span className="text-sm font-black tracking-tight text-slate-900 dark:text-white uppercase">Votify</span>
                        </div>
                        <p className="text-slate-400 dark:text-slate-500 text-xs max-w-xs font-medium leading-relaxed">
                            Secure digital voting and election management built for modern organizations.
                        </p>
                    </div>

                    {/* Links Column 1 */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase text-slate-900 dark:text-white tracking-widest">Product</h4>
                        <div className="flex flex-col gap-2.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                            <a href="#security" className="hover:text-blue-500 transition-colors">Security & Privacy</a>
                            <a href="#features" className="hover:text-blue-500 transition-colors">Integrations</a>
                            <a href="#features" className="hover:text-blue-500 transition-colors">Documentation</a>
                            <a href="#security" className="hover:text-blue-500 transition-colors">Compliance</a>
                        </div>
                    </div>

                    {/* Links Column 2 */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase text-slate-900 dark:text-white tracking-widest">Developers</h4>
                        <div className="flex flex-col gap-2.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                            <a href="#features" className="hover:text-blue-500 transition-colors">Developer API</a>
                            <a href="#features" className="hover:text-blue-500 transition-colors">Single Sign-On</a>
                            <a href="#features" className="hover:text-blue-500 transition-colors">Webhooks</a>
                            <a href="#analytics" className="hover:text-blue-500 transition-colors">System Status</a>
                        </div>
                    </div>

                    {/* Links Column 3 */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase text-slate-900 dark:text-white tracking-widest">Security</h4>
                        <div className="flex flex-col gap-2.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                            <a href="#faq" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
                            <a href="#faq" className="hover:text-blue-500 transition-colors">Terms of Service</a>
                            <a href="#features" className="hover:text-blue-500 transition-colors">Infrastructure</a>
                            <a href="#security" className="hover:text-blue-500 transition-colors">Security & Trust</a>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-100 dark:border-slate-900/60 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">
                        © 2026 Votify. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-[9px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-600">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">Twitter</a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">GitHub</a>
                        <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">Discord</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

/* ===== Sub components ===== */

function Reveal({ children }) {
    const shouldReduceMotion = useReducedMotion();
    return (
        <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: shouldReduceMotion ? 0.25 : 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    );
}

function Card({ icon, title, description }) {
    const shouldReduceMotion = useReducedMotion();
    return (
        <motion.div
            whileHover={shouldReduceMotion ? {} : { y: -6 }}
            className="bg-white dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-900 rounded-[2rem] p-8 shadow-sm hover:shadow-xl dark:hover:shadow-black/20 hover:border-blue-500/10 dark:hover:border-blue-500/10 transition-all duration-300 group"
        >
            <div className="w-10 h-10 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 mb-6 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                {icon}
            </div>
            <h3 className="font-black text-base mb-3 text-slate-950 dark:text-white tracking-tight">{title}</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-xs font-semibold">{description}</p>
        </motion.div>
    );
}

function Step({ icon, title, description, number }) {
    const shouldReduceMotion = useReducedMotion();
    return (
        <motion.div
            whileHover={shouldReduceMotion ? {} : { y: -4 }}
            className="group relative pt-4 text-left"
        >
            <div className="absolute -top-6 left-0 text-7xl font-black text-slate-100/50 dark:text-slate-900/30 select-none -z-10 group-hover:text-blue-500/10 transition-colors duration-500">
                {number}
            </div>
            <div className="flex text-blue-600 dark:text-blue-400 mb-6">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/50 dark:border-slate-800/80 shadow-sm group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                    {icon}
                </div>
            </div>
            <h3 className="font-black text-base mb-3 text-slate-950 dark:text-white tracking-tight">{title}</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-xs font-semibold">{description}</p>
        </motion.div>
    );
}

function Stat({ title, value, blue, icon }) {
    return (
        <div className="text-center group">
            <div className={`w-9 h-9 rounded-xl inline-flex items-center justify-center mb-4 transition-all duration-300 ${blue ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-500'} group-hover:scale-105`}>
                {icon}
            </div>
            <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">{title}</p>
            <h3 className={`text-2xl font-black tracking-tight ${blue ? 'text-blue-600 dark:text-blue-400' : 'text-slate-950 dark:text-white'}`}>
                {value}
            </h3>
        </div>
    );
}

function TestimonialCard({ quote, author, role, avatar }) {
    return (
        <div className="bg-white dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/80 rounded-[2rem] p-8 text-left space-y-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-sm">★</span>
                ))}
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-xs font-semibold leading-relaxed italic">
                "{quote}"
            </p>
            <div className="flex items-center gap-3 pt-2">
                <div className="w-9 h-9 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center font-black text-xs border border-blue-600/20">
                    {avatar}
                </div>
                <div>
                    <h4 className="text-xs font-black text-slate-950 dark:text-white flex items-center gap-1.5">
                        {author}
                        <span className="w-3.5 h-3.5 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center text-[7px]">✓</span>
                    </h4>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{role}</p>
                </div>
            </div>
        </div>
    );
}

function FAQItem({ question, answer }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="bg-white dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl overflow-hidden transition-all text-left">
            <button 
                onClick={() => setOpen(!open)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 rounded-2xl"
            >
                <span className="text-xs md:text-sm font-black text-slate-800 dark:text-white tracking-wide flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-blue-500 shrink-0" />
                    {question}
                </span>
                <span className={`text-slate-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
                    ▼
                </span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-6 pb-5 pt-1 text-slate-500 dark:text-slate-400 text-xs md:text-sm font-medium leading-relaxed pl-13 border-t border-slate-50 dark:border-slate-900/40">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
