import colors from '../../constants/colors';

const Others = () => {
    return (
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
    );
};

export default Others;
