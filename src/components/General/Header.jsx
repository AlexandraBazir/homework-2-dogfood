import Logo from "./Logo"
import {
    BalloonHeart, 
    Cart4, 
    PersonCircle, 
    BuildingUp, 
    BuildingDown
} from "react-bootstrap-icons";

import Search from "../Search";

// export default () => {
//     return <header>
//         <div className="logo">DogFood</div>
//     </header>
// } - сокращенный вид


// export { Footer, , ,  }; - экспорт с несколькими объектами, в import также прописываем их import { Footer }

const Header = ({user, upd, searchArr, setGoods, setSearchResult}) => {
    const login = () => {
        localStorage.setItem("user", "Vasya")
        upd("Vasya");
    };
    const logout = () => {
        localStorage.removeItem("user")
        upd(null);
    };
    return (
        <header>
            <Logo />
            <div className="search-block">
                <Search
                data={searchArr}
                setGoods={setGoods}
                setSearchResult={setSearchResult}
                />
            </div>
            <nav className="header__menu">
                { user && <>
                <a href="">
                    <BalloonHeart title="Избранное"/>
                    </a>
                <a href="">
                    <Cart4 title="Корзина"/>
                </a>
                <a href="">
                    <PersonCircle title="Личный кабинет"/>
                </a>
                </>}
                <span>
                    {!user && <BuildingUp title="Войти" onClick={login}/>}
                    {user && <BuildingDown title="Выйти"onClick={logout}/>}
                </span>
            </nav>
        </header>
    )
}

export default Header;