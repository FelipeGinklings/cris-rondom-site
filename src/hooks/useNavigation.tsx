import { useNavigate } from 'react-router-dom';

type Href =
    | '/calendar'
    | `/calendar/${string}`
    | '/clients'
    | '/home'
    | '/login';

const useNavigation = () => {
    const navigate = useNavigate();

    const customNavigate = (href: Href) => {
        navigate(href);
    };

    return { navigate: customNavigate };
};

export default useNavigation;
