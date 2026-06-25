export default function Footer() {
  return (
    <footer id="contact" className="bg-nf-dark border-t border-nf-gray/30 mt-16">
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-12">
        {/* Contact Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6">Contact</h2>
          <p className="text-nf-light-gray text-sm leading-relaxed max-w-lg mb-6">
            お気軽にご連絡ください。プロジェクトのご相談や共同研究のお誘いなど、お待ちしております。
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-nf-gray/50 hover:bg-nf-gray text-white text-sm font-medium rounded transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="mailto:example@example.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-nf-red hover:bg-nf-red-hover text-white text-sm font-medium rounded transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-nf-gray/30 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-nf-light-gray">
            &copy; {new Date().getFullYear()} 髙橋 慧流. Built with React &amp; Next.js
          </p>
          <p className="text-xs text-nf-light-gray/50">
            Inspired by Netflix UI
          </p>
        </div>
      </div>
    </footer>
  );
}
