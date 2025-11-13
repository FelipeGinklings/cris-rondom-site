import colors from '../../constants/colors';

const Location = () => {
    return (
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
                    Atendimentos em domicílio em Balneário Camboriú, SC e
                    região.
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
    );
};

export default Location;
