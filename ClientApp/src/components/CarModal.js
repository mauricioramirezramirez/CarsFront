
import { useEffect, useState } from "react";
import { FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Button, Form } from "reactstrap";

let carModel = {
    Id: 0,
    Brand: "",
    Model: "",
    Year: 0,
    Colour: "",
    Doors: 0,
};

const CarModal = ({ showModal, setShowModal, saveCarItem, edit, setEdit, updateCarItem }) => {
    if (edit === null) {
        carModel = {
            Id: 0,
            Brand: "",
            Model: "",
            Year: 0,
            Colour: "",
            Doors: 0,
        };
    }
    const [carItem, setPersonalItem] = useState(carModel);

    const updateForm = (e) => {
        setPersonalItem({
            ...carItem,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        if (edit != null) {
            setPersonalItem(edit);
        } else {
            setPersonalItem(carModel);
        }

    }, [edit]);

    const closeModal = () => {
        setShowModal(!showModal);
        setEdit(null);
    };

    return (
        <Modal isOpen={showModal}>
            <ModalHeader>
                {carItem.Id === 0 ? "Nuevo" : "Editar"}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Marca</Label>
                        <Input
                            name="Brand"
                            type="text"
                            placeholder="Marca"
                            onChange={(e) => updateForm(e)}
                            value={carItem.Brand}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Modelo</Label>
                        <Input
                            name="Model"
                            type="text"
                            placeholder="Modelo"
                            onChange={(e) => updateForm(e)}
                            value={carItem.Model}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Año</Label>
                        <Input
                            name="Year"
                            type="text"
                            placeholder="Año"
                            onChange={(e) => updateForm(e)}
                            value={carItem.Year}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Color</Label>
                        <Input
                            name="Colour"
                            type="text"
                            placeholder="Color"
                            onChange={(e) => updateForm(e)}
                            value={carItem.Colour}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Puertas</Label>
                        <Input
                            name="Doors"
                            type="text"
                            placeholder="Puertas"
                            onChange={(e) => updateForm(e)}
                            value={carItem.Doors}
                        />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" size="sm" className="me-2" onClick={carItem.Id === 0 ? (e) => saveCarItem(carItem) : (e) => updateCarItem(carItem)}>{carItem.Id === 0 ? 'Guardar' : 'Actualizar'}</Button>
                <Button color="danger" size="sm" className="me-2" onClick={closeModal}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    );
};

export default CarModal;
