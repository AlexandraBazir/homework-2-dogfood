import { Link } from "react-router-dom";
import { useContext } from "react";
import Card from "../components/Card/Card";
import Promo from "../components/Promo/Promo";
import Ctx from "../ctx";

const promoData = ["=)", "=(", "0_0", "T_т"];

const OldPage = ({ goods }) => {
    const {searchResult} = useContext(Ctx);
    return <>
        <h1>Старые данные</h1>
        <nav>
            <Link to="/">Страница 1</Link>
            <Link to="/catalog">Страница 2</Link>
            <Link to="/old">Страница 3</Link>
        </nav>
        <div className="container">
            {searchResult && <p className="search-result">{searchResult}</p>}
            {goods.map((pro, i) => <Card key={i} img={pro.pictures} name={pro.name} price={pro.price} />)}
            {promoData.map((el, i) => <Promo key={i} text={el} />)}
        </div>
    </>
}

export default OldPage;