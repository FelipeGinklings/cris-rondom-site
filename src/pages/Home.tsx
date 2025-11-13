import Portifolio from '../components/portifolio/Portifolio';

export default function Home() {
    return (
        <Portifolio>
            <Portifolio.Header />
            <Portifolio.MainSection>
                <Portifolio.Home />
                <Portifolio.About />
                <Portifolio.Services />
                <Portifolio.Location />
                <Portifolio.Others />
            </Portifolio.MainSection>
            <Portifolio.FooterSection>
                <Portifolio.Footer />
            </Portifolio.FooterSection>
        </Portifolio>
    );
}
