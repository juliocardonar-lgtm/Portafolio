const CDN = "/assets";

export type Persona = {

  name: string;

  role: string;

  avatar?: string;

  demographics: { age: string; education: string; residence: string; family: string; occupation: string };

  bio: string;

  goals: string;

  frustrations: string;

};

export type Insight = { title: string; text: string };

export type Feature = { title: string; image?: string; points: string[] };

export type UxProject = {

  slug: string;

  client: string;

  tagline: string;

  category: string;

  year: string;

  role: string[];

  scope: string[];

  cover: string;

  hero?: string;

  problem: string;

  objective: string;

  challenges: string[];

  audience: string[];

  research: string;

  personas: Persona[];

  insights: Insight[];

  wireframe?: string;

  userflow?: string;

  hifi?: string;

  features: Feature[];

  closingImage?: string;

  conclusions: string[];

  externalRef?: string;

};

export const uxProjects: UxProject[] = [

  {

    slug: "the-beer-box",

    client: "The Beer Box",

    tagline:

      "App dedicada a la administración integral de franquicias: compras, inventario, reservaciones, mesas y staff.",

    category: "UX / UI · Mobile App",

    year: "2024",

    role: [

      "Branding",

      "Ilustración digital",

      "Lead UX / UI",

      "User Research",

      "Wireframing",

      "Prototipado",

      "Usability Testing",

    ],

    scope: ["iOS & Android", "Admin & POS", "Reservaciones", "Loyalty"],

    cover: `${CDN}/mosiaco_Proyectos_Beerbox.jpg`,

    hero: `${CDN}/herobannerbbx-1.jpg`,

    problem:

      "Las franquicias de restaurantes en México enfrentan retos operativos y de gestión. No existe una plataforma integral que cubra desde la gestión de inventario y compras de insumos hasta administración de personal y experiencia del cliente. La gestión de compras se realiza por teléfono o correo electrónico, las reservaciones y la asignación de mesas son propensas a errores, y mantener informados a los empleados de noticias y actualizaciones de la franquicia es complicado.",

    objective:

      "Desarrollar una aplicación dedicada que aborde de manera integral las necesidades operativas y de gestión: compras de insumos, administración del personal, reservaciones, asignación de mesas y un canal de comunicación interno. El objetivo final es mejorar la eficiencia operativa, aumentar la satisfacción del cliente y fortalecer la cohesión del equipo de trabajo.",

    challenges: [

      "Integración completa de todas las funciones del negocio en una sola app cohesiva y fácil de usar.",

      "Diseñar una interfaz intuitiva para todos los perfiles — desde gerentes hasta personal de servicio.",

      "Sistema eficiente de reservaciones y asignación de mesas considerando espacio, tamaño de grupo y preferencias.",

    ],

    audience: ["Franquiciatarios", "Gerentes de sucursal", "Personal de servicio", "Clientes habituales"],

    research:

      "Combiné métodos cualitativos y cuantitativos — entrevistas, encuestas, análisis de datos de uso y observación participativa en sucursales — para entender necesidades, comportamientos y preferencias de los usuarios clave. Los hallazgos confirmaron la necesidad de una solución integrada con una interfaz intuitiva, capaz de garantizar adopción y compromiso del usuario.",

    personas: [

      {

        name: "Sofía",

        role: "Dueña de una franquicia",

        avatar: `${CDN}/Screen-Shot-2024-02-07-at-16.41.35-150x150.png`,

        demographics: {

          age: "29 años",

          education: "Licenciatura en derecho",

          residence: "CDMX",

          family: "Vive sola",

          occupation: "Empresaria",

        },

        bio: "Sofía es una empresaria visionaria que posee franquicias de The Beer Box en México. Busca constantemente formas de mejorar y hacer crecer su negocio.",

        goals:

          "Una aplicación que le dé visión integral de todas las operaciones — inventario, compras, reservaciones y personal — en tiempo real.",

        frustrations:

          "Gestión de múltiples ubicaciones, decisiones estratégicas y consistencia de marca y calidad entre sucursales.",

      },

      {

        name: "Diego",

        role: "Gerente de un restaurante The Beer Box",

        avatar: `${CDN}/Screen-Shot-2024-02-07-at-16.41.41-150x150.png`,

        demographics: {

          age: "32 años",

          education: "Lic. en Administración",

          residence: "CDMX",

          family: "Casado con un hijo",

          occupation: "Gerente de restaurante",

        },

        bio: "Diego es un gerente dedicado con amplia experiencia en restauración, comprometido con entregar una experiencia excepcional a sus clientes.",

        goals:

          "Gestionar reservaciones, tomar órdenes, controlar inventario, asignar mesas y comunicarse con su equipo desde un solo lugar.",

        frustrations:

          "Coordinar al personal, resolver imprevistos y mantener estándares altos de servicio en cada turno.",

      },

    ],

    insights: [

      {

        title: "Insight 1 — Experiencia del cliente",

        text: "Los clientes esperan una experiencia fluida y personalizada: reservas flexibles, recomendaciones a la medida y servicio atento. La app debe potenciar esta experiencia, no replicarla.",

      },

      {

        title: "Insight 2 — Inventario & compras",

        text: "Gerentes y franquiciatarios necesitan simplificar inventario y compras de insumos para garantizar disponibilidad, anticipar demanda y evitar quiebres de stock.",

      },

      {

        title: "Insight 3 — Comunicación interna",

        text: "Mejorar comunicación y colaboración entre miembros del equipo, compartir actualizaciones, asignar tareas y dar seguimiento desde un mismo canal.",

      },

    ],

    wireframe: `${CDN}/wireframes-bbx.jpg`,

    userflow: `${CDN}/userflowbbx.jpg`,

    hifi: `${CDN}/hifiBBX.jpg`,

    features: [

      {

        title: "Compras",

        image: `${CDN}/pantallas-comprasbbxpsd.jpg`,

        points: [

          "Compras divididas en 4 categorías según naturaleza del producto, con acceso rápido a listas de favoritos por usuario.",

          "Listas de favoritos por categoría y por sucursal, ya que cada unidad vende cantidades distintas.",

          "Acciones de compra integradas dentro del inventario, sin tener que salir de la pantalla.",

        ],

      },

      {

        title: "Órdenes",

        image: `${CDN}/pantallas-orden-bbxpsd.jpg`,

        points: [

          "Accesos directos a categorías de alimentos y tiempo estimado de preparación de cada platillo.",

          "Las órdenes pueden editarse de forma sencilla incluso después de ser guardadas.",

        ],

      },

      {

        title: "Mesas",

        image: `${CDN}/pantallas-mesas-bbxpsd-1020x1024.jpg`,

        points: [

          "Mapa editable de mesas por sucursal, para acomodar grupos grandes y personalizar cada unidad.",

        ],

      },

      {

        title: "Staff",

        image: `${CDN}/pantallas-staff-bbxpsd.jpg`,

        points: [

          "Sistema de roles configurable: el administrador define privilegios de compras, inventario, reportes y listas para cada perfil.",

        ],

      },

    ],

    closingImage: `${CDN}/imagenfooterbbx.jpg`,

    conclusions: [

      "La gestión integrada de reservaciones, mesas y pedidos se traduce en menores tiempos de espera, mejor control de inventario y optimización del personal.",

      "La app demostró ser una inversión valiosa: mejora la experiencia del cliente, optimiza operaciones internas y aporta una ventaja competitiva sostenible.",

      "Comprar insumos y administrar personal desde un solo lugar simplifica tareas administrativas y permite tomar decisiones más informadas en cada sucursal.",

    ],

    externalRef:

      "https://juliocardona.net/portfolio/the-beer-factory-app-dedicada-para-administracion-de-franquicias/",

  },

  {

    slug: "escritastica",

    client: "Escritástica",

    tagline:

      "App dedicada y sitio web adaptativo para la enseñanza de escritura creativa para adolescentes.",

    category: "UX / UI · Mobile App & Web",

    year: "2024",

    role: [

      "Branding",

      "Ilustración digital",

      "Lead UX / UI",

      "User Research",

      "Wireframing",

      "Prototipado",

      "Usability Testing",

      "Redactor",

    ],

    scope: ["iOS & Android", "Web adaptativo", "Ejercicios interactivos"],

    cover: `${CDN}/imagen-desctacada-escri.jpg`,

    hero: `${CDN}/fondosliderescri3.jpg`,

    problem:

      "Muchos adolescentes buscan ampliar o aprender nuevas habilidades a través de aplicaciones en línea. Es importante comprender sus necesidades y motivaciones para crear una experiencia de usuario que resulte atractiva para este nicho.",

    objective:

      "Crear una experiencia de usuario atractiva para adolescentes que deseen ampliar o iniciarse en la escritura creativa, que propicie el uso constante de la aplicación.",

    challenges: [

      "Presupuesto limitado para producción de contenido.",

      "Diseñar dinámicas de enseñanza que no sean repetitivas.",

      "Mantener la atención del usuario adolescente a lo largo de cada lección.",

    ],

    audience: [

      "Adolescentes interesados en iniciarse en la escritura creativa o ampliar sus habilidades en ella.",

    ],

    research:

      "Investigación primaria + auditoría competitiva: la experiencia en apps similares era buena pero la oferta era limitada y no estaba dirigida al nicho adolescente. Entrevisté a 5 adolescentes (4 mujeres, 1 hombre) que han usado o tienen interés en herramientas en línea para aprender o perfeccionar habilidades.",

    personas: [

      {

        name: "Polo",

        role: "Estudiante de preparatoria",

        avatar: `${CDN}/Personas-pics-escri-02.png`,

        demographics: {

          age: "14 años",

          education: "1er año de preparatoria",

          residence: "CD. de México",

          family: "Vive con sus padres",

          occupation: "Estudiante",

        },

        bio: "Polo está cursando la preparatoria pero siente que el aprendizaje tiene que retarlo y motivarlo para seguir adelante con sus metas. Disfruta ver y reconocer todo lo que ha aprendido.",

        goals: "Encontrar herramientas que lo motiven a seguir usándolas.",

        frustrations: "Muchas apps no tienen lo que busca y son aburridas. Algunos cursos son muy caros.",

      },

      {

        name: "Nova",

        role: "Estudiante de preparatoria",

        avatar: `${CDN}/Personas-pics-escri-01.png`,

        demographics: {

          age: "15 años",

          education: "1er año de preparatoria",

          residence: "CD. de México",

          family: "Vive con sus padres",

          occupation: "Estudiante",

        },

        bio: "Nova acaba de entrar a la preparatoria y siempre está buscando aprender cosas nuevas. Tiene experiencia usando apps y cursos en línea, prefiere dispositivos móviles y no le gusta que las herramientas requieran pago para desbloquear funcionalidades.",

        goals: "Encontrar apps de enseñanza que sean divertidas y que hagan fácil el aprendizaje.",

        frustrations: "Hay que pagar por algunas funciones. A veces estas apps son repetitivas.",

      },

    ],

    insights: [

      {

        title: "Pain Point 1 — Atención",

        text: "Contenido que mantenga la atención del usuario adolescente a lo largo de la lección.",

      },

      {

        title: "Pain Point 2 — Dinámicas",

        text: "Crear dinámicas de enseñanza que no sean repetitivas y que sumen retos progresivos.",

      },

      {

        title: "Pain Point 3 — Financiero",

        text: "Modelo de comercialización accesible para adolescentes sin barreras de pago tempranas.",

      },

    ],

    wireframe: `${CDN}/homewireescri-747x1024.jpg`,

    userflow: `${CDN}/paper1escri.jpg`,

    hifi: `${CDN}/prothifiescri.jpg`,

    features: [

      {

        title: "Prototipo Lo-Fi con ejercicios reales",

        image: `${CDN}/homewireLOFIescri.jpg`,

        points: [

          "Se incorporaron ejercicios reales en el prototipo de baja fidelidad para validar la dinámica desde el inicio.",

          "Los flujos fueron realizados con éxito por todos los usuarios.",

        ],

      },

      {

        title: "Prototipo Hi-Fi con búsqueda central",

        image: `${CDN}/prothifiescri.jpg`,

        points: [

          "Se agregaron más retos y la función de búsqueda se colocó de manera central en app y web.",

          "Mejora progresiva con elementos informativos adicionales para completar la experiencia.",

        ],

      },

    ],

    closingImage: `${CDN}/fondosliderescri3.jpg`,

    conclusions: [

      "El verdadero reto fue crear el contenido y la investigación para ofrecer una experiencia desafiante y divertida a adolescentes.",

      "Se hicieron sugerencias de comercialización para superar el pain point financiero.",

      "Encontrar dinámicas verdaderamente entretenidas para adolescentes requirió estudiar a fondo pedagogía y escritura creativa — el proyecto más desafiante en investigación que he llevado a cabo.",

    ],

    externalRef: "https://juliocardona.net/portfolio/escritastica/",

  },

  {

    slug: "rosse",

    client: "Rosse",

    tagline:

      "App con recorrido virtual para salón de bodas: cuenta regresiva, tour inmersivo y experiencia post-evento.",

    category: "UX / UI · Mobile App",

    year: "2024",

    role: [

      "Lead UX / UI",

      "User Research",

      "Wireframing",

      "Prototipado",

      "Diseño visual",

    ],

    scope: ["iOS & Android", "Recorrido virtual", "Experiencia de evento"],

    cover: `${CDN}/3tels-rosse.jpg`,

    hero: `${CDN}/3tels-rosse.jpg`,

    problem:

      "Los novios y sus invitados no tenían una forma envolvente de conocer el salón antes del evento ni de vivir la experiencia el día del enlace. Las visitas presenciales eran limitadas y la comunicación con el venue se hacía por WhatsApp y correo.",

    objective:

      "Diseñar una app dedicada que permita a los novios e invitados conocer el salón mediante un recorrido virtual, ver detalles del evento con cuenta regresiva y acceder a contenido posterior a la boda.",

    challenges: [

      "Integrar un recorrido virtual fluido dentro de la app sin sacrificar performance.",

      "Diseñar una experiencia emocional, sofisticada y memorable para un momento único.",

      "Acomodar perfiles muy distintos: novios organizando, invitados informándose y staff operando.",

    ],

    audience: ["Novios", "Invitados al evento", "Wedding planners", "Staff del salón"],

    research:

      "Combiné investigación primaria con auditoría competitiva: entrevisté a parejas que recientemente organizaron su boda y a wedding planners para mapear el journey completo, desde la búsqueda del venue hasta la post-experiencia. La mayor fricción estaba en la falta de información visual previa al evento.",

    personas: [

      {

        name: "Laura",

        role: "Novia organizando su boda",

        avatar: `${CDN}/Personas-pics-rosse-01.png`,

        demographics: {

          age: "29 años",

          education: "Licenciatura",

          residence: "CD. de México",

          family: "Comprometida",

          occupation: "Diseñadora",

        },

        bio: "Laura está organizando su boda y quiere compartir el salón con su familia y amigos sin coordinar múltiples visitas presenciales.",

        goals: "Compartir el venue con invitados, llevar control de tiempos y vivir cada detalle del proceso.",

        frustrations: "Coordinar visitas presenciales es complicado y las fotos no muestran la verdadera escala del lugar.",

      },

      {

        name: "Carolina",

        role: "Invitada a la boda",

        avatar: `${CDN}/Personas-pics-rosse-02.png`,

        demographics: {

          age: "31 años",

          education: "Licenciatura",

          residence: "CD. de México",

          family: "Soltera",

          occupation: "Profesional independiente",

        },

        bio: "Carolina quiere conocer el salón antes del evento, ver detalles de logística y guardar recuerdos del día de la boda.",

        goals: "Acceder a información del evento, conocer el venue y compartir fotos con los novios.",

        frustrations: "No tener información clara del lugar, horarios y logística previa al evento.",

      },

    ],

    insights: [

      {

        title: "Insight 1 — Anticipación emocional",

        text: "La cuenta regresiva y el recorrido virtual generan anticipación emocional y aumentan la conversión del venue.",

      },

      {

        title: "Insight 2 — Experiencia post-evento",

        text: "Los novios quieren revivir el evento y compartirlo: la app debe ofrecer recuerdo, no solo logística.",

      },

    ],

    wireframe: `${CDN}/paperrosse.jpg`,

    userflow: `${CDN}/Screen-Shot-2024-01-28-at-18.38.46.png`,

    hifi: `${CDN}/3tels-rosse.jpg`,

    features: [

      {

        title: "Cuenta regresiva al gran día",

        image: `${CDN}/Screen-Shot-2024-01-26-at-16.05.50.png`,

        points: [

          "Pantalla de inicio con cuenta regresiva personalizada al evento.",

          "Notificaciones contextuales por hitos del proceso.",

        ],

      },

      {

        title: "Recorrido virtual del salón",

        image: `${CDN}/Screen-Shot-2024-01-26-at-16.03.33.png`,

        points: [

          "Tour inmersivo 360º accesible desde el celular.",

          "Hotspots con detalles de cada espacio y propuesta de montaje.",

        ],

      },

      {

        title: "Experiencia post-boda",

        image: `${CDN}/3tels-rosse.jpg`,

        points: [

          "Galería compartida con los invitados.",

          "Mensaje de agradecimiento y memoria del evento.",

        ],

      },

    ],

    closingImage: `${CDN}/3tels-rosse.jpg`,

    conclusions: [

      "El recorrido virtual redujo la fricción de coordinar visitas y se convirtió en herramienta clave de conversión.",

      "La cuenta regresiva y la galería post-evento extienden la relación con el venue más allá del día de la boda.",

    ],

    externalRef: "https://juliocardona.net/portfolio/prueba-rosse/",

  },

  {

    slug: "mojo-teach",

    client: "Mojo Teach",

    tagline:

      "Portal de cursos y certificaciones — descubrimiento de contenido, ruta de aprendizaje y panel del estudiante.",

    category: "UX / UI · Web Platform",

    year: "2024",

    role: [

      "Lead UX / UI",

      "Arquitectura de información",

      "Wireframing",

      "Prototipado",

      "Design System",

    ],

    scope: ["Web responsive", "Panel de estudiante", "Catálogo de cursos"],

    cover: `${CDN}/Mojo_Tech_HeroOP.jpg`,

    hero: `${CDN}/Mojo_Tech_HeroOP.jpg`,

    problem:

      "Los estudiantes adultos que buscan especializarse en línea enfrentan plataformas saturadas, jerarquías poco claras y rutas de aprendizaje genéricas. Encontrar el curso correcto y mantener la constancia es la principal barrera.",

    objective:

      "Diseñar un portal de cursos y certificaciones que destaque el descubrimiento por intereses, ofrezca rutas de aprendizaje claras y motive la constancia a través del progreso visible.",

    challenges: [

      "Estructurar un catálogo amplio sin saturar la página de inicio.",

      "Diseñar una jerarquía clara entre cursos populares, introducciones y certificaciones.",

      "Mantener al estudiante motivado con progreso y siguientes pasos visibles.",

    ],

    audience: ["Estudiantes adultos", "Profesionales en especialización", "Equipos corporativos de capacitación"],

    research:

      "Realicé investigación primaria con estudiantes activos en plataformas educativas y una auditoría competitiva. Detecté que el descubrimiento por interés vence al filtrado por categoría y que el progreso visible es el principal motor de retención.",

    personas: [

      {

        name: "Martín",

        role: "Profesional buscando especialización",

        avatar: `${CDN}/Personas-picsmojo-02.png`,

        demographics: {

          age: "32 años",

          education: "Licenciatura",

          residence: "CD. de México",

          family: "Soltero",

          occupation: "Diseñador",

        },

        bio: "Martín quiere especializarse en una nueva disciplina sin renunciar a su trabajo. Necesita rutas claras y poder estudiar en bloques cortos de tiempo.",

        goals: "Encontrar una ruta de aprendizaje clara y avanzar de manera consistente.",

        frustrations: "Plataformas saturadas, cursos genéricos y falta de visibilidad sobre el avance.",

      },

      {

        name: "Pixie",

        role: "Estudiante en formación continua",

        avatar: `${CDN}/Personas-picsmojo-01.png`,

        demographics: {

          age: "27 años",

          education: "Licenciatura",

          residence: "CD. de México",

          family: "Vive sola",

          occupation: "Creativa freelance",

        },

        bio: "Pixie combina varios cursos a la vez y necesita un panel claro para no perder el hilo entre disciplinas.",

        goals: "Mantener su progreso visible y descubrir contenido nuevo que la rete.",

        frustrations: "Olvidar dónde se quedó y tener que reiniciar lecciones.",

      },

    ],

    insights: [

      {

        title: "Insight 1 — Descubrimiento por interés",

        text: "El home debe proponer cursos por intereses, no obligar a navegar el catálogo completo.",

      },

      {

        title: "Insight 2 — Progreso visible",

        text: "Mostrar avance, próximas lecciones y logros desbloqueados es el principal motor de retención.",

      },

      {

        title: "Insight 3 — Mapas de empatía",

        text: "Los mapas de empatía revelaron que la motivación cae cuando el siguiente paso no es evidente.",

      },

    ],

    wireframe: `${CDN}/papermojo.jpg`,

    userflow: `${CDN}/mapaempatiamojo.jpg`,

    hifi: `${CDN}/prototopalta.jpg`,

    features: [

      {

        title: "Mapas de empatía",

        image: `${CDN}/mapas-de-empatiamoko.jpg`,

        points: [

          "Mapas de empatía por perfil para entender motivaciones y bloqueos del estudiante.",

          "Insumo clave para definir la jerarquía del home y el panel del estudiante.",

        ],

      },

      {

        title: "Prototipo Lo-Fi",

        image: `${CDN}/prototoplofi.jpg`,

        points: [

          "Validación temprana de la navegación entre catálogo, curso y panel.",

          "Iteración rápida con los hallazgos de las pruebas con usuarios.",

        ],

      },

      {

        title: "Prototipo Hi-Fi",

        image: `${CDN}/prototopalta.jpg`,

        points: [

          "Home con descubrimiento curado: Populares, Introducción e Intermedio.",

          "Panel del estudiante con progreso, próximas lecciones y certificaciones en curso.",

        ],

      },

    ],

    closingImage: `${CDN}/Mojo_Tech_HeroOP.jpg`,

    conclusions: [

      "El descubrimiento por interés en el home redujo la fricción de entrada y aumentó la conversión a inscripción.",

      "Mostrar el progreso al estudiante elevó la retención semana a semana.",

      "El sistema visual escala a nuevas verticales de cursos sin rediseñar la experiencia base.",

    ],

    externalRef: "https://juliocardona.net/portfolio/mojo-teach-portal-de-cursos-y-certificaciones/",

  },

  {

    slug: "amis",

    client: "AMIS",

    tagline:

      "App dedicada para administración y gestión de seguros — pólizas, siniestros y comunicación con agentes en una sola plataforma.",

    category: "UX / UI · Mobile App",

    year: "2024",

    role: [

      "Lead UX / UI",

      "User Research",

      "Arquitectura de información",

      "Wireframing",

      "Prototipado",

      "Usability Testing",

    ],

    scope: ["iOS & Android", "Portal de agente", "Notificaciones"],

    cover: `${CDN}/herobannerappamis.jpg`,

    hero: `${CDN}/herobannerappamis.jpg`,

    problem:

      "La gestión de pólizas y siniestros para asegurados y agentes dependía de llamadas, correos y portales web obsoletos. La información estaba fragmentada y los tiempos de respuesta eran largos, generando fricción y abandono de clientes.",

    objective:

      "Diseñar una app dedicada que centralice pólizas, reporte de siniestros, pagos y comunicación con el agente, reduciendo tiempos de respuesta y elevando la percepción de servicio.",

    challenges: [

      "Unificar perfiles distintos (asegurado y agente) en una sola experiencia coherente.",

      "Simplificar el reporte de siniestros desde el celular, incluso con conectividad limitada.",

      "Traducir terminología técnica de seguros a un lenguaje claro para el usuario final.",

    ],

    audience: ["Asegurados", "Agentes de seguros", "Equipo de atención a clientes"],

    research:

      "Realicé entrevistas con asegurados y agentes, análisis de tickets de soporte y benchmarking de apps financieras y de seguros. Detecté que la mayoría de las dudas se resuelven con información que ya existe pero está mal expuesta.",

    personas: [

      {

        name: "Lucía",

        role: "Asegurada",

        avatar: `${CDN}/persona1amis-150x150.png`,

        demographics: {

          age: "35 años",

          education: "Licenciatura",

          residence: "CDMX",

          family: "Casada, 1 hijo",

          occupation: "Gerente de marketing",

        },

        bio: "Lucía contrató un seguro de auto y gastos médicos. Quiere consultar coberturas, pagar y reportar siniestros sin llamar al call center.",

        goals: "Ver sus pólizas, pagar a tiempo y reportar un siniestro en minutos desde el celular.",

        frustrations: "Portales lentos, terminología confusa y esperas largas en atención telefónica.",

      },

      {

        name: "Daniel",

        role: "Agente de seguros",

        avatar: `${CDN}/persona2amis-150x150.png`,

        demographics: {

          age: "47 años",

          education: "Lic. en Administración",

          residence: "Guadalajara",

          family: "Casado, 3 hijos",

          occupation: "Agente independiente",

        },

        bio: "Daniel gestiona la cartera de más de 200 clientes y necesita responder rápido para retener renovaciones.",

        goals: "Ver el estatus de sus clientes, vencimientos y siniestros activos en un solo lugar.",

        frustrations: "Tener que entrar a varios sistemas para responder una sola consulta.",

      },

    ],

    insights: [

      {

        title: "Insight 1 — Autoservicio claro",

        text: "Los asegurados quieren resolver dudas y trámites simples sin hablar con un agente; el lenguaje y la jerarquía visual son la barrera principal.",

      },

      {

        title: "Insight 2 — Vista 360 del agente",

        text: "Los agentes necesitan una vista consolidada de cartera, vencimientos y siniestros para priorizar su día.",

      },

    ],

    wireframe: `${CDN}/wireframes-amis.jpg`,

    userflow: `${CDN}/userflowamis.jpg`,

    hifi: `${CDN}/prototipoHIFIamis.jpg`,

    features: [

      {

        title: "Mis pólizas",

        image: `${CDN}/pantallas-inicio-amis-lista-productos.jpg`,

        points: [

          "Resumen visual de coberturas, vigencia y pagos.",

          "Descarga de carátula y certificados al instante.",

        ],

      },

      {

        title: "Inicio personalizado",

        image: `${CDN}/pantallas-inicio-amis-destacado-copy.jpg`,

        points: [

          "Home con accesos directos a las acciones más usadas por cada perfil.",

          "Notificaciones contextuales por póliza, pago y siniestro.",

        ],

      },

      {

        title: "Centro de ayuda",

        image: `${CDN}/pantallasFAQ-destacado-amis.jpg`,

        points: [

          "FAQ inteligente que resuelve las dudas más frecuentes sin pasar por call center.",

          "Escalamiento directo a chat con el agente cuando se necesita.",

        ],

      },

      {

        title: "Portal del agente",

        points: [

          "Tablero con cartera, renovaciones próximas y siniestros activos.",

          "Chat directo con cada cliente desde la misma app.",

        ],

      },

    ],

    closingImage: `${CDN}/footeramis1.jpg`,

    conclusions: [

      "Centralizar pólizas, pagos y siniestros redujo significativamente la carga del call center.",

      "El portal del agente convirtió la app en una herramienta comercial, no solo de servicio.",

      "El sistema de UI escala a nuevos ramos de seguros sin rediseñar la experiencia base.",

    ],

    externalRef:

      "https://juliocardona.net/portfolio/amis-app-dedicada-para-administracion-y-gestion-de-seguros/",

  },

];

export const uxBySlug = (slug: string) => uxProjects.find((p) => p.slug === slug);