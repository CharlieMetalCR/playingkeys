import Link from "next/link";
import { Music, Play, Users, BookOpen, Star, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Music className="text-blue-600" size={24} />
            <span className="font-bold text-xl text-gray-900">PlayingKeys</span>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">Features</a>
            <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900">How It Works</a>
            <Link href="/admin" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Admin Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Learn Piano
            <span className="text-blue-600"> Interactive</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A modern piano learning platform with interactive lessons,
            real-time feedback, and progress tracking. Start your musical
            journey today.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/admin" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2">
              <Play size={18} />
              Get Started
            </Link>
            <a href="#features" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50">
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Everything You Need</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Music, title: "Interactive Piano", desc: "Play real piano keys with accurate sound. Practice anywhere without a physical piano." },
              { icon: BookOpen, title: "Structured Lessons", desc: "Follow a progressive curriculum from basics to advanced techniques." },
              { icon: Users, title: "Teacher Dashboard", desc: "Teachers can manage students, track progress, and assign custom lessons." },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-xl p-6 border border-gray-200">
                <f.icon className="text-blue-600 mb-4" size={32} />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="space-y-8">
            {[
              { step: "1", title: "Sign Up", desc: "Create your account and get assigned to a teacher." },
              { step: "2", title: "Practice", desc: "Follow interactive lessons on your mobile device." },
              { step: "3", title: "Progress", desc: "Track your improvement and earn achievements." },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{s.title}</h3>
                  <p className="text-gray-600 mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          PlayingKeys. Piano learning platform.
        </div>
      </footer>
    </div>
  );
}