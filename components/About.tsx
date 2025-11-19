import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Our Mission</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          We are bridging the gap between digital connectivity and physical design, one cloud at a time.
        </p>
      </div>

      <div className="space-y-16">
        {/* Goal 1: Aesthetic Connectivity */}
        <section className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 order-2 md:order-1">
             <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center text-2xl mb-6">
                ☁️
             </div>
             <h2 className="text-2xl font-bold text-slate-900 mb-4">Making Connectivity Beautiful</h2>
             <p className="text-slate-600 leading-relaxed text-lg">
                Asking for a WiFi password is often the first interaction a customer has with your space. 
                We believe this moment shouldn't be about hunting for a router sticker or typing in a random string of numbers. 
                Our custom cloud signs turn a standard utility into a welcoming design feature that elevates your interior decor.
             </p>
          </div>
          <div className="flex-1 order-1 md:order-2 w-full aspect-video bg-slate-100 rounded-3xl relative overflow-hidden">
             <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(#cbd5e1 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-20 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <span className="text-slate-300 font-bold">WiFi</span>
                </div>
             </div>
          </div>
        </section>

        {/* Goal 2: AI Integration */}
        <section className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
          <div className="flex-1 order-2 md:order-1">
             <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-6">
                ✨
             </div>
             <h2 className="text-2xl font-bold text-slate-900 mb-4">Powered by Intelligence</h2>
             <p className="text-slate-600 leading-relaxed text-lg">
                Creativity can be hard. That's why we integrated Google's Gemini 2.5 Flash AI directly into our platform. 
                Whether you run a cozy cat café or a high-intensity gym, our AI generates password ideas that capture your brand's unique vibe, 
                making your network credentials as memorable as your service.
             </p>
          </div>
           <div className="flex-1 order-1 md:order-2 w-full aspect-video bg-gradient-to-br from-indigo-50 to-sky-50 rounded-3xl flex items-center justify-center">
              <span className="text-6xl">🧠</span>
          </div>
        </section>
        
        {/* CTA */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 text-center shadow-xl shadow-slate-200">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to upgrade your space?</h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">Join thousands of businesses that have ditched the sticky note for a cloud.</p>
            <Link 
                to="/customize" 
                className="inline-block px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-sky-900/20"
            >
                Start Designing Now
            </Link>
        </div>
      </div>
    </div>
  );
};

export default About;