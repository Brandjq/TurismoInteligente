"use client";
// Importar estilos globales y componentes necesarios
import Image from 'next/image';
import styles from './solola.module.css';
import { useState, useEffect } from 'react';
import NewAttractionForm from './NewAttractionForm';




export default function Solola() {
  const [modalIndex, setModalIndex] = useState(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [mostrarEstadisticas, setMostrarEstadisticas] = useState(false);
  const [msg, setMsg] = useState(null);
  const [showMsg, setShowMsg] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null });

  const [attractions, setAttractions] = useState([
    {
      name: 'San Lucas Tolimán',
      description: 'Municipio con vistas al Volcán Tolimán y Cerro de Oro.',
      image: '/san-lucas-toliman.jpg',
      mapLink: 'https://www.google.com/maps/place/San+Lucas+Tolimán',
    },
    {
      name: 'Nahualá',
      description: 'Mercado de artesanías y una catedral histórica.',
      image: '/nahuala.jpg',
      mapLink: 'https://www.google.com/maps/place/Nahualá',
    },
    {
      name: 'San Antonio Palopó',
      description: 'Iglesia colonial, artesanías típicas y vistas pintorescas.',
      image: '/san-antonio-palopo.jpg',
      mapLink: 'https://www.google.com/maps/place/San+Antonio+Palopó',
    },
    {
      name: 'Santiago Atitlán',
      description: 'Vista inolvidable del lago, vida nocturna y cultura local.',
      image: '/santiago-atitlan.jpg',
      mapLink: 'https://www.google.com/maps/place/Santiago+Atitlán',
    },
    {
      name: 'Mirador de Atitlán',
      description: 'Vista panorámica del Lago de Atitlán, ideal para fotografías.',
      image: '/mirador-atitlan.jpg',
      mapLink: 'https://www.google.com/maps/place/Mirador+de+Atitlán',
    },
    {
      name: 'The Yoga Forest',
      description: 'Si la idea de hacer yoga frente a uno de los lagos más hermosos y pasar un tiempo de relajación junto a la naturaleza este es un lugar ideal para ti. La cadena televisiva CNN junto al sitio Book Retreats, coinciden en que la práctica de yoga a orillas del Lago Atitlán se ha convertido en un nuevo atractivo turístico para Guatemala y sugiere este hermoso lugar. Existen distintos horarios, presentaciones en vivo, tardes acústicas y más..',
      image: '/yoga.jpg',
      mapLink: 'https://www.google.com/maps/?q=14.724500090131253,-91.26153945922852&z=15',
    },
    {
        name: 'Museo Lacustre',
        description: 'Exhibe artefactos y cultura del Lago de Atitlán.',
        image: '/lacustre.jpg',
        mapLink: 'https://maps.app.goo.gl/Zdr5zNcM3m571bpN7',
      },
    {
      name: 'Calle Santander',
      description: 'Calle llena de artesanías, restaurantes y cultura local.',
      image: '/santander.jpg',
      mapLink: 'https://maps.app.goo.gl/NZrHVw5TQ6hrEj2t9',
    },
    {
      name: 'Mirador Rostro Maya',
      description: 'Mirador con vistas espectaculares del Lago de Atitlán.',
      image: '/rostro.jpg',
      mapLink: 'https://maps.app.goo.gl/6zoGhqCCgVt4Mp7A8',
    },
    {
      name: 'Santa Cruz La Laguna',
      description: 'En este lugar puedes hacer muchas actividades físicas y encontrar un paisaje espectacular debido a su ubicación. Llega a Santa Cruz en lancha y disfruta de un día lleno de actividades que van desde kayaks hasta un spa a la orilla del Lago de Atitlán. Te sugerimos visitar Los Elementos Adventure Center, en donde podrás caminar, nadar y muchas cosas más.',
      image: '/cruz.jpg',
      mapLink: 'https://maps.app.goo.gl/SxSRaFdxZSeh8PSGA',
    },
    {
      name: 'San Pedro La Laguna',
      description: 'Restaurantes, bares y vistas impresionantes del lago.',
      image: '/san-pedro-la-laguna.jpg',
      mapLink: 'https://maps.app.goo.gl/Rn5F3Mdo6kV1A3nr5',
    },
  
    {
        name: 'La Casa de Don Memo',
        description: 'Esta casa está dedicada a Guillermo Fuentes Girón y era conocido como Don Memo. Es un destacado compositor, músico y poeta sololateco, autor del diversas canciones, entre ellas la mas conocida es "¿Por que sera?", himno oficial de Sololá. Siendo un personaje importante para el departamento, se aprovechó esta casa y se hizo un museo en donde se exponen elementos importantes de la historia del departamento. Además podrás comer y tomar un café guatemalteco.',
        image: '/memo.jpg',
        mapLink: 'https://maps.app.goo.gl/6avr2iEaFL7UBpPk9',
      },
      {
        name: 'Santa Catarina Palopó',
        description: 'Este lugar cuenta con atracciones turísticas que de seguro no conocías todas, tiene tantos lugares que son impresionantes y cuentan con actividades diferentes. Encontrarás un lugar en el que existen aguas termales en las que puedes sumergirte a la orilla del lago y sentir el agua que se calienta de manera natural. También cuentan con un hermoso mirador que te permite observar la majestuosidad de este lago. Puedes encontrar artesanías impresionantes.',
        image: '/memo.jpg',
        mapLink: 'https://maps.app.goo.gl/Srrjsztq9Z3yth1L9',
      },
      {
        name: 'Mirador Ixchel',
        description: 'Mirador Ixchel es un hermoso destino que debes de conocer si viajas a Sololá. Lo mejor es que la vista de este sitio es privilegiada y cuentan con distintas casetas para poder disfrutar de un momento agradable rodeado de naturaleza. Además, encontrarás un lindo columpio para vivir una actividad completamente diferente y capturar fotografías únicas.',
        image: '/ixel.jpg',
        mapLink: 'https://maps.app.goo.gl/ja9MGFCFRTDNfHVh8',
      },
      {
        name: 'San Juan la Laguna',
        description: 'En este lugar puedes realizar actividades relacionadas con el arte, los textiles y las pinturas espectaculares que existen en esta región del departamento de Sololá. Es aquí donde trabajan productos orgánicos y artesanales muy interesantes los cuales puedes conocer. Cuentan con guías comunitarios que te mostrarán cómo trabajan la medicina artesanal y natural, las plantaciones de café y a miel orgánica. También te llevan a conocer a los pintores de este sector y cofradías.',
        image: '/san-juan.jpg',
        mapLink: 'https://maps.app.goo.gl/VBV6WcYz7ot2KtUJA',
      },
      {
        name: 'Club Ven Acá',
        description: 'Este es sin duda alguna uno de los destinos que debes de conocer si viajas a Sololá. Ubicado en El Jaibalito, el Club Ven Acá permite a los turistas disfrutar de una hermosa piscina y jacuzzi al aire libre con una vista única del Lago de Atitlán. Este es un club que puedes visitar llegando en lancha y no se cobra el ingreso al mismo. Para utilizar todas las instalaciones solo debes de consumir en el restaurante o pagar una cuota por piscina. Solo puedes llegar en lancha.',
        image: '/aca.jpg',
        mapLink: 'https://maps.app.goo.gl/fUBUpe1eTYvvq1Pd8',
      },
      {
        name: 'Reserva Natural Atitlán',
        description: 'Tienes muchísimas cosas por hacer en esta reserva natural ubicada en Sololá. Puedes disfrutar de la increíble vista y los espectaculares volcanes que rodean al Lago Atitlán. Los cables, el mariposario, los senderos, los puentes colgantes y los alojamientos de la reserva te acercan a la naturaleza. En el Mariposario observarás los colores y formas de cientos de mariposas, rodeado de flores y el sonido de las aguas.',
        image: '/reserva.jpg',
        mapLink: '',
      },
      {
        name: 'Yatch Club Atitlán',
        description: 'El Yatch Club Atitlán  es un espacio para los amantes de la naturaleza, la vista y los espacios curiosos. Se trata de un pequeño parque natural que cuenta con un amplio jardín con vista, hamacas, diferentes casas para hospedarse y un faro que es la principal atracción de este destino. Lo mejor es que existen diferentes casas en Airbnb que puedes alquilar cerca de este destino como es el caso de la Villa Shabbbat. Puedes llegar en lancha a este destino ubicado en el Cerro de Oro en Sololá.',
        image: '/yatch.jpg',
        mapLink: 'https://maps.app.goo.gl/EBzp3mBSkiSd3piE6',
      },
      {
        name: 'San Marcos La Laguna',
        description: 'Este es un lugar increíble que debes de conocer. Cuenta con muchísimas cosas por hacer al aire libre, en contacto con la naturaleza tu podrás disfrutas de actividades únicas y muy divertidas. Desde yoga hasta lanzarte al lago, San Marcos La Laguna cuenta con una belleza inigualable. Te recomendamos conocer el centro.',
        image: '/sanmarcos.jpg',
        mapLink: 'https://maps.app.goo.gl/JGbC1GqGqd5apcfz6',
      },
      {
        name: 'Lago de Atitlán',
        description: 'Este lago es impresionante, su agua azulada rodeada de hermosas montañas y vegetación lo hace único e inigualable. Este lago es reconocido mundialmente por su belleza y por todas las actividades que se pueden realizar en él. Desde buceo hasta viajes en lancha, este lago te ofrece muchísimas cosas por hacer llenas de aventura y una vista espectacular.',
        image: '/lago.jpg',
        mapLink: 'https://maps.app.goo.gl/niWbXWKi5tEr8iWz7',
      },
      {
        name: 'Cerro Tzankujil',
        description: '¡Al agua! Esta reserva natural ofrece muchas cosas por hacer, pero entre sus principales atractivos está la posibilidad de lanzarte al lago de Atitlán desde una tarima de madera. Esta es una experiencia única que no puedes dejar de vivir, la adrenalina y la hermosa vista hacen que esta experiencia sea inigualable. Puedes llegar en lancha a este destino y lanzarte.',
        image: '/cerro.jpg',
        mapLink: 'https://maps.app.goo.gl/GiQgi1f5s1944bBDA',
      },
      {
        name: 'Flyboard',
        description: 'Esta es una de las actividades extremas más divertidas, podrás volar sobre el agua, te elevarás y podrás observar el hermoso lago de Atitlán. Si buscas algo distinto, este lugar es ideal para las personas que les gustas las aventuras llenas de adrenalina y un paisaje colorido. Puedes hacer esta actividad en el hotel Jardines del Lago y se cobra por tiempo.',
        image: '/fly.jpg',
        mapLink: 'https://maps.app.goo.gl/XeTeZbqmh4z4b8Kv6',
      },
      {
        name: 'Mirador de Atitlán',
        description: 'Este es un lugar muy conocido por todas las personas que ya han visitado este departamento ya que queda en camino a Panajachel y es muy común parar en este mirador para poder observar la majestuosa vista panorámica que ofrece. Además puedes comprar artesanías, recuerdos, accesorios típicos y cuadros pintados por artistas de Sololá.',
        image: '/mirar.jpg',
        mapLink: 'https://maps.app.goo.gl/7ytk1FfWzn6aexq1A',
      },
      {
        name: 'Catarata en Sololá',
        description: 'Esta hermosa catarata es única y bastante alta. Muchas personas utilizan este lugar para tomarse fotografías ya que cuenta con un paisaje hermoso, lo mejor de todo es que no tienes que pagar nada ya que queda a la orilla de la carretera en la que puedes dejar tu carro en un espacio oportuno. Puedes observarla cuando vas de Sololá a Guatemala o viceversa, muchas personas detienen su carro para fotografiar esta hermosa catarata.',
        image: '/caatarata.jpg',
        mapLink: 'https://maps.app.goo.gl/JeJcV74ZRzJRBnEs5',
      },
      {
        name: 'Parque Ecológico Volcán San Pedro',
        description: 'Este parque ecológico cuenta con 354 hectáreas de bosque que son parte de esta área protegida por la municipalidad de San Pedro La Laguna. El proyecto inició en el año 2006 y cuenta con muchos senderos que se pueden recorrer para explorar lindos paisajes. Descubre este lindo parque y explora todo lo que Sololá tiene para ti.',
        image: '/volcan.jpg',
        mapLink: 'https://maps.app.goo.gl/RpfaQswKtGe7MQbs8',
      },
       {
        name: 'Panajachel',
        description: 'Conocido popularmente como "Pana", es la principal puerta de entrada al Lago de Atitlán y uno de los destinos turísticos más vibrantes de Sololá. Ubicado en la orilla norte del lago, ofrece una mezcla de cultura local y servicios turísticos. Aquí encontrarás una gran variedad de hoteles, restaurantes, bares y tiendas de artesanías a lo largo de su famosa Calle Santander. Es el punto de partida para las lanchas que conectan con los demás pueblos del lago, y su mercado municipal es un lugar excelente para observar la vida cotidiana y adquirir productos frescos y tejidos.',
        image: '/pana.jpg',
        mapLink: 'https://maps.app.goo.gl/m4MFwexMjpjdET7r7',
      },
       {
        name: 'Mercado de Sololá',
        description: 'Este mercado es una experiencia auténtica y colorida. Se celebra principalmente los martes y viernes en la cabecera departamental, Sololá. Es uno de los mercados indígenas más grandes y tradicionales del altiplano guatemalteco, donde los habitantes de los pueblos circundantes, muchos de ellos vistiendo sus trajes típicos ancestrales, se reúnen para intercambiar productos agrícolas, artesanías y otros bienes. Es un lugar fascinante para observar las costumbres locales y sumergirse en la cultura maya viva.',
        image: '/mercado.jpg',
        mapLink: 'https://maps.app.goo.gl/U9pvURFShYxq1kn58',
      },
       {
        name: 'Volcán San Pedro',
        description: 'Este volcán inactivo, que se eleva majestuosamente sobre la orilla oeste del Lago de Atitlán, es un destino popular para los amantes del senderismo. La caminata hasta su cima ofrece vistas panorámicas espectaculares del lago y sus volcanes circundantes. Durante el ascenso, se atraviesan cafetales y bosques húmedos, lo que lo convierte en una experiencia natural enriquecedora. Es también un buen lugar para la observación de aves.',
        image: '/volcansan.jpg',
        mapLink: 'https://maps.app.goo.gl/CcxHdZ6pXmcrbpJn7',
      },
       {
        name: 'Volcán Atitlán y Volcán Tolimán',
        description: 'Estos dos volcanes, junto con el San Pedro, forman el icónico trío que enmarca el Lago de Atitlán. Son más desafiantes para escalar que el Volcán San Pedro, por lo que son ideales para excursionistas con experiencia que buscan una aventura más exigente. Las recompensas son vistas aún más impresionantes y la satisfacción de conquistar cumbres significativas.',
        image: '/atitlan.jpg',
        mapLink: 'https://maps.app.goo.gl/6kb7qpdTjpc3zJXM9',
      },
       {
        name: 'Pascual Abaj (Sololá)',
        description: 'Este es un sitio ceremonial maya ubicado en las cercanías del pueblo de Sololá. Es un lugar sagrado donde los mayas locales continúan realizando rituales y ofrendas ancestrales a sus deidades. Los visitantes pueden observar estas prácticas culturales y aprender sobre la cosmovisión maya, siempre con respeto por las tradiciones.',
        image: '/pascual.jpg',
        mapLink: 'https://maps.app.goo.gl/ykKsxzJLrpMRByZ67',
      },
       {
        name: 'Museo Arqueológico Azul Maya (Panajachel)',
        description: 'Ubicado en Panajachel, este museo alberga una colección privada de artefactos mayas, incluyendo joyas, cerámica y otros objetos históricos. Ofrece una visión fascinante de la rica historia y cultura de la civilización maya en la región.',
        image: '/azul.jpg',
        mapLink: 'https://maps.app.goo.gl/nymCJ4ZVyddZ3WDu9',
      },
       {
        name: 'Iglesia de Saint Francis (Panajachel)',
        description: 'Esta iglesia en Panajachel es un ejemplo de la arquitectura colonial en la zona. Es un lugar de culto importante para la comunidad local y ofrece un vistazo a la historia religiosa y cultural del pueblo.',
        image: '/iglesia.jpg',
        mapLink: 'https://maps.app.goo.gl/SbV6V5cJFpXLMshq9',
      },
       {
        name: 'Mirador Mario Méndez Montenegro (San Antonio Palopó)',
        description: 'Un mirador específico en San Antonio Palopó que ofrece vistas impresionantes del Lago de Atitlán y los pueblos circundantes. Es un excelente punto para tomar fotografías y apreciar la belleza escénica de la región.',
        image: '/mirador.jpg',
        mapLink: 'https://maps.app.goo.gl/DEE6KgeodwARAbLp9',
      },
       {
        name: 'Iglesia San Lucas Evangelista (San Lucas Tolimán)',
        description: 'Fundada en 1584 por los franciscanos, esta iglesia colonial es un importante hito histórico y arquitectónico en San Lucas Tolimán. Su antigüedad y diseño la convierten en un punto de interés para quienes aprecian el patrimonio religioso.',
        image: '/iglesiasan.jpg',
        mapLink: 'https://maps.app.goo.gl/UgA1qa38f6pvy6jX7',
      },
       {
        name: 'Parque Ecológico Saquiché (San Andrés Semetabaj)',
        description: 'Un espacio natural en el municipio de San Andrés Semetabaj, ideal para disfrutar de la naturaleza, realizar caminatas y relajarse en un entorno tranquilo.',
        image: '/saquiche.jpg',
        mapLink: 'https://maps.app.goo.gl/rD5tYtbKqzMcgVXZ6',
      },
       {
        name: 'Parque Ecológico Cerro Lquitiu (San Lucas Tolimán)',
        description: 'Esta área protegida es un refugio de biodiversidad, especialmente conocida por su bosque nuboso y de montaña. Es un lugar excelente para el ecoturismo y el avistamiento de aves, con más de 80 especies reportadas. Ofrece senderos para explorar la flora y fauna locales.',
        image: '/lquiti.jpg',
        mapLink: 'https://maps.app.goo.gl/g64dgv4vokGwv7hZA',
      },
       {
        name: 'Paseo de las Artes (San Juan La Laguna)',
        description: 'Situado en la calle del embarcadero de San Juan La Laguna, este paseo es un lugar vibrante donde se puede apreciar el arte y la cultura local. Encontrarás galerías, murales y talleres que muestran el talento de los artistas de la comunidad.',
        image: '/artes.jpg',
        mapLink: 'https://maps.app.goo.gl/DNsNYEj2mvASynGS8',
      },
       {
        name: 'La Calle de los Sombreros (San Juan La Laguna)',
        description: 'Como su nombre lo indica, esta calle en San Juan La Laguna es un lugar donde el arte y la cultura abundan. Es conocida por sus tiendas y talleres que exhiben y venden sombreros tradicionales y otras artesanías, reflejando la creatividad de la comunidad.',
        image: '/sombreros.jpg',
        mapLink: 'https://maps.app.goo.gl/X2XYDfV7vEFA8pVm8',
      },
       {
        name: 'Mundo de Abejas Mayas (San Juan La Laguna)',
        description: 'Este lugar ofrece una oportunidad única para aprender sobre las abejas ancestrales mayas sin aguijón y la apicultura tradicional. Los visitantes pueden conocer el proceso de producción de miel y probar este dulce néctar.',
        image: '/abejas.jpg',
        mapLink: 'https://maps.app.goo.gl/T1KAeX8F12XEZbNC6',
      },
       {
        name: 'Mirador Rey Tepepul (Santiago Atitlán)',
        description: 'Un área protegida que ofrece senderos, sitios sagrados y escenarios paisajísticos únicos. Es un lugar donde la fauna y flora interactúan, incluyendo especies endémicas y en peligro de extinción, y donde se fusiona la riqueza de la cultura maya con la naturaleza.',
        image: '/tepepul.jpg',
        mapLink: 'https://maps.app.goo.gl/rbPRNv8fGumEXthw8',
      },
       {
        name: 'Museo Textil Cojolya (Santiago Atitlán)',
        description: 'Este museo en Santiago Atitlán se dedica a preservar y exhibir la rica tradición textil de la región. Muestra la historia, las técnicas y la belleza de los tejidos mayas, muchos de ellos elaborados por las mujeres de la comunidad.',
        image: '/cojo.jpg',
        mapLink: 'https://maps.app.goo.gl/th3ogc762BiDtY6A9',
      },
       {
        name: 'Cerro de Oro',
        description: 'Un rincón pintoresco y menos concurrido cerca del Lago de Atitlán. Se dice que este cerro, con su forma particular, inspiró a Antoine de Saint-Exupéry para escribir "El Principito". Ofrece paisajes hermosos y es un lugar tranquilo para disfrutar de la naturaleza.',
        image: '/cerroj.jpg',
        mapLink: 'https://maps.app.goo.gl/Ddp8L3oB9bHdFfRq9',
      },
       {
        name: 'Pueblo Maya de Chutinamit',
        description: 'Considerado un antiguo pueblo maya y el último bastión de la vida maya tradicional, con sus monumentos intactos. Ofrece a los visitantes una perspectiva única del pasado y la oportunidad de explorar vestigios de una civilización ancestral.',
        image: '/arq.jpg',
        mapLink: 'https://maps.app.goo.gl/3xR9CX91zZ8CPhpS7',
      },
       {
        name: 'Jardines Botánicos “La Azotea” (San Antonio Palopó)',
        description: 'Estos jardines ofrecen espacios tranquilos y hermosos para apreciar la diversidad de la flora local. Son ideales para un paseo relajante, la fotografía y para conectar con la naturaleza en un entorno bien cuidado.',
        image: '/azotea.jpg',
        mapLink: 'https://maps.app.goo.gl/7UaQCDNpMMLPXqT59',
      },
       {
        name: 'Museo Mayaland (San José Chacayá)',
        description: 'Ubicado en San José Chacayá, este museo se divide en tres secciones: Escrituras Mayas, Ofrendas Arqueológicas y La Cultura Maya en Guatemala. Proporciona una gran cantidad de información sobre la historia, costumbres, astronomía y geometría maya, además de ofrecer una vista panorámica del Lago Atitlán.',
        image: '/cha.jpg',
        mapLink: 'https://maps.app.goo.gl/GVKAmw619iw1TCWJ6',
      },
      {
        name: 'Casa de los Jerarcas (Lago Atitlán)',
        description: 'Una casa histórica construida por el Rey Cakchiquel Alvarado en el siglo XV, durante el reinado del famoso rey Tecún Umán. Es un sitio con un gran valor histórico y cultural, que ofrece una ventana al pasado prehispánico de la región.',
        image: '/casa.jpg',
        mapLink: 'https://maps.app.goo.gl/uku1qNW2S7Jjepfg9',
      },
      {
        name: 'Parque Ecológico Chuiraxamoló (Santa Clara La Laguna)',
        description: 'Otro parque ecológico en el departamento, que contribuye a la conservación de la biodiversidad y ofrece un espacio para el ecoturismo y actividades al aire libre en Santa Clara La Laguna.',
        image: '/ecologico.jpg',
        mapLink: 'https://maps.app.goo.gl/JatMAVsSTJYvyVCq7',
      },
  
]);
 // ✅ Obtener datos desde la base de datos al cargar
  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const res = await fetch('/api/attractions');
        if (res.ok) {
          const data = await res.json();
          setAttractions(data);
        } else {
          console.error('Error al cargar datos desde la API');
        }
      } catch (err) {
        console.error('Error de conexión:', err);
      }
    };

    fetchAttractions();
  }, []);

