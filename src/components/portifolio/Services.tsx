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
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div
                        className="h-64 rounded-lg shadow-lg flex items-center justify-center"
                        style={{
                            backgroundColor: colors.cardColorPortfolio.bgClaro,
                        }}
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
                        style={{
                            backgroundColor: colors.cardColorPortfolio.bgBege,
                        }}
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
                        style={{
                            backgroundColor: colors.cardColorPortfolio.bgBege,
                        }}
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
                        style={{
                            backgroundColor: colors.cardColorPortfolio.bgClaro,
                        }}
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
                        style={{
                            backgroundColor: colors.cardColorPortfolio.bgClaro,
                        }}
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
                        style={{
                            backgroundColor: colors.cardColorPortfolio.bgBege,
                        }}
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
