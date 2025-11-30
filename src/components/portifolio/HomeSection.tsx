import colors from '../../constants/colors';

const HomeSection = () => {
    return (
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
                                background:
                                    colors.portfolioGradiente.barraGradiente,
                            }}
                        ></div>
                    </div>
                    <div className="flex justify-center">
                        <div
                            className="w-64 h-64 rounded-full flex items-center justify-center"
                            style={{
                                background:
                                    colors.portfolioGradiente
                                        .gradienteSuaveClaro,
                            }}
                        >
                            <div className="w-60 h-60 bg-white rounded-full">
                                <img
                                    src="/assets/perfil.jpeg"
                                    alt="Cris Rondon"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeSection;
