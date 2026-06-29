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
              href="https://github.com/satorutkhs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-nf-gray/50 hover:bg-nf-gray text-white text-sm font-medium rounded transition-colors"
            >
              <i className="devicon-github-original text-xl" />
              GitHub
            </a>
            <a
              href="mailto:example@example.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-nf-red hover:bg-nf-red-hover text-white text-sm font-medium rounded transition-colors"
            >
              <span className="material-symbols-outlined text-xl select-none">
                mail
              </span>
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
