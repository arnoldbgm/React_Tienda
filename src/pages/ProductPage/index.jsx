import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductPage = () => {
  const [dataAPI, setDataApi] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  // Función para obtener los datos de la API
  const getData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/product/");
      const data = await response.json();
      setDataApi(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Función para eliminar un producto
  const deleteData = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/product/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      getData();
    } catch (error) {
      console.error("Error eliminando el producto", error);
    }
  };

  return (
    <>
      <header className="bg-slate-800">
        <div className="mx-auto max-w-6xl py-6">
          <h1 className="text-4xl font-extrabold text-white">
            Lista de Productos
          </h1>
        </div>
      </header>
      <main className="mt-10 mx-auto max-w-6xl p-10 bg-white shadow rounded-xl">
        {dataAPI.length > 0 ? (
          <ul>
            {dataAPI.map((product) => (
              <li key={product.id} className="mb-4">
                <div className="flex gap-3 items-center rounded-lg shadow-sm p-2">
                  <img
                    src={product.image}
                    alt={product.nombre}
                    className="rounded-lg max-w-12 shadow-sm"
                  />
                  <div className="w-full flex justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">{product.nombre}</h2>
                      <p className="text-lg">Precio: S/ {product.precio}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">
                        <Link to={`/edit/${product.id}`}>Editar ✏️</Link>
                      </button>

                      <button
                        onClick={() => deleteData(product.id)}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Eliminar 🗑
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </main>
    </>
  );
};

export default ProductPage;
