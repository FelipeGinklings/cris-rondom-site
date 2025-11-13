import colors from '../../constants/colors';

const Header: React.FC = () => {
    return (
        <header className="sticky top-0 bg-white shadow-sm z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div>
                    <h1
                        className="text-2xl font-bold"
                        style={{ color: colors.texto.escuro }}
                    >
                        Esteticista
                    </h1>
                    <p
                        className="text-sm"
                        style={{ color: colors.texto.destaque }}
                    >
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
    );
};

export default Header;
