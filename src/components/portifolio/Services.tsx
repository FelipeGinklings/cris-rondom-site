import colors from '../../constants/colors';

const Services = () => {
    return (
        <section id="servicos" className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <h3
                    className="text-4xl font-bold mb-12 text-center"
                    style={{ color: colors.texto.escuro }}
                >
                    Serviços oferecidos
                </h3>
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <div
                        className="relative h-96 rounded-lg shadow-lg overflow-hidden pt-14"
                        style={{
                            backgroundColor: colors.cardColorPortfolio.bgClaro,
                        }}
                    >
                        <p
                            className="absolute top-0 left-0 w-full text-center py-3 text-xl font-semibold"
                            style={{ color: colors.texto.escuro }}
                        >
                            Drenagem linfática
                        </p>
                        <img
                            src="/assets/drenagem.jpeg"
                            alt="Drenagem linfática"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div
                        className="relative h-96 rounded-lg shadow-lg overflow-hidden pt-14"
                        style={{
                            backgroundColor: colors.cardColorPortfolio.bgBege,
                        }}
                    >
                        <p
                            className="absolute top-0 left-0 w-full text-center py-3 text-xl font-semibold"
                            style={{ color: colors.texto.escuro }}
                        >
                            Pedras quentes
                        </p>
                        <img
                            src="/assets/pedras.png"
                            alt="Pedras quentes"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div
                        className="relative h-96 rounded-lg shadow-lg overflow-hidden pt-14"
                        style={{
                            backgroundColor: colors.cardColorPortfolio.bgClaro,
                        }}
                    >
                        <p
                            className="absolute top-0 left-0 w-full text-center py-3 text-xl font-semibold"
                            style={{ color: colors.texto.escuro }}
                        >
                            Velas terapêuticas
                        </p>
                        <img
                            src="/assets/velas.jpeg"
                            alt="Velas terapêuticas"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div
                        className="relative h-96 rounded-lg shadow-lg overflow-hidden pt-14"
                        style={{
                            backgroundColor: colors.cardColorPortfolio.bgBege,
                        }}
                    >
                        <p
                            className="absolute top-0 left-0 w-full text-center py-3 text-xl font-semibold"
                            style={{ color: colors.texto.escuro }}
                        >
                            Relaxante
                        </p>
                        <img
                            src="/assets/relaxante.jpeg"
                            alt="Relaxante"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div
                        className="relative h-96 rounded-lg shadow-lg overflow-hidden pt-14"
                        style={{
                            backgroundColor: colors.cardColorPortfolio.bgClaro,
                        }}
                    >
                        <p
                            className="absolute top-0 left-0 w-full text-center py-3 text-xl font-semibold"
                            style={{ color: colors.texto.escuro }}
                        >
                            Ventosa
                        </p>
                        <img
                            src="/assets/ventosa.png"
                            alt="Ventosa"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div
                        className="relative h-96 rounded-lg shadow-lg overflow-hidden pt-14"
                        style={{
                            backgroundColor: colors.cardColorPortfolio.bgBege,
                        }}
                    >
                        <p
                            className="absolute top-0 left-0 w-full text-center py-3 text-xl font-semibold"
                            style={{ color: colors.texto.escuro }}
                        >
                            Massagem
                        </p>
                        <img
                            src="/assets/massagem.jpeg"
                            alt="Massagem"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                <div
                    className="w-full py-8 text-center rounded-lg"
                    style={{
                        backgroundColor: colors.cardColorPortfolio.banner,
                    }}
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
    );
};

export default Services;
