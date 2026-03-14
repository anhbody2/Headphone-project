import { motion } from 'framer-motion';
import RandomizeText from "../components/effect/randomizetext";
export const CombinedProfilePage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="bg-black text-white selection:bg-blue-500 selection:text-white">
      
      {/* --- ABOUT SECTION (Bento Grid) --- */}
      <section className="min-h-screen p-6 md:p-20 flex flex-col justify-center">
        <motion.div className="mb-16">
          <h2 className="text-6xl font-black tracking-tighter md:text-8xl" >
            ABOUT<span className="text-orange-500">.</span>
          </h2>
          <p className="text-zinc-500 mt-4 font-mono uppercase tracking-widest text-sm">
            Full-Stack Developer & Visual Creator
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[200px]">
          {/* Main Bio Card */}
          <motion.div 
            className="md:col-span-4 md:row-span-2 bg-zinc-900 border border-zinc-800 rounded-[2rem] p-10 flex flex-col justify-end relative overflow-hidden"
            whileHover={{ borderColor: '#2563eb' }}
          >
            <div className="absolute top-8 right-8 text-zinc-500 text-7xl font-bold italic select-none">01</div>

            <h3 className="text-3xl font-bold mb-4 relative z-10"><RandomizeText text="Logic meets Aesthetic." /></h3>
            <p className="text-zinc-400 max-w-md relative z-10 leading-relaxed">
              I build scalable systems with Laravel and React, specializing in high-end UI 
              that feels as good as it looks. My workflow bridges the gap between 
              complex backend architecture and cinematic frontend interactions.
            </p>
            
          </motion.div>

          {/* Profile Image - High Tech Feel */}
          <motion.div 
            className="md:col-span-2 md:row-span-3 bg-zinc-800 rounded-[2rem] overflow-hidden group relative"
            
          >
            <img 
              src="https://i.pinimg.com/736x/7c/80/ef/7c80efe6ed3aa33bbd4f97cc41b2827c.jpg" 
              alt="Portrait" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6 font-mono text-[10px] tracking-widest text-white/50">
              [ FOCUS_MODE: ACTIVE ]
            </div>
          </motion.div>

          {/* Tech Stack Card */}
          <motion.div className="md:col-span-2 bg-orange-500 rounded-[2rem] p-8 flex items-center justify-center">
            <ul className="flex flex-wrap gap-2 justify-center font-bold text-xs uppercase tracking-wider">
              <li className="bg-black/20 px-3 py-1 rounded-full">React</li>
              <li className="bg-black/20 px-3 py-1 rounded-full">TypeScript</li>
              <li className="bg-black/20 px-3 py-1 rounded-full">Laravel</li>
              <li className="bg-black/20 px-3 py-1 rounded-full">MySQL</li>
              <li className="bg-black/20 px-3 py-1 rounded-full">Tailwind</li>
            </ul>
          </motion.div>

          {/* Secondary Text/Vibe Card */}
          <motion.div className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 flex flex-col justify-center">
            <p className="text-zinc-500 text-sm italic font-serif">
              "Precision is the difference between a tool and an experience."
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- CONTACT SECTION (Glassmorphism) --- */}
      <section className="min-h-screen p-6 md:p-20 flex items-center justify-center relative overflow-hidden">
        {/* Background "Lens Flare" effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />

        <motion.div 
          className="w-full max-w-5xl bg-zinc-900/40 backdrop-blur-2xl border border-white/5 rounded-[3rem] shadow-2xl overflow-hidden grid md:grid-cols-2"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="p-12 md:p-16 space-y-12">
            <div>
              <h2 className="text-5xl font-bold tracking-tighter mb-4">GET IN TOUCH<span className="text-blue-500">.</span></h2>
              <p className="text-zinc-400 text-lg">Ready to take your project to the next steps?</p>
            </div>

            <div className="space-y-6">
              <div className="group flex items-center gap-6 cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <span className="text-xl">@</span>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest">DM Me</p>
                  <p className="text-zinc-200 font-medium">vutuananh2812@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <form className="p-12 md:p-16 bg-white/[0.02] flex flex-col gap-8">
            <div className="relative">
              <input type="text" placeholder="Your Name" className="w-full bg-transparent border-b border-zinc-800 py-4 focus:border-blue-500 outline-none transition-all text-white placeholder:text-zinc-600" />
            </div>
            <div className="relative">
              <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-zinc-800 py-4 focus:border-blue-500 outline-none transition-all text-white placeholder:text-zinc-600" />
            </div>
            <div className="relative">
              <textarea placeholder="Tell me about the project" rows={3} className="w-full bg-transparent border-b border-zinc-800 py-4 focus:border-blue-500 outline-none transition-all text-white placeholder:text-zinc-600 resize-none" />
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 bg-white text-black py-5 rounded-2xl font-bold text-lg hover:bg-blue-500 hover:text-white transition-all shadow-xl shadow-white/5"
            >
              SEND INQUIRY
            </motion.button>
          </form>
        </motion.div>
      </section>

    </div>
  );
};
