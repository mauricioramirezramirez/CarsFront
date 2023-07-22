

import { Button, Table } from "reactstrap";


const CarTable = ({ carItems, deleteCarItem, setEdit, showModal, setShowModal }) => {
    const sendData = (contacto) => {
        setEdit(contacto);
        setShowModal(!showModal);
    };

    const notData = (
        <tr>
            <td colSpan="5" className="text-center p-3">No hay elementos registrados</td>
        </tr>
    );

    const data = (
        carItems.map((item) => (
            <tr key={item.Id}>
                <td>{item.Id}</td>
                <td>{item.Brand}</td>
                <td>{item.Model}</td>
                <td>{item.Year}</td>
                <td>{item.Colour}</td>
                <td>{item.Doors}</td>
                <td>
                    <div className='d-flex justify-content-between'>
                        <Button color="danger" size="sm" className="me-2" onClick={() => deleteCarItem(item.Id)}>Eliminar</Button>
                        <Button color="primary" size="sm" className="me-2" onClick={() => sendData(item)}>Editar</Button>
                    </div>
                </td>
            </tr>
        ))
    );


    return (
        <>
            <Table striped responsive id="table-to-xls">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Año</th>
                        <th>Color</th>
                        <th>Puertas</th>
                        <th style={{ 'width': '160px' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {(carItems.length === 0) ? notData : data}
                </tbody>
            </Table>
        </>
    );
}

export default CarTable;


