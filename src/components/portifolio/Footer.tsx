import { Instagram } from 'lucide-react';
import colors from '../../constants/colors';
import { WhatsAppPath } from '../../constants/paths';
import { useAuth } from '../../hooks/useAuth';
import useNavigation from '../../hooks/useNavigation';

const Footer = () => {
    const { navigate } = useNavigation();
    const { user } = useAuth();
    const navigateToLoginHandler = () => {
        if (user) navigate('/calendar');
        else navigate('/login');
    };
    return (
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
                                <rect
                                    width="20"
                                    height="12"
                                    x="2"
                                    y="6"
                                    rx="2"
                                />
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
                    onClick={navigateToLoginHandler}
                    className="hover:opacity-70 underline transition-opacity"
                >
                    Administração
                </button>
            </div>
        </div>
    );
};

export default Footer;
