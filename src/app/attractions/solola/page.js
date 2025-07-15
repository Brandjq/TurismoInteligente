// Importar estilos globales y componentes necesarios
import Image from 'next/image';
import styles from './solola.module.css';

export default function Solola() {
  const attractions = [
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
  ];

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Atractivos Turísticos en Sololá</h1>
      <p className={styles.description}>
        Explora los lugares más destacados de Sololá, llenos de belleza natural y cultural.
      </p>
      <section className={styles.attractionsSection}>
        {attractions.map((attraction, index) => (
          <a
            key={index}
            href={attraction.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.attractionCard}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={attraction.image}
                alt={attraction.name}
                className={styles.attractionImage}
                width={500}
                height={300}
              />
              <div className={styles.description}>{attraction.description}</div>
            </div>
            <h2 className={styles.attractionName}>{attraction.name}</h2>
          </a>
        ))}
      </section>
    </main>
  );
}