import React, { useState, useEffect } from 'react';
import { Camera, Instagram, Mail, Phone, ArrowRight, Play, Pause } from 'lucide-react';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Imágenes de muestra para el portafolio
  const portfolioImages = [
    { id: 1, category: 'retratos', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=600&fit=crop', title: 'Retrato Natural' },
    { id: 2, category: 'bodas', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=600&fit=crop', title: 'Momento Especial' },
    { id: 3, category: 'eventos', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=600&fit=crop', title: 'Celebración' },
    { id: 4, category: 'retratos', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop', title: 'Estilo Profesional' },
    { id: 5, category: 'bodas', url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=500&h=600&fit=crop', title: 'Amor Eterno' },
    { id: 6, category: 'eventos', url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&h=600&fit=crop', title: 'Fiesta Vibrante' },
    { id: 7, category: 'retratos', url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=600&fit=crop', title: 'Elegancia' },
    { id: 8, category: 'bodas', url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=500&h=600&fit=crop', title: 'Día Perfecto' }
  ];

  const heroImages = [
    'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=800&fit=crop'
  ];

  const categories = ['todos', 'retratos', 'bodas', 'eventos'];

  const filteredImages = selectedCategory === 'todos' 
    ? portfolioImages 
    : portfolioImages.filter(img => img.category === selectedCategory);

  // Autoplay para el carrusel
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, heroImages.length]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section con Carrusel */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
             style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {heroImages.map((image, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative">
              <img 
                src={image} 
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            </div>
          ))}
        </div>
        
        {/* Control de reproducción */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-6 right-6 z-20 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        {/* Contenido del Hero */}
        <div className="absolute inset-0 flex items-center justify-start z-10">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-left">
              <h1 className="text-6xl lg:text-8xl font-bold mb-6 leading-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                  CAPTURANDO
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
                  MOMENTOS
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                Fotógrafo profesional especializado en retratos, bodas y eventos únicos que cuentan historias inolvidables
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center">
                  Ver Portafolio
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
                <button className="border-2 border-white/30 hover:border-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm">
                  Contactar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Indicadores del carrusel */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Navegación */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Camera className="text-amber-500" size={32} />
            <span className="text-2xl font-bold">FOTO</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#inicio" className="hover:text-amber-500 transition-colors">Inicio</a>
            <a href="#portafolio" className="hover:text-amber-500 transition-colors">Portafolio</a>
            <a href="#servicios" className="hover:text-amber-500 transition-colors">Servicios</a>
            <a href="#contacto" className="hover:text-amber-500 transition-colors">Contacto</a>
          </div>
        </div>
      </nav>

      {/* Sección Sobre Mí */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Sobre Mí
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Con más de 8 años de experiencia capturando momentos únicos, me especializo en crear 
                imágenes que trascienden el tiempo. Cada fotografía cuenta una historia, cada sonrisa 
                es un recuerdo eterno.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Mi pasión por la fotografía nació del deseo de preservar emociones auténticas y 
                crear arte visual que conecte con las personas de manera profunda y significativa.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full text-sm">+500 Sesiones</span>
                <span className="bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full text-sm">+200 Bodas</span>
                <span className="bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full text-sm">8 Años</span>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop" 
                alt="Fotógrafo profesional"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-amber-500 to-orange-600 p-6 rounded-2xl">
                <Camera size={40} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portafolio */}
      <section id="portafolio" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            Mi Trabajo
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Una selección de mis trabajos más recientes que reflejan mi estilo y pasión por la fotografía
          </p>

          {/* Filtros */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-full p-2 flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full capitalize transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Galería */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <div 
                key={image.id} 
                className="group relative overflow-hidden rounded-xl bg-gray-800 aspect-[3/4] hover:scale-105 transition-all duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                    <p className="text-gray-300 capitalize">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-20 px-6 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            Servicios
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Retratos Profesionales',
                description: 'Sesiones personalizadas para capturar tu esencia única con estilo y elegancia.',
                price: 'Desde $150',
                features: ['2-3 horas de sesión', '50+ fotos editadas', 'Locación incluida']
              },
              {
                title: 'Fotografía de Bodas',
                description: 'Documentamos tu día especial con un enfoque artístico y emotivo.',
                price: 'Desde $800',
                features: ['Cobertura completa', '500+ fotos', 'Álbum digital', 'Video highlights']
              },
              {
                title: 'Eventos Corporativos',
                description: 'Capturamos la esencia profesional de tus eventos empresariales.',
                price: 'Desde $300',
                features: ['Hasta 6 horas', '200+ fotos', 'Entrega en 48h']
              }
            ].map((service, index) => (
              <div key={index} className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-amber-500/50 transition-all duration-300 group">
                <h3 className="text-2xl font-bold mb-4 group-hover:text-amber-400 transition-colors">{service.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>
                <div className="text-3xl font-bold text-amber-500 mb-6">{service.price}</div>
                <ul className="space-y-2 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-gray-300 flex items-center">
                      <ArrowRight size={16} className="text-amber-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 py-3 rounded-full font-semibold transition-all duration-300">
                  Solicitar Cotización
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            Trabajemos Juntos
          </h2>
          <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
            ¿Listo para crear algo increíble? Contáctame y conversemos sobre tu próximo proyecto fotográfico.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50">
              <Mail className="text-amber-500 mb-4" size={32} />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-gray-400">foto@ejemplo.com</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50">
              <Phone className="text-amber-500 mb-4" size={32} />
              <h3 className="font-semibold mb-2">Teléfono</h3>
              <p className="text-gray-400">+51 999 888 777</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50">
              <Instagram className="text-amber-500 mb-4" size={32} />
              <h3 className="font-semibold mb-2">Instagram</h3>
              <p className="text-gray-400">@fotografo_pro</p>
            </div>
          </div>

          <button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-amber-500/25">
            Enviar Mensaje
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Camera className="text-amber-500" size={24} />
            <span className="text-xl font-bold">FOTÓGRAFO PROFESIONAL</span>
          </div>
          <p className="text-gray-400">© 2025 Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;