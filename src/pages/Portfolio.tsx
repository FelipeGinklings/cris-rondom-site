import { Calendar as CalendarIcon, Instagram, Facebook } from 'lucide-react';

interface PortfolioProps {
  onNavigateToCalendar: () => void;
}

export default function Portfolio({ onNavigateToCalendar }: PortfolioProps) {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'rgb(100, 53, 34)' }}>Esteticista</h1>
            <p className="text-sm" style={{ color: 'rgb(193, 124, 85)' }}>Cris Rondon</p>
          </div>
          <nav className="flex gap-8 items-center">
            <a href="#home" className="text-sm font-medium hover:opacity-70" style={{ color: 'rgb(100, 53, 34)' }}>
              HOME
            </a>
            <a href="#servicos" className="text-sm font-medium hover:opacity-70" style={{ color: 'rgb(100, 53, 34)' }}>
              SERVIÇOS
            </a>
            <a href="#outros" className="text-sm font-medium hover:opacity-70" style={{ color: 'rgb(100, 53, 34)' }}>
              OUTROS
            </a>
            <button
              onClick={onNavigateToCalendar}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: 'rgb(100, 53, 34)' }}
            >
              <CalendarIcon className="w-4 h-4" />
              Calendário
            </button>
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-6xl font-bold mb-6" style={{ color: 'rgb(100, 53, 34)' }}>
                  Esteticista<br />Cris Rondon
                </h2>
                <div className="w-full h-1 mb-8" style={{ background: 'linear-gradient(90deg, rgb(193, 124, 85), rgb(205, 140, 100), rgb(193, 124, 85))' }}></div>
              </div>
              <div className="flex justify-center">
                <div className="w-64 h-64 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgb(193, 124, 85), rgb(205, 140, 100))' }}>
                  <div className="w-56 h-56 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="quem-e" className="py-20 px-6" style={{ backgroundColor: 'rgb(250, 245, 240)' }}>
          <div className="max-w-5xl mx-auto text-center">
            <h3 className="text-4xl font-bold mb-6" style={{ color: 'rgb(100, 53, 34)' }}>
              Quem é Cris Rondon?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Esteticista formada em ...... muitas coisas ......
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-48 h-48 rounded-full" style={{ background: 'linear-gradient(135deg, rgb(178, 108, 72), rgb(193, 124, 85), rgb(205, 140, 100))' }}></div>
            </div>
          </div>
        </section>

        <section id="servicos" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-4xl font-bold mb-12 text-center" style={{ color: 'rgb(100, 53, 34)' }}>
              Serviços oferecidos
            </h3>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div
                className="h-64 rounded-lg shadow-lg flex items-center justify-center"
                style={{ backgroundColor: 'rgb(230, 210, 195)' }}
              >
                <p className="text-xl font-semibold" style={{ color: 'rgb(100, 53, 34)' }}>Serviço 1</p>
              </div>
              <div
                className="h-64 rounded-lg shadow-lg flex items-center justify-center"
                style={{ backgroundColor: 'rgb(220, 195, 175)' }}
              >
                <p className="text-xl font-semibold" style={{ color: 'rgb(100, 53, 34)' }}>Serviço 2</p>
              </div>
            </div>
            <div
              className="w-full py-8 text-center rounded-lg"
              style={{ backgroundColor: 'rgb(240, 225, 210)' }}
            >
              <p className="text-xl font-semibold" style={{ color: 'rgb(100, 53, 34)' }}>
                E isso tudo sem você sair da sua casa!
              </p>
            </div>
          </div>
        </section>

        <section id="outros" className="py-20 px-6" style={{ backgroundColor: 'rgb(250, 245, 240)' }}>
          <div className="max-w-5xl mx-auto text-center">
            <h3 className="text-4xl font-bold mb-8" style={{ color: 'rgb(100, 53, 34)' }}>
              Outros
            </h3>
            <p className="text-lg text-gray-700">
              Mais informações sobre serviços adicionais e diferenciais.
            </p>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6" style={{ backgroundColor: 'rgb(100, 53, 34)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm text-white opacity-80">
                <li>coisas</li>
                <li>coisas</li>
                <li>coisas</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm text-white opacity-80">
                <li>coisas</li>
                <li>coisas</li>
                <li>coisas</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm text-white opacity-80">
                <li>coisas</li>
                <li>coisas</li>
                <li>coisas</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Redes sociais</h4>
              <div className="flex gap-4 mb-4">
                <a href="#" className="text-white hover:opacity-70">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-white hover:opacity-70">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
              <h4 className="text-white font-semibold mb-4 mt-6">Formas de pagamento</h4>
              <div className="flex gap-4">
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-xs font-bold" style={{ color: 'rgb(100, 53, 34)' }}>💳</span>
                </div>
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-xs font-bold" style={{ color: 'rgb(100, 53, 34)' }}>💰</span>
                </div>
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-xs font-bold" style={{ color: 'rgb(100, 53, 34)' }}>📱</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center text-white text-sm opacity-70">
            Todos os direitos reservados a Esteticista Cris Rondon ©
          </div>
        </div>
      </footer>
    </div>
  );
}
