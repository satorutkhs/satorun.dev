import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="bg-jal-dark text-white">
      {/* Contact Section */}
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Contact info */}
          <div>
            <h2 className="text-xl font-bold mb-4">Contact</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
              お気軽にご連絡ください。プロジェクトのご相談や共同研究のお誘いなど、お待ちしております。
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/satorutkhs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-md transition-colors"
              >
                <i className="devicon-github-original text-lg" />
                GitHub
              </a>
              <a
                href="mailto:example@example.com"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-jal-red hover:bg-jal-red-hover text-white text-sm font-medium rounded-md transition-colors"
              >
                <span className="material-symbols-outlined text-lg select-none">mail</span>
                Email
              </a>
            </div>
          </div>

          {/* Right: Quick links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                Navigation
              </h3>
              <ul className="space-y-2.5">
                {[
                  { label: "About", href: "/#about" },
                  { label: "Skills", href: "/#skills" },
                  { label: "Projects", href: "/#projects" },
                  { label: "Education", href: "/#education" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                Content
              </h3>
              <ul className="space-y-2.5">
                {[
                  { label: "Blog", href: "/blog" },
                  { label: "Research", href: "/research" },
                  { label: "Git Activity", href: "/#git-history" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} 髙橋 慧流. Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
