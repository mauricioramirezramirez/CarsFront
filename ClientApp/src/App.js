import { Container, Row, Col, Card, CardHeader, CardBody, Button, Input } from "reactstrap";
import { useEffect, useState } from 'react';
import CarTable from "./components/CarTable";
import CarModal from "./components/CarModal";


const App = () => {
    const [carItems, setPersonalItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [edit, setEdit] = useState(null);

    // GET
    const getPersonalItems = async () => {
        const response = await fetch("http://localhost:5167/api/Car");

        if (!response.ok) {
            setPersonalItems([]);
            return;
        }

        const data = await response.json();
        setPersonalItems(data);
    }

    // DELETE
    const deleteCarItem = async (id) => {
        var confirm = window.confirm("¿Deseas eliminar el elemento?");
        if (!confirm) return;

        const response = await fetch("http://localhost:5167/api/Car/" + id, {
            method: "DELETE",
        });

        if (!response.ok) return window.alert("No se ha podido eliminar el elemento");

        window.alert("Elemento eliminado");
        getPersonalItems();
    };

    // POST
    const saveCarItem = async (item) => {
        if (item.hasOwnProperty("Id")) {
            delete item.Id
        }
        item.IsCompleted = Boolean(item.IsCompleted);
        const response = await fetch("http://localhost:5167/api/Car", {
            method: "POST",
            headers: {
                'Content-Type': "application/json;charset=utf-8",
            },
            body: JSON.stringify(item),
        });

        if (!response.ok) {
            window.alert("No se ha podido registrar el elemento");
            return;
        }

        setShowModal(!showModal);
        getPersonalItems();
    };

    // PUT
    const updatePersonalItem = async (item) => {
        item.IsCompleted = Boolean(item.IsCompleted);
        const response = await fetch("http://localhost:5167/api/Car/" + item.Id, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json;charset=utf-8",
            },
            body: JSON.stringify(item),
        });


        if (!response.ok) {
            window.alert("No se ha podido actualizar el elemento");
            return;
        }


        setShowModal(!showModal);
        getPersonalItems();
    };




    useEffect(() => {
        getPersonalItems()
    }, []);


    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <div className="d-flex justify-content-between">
                                <h5>Parque Vehicular</h5>
                                <div className="d-flex gap-3">
                                    <Button size="sm" color="success" onClick={() => setShowModal(!showModal)}>Agregar</Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody>

                            <CarTable
                                carItems={carItems}
                                deleteCarItem={deleteCarItem}
                                setEdit={setEdit}
                                setShowModal={setShowModal}
                                showModal={showModal}
                            />

                        </CardBody>
                    </Card>

                </Col>
            </Row>

            <CarModal
                showModal={showModal}
                setShowModal={setShowModal}
                saveCarItem={saveCarItem}
                edit={edit}
                setEdit={setEdit}
                updatePersonalItem={updatePersonalItem}
            />
        </Container>
    );
}

export default App;

