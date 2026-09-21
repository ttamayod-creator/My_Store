import { useEffect, useState } from "react";
import { getProducts } from "./services/productService";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
        setError("No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <h1>Cargando productos...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <main>
      <h1>Catálogo de perfumes</h1>

      {products.map((product) => (
        <article key={product.id}>
          <h2>{product.name}</h2>
          <p>Marca: {product.brand}</p>
          <p>Precio: ${product.price}</p>
          <p>Presentación: {product.presentation}</p>
          <p>Categoría: {product.category.name}</p>
          <p>
            {product.stock > 0
              ? `Disponible: ${product.stock}`
              : "AGOTADO"}
          </p>
        </article>
      ))}
    </main>
  );
}

export default App;