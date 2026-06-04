const INSTAGRAM_URL = "https://www.instagram.com/mappadiroma/";

function InstagramIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-brown-dark text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-serif text-2xl font-bold mb-4">MappaRoma</div>
            <p className="text-white/60 leading-relaxed mb-6 max-w-md">
              A community-driven cultural guide to Rome, designed for international students
              and curious visitors who want to discover the city beyond the tourist trail.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
            >
              <InstagramIcon />
              Follow @mappadiroma
            </a>
          </div>

          {/* Links */}
          <div>
            <div className="font-semibold mb-4 text-white/80">Quick links</div>
            <ul className="space-y-3 text-white/50">
              <li><a href="#project" className="hover:text-white transition-colors">The Project</a></li>
              <li><a href="#guide" className="hover:text-white transition-colors">The Guide</a></li>
              <li><a href="#community" className="hover:text-white transition-colors">Community Contests</a></li>
              <li><a href="#instagram" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="https://github.com/Phyrrah/mapparoma-web/releases/download/v1.0/Booklet.pdf" className="hover:text-white transition-colors">Download Booklet</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Become a Partner</a></li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-terracotta-light transition-colors flex items-center gap-1"
                >
                  <InstagramIcon />
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-sm">
          <div>
            © 2026 MappaRoma — A Rome Business School Capstone Project
          </div>
          <div className="flex items-center gap-4">
            <span className="text-center text-xs">
              Team: Claudia Ciardiello · Pierre Brancart · Giulia Mologni · Adriane Bordin · Anaya Ambalal · Tamar Kiphiani
            </span>
            <span className="text-white/20 text-xs">·</span>
            <span className="text-white/20 text-xs">Website co-built with AI</span>
            <span className="text-white/20 text-xs">·</span>
            <a href="/admin" className="text-white/20 hover:text-white/50 transition-colors text-xs">
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
