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
                    O início de um novo ano é um convite para renovação e autodescoberta. Que tal começar 2026 se presenteando com uma experiência relaxante e inesquecível?<br>
                    </br><br></br> Nossas sessões especiais estão aqui para ajudá-la a dar as boas-vindas a este novo ciclo, cheio de energias positivas e bem-estar. Imagine começar o ano renovado, dando ao seu corpo o cuidado que ele merece!
                    <br></br><br></br> Estamos prontos para tornar essa experiência única e especial para você. Entre em contato e agende seu momento de autocuidado hoje mesmo. Vamos juntos iniciar o ano com vitalidade e serenidade!
                </p>
            </div>
        </section>
    );
};

export default Others;
