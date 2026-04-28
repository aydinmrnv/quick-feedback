import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b">
        <div className="text-xl font-bold text-blue-600">QuickFeedback</div>
        <div className="space-x-4">
          <Link href="/dashboard" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Go to Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          Get actionable feedback <br />
          <span className="text-blue-600">in seconds.</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
          The simplest way to add a feedback widget to your website. 
          No complex setup. No bloated scripts. Just pure user insights.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/dashboard"
            className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Start for Free
          </Link>
          <a href="#how-it-works" className="text-sm font-semibold leading-6 text-gray-900">
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Placeholder for Widget Preview */}
        <div className="mt-16 p-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <div className="max-w-sm mx-auto bg-white p-6 rounded-xl shadow-lg text-left">
            <h3 className="font-bold text-lg mb-2">How was your experience?</h3>
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <button key={i} className="w-10 h-10 rounded-full border border-gray-300 hover:bg-blue-50 hover:border-blue-500 flex items-center justify-center">
                  {i}
                </button>
              ))}
            </div>
            <textarea 
              className="w-full p-2 border border-gray-200 rounded-md mb-4 h-24"
              placeholder="Any comments? (Optional)"
            ></textarea>
            <button className="w-full bg-blue-600 text-white py-2 rounded-md font-bold">
              Send Feedback
            </button>
          </div>
        </div>
      </main>

      {/* Features */}
      <section id="how-it-works" className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Why QuickFeedback?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Setup</h3>
              <p className="text-gray-600">Copy-paste a single line of code. No npm install required for basic usage.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Beautiful Analytics</h3>
              <p className="text-gray-600">See all your user feedback in a clean, organized dashboard.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Free to Start</h3>
              <p className="text-gray-600">Generous free tier for early startups and side projects.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t text-center text-gray-500">
        <p>&copy; 2026 QuickFeedback. All rights reserved.</p>
        <p className="mt-2 text-sm italic">Built for the modern web.</p>
      </footer>
    </div>
  );
}
