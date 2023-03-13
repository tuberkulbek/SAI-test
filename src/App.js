import './App.css';
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from 'react';

  const tableColumn = [
    {
      Header: "Бренд",
      accessor: "brand"
    },
    {
      Header: "Артикул",
      accessor: "articul"
    },
    {
      Header: "Наиминование товара",
      accessor: "name"
    },
    {
      Header: "Цена",
      accessor: "price"
    },
    {
      Header: "Наличие",
      accessor: "available"
    },
  ]

  const data = [
    {
      brand: "Tefal",
      articul: "012589632",
      name: "Tefal KI700830 серебристый",
      price: 6490,
      availability: "Нет в наличии"
    },
    {
      brand: "Tefal",
      articul: "1234125524",
      name: "Tefal KI700830 серебристый",
      price: 3333,
      availability: "В наличии"
    },
    {
      brand: "Xiaomi",
      articul: "346545345",
      name: "Tefal KI700830 серебристый",
      price: 4444,
      availability: "Нет в наличии"
    },
    {
      brand: "Tefal",
      articul: "7847848456",
      name: "Tefal KI700830 серебристый",
      price: 5555,
      availability: "В наличии"
    },
    {
      brand: "Tefal",
      articul: "356883464567",
      name: "Tefal KI700830 серебристый",
      price: 6666,
      availability: "Нет в наличии"
    },
    {
      brand: "Xiaomi",
      articul: "39804573479",
      name: "Tefal KI700830 серебристый",
      price: 7777,
      availability: "В наличии"
    },
    {
      brand: "Xiaomi",
      articul: "347465293465",
      name: "Tefal KI700830 серебристый",
      price: 88888,
      availability: "В наличии"
    },
    {
      brand: "Xiaomi",
      articul: "34563734734",
      name: "Tefal KI700830 серебристый",
      price: 9999,
      availability: "Нет в наличии"
    },
    {
      brand: "Tefal",
      articul: "67893452534",
      name: "Tefal KI700830 серебристый",
      price: 112233,
      availability: "В наличии"
    },
    {
      brand: "Xiaomi",
      articul: "98235982903",
      name: "Tefal KI700830 серебристый",
      price: 2345,
      availability: "Нет в наличии"
    },
    {
      brand: "Xiaomi",
      articul: "23589382959239",
      name: "Tefal KI700830 серебристый",
      price: 234555,
      availability: "Нет в наличии"
    },
  ]
const App = () => {
  const [modals, setModals] = useState([])
  const [filteredData, setFilteredData] = useState(data)
  const [available, setAvailable] = useState(false)

  const handleOpenModal = (d) => {
    const foundElement = modals.find(element => Object.keys(element)[0] === d);
    if (foundElement) {
      setModals(modals.filter(el => Object.keys(el)[0] !== d))
    } else {
      setModals([...modals, {
        [d]: d,
        filter: ''
      }])
    }
  }

  const handleChange = (idToReplace) => (event)=> {
    setModals(prevArray => {
      const newArray = [...prevArray];
      const index = newArray.findIndex(obj => Object.keys(obj)[0] === idToReplace);
      console.log(idToReplace)
      newArray[index].filter = event.target.value;
      setAvailable(!available)
      return newArray;
    });
  }

  const handleCLearFilter = (idToReplace) => {
    setModals(prevArray => {
      const newArray = [...prevArray];
      const index = newArray.findIndex(obj => Object.keys(obj)[0] === idToReplace);
      newArray[index].filter = '';
      setAvailable(!available)
      return newArray;
    });
    handleChangeFilter(idToReplace)
  }

  const handleChangeFilter = (el) => {
    setFilteredData(data.filter((item) => item[Object.keys(el)[0]].toLowerCase().includes(el.filter)))
  }

  console.log(filteredData)

  return (
    <div className="App">
      <div className='container'>
        {modals.map(el => !el.available ? <div className={`modal ${Object.keys(el)[0]}`}>
          <input onChange={handleChange(Object.keys(el)[0])} value={el.filter} />
          <div>
            <button onClick={()=>handleChangeFilter(el)}>Ok</button>
            <button onClick={()=>handleCLearFilter(Object.keys(el)[0])}>clear</button>
          </div>
        </div> : <div className={`modal ${Object.keys(el)[0]}`}>
          <button onClick={handleChange(el.d)}>{`${available}`}</button>
        </div>)}
        <table>
          <thead className='head'>
            <tr>
              {tableColumn.map(headerGroup=>
                <th className='head_th'>
                  <div>
                    {headerGroup.Header}
                  </div>
                  <div>
                    <AiOutlineSearch onClick={()=>handleOpenModal(headerGroup.accessor)} />
                  </div>
                </th>
               )}
            </tr>
          </thead>
          <tbody className='body'>
            {filteredData.map(el=>
              <tr>
                <td className='first_column'>
                  {el.brand}
                </td>
                <td>
                  {el.articul}
                </td>
                <td>
                  {el.name}
                </td>
                <td>
                  {el.price}
                </td>
                <td>
                  {el.availability}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default App;
