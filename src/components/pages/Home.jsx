import React from 'react'

const Home = () => {
  const pages = [
    {
      nombre: "Tejada",
      img: "https://themegenix.net/html/suxnix-preview/assets/img/images/home_01.png",
      link: "tejada",
    },
    {
      nombre: "Sublimados",
      img: "https://themegenix.net/html/suxnix-preview/assets/img/images/coming.jpg",
      link: "sublimados",
    },
    {
      nombre: "Uyariwaychis",
      img: "https://themegenix.net/html/suxnix-preview/assets/img/images/home_02.jpg",
      link: "uyariwaychis",
    },
  ];

  return (
    <div className='min-h-screen flex flex-col'>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Bienvenido a Nuestro Sitio
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Descubre nuestros servicios y productos únicos
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
            Comenzar
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Acerca de Nosotros
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Somos una empresa comprometida con la excelencia y la innovación. 
              Nuestro equipo trabaja incansablemente para brindar los mejores 
              productos y servicios a nuestros clientes.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Calidad</h3>
              <p className="text-gray-600">
                Garantizamos la más alta calidad en todos nuestros productos y servicios.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovación</h3>
              <p className="text-gray-600">
                Constantemente buscamos nuevas formas de mejorar y evolucionar.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Servicio</h3>
              <p className="text-gray-600">
                Nuestro compromiso es brindar un excelente servicio al cliente.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main>
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Nuestros Servicios
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {pages.map((pages, index) => (
                <div className="p-4" key={index}>
                  <div className="w-full">
                    <a href={pages.link} className="group relative block overflow-hidden rounded-2xl">
                      <img src={pages.img} className="w-full object-contain transition duration-300 group-hover:opacity-40" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                        <h5 className="text-base font-semibold text-white bg-black bg-opacity-50 px-4 py-2 rounded">{pages.nombre}</h5>
                      </div>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home