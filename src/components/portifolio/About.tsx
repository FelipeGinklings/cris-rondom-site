import colors from '../../constants/colors';

const About = () => {
    return (
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
                    Cris é uma profissional apaixonada pelo estética e
                    cosmetologia, formada pela Unicesumar. Desde a conclusão do
                    seu curso, sua trajetória tem sido marcada pela busca
                    constante de conhecimento e aperfeiçoamento nas diversas
                    técnicas que envolvem o cuidado com a pele e o bem-estar.
                </p>
                <p className="text-xl text-gray-700 leading-relaxed mb-4">
                    Além da formação acadêmica, ela investiu em uma série de
                    cursos avulsos, incluindo massagem modeladora, drenagem
                    linfática e microagulhamento. No entanto, Cris se destaca
                    pela sua abordagem humanizada. Para ela, o atendimento vai
                    muito além de procedimentos estéticos, é uma experiência de
                    cuidado integral que considera as necessidades emocionais e
                    físicas de cada cliente.
                </p>
                <p className="text-xl text-gray-700 leading-relaxed">
                    Cada tratamento que realiza é pensado para ser uma
                    experiência única de autocuidado, onde não só a pele é
                    renovada, mas a sensação de leveza e bem-estar é promovida.
                    Com um coração cheio de empatia, Cris é uma facilitadora de
                    transformação pessoal e autoestima.
                </p>
                <div className="mt-8 flex justify-center">
                    <div
                        className="w-48 h-48 rounded-full"
                        style={{
                            background:
                                colors.portfolioGradiente.gradienteCompleto,
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
    );
};

export default About;
