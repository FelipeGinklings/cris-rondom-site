import colors from '../../constants/colors';
import About from './About';
import Footer from './Footer';
import Header from './Header';
import HomeSection from './HomeSection';
import Location from './Location';
import Others from './Others';
import Services from './Services';

const Portifolio = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-white">{children}</div>
);

Portifolio.MainSection = ({ children }: { children: React.ReactNode }) => (
    <main>{children}</main>
);
Portifolio.FooterSection = ({ children }: { children: React.ReactNode }) => (
    <footer
        className="py-12 px-6"
        style={{ backgroundColor: colors.texto.escuro }}
    >
        {children}
    </footer>
);

Portifolio.Header = Header;
Portifolio.Home = HomeSection;
Portifolio.About = About;
Portifolio.Services = Services;
Portifolio.Others = Others;
Portifolio.Location = Location;
Portifolio.Footer = Footer;

export default Portifolio;