return (
  <main className={styles.container}>
   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
  <h1
  style={{
    flex: 1,
    textAlign: 'center',
    fontFamily: `'Poppins', 'Segoe UI', sans-serif`,
    fontSize: '3.5rem',
    fontWeight: '700',
    color: '#2d3748',
  }}
>
  Atractivos Turísticos en Sololá
</h1>

  <button
    onClick={() => setMostrarEstadisticas(true)}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      backgroundColor: '#38a169',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 'bold',
    }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" fill="white">
      <path d="M13 16h-1v-4h-1m2-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
    </svg>
    Estadísticas
  </button>
</div>
{mostrarEstadisticas && (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
    }}
    onClick={() => setMostrarEstadisticas(false)}
  >
    <div
      style={{
        background: 'white',
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '600px',
        width: '90%',
        textAlign: 'center',
        position: 'relative',
      }}
      onClick={(e) => e.stopPropagation()} // Para que no se cierre al hacer clic dentro
    >
      <button
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          background: '#e53e3e',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: 30,
          height: 30,
          fontSize: '1.2rem',
          cursor: 'pointer',
        }}
        onClick={() => setMostrarEstadisticas(false)}
      >
        ×
      </button>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#2d3748' }}>
        Estadísticas de Turismo en Sololá
      </h2>
      <p style={{ fontSize: '1.1rem', color: '#444' }}>
        Aproximadamente <strong>1.2 millones</strong> de turistas nacionales e internacionales visitan el
        departamento de Sololá cada año, atraídos por su impresionante naturaleza, cultura maya viva y el
        majestuoso Lago de Atitlán.
      </p>
    </div>
  </div>
)}


    <p className={styles.description}>
      Explora los lugares más destacados de Sololá, llenos de belleza natural y cultural.
    </p>

  <button
  onClick={() => setShowNewForm(true)}
  style={{
    fontSize: '1.5rem',
    padding: '0.4rem 1rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '1rem',
    backgroundColor: '#3182ce',
    color: 'white',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem', // espacio entre + y texto
  }}
  aria-label="Agregar nuevo lugar"
