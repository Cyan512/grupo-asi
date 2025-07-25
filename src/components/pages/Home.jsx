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
      <main>
        <section>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-3 gap-6">
              {pages.map((pages, index) => (
                <div className="p-4" key={index}>
                  <div className="w-full">
                    <a href={pages.link} className="group relative block overflow-hidden rounded-2xl">
                      <img src={pages.img} className="w-full object-contain transition duration-300 group-hover:opacity-40" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                        <h5 className="text-base font-semibold ">{pages.nombre}</h5>
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