import { useState } from "react";
import { Link } from "react-router-dom";

export default function FormPage() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [image, setImage] = useState(null); // Inicializa como null

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('image', image); // Agrega el archivo al FormData

    console.log("Datos del producto:", formData);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/product/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Producto registrado con éxito");
      } else {
        console.error("Error al registrar el producto");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Guarda el archivo seleccionado como un objeto File
  };

  return (
    <>
      <header className="bg-slate-800">
        <div className="mx-auto max-w-6xl py-6">
          <h1 className="text-4xl font-extrabold text-white">
            Administrador de Productos
          </h1>
        </div>
      </header>

      <main className="mt-10 mx-auto max-w-6xl p-10 bg-white shadow rounded-xl">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-3xl font-bold text-black">Registrar producto</h2>
          <Link to="/products">
            <button className="mt-4 bg-purple-600 hover:bg-purpuple-700 text-white font-bold py-2 px-4 rounded">
              Ver Lista de Productos
            </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col gap-3 mt-2">
            <label htmlFor="nombre" className="text-2xl">
              Nombre del producto:
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre del producto"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <label htmlFor="precio" className="text-2xl">
              Precio:
            </label>
            <input
              id="precio"
              name="precio"
              type="text"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              placeholder="Precio del producto"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="image"
            >
              Subir archivo
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="image"
              type="file"
              onChange={handleFileChange} // Maneja el cambio del archivo
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Registrar
          </button>
        </form>
      </main>
    </>
  );
}