>
  <span style={{ fontSize: '2rem', lineHeight: 1 }}>+</span> Agregar Nuevo Lugar
</button>


    <section className={styles.attractionsSection}>
      {attractions.map((attraction, index) => (
        <div
          key={attraction.id || index}
          className={styles.attractionCard}
          style={{ cursor: 'pointer', position: 'relative' }}
        >
          {/* Botón X para borrar */}
          <button
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              background: '#e53e3e',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: 28,
              height: 28,
              fontSize: '1.1rem',
              cursor: 'pointer',
              zIndex: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            }}
            title="Eliminar atractivo"
            onClick={(e) => {
              e.stopPropagation();
              setConfirmDelete({ show: true, id: attraction.id });
            }}
          >×</button>
          <div className={styles.imageWrapper}>
            {attraction.image_url && (
              <Image
                src={attraction.image_url}
                alt={attraction.name || 'Imagen del atractivo turístico'}
                className={styles.attractionImage}
                width={500}
                height={300}
              />
            )}
          </div>

          <h2 className={styles.attractionName}>
            {attraction.name}
            <span
              style={{
                marginLeft: 18,
                cursor: 'pointer',
                verticalAlign: 'middle',
                display: 'inline-flex',
                alignItems: 'center',
              }}
              title="Ver detalles"
              onClick={e => {
                e.preventDefault();
                setModalIndex(index);
              }}
            >
              {/* SVG ojito */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="28"
                viewBox="0 0 44 28"
                fill="none"
              >
                <path
                  d="M22 5C11.79 5 4.01 12.11 2 14c2.01 1.89 9.79 9 20 9s17.99-7.11 20-9c-2.01-1.89-9.79-9-20-9zM22 21c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                  fill="#222"
                />
              </svg>
            </span>
          </h2>
        </div>
      ))}
    </section>

    {modalIndex !== null && (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.45)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={() => setModalIndex(null)}
      >
        <div
          style={{
            background: 'white',
            borderRadius: '24px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            padding: '32px',
            minWidth: '50vw',
            maxWidth: '90vw',
            width: '700px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
          onClick={e => e.stopPropagation()}
        >
          <button
            style={{
              position: 'absolute',
              top: 18,
              right: 18,
              background: '#e53e3e',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: 36,
              height: 36,
              fontSize: '1.5rem',
              cursor: 'pointer',
              zIndex: 2,
            }}
            onClick={() => setModalIndex(null)}
            aria-label="Cerrar"
          >
            ×
          </button>

          {attractions[modalIndex].image_url && (
            <Image
              src={attractions[modalIndex].image_url}
              alt={attractions[modalIndex].name}
              width={600}
              height={350}
              style={{ borderRadius: '15px', marginBottom: '20px', objectFit: 'cover' }}
            />
          )}

          <h2 style={{ fontSize: '2rem', marginBottom: '18px', color: '#222' }}>
            {attractions[modalIndex].name}
          </h2>
          <div
            style={{
              fontSize: '1.15rem',
              color: '#333',
              textAlign: 'center',
              maxHeight: '220px',
              overflowY: 'auto',
              marginBottom: '20px',
            }}
          >
            {attractions[modalIndex].description}
          </div>

          {/* Botón para abrir Google Maps */}
          {attractions[modalIndex].map_link && (
            <a
              href={attractions[modalIndex].map_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                backgroundColor: '#3182ce',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                cursor: 'pointer',
                userSelect: 'none',
              }}
              aria-label={`Abrir Google Maps para ${attractions[modalIndex].name}`}
            >
              {/* Icono de mapa simple (SVG) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                fill="white"
              >
                <path d="M20.5 3l-5.38 1.69-4.12-1.72L4.5 5v15l5.38-1.69 4.12 1.72 6.5-2V3zM10 17.5l-4-1.25v-11l4 1.66v10.59zM16 19.27l-4-1.59V7.18l4 1.67v10.42z" />
              </svg>
              Abrir en Google Maps
            </a>
          )}
        </div>
      </div>
    )}

    {showNewForm && (
      <NewAttractionForm
        onClose={() => setShowNewForm(false)}
        onSave={newAttraction => {
          setAttractions(prev => [...prev, newAttraction]);
          setShowNewForm(false);
        }}
      />
    )}
    {/* Modal de confirmación para eliminar */}
    {confirmDelete.show && (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.25)',
        zIndex: 3000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '2rem 2.5rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          textAlign: 'center',
          minWidth: '280px',
        }}>
          <h3 style={{marginBottom:'1rem', color:'#e53e3e'}}>¿Seguro que quieres eliminar este lugar?</h3>
          <div style={{display:'flex', justifyContent:'center', gap:'1.5rem'}}>
            <button
              style={{background:'#e53e3e', color:'white', border:'none', borderRadius:'8px', padding:'0.7rem 1.5rem', fontWeight:'bold', cursor:'pointer'}}
              onClick={async () => {
                try {
                  const res = await fetch('/api/attractions', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: confirmDelete.id })
                  });
                  if (res.ok) {
                    setAttractions(prev => prev.filter(a => a.id !== confirmDelete.id));
                    setMsg('Atractivo eliminado exitosamente');
                  } else {
                    setMsg('Error al eliminar');
                  }
                } catch {
                  setMsg('Error de conexión');
                }
                setShowMsg(true);
                setTimeout(() => setShowMsg(false), 2000);
                setConfirmDelete({ show: false, id: null });
              }}
            >Sí, eliminar</button>
            <button
              style={{background:'#3182ce', color:'white', border:'none', borderRadius:'8px', padding:'0.7rem 1.5rem', fontWeight:'bold', cursor:'pointer'}}
              onClick={() => setConfirmDelete({ show: false, id: null })}
            >No, cancelar</button>
          </div>
        </div>
      </div>
    )}
    {/* Mensaje visual flotante para eliminar */}
    {showMsg && (
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: msg && msg.includes('exitosamente') ? '#38a169' : '#e53e3e',
        color: 'white',
        padding: '1.2rem 2.2rem',
        borderRadius: '14px',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        zIndex: 2000,
        textAlign: 'center',
        animation: 'popIn 0.3s',
      }}>
        {msg}
      </div>
    )}
  </main>
);
}
