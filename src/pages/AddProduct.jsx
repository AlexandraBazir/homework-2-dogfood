import { useState } from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const AddProduct = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [link, setLink] = useState("https://kartinkof.club/uploads/posts/2022-09/thumbs/1662563948_7-kartinkof-club-p-novie-i-krasivie-kartinki-kostochka-7.png"); //pictures
    const [price, setPrice] = useState(999);
    const [cnt, setCnt] = useState(20); //stock
    const [description, setDescription] = useState("Скоро здесь будет текст...");
    const [discount, setDiscount] = useState(0);
    const [wight, setWight] = useState("0 г");
    const [tagWord, setTagWord] = useState("");//слово для массива с тегами
    const [tags, setTags] = useState(["df"]); //массив с тегами, по тегу df мы будем сортировать
    //  только наши товары и только с собачьими товарами
    const tagsHandler = (e) => {
        const val = e.target.value;
        const last = val[val.length - 1];
        setTagWord(val);
        console.log(last);
        if (/\s/.test(last)) {
            const word = val.slice(0, val.length - 1);
            const test = tags.filter(tg => tg.toLowerCase() === word.toLowerCase());
            if (!test.length) {
                setTags(prev => [...prev, word]);
            }
            setTagWord("");
        } else {
            setTagWord(val);
        }
    }
    const clearForm = () => {
        setName("");
        setLink("https://kartinkof.club/uploads/posts/2022-09/thumbs/1662563948_7-kartinkof-club-p-novie-i-krasivie-kartinki-kostochka-7.png");
        setPrice(999);
        setCnt(20);
        setWight("0 г");
        setDiscount(0);
        setDescription("Скоро здесь будет текст...");
        setTagWord("");
        setTags(["df"]);
    }
    const delTag = (e) => {
        const val = e.target.innerText;
        // из списка с тегами возвращаем только те, которые не соотствуют нажатому
        setTags(prev => prev.filter(tg => tg !== val));
    }
    const formHandler = (e) => {
        e.preventDefault();
        const body = {
            name: name,
            price: price,
            discount: discount,
            stock: cnt,
            wight: wight,
            description: description,
            pictures: link,
            tags: tagWord && !tags.includes(tagWord) ? [...tags, tagWord] : tags
        };
        fetch("https://api.react-learning.ru/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token12")}`
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (!data.err && !data.error) {
                clearForm();
                // либо перенаправление на страницу с новым товаром
                navigate(`/product/${data._id}`);
            }
        })
    }
    return <>
        <Container style={{ gridTemplateColumns: "auto" }}>
            <Row>
                <Col xs={12}>
                    <h1>Добавить новый товар</h1>
                </Col>
                <Form onSubmit={formHandler}>
                    <Row>
                        <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="pro-name">Название товара</Form.Label>
                        <Form.Control
                            id="pro-name"
                            type="text"
                            value={name}
                            onChange={e => { setName(e.target.value) }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="pro-image">Ссылка на изображение</Form.Label>
                        <Form.Control
                            id="pro-image"
                            type="url"
                            value={link}
                            onChange={e => { setLink(e.target.value) }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="pro-price">Цена товара</Form.Label>
                        <Form.Control
                            id="pro-price"
                            type="number"
                            value={price}
                            step="10"
                            min="9"
                            max="29999"
                            onChange={e => { setPrice(e.target.value) }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="pro-cnt">Количество на складе</Form.Label>
                        <Form.Control
                            id="pro-cnt"
                            type="number"
                            value={cnt}
                            min="0"
                            max="10000"
                            onChange={e => { setCnt(e.target.value) }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="pro-w">Вес товара</Form.Label>
                        <Form.Control
                            id="pro-w"
                            type="text"
                            value={wight}
                            placeholder="100 г"
                            onChange={e => { setWight(e.target.value) }}
                        />
                        <Form.Text>Не забудьте прописать единицу измерения вместе с весом</Form.Text>
                    </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="pro-disc">Скидка</Form.Label>
                        <Form.Select
                            id="pro-disc"
                            type="text"
                            value={discount}
                            onChange={e => { setDiscount(e.target.value) }}
                        >
                            <option value={0}>Без скидки</option>
                            <option value={5}>5 %</option>
                            <option value={10}>10 %</option>
                            <option value={15}>15 %</option>
                            <option value={25}>25 %</option>
                            <option value={35}>35 %</option>
                            <option value={55}>55 %</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="pro-info"></Form.Label>
                        <Form.Control
                            id="pro-info"
                            type="text"
                            value={description}
                            as="textarea"
                            rows={4}
                            onChange={e => { setDescription(e.target.value) }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="pro-tag">Добавить теги</Form.Label>
                        <Form.Control
                            id="pro-tag"
                            type="text"
                            value={tagWord}
                            onChange={tagsHandler}
                        />
                        <Form.Text as="div" className="mt-1 d-flex" style={{gap: ".25rem"}}>
                            {tags.map(tg => <Button 
                            key={tg} 
                            variant={tg === "df" ? "warning" : "secondary"}
                            disabled={tg === "df"}
                            onClick={delTag}
                            >{tg}</Button>)}
                        </Form.Text>
                    </Form.Group>
                    <Button type="submit">Добавить товар</Button>
                    </Col>
                    </Row>
                </Form>
            </Row>
        </Container>
    </>
}

export default AddProduct;