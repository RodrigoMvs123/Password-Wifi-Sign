import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white pt-16 pb-32 lg:pt-32 lg:pb-48">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-100 via-transparent to-transparent opacity-70"></div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-600 text-sm font-medium mb-8">
                    <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
                    New: AI Password Generation
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-8">
                    Share your WiFi <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">with style.</span>
                </h1>
                
                <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed">
                    Custom cloud-shaped signs that make connecting effortless. 
                    Perfect for cafes, offices, and modern homes.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                        to="/customize" 
                        className="px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-sky-200 transition-all hover:scale-105"
                    >
                        Design Your Sign
                    </Link>
                    <Link 
                        to="/about" 
                        className="px-8 py-4 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-xl font-bold text-lg transition-all"
                    >
                        Learn More
                    </Link>
                </div>
            </div>

            {/* Decorative Cloud Elements */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-48 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none"></div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 bg-slate-50">
             <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: '🎨', title: 'Custom Design', desc: 'Minimalist cloud shape that fits any interior decor.' },
                        { icon: '✨', title: 'AI Powered', desc: 'Stuck? Let our Gemini AI generate witty passwords for you.' },
                        { icon: '🚀', title: 'Easy Setup', desc: 'Comes with damage-free mounting strips ready to hang.' },
                    ].map((feature, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                            <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
             </div>
        </section>
      </main>
    </div>
  );
};

export default Home;