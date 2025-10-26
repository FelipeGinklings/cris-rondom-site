import { Instagram } from 'lucide-react';
import colors from '../constants/colors';
import { WhatsAppPath } from '../constants/whatsAppPath';

interface PortfolioProps {
  onNavigateToCalendar: () => void;
}

export default function Portfolio({ onNavigateToCalendar }: PortfolioProps) {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1
              className="text-2xl font-bold"
              style={{ color: colors.texto.escuro }}
            >
              Esteticista
            </h1>
            <p className="text-sm" style={{ color: colors.texto.destaque }}>
              Cris Rondon
            </p>
          </div>
          <nav className="flex gap-8 items-center">
            <a
              href="#home"
              className="text-sm font-medium hover:opacity-70"
              style={{ color: colors.texto.escuro }}
            >
              HOME
            </a>
            <a
              href="#servicos"
              className="text-sm font-medium hover:opacity-70"
              style={{ color: colors.texto.escuro }}
            >
              SERVIÇOS
            </a>
            <a
              href="#outros"
              className="text-sm font-medium hover:opacity-70"
              style={{ color: colors.texto.escuro }}
            >
              PROMOÇÕES
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2
                  className="text-6xl font-bold mb-6"
                  style={{ color: colors.texto.escuro }}
                >
                  Esteticista
                  <br />
                  Cris Rondon
                </h2>
                <div
                  className="w-full h-1 mb-8"
                  style={{
                    background: colors.portfolioGradiente.barraGradiente,
                  }}
                ></div>
              </div>
              <div className="flex justify-center">
                <div
                  className="w-64 h-64 rounded-full flex items-center justify-center"
                  style={{
                    background: colors.portfolioGradiente.gradienteSuaveClaro,
                  }}
                >
                  <div className="w-60 h-60 bg-white rounded-full">
                    <img
                      src="/assets/perfil.png"
                      alt="Cris Rondon"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="quem-e"
          className="py-20 px-6"
          style={{ backgroundColor: 'rgb(250, 245, 240)' }}
        >
          <div className="max-w-5xl mx-auto text-center">
            <h3
              className="text-4xl font-bold mb-6"
              style={{ color: colors.texto.escuro }}
            >
              Quem é Cris Rondon?
            </h3>
            <p className="text-xl text-gray-700 leading-relaxed mb-4">
              Cris é uma profissional apaixonada pelo estética e cosmetologia,
              formada pela Unicesumar. Desde a conclusão do seu curso, sua
              trajetória tem sido marcada pela busca constante de conhecimento e
              aperfeiçoamento nas diversas técnicas que envolvem o cuidado com a
              pele e o bem-estar.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-4">
              Além da formação acadêmica, ela investiu em uma série de cursos
              avulsos, incluindo massagem modeladora, drenagem linfática e
              microagulhamento. No entanto, Cris se destaca pela sua abordagem
              humanizada. Para ela, o atendimento vai muito além de
              procedimentos estéticos, é uma experiência de cuidado integral que
              considera as necessidades emocionais e físicas de cada cliente.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              Cada tratamento que realiza é pensado para ser uma experiência
              única de autocuidado, onde não só a pele é renovada, mas a
              sensação de leveza e bem-estar é promovida. Com um coração cheio
              de empatia, Cris é uma facilitadora de transformação pessoal e
              autoestima.
            </p>
            <div className="mt-8 flex justify-center">
              <div
                className="w-48 h-48 rounded-full"
                style={{
                  background: colors.portfolioGradiente.gradienteCompleto,
                }}
              >
                <img
                  src="/assets/about.png"
                  alt="Cris Rondon"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="servicos" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h3
              className="text-4xl font-bold mb-12 text-center"
              style={{ color: colors.texto.escuro }}
            >
              Serviços oferecidos
            </h3>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div
                className="h-64 rounded-lg shadow-lg flex items-center justify-center"
                style={{ backgroundColor: colors.cardColorPortfolio.bgClaro }}
              >
                <p
                  className="text-xl font-semibold"
                  style={{ color: colors.texto.escuro }}
                >
                  Drenagem linfática
                </p>
              </div>
              <div
                className="h-64 rounded-lg shadow-lg flex items-center justify-center"
                style={{ backgroundColor: colors.cardColorPortfolio.bgBege }}
              >
                <p
                  className="text-xl font-semibold"
                  style={{ color: colors.texto.escuro }}
                >
                  Pedras quentes
                </p>
              </div>
              <div
                className="h-64 rounded-lg shadow-lg flex items-center justify-center"
                style={{ backgroundColor: colors.cardColorPortfolio.bgBege }}
              >
                <p
                  className="text-xl font-semibold"
                  style={{ color: colors.texto.escuro }}
                >
                  Velas terapêuticas
                </p>
              </div>
              <div
                className="h-64 rounded-lg shadow-lg flex items-center justify-center"
                style={{ backgroundColor: colors.cardColorPortfolio.bgClaro }}
              >
                <p
                  className="text-xl font-semibold"
                  style={{ color: colors.texto.escuro }}
                >
                  Relaxante
                </p>
              </div>
              <div
                className="h-64 rounded-lg shadow-lg flex items-center justify-center"
                style={{ backgroundColor: colors.cardColorPortfolio.bgClaro }}
              >
                <p
                  className="text-xl font-semibold"
                  style={{ color: colors.texto.escuro }}
                >
                  Ventosa
                </p>
              </div>
              <div
                className="h-64 rounded-lg shadow-lg flex items-center justify-center"
                style={{ backgroundColor: colors.cardColorPortfolio.bgBege }}
              >
                <p
                  className="text-xl font-semibold"
                  style={{ color: colors.texto.escuro }}
                >
                  Massagem
                </p>
              </div>
            </div>
            <div
              className="w-full py-8 text-center rounded-lg"
              style={{ backgroundColor: colors.cardColorPortfolio.banner }}
            >
              <p
                className="text-xl font-semibold"
                style={{ color: colors.texto.escuro }}
              >
                E isso tudo sem você sair da sua casa!
              </p>
            </div>
          </div>
        </section>

        <section
          id="local"
          className="py-20 px-6"
          style={{ backgroundColor: 'rgb(250, 245, 240)' }}
        >
          <div className="max-w-5xl mx-auto text-center">
            <h3
              className="text-4xl font-bold mb-6"
              style={{ color: colors.texto.escuro }}
            >
              Local de atendimento
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Atendimentos em domicílio em Balneário Camboriú, SC e região.
            </p>
            <div className="flex justify-center">
              <div
                className="w-48 h-48 rounded-full flex items-center justify-center"
                style={{
                  background:
                    'linear-gradient(135deg, rgb(193, 124, 85), rgb(205, 140, 100))',
                }}
                aria-hidden
              >
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-12 h-12"
                    fill="currentColor"
                    style={{ color: colors.texto.escuro }}
                    aria-hidden
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="outros" className="py-20 px-6 bg-white">
          <div className="max-w-5xl mx-auto text-center">
            <h3
              className="text-4xl font-bold mb-8"
              style={{ color: colors.texto.escuro }}
            >
              Promoções
            </h3>
            <p className="text-lg text-gray-700">
              Mais informações sobre serviços adicionais e diferenciais.
            </p>
          </div>
        </section>
      </main>

      <footer
        className="py-12 px-6"
        style={{ backgroundColor: colors.texto.escuro }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-row items-center justify-center gap-10 mb-10">
            <div className="text-center">
              <h2 className="text-white font-semibold mb-4 text-lg">
                Redes sociais
              </h2>
              <div className="flex gap-4 justify-center">
                <a
                  href="https://www.instagram.com/esteticistacrisrondon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:opacity-70 w-12 h-8"
                  aria-label="Instagram"
                >
                  <Instagram className="w-12 h-8" />
                </a>
                <a
                  href="#"
                  className="text-white hover:opacity-70 w-12 h-8"
                  aria-label="WhatsApp"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 32 32"
                    fill="currentColor"
                    className="w-12 h-8"
                  >
                    <path d={WhatsAppPath} />
                  </svg>
                </a>
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-white font-semibold mb-4 text-lg">
                Formas de pagamento
              </h2>
              <div className="flex gap-4 justify-center">
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                    style={{ color: colors.texto.escuro }}
                  >
                    <path d="M15.536 11.293a1 1 0 0 0 0 1.414l2.376 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z" />
                    <path d="M2.297 11.293a1 1 0 0 0 0 1.414l2.377 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414L6.088 8.916a1 1 0 0 0-1.414 0z" />
                    <path d="M8.916 17.912a1 1 0 0 0 0 1.415l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.415l-2.377-2.376a1 1 0 0 0-1.414 0z" />
                    <path d="M8.916 4.674a1 1 0 0 0 0 1.414l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z" />
                  </svg>
                </div>

                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                    style={{ color: colors.texto.escuro }}
                  >
                    <rect width="20" height="12" x="2" y="6" rx="2" />
                    <circle cx="12" cy="12" r="2" />
                    <path d="M6 12h.01" />
                    <path d="M18 12h.01" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center text-white text-sm opacity-70">
            Todos os direitos reservados a Esteticista Cris Rondon © ·{' '}
            <button
              onClick={onNavigateToCalendar}
              className="hover:opacity-70 underline transition-opacity"
            >
              Administração
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
