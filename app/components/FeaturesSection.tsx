import Link from 'next/link';

const features = [
    {
        icon: "extension",
        title: "Conflict Resolution",
        description: "Bring the pieces back together. Our guided framework helps you address root issues without the heat of the moment, focusing on neutral ground.",
        points: ["Neutral mediation scripts", "De-escalation protocols"],
        hasGlow: true,
        link: "/conflict-resolution"
    },
    {
        icon: "forum",
        title: "Active Dialogues",
        description: "Learn to speak and listen in ways that foster connection rather than defense. Practical tools for daily communication hurdles.",
        points: ["Guided expression prompts", "Real-time feedback loop"],
        hasGlow: false,
        link: "/topics"
    },
    {
        icon: "self_improvement",
        title: "Guided Healing",
        description: "Step-by-step journeys designed by leading psychologists to help you navigate trauma, infidelity, or long-term drift.",
        points: ["Expert-led video sessions", "Progress tracking tools"],
        hasGlow: false,
        link: "/recovery-ideas"
    },
];

const FeaturesSection = () => {
    return (
        <section className="py-24 bg-background-light dark:bg-background-dark relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Foundation for Reconciliation</h2>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        We provide the structure and psychological safety needed to address complex emotional challenges.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const CardContent = (
                            <div
                                className={`group p-8 rounded-2xl bg-white dark:bg-primary/5 border border-primary/10 hover:border-primary/40 transition-all duration-300 h-full ${feature.hasGlow ? "relative overflow-hidden" : ""
                                    }`}
                            >
                                {feature.hasGlow && (
                                    <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>
                                )}
                                <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 text-primary">
                                    <span className="material-icons text-3xl">{feature.icon}</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed mb-6">
                                    {feature.description}
                                </p>
                                <ul className="space-y-3">
                                    {feature.points.map((point, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                                            <span className="material-icons text-primary text-base">check_circle</span>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );

                        return (
                            <div key={index} className="h-full">
                                {feature.link ? (
                                    <Link href={feature.link} className="block h-full">
                                        {CardContent}
                                    </Link>
                                ) : (
                                    CardContent
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
