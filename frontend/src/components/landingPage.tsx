import { useState } from "react";
import heroImg from "../assets/hero.png";
import Login from "./login";

const LandingPage = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-pink-600/20 rounded-full blur-[100px] -z-10" />

      <main className="w-full max-w-4xl flex flex-col items-center text-center">
        <div className="glass-card p-12 w-full max-w-2xl transform hover:scale-[1.01] transition-transform duration-500">
          <div className="mb-8 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <img 
                src={heroImg} 
                className="relative base animate-float" 
                width="120" 
                height="126" 
                alt="Hero" 
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Welcome to <span className="gradient-text">Notify</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-10 max-w-md mx-auto">
            The ultimate web notification hub. Seamlessly manage and broadcast alerts with style.
          </p>

          <div className="space-y-6">
            <Login />
            
            <div className="pt-4 border-t border-white/5">
              <button
                className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-2 mx-auto"
                onClick={() => setCount((c) => c + 1)}
              >
                Experimental features enabled
                <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono">
                  Clicks: {count}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full">
          {[
            { title: "Real-time", desc: "Instant push notifications across all devices." },
            { title: "Google Auth", desc: "Secure and seamless login with your Google account." },
            { title: "Premium UI", desc: "Glassmorphic design for a modern web experience." }
          ].map((feature, i) => (
            <div key={i} className="glass-card p-6 text-left hover:border-white/20 transition-colors">
              <h3 className="text-lg font-semibold mb-2 text-purple-400">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="mt-20 text-gray-500 text-sm">
        <p>&copy; 2026 Notify App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
