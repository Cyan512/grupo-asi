import React, { useState, useMemo } from 'react';
import { ShoppingCart, Filter, X, Plus, Minus, MessageCircle } from 'lucide-react';

const Home = () => {
  // Datos de productos
  const productos = [
    {
      id: 1,
      nombre: "Polo Básico Algodón",
      categoria: "polos",
      precio: 25,
      imagen: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
      colores: ["Blanco", "Negro", "Azul", "Rojo"],
      tallas: ["S", "M", "L", "XL", "XXL"]
    },
    {
      id: 2,
      nombre: "Polo Deportivo Dri-Fit",
      categoria: "polos",
      precio: 35,
      imagen: "https://images.unsplash.com/photo-1503341338985-b6635e2ebef0?w=300&h=300&fit=crop",
      colores: ["Negro", "Azul", "Verde", "Gris"],
      tallas: ["S", "M", "L", "XL"]
    },
    {
      id: 3,
      nombre: "Polo Cuello V Premium",
      categoria: "polos",
      precio: 30,
      imagen: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=300&h=300&fit=crop",
      colores: ["Blanco", "Negro", "Azul marino"],
      tallas: ["S", "M", "L", "XL", "XXL"]
    },
    {
      id: 4,
      nombre: "Vaso Térmico 500ml",
      categoria: "vasos",
      precio: 15,
      imagen: "https://images.unsplash.com/photo-1544918772-9b7bbeb4a8ff?w=300&h=300&fit=crop",
      colores: ["Negro", "Blanco", "Azul", "Rojo"],
      capacidad: "500ml"
    },
    {
      id: 5,
      nombre: "Vaso Cristal Premium",
      categoria: "vasos",
      precio: 12,
      imagen: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=300&h=300&fit=crop",
      colores: ["Transparente", "Azul", "Verde"],
      capacidad: "300ml"
    },
    {
      id: 6,
      nombre: "Vaso Deportivo 750ml",
      categoria: "vasos",
      precio: 18,
      imagen: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop",
      colores: ["Negro", "Azul", "Verde", "Rojo"],
      capacidad: "750ml"
    }
  ];

  // Estados
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [filtroColor, setFiltroColor] = useState('todos');
  const [filtroTalla, setFiltroTalla] = useState('todos');
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  // Obtener opciones únicas para filtros
  const coloresUnicos = useMemo(() => {
    const colores = new Set();
    productos.forEach(producto => {
      producto.colores.forEach(color => colores.add(color));
    });
    return Array.from(colores);
  }, []);

  const tallasUnicas = useMemo(() => {
    const tallas = new Set();
    productos.forEach(producto => {
      if (producto.tallas) {
        producto.tallas.forEach(talla => tallas.add(talla));
      }
    });
    return Array.from(tallas);
  }, []);

  // Filtrar productos
  const productosFiltrados = useMemo(() => {
    return productos.filter(producto => {
      const cumpleCategoria = filtroCategoria === 'todos' || producto.categoria === filtroCategoria;
      const cumpleColor = filtroColor === 'todos' || producto.colores.includes(filtroColor);
      const cumpleTalla = filtroTalla === 'todos' || (producto.tallas && producto.tallas.includes(filtroTalla));
      
      return cumpleCategoria && cumpleColor && cumpleTalla;
    });
  }, [filtroCategoria, filtroColor, filtroTalla]);

  // Funciones del carrito
  const agregarAlCarrito = (producto, color, talla = null, cantidad = 1) => {
    const itemCarrito = {
      ...producto,
      colorSeleccionado: color,
      tallaSeleccionada: talla,
      cantidad: cantidad,
      id: `${producto.id}-${color}-${talla || 'notalla'}`
    };

    setCarrito(prevCarrito => {
      const itemExistente = prevCarrito.find(item => item.id === itemCarrito.id);
      if (itemExistente) {
        return prevCarrito.map(item =>
          item.id === itemCarrito.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      return [...prevCarrito, itemCarrito];
    });
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(id);
      return;
    }
    setCarrito(prevCarrito =>
      prevCarrito.map(item =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== id));
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  // Función para generar mensaje de WhatsApp
  const generarMensajeWhatsApp = () => {
    let mensaje = "¡Hola! Me interesa cotizar los siguientes productos:\n\n";
    
    carrito.forEach((item, index) => {
      mensaje += `${index + 1}. ${item.nombre}\n`;
      mensaje += `   - Color: ${item.colorSeleccionado}\n`;
      if (item.tallaSeleccionada) {
        mensaje += `   - Talla: ${item.tallaSeleccionada}\n`;
      }
      mensaje += `   - Cantidad: ${item.cantidad}\n`;
      mensaje += `   - Precio unitario: S/ ${item.precio}\n\n`;
    });
    
    mensaje += `Total estimado: S/ ${calcularTotal()}\n\n`;
    mensaje += "¿Podrían enviarme una cotización detallada?";
    
    return encodeURIComponent(mensaje);
  };

  const enviarWhatsApp = () => {
    const mensaje = generarMensajeWhatsApp();
    const numeroWhatsApp = "51979349233"; // Reemplaza con tu número
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
    window.open(url, '_blank');
  };

  // Componente de producto
  const ProductoCard = ({ producto }) => {
    const [colorSeleccionado, setColorSeleccionado] = useState(producto.colores[0]);
    const [tallaSeleccionada, setTallaSeleccionada] = useState(producto.tallas ? producto.tallas[0] : null);

    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <img 
          src={producto.imagen} 
          alt={producto.nombre}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{producto.nombre}</h3>
          <p className="text-2xl font-bold text-blue-600 mb-3">S/ {producto.precio}</p>
          
          {/* Selector de color */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Color:</label>
            <select 
              value={colorSeleccionado}
              onChange={(e) => setColorSeleccionado(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {producto.colores.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>

          {/* Selector de talla (solo para polos) */}
          {producto.tallas && (
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Talla:</label>
              <select 
                value={tallaSeleccionada}
                onChange={(e) => setTallaSeleccionada(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {producto.tallas.map(talla => (
                  <option key={talla} value={talla}>{talla}</option>
                ))}
              </select>
            </div>
          )}

          {producto.capacidad && (
            <p className="text-sm text-gray-600 mb-3">Capacidad: {producto.capacidad}</p>
          )}

          <button
            onClick={() => agregarAlCarrito(producto, colorSeleccionado, tallaSeleccionada)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <ShoppingCart size={20} />
            Agregar al Carrito
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">MiTienda</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
                className="lg:hidden flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900"
              >
                <Filter size={20} />
                Filtros
              </button>
              <button
                onClick={() => setMostrarCarrito(!mostrarCarrito)}
                className="relative flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900"
              >
                <ShoppingCart size={20} />
                <span className="hidden sm:inline">Carrito</span>
                {carrito.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {carrito.reduce((sum, item) => sum + item.cantidad, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filtros */}
          <div className={`lg:w-64 ${mostrarFiltros ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h2>
              
              {/* Filtro por categoría */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                <select
                  value={filtroCategoria}
                  onChange={(e) => setFiltroCategoria(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="todos">Todos</option>
                  <option value="polos">Polos</option>
                  <option value="vasos">Vasos</option>
                </select>
              </div>

              {/* Filtro por color */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <select
                  value={filtroColor}
                  onChange={(e) => setFiltroColor(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="todos">Todos</option>
                  {coloresUnicos.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>

              {/* Filtro por talla */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Talla</label>
                <select
                  value={filtroTalla}
                  onChange={(e) => setFiltroTalla(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="todos">Todos</option>
                  {tallasUnicas.map(talla => (
                    <option key={talla} value={talla}>{talla}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  setFiltroCategoria('todos');
                  setFiltroColor('todos');
                  setFiltroTalla('todos');
                }}
                className="w-full text-sm text-blue-600 hover:text-blue-800"
              >
                Limpiar filtros
              </button>
            </div>
          </div>

          {/* Productos */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {productosFiltrados.map(producto => (
                <ProductoCard key={producto.id} producto={producto} />
              ))}
            </div>
            
            {productosFiltrados.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No se encontraron productos con los filtros seleccionados.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Carrito Lateral */}
      {mostrarCarrito && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setMostrarCarrito(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Carrito de Compras</h2>
                <button
                  onClick={() => setMostrarCarrito(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {carrito.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Tu carrito está vacío</p>
                ) : (
                  <div className="space-y-4">
                    {carrito.map(item => (
                      <div key={item.id} className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-900">{item.nombre}</h3>
                        <p className="text-sm text-gray-600">Color: {item.colorSeleccionado}</p>
                        {item.tallaSeleccionada && (
                          <p className="text-sm text-gray-600">Talla: {item.tallaSeleccionada}</p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-2">{item.cantidad}</span>
                            <button
                              onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">S/ {item.precio * item.cantidad}</p>
                            <button
                              onClick={() => eliminarDelCarrito(item.id)}
                              className="text-red-500 text-sm hover:text-red-700"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {carrito.length > 0 && (
                <div className="border-t p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-xl font-bold text-blue-600">S/ {calcularTotal()}</span>
                  </div>
                  <button
                    onClick={enviarWhatsApp}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={20} />
                    Cotizar por WhatsApp
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;