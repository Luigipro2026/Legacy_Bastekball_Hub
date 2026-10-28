(() => {
    const staticRoot = '../Static';
    const assetPath = (value) => {
        if (!value) return value;
        const path = String(value).trim();
        if (/^https?:\/\//i.test(path) || path.startsWith('data:') || path.startsWith('../') || path.startsWith('/')) {
            return path;
        }
        if (path.startsWith('imagenes/')) {
            return `${staticRoot}/Img/${path.replace(/^imagenes\//, '')}`;
        }
        if (path.startsWith('Imagenes de fondo/')) {
            return `${staticRoot}/${path}`;
        }
        if (path.startsWith('conoce imagenes/')) {
            return `${staticRoot}/${path}`;
        }
        if (path.startsWith('imagenes Minicarrusel/')) {
            return `${staticRoot}/${path}`;
        }
        return `${staticRoot}/Img/${path}`;
    };

    // Encapsula los datos para no crear variables globales, salvo el catálogo publicado al final.
    // El identificador aumenta al crear cada producto y permite encontrarlo desde las otras páginas.
    let nextId = 1;

    // Descripciones mostradas en las tarjetas y en la página de detalle.
    // Se buscan por nombre; si falta una descripción, createProduct genera un texto genérico.
    const productDescriptions = {
        'Muñequeras': 'Muñequeras elasticas para dar soporte a la muñeca y absorber el sudor durante el juego.',
        'Rodilleras': 'Rodilleras deportivas para proteger la articulacion durante entrenamientos y partidos.',
        'Coderas': 'Coderas acolchadas que ayudan a proteger el brazo en entrenamientos intensos.',
        'Tobilleras': 'Tobilleras deportivas con ajuste firme para aportar estabilidad en los cambios de direccion.',
        'Medias': 'Medias deportivas transpirables para mantener los pies comodos dentro de la zapatilla.',
        'Gorra': 'Gorra deportiva ligera para proteger del sol antes, durante y despues de entrenar.',
        'Cinta para cabeza': 'Cinta elastica para mantener el cabello controlado y absorber el sudor.',
        'Cinta para dedos': 'Cinta protectora para los dedos, util para mejorar el agarre y reducir rozaduras.',
        'Mochila': 'Mochila deportiva con espacio para llevar ropa, accesorios y material de entrenamiento.',
        'Guantes': 'Guantes deportivos que protegen las manos y mejoran el agarre durante la actividad fisica.',
        'Mangas de brazo': 'Mangas elasticas de compresion para favorecer la comodidad y proteger los brazos.',
        'Botella': 'Botella reutilizable para mantener la hidratacion durante los entrenamientos y partidos.',
        'Toalla': 'Toalla deportiva compacta para secar el sudor durante la practica.',
        'Rodillera compresiva': 'Rodillera de compresion para aportar sujecion y comodidad durante el movimiento.',
        'Bolso deportivo': 'Bolso amplio para transportar zapatillas, ropa y accesorios de baloncesto.',

        'Balón adulto R100 talla 7': 'Balon naranja R100 de talla 7 para jugadores adultos y entrenamientos generales.',
        'Balón adulto BT100 talla 7': 'Balon naranja BT100 de talla 7 para practicar y jugar en cancha.',
        'Balón exterior Resist talla 7': 'Balon talla 7 resistente para jugar al aire libre en superficies exteriores.',
        'Balón Wilson NBA DRV': 'Balon Wilson NBA DRV talla 7 con superficie pensada para el control en cancha.',
        'Balón Wilson 3x3 Replica': 'Replica Wilson para partidas 3x3, con tamano practico para juego rapido.',
        'Balón Golty Latir No.7': 'Balon profesional Golty Latir numero 7 para entrenamientos y partidos competitivos.',
        'Balón clásico Z6004': 'Balon clasico Z6004 para iniciarse, entrenar fundamentos y jugar en equipo.',
        'Balones NBA Wilson tamaño 7': 'Balon Wilson NBA de tamano 7 para entrenamiento y partidos de baloncesto.',
        'Balón Wilson NBA All Team Retro': 'Balon Wilson NBA All Team Retro con diseno inspirado en los equipos de la liga.',
        'Balón Wilson Graffiti Warriors': 'Balon Wilson Graffiti con diseno de Golden State Warriors para jugar con estilo.',
        'Balón Wilson Graffiti Lakers': 'Balon Wilson Graffiti con diseno de Los Angeles Lakers para cancha y coleccion.',
        'Balón Wilson Tribute Miami Heat': 'Balon Wilson Tribute inspirado en Miami Heat, talla 7 para aficionados y jugadores.',
        'Balón Wilson Tribute Chicago Bulls': 'Balon Wilson Tribute inspirado en Chicago Bulls, talla 7 para jugar o coleccionar.',
        'Balón Wilson Graffiti Chicago Bulls': 'Balon Wilson Graffiti con diseno de Chicago Bulls para entrenar y jugar.',
        'Balón Wilson NBA All Team': 'Balon Wilson NBA All Team talla 7 para uso recreativo y entrenamiento.',

        'Lakers': 'Camiseta de los Lakers para representar al equipo dentro y fuera de la cancha.',
        'Warriors': 'Camiseta de los Warriors con estilo de aficionado para partidos y uso diario.',
        'Celtics': 'Camiseta de los Celtics para entrenar, animar al equipo y completar tu coleccion.',
        'Heat': 'Camiseta del Heat con diseno del equipo para aficionados del baloncesto.',
        'Nets': 'Camiseta de los Nets, comoda para usar en la cancha o en el dia a dia.',
        'Knicks': 'Camiseta de los Knicks para mostrar los colores del equipo en cualquier ocasion.',
        'Nuggets': 'Camiseta de los Nuggets con identidad del equipo y ajuste comodo.',
        'Suns': 'Camiseta de los Suns para aficionados que buscan representar a su equipo.',
        'Thunder': 'Camiseta del Thunder, ligera y practica para apoyar al equipo.',
        'Spurs': 'Camiseta de los Spurs para llevar los colores del equipo dentro y fuera de la cancha.',
        'Clippers': 'Camiseta de los Clippers para completar tu equipacion de aficionado.',
        'Mavericks': 'Camiseta de los Mavericks para entrenar o llevar el orgullo del equipo.',
        'Bulls': 'Camiseta de los Bulls con el estilo clasico del equipo para aficionados.',
        'Bucks': 'Camiseta de los Bucks para representar al equipo durante el juego o el tiempo libre.',
        '76ers': 'Camiseta de los 76ers para aficionados y jugadores que buscan un estilo de equipo.',

        'Nike LeBron 22': 'Zapatillas Nike LeBron 22 para potencia, soporte y respuesta en movimientos explosivos.',
        'Jordan Luka 4': 'Zapatillas Jordan Luka 4 pensadas para cambios de ritmo, control y creacion de juego.',
        'Adidas Harden Vol 9': 'Zapatillas Adidas Harden Vol 9 para movimientos laterales y juego ofensivo.',
        'Nike KD 18': 'Zapatillas Nike KD 18 con amortiguacion y soporte para jugar en ambos lados de la cancha.',
        'Under Armour Curry 12': 'Zapatillas Under Armour Curry 12 para agilidad, traccion y tiros en movimiento.',
        'Jordan Tatum 3': 'Zapatillas Jordan Tatum 3 para estabilidad y comodidad durante ataques y lanzamientos.',
        'Adidas Dame 9': 'Zapatillas Adidas Dame 9 para jugadores que necesitan ligereza y respuesta rapida.',
        'Nike Giannis Immortality 4': 'Zapatillas Nike Giannis Immortality 4 para aceleraciones y cambios de direccion.',
        'Puma All Pro Nitro': 'Zapatillas Puma All Pro Nitro con amortiguacion reactiva para jugar a alto ritmo.',
        'New Balance TWO WXY V5': 'Zapatillas New Balance TWO WXY V5 para soporte multidireccional y comodidad.',
        'Nike GT Cut 3': 'Zapatillas Nike GT Cut 3 para cortes rapidos, traccion y movimientos explosivos.',
        'Adidas D.O.N. Issue 6': 'Zapatillas Adidas D.O.N. Issue 6 para velocidad, estabilidad y juego dinamico.',
        'Jordan Zion 4': 'Zapatillas Jordan Zion 4 para potencia, aterrizajes estables y juego cerca del aro.',
        'ANTA Kai 1': 'Zapatillas ANTA Kai 1 para control, soporte y cambios de direccion en cancha.',
        'Nike Book 1': 'Zapatillas Nike Book 1 con perfil comodo para tiro, control y juego completo.'
    };

    // Precios base en pesos colombianos. Las páginas convierten estos valores al formato elegido.
    const jerseyPrices = {
        Lakers: 349000,
        Warriors: 299000,
        Celtics: 299000,
        Heat: 349000,
        Nets: 279000,
        Knicks: 299000,
        Nuggets: 279000,
        Suns: 279000,
        Thunder: 279000,
        Spurs: 279000,
        Clippers: 279000,
        Mavericks: 299000,
        Bulls: 349000,
        Bucks: 279000,
        '76ers': 299000
    };

    // Tabla separada para poder actualizar los precios de zapatillas sin cambiar la estructura del catálogo.
    const shoePrices = {
        'Nike LeBron 22': 1199000,
        'Jordan Luka 4': 1099000,
        'Adidas Harden Vol 9': 999000,
        'Nike KD 18': 1149000,
        'Under Armour Curry 12': 899000,
        'Jordan Tatum 3': 999000,
        'Adidas Dame 9': 799000,
        'Nike Giannis Immortality 4': 699000,
        'Puma All Pro Nitro': 849000,
        'New Balance TWO WXY V5': 899000,
        'Nike GT Cut 3': 1199000,
        'Adidas D.O.N. Issue 6': 849000,
        'Jordan Zion 4': 1099000,
        'ANTA Kai 1': 749000,
        'Nike Book 1': 999000
    };

    // Construye el objeto que consumen las páginas: identidad, categoría, precio, descripción e imágenes.
    // Las rutas siguen la convención "imagenes/categoría/carpeta/carpeta número.extensión".
    function createProduct(category, name, folder, extension, price, discount = 0) {
        const base = `${staticRoot}/Img/${category}/${folder}/${folder}`;
        return {
            id: nextId++,
            name,
            category,
            price,
            discount,
            desc: productDescriptions[name] || `${name} deportivo para entrenar y disfrutar el baloncesto con comodidad.`,
            images: [`${base} 1.${extension}`, `${base} 2.${extension}`, `${base} 3.${extension}`]
        };
    }

    // Catálogo maestro compartido por inicio, listado, ofertas y detalle; cada elemento recibe un id único.
    const products = [
        // Accesorios: la mayoría usa las tres rutas generadas por createProduct.
        createProduct('Accesorios', 'Muñequeras', 'Muñequeras', 'webp', 60000, 10),
        createProduct('Accesorios', 'Rodilleras', 'Rodilleras', 'jpeg', 110000),
        createProduct('Accesorios', 'Coderas', 'Coderas', 'webp', 90000),
        createProduct('Accesorios', 'Tobilleras', 'Tobilleras', 'jpg', 65000),
        createProduct('Accesorios', 'Medias', 'Medias', 'webp', 45000),
        createProduct('Accesorios', 'Gorra', 'Gorra', 'avif', 75000, 15),
        createProduct('Accesorios', 'Cinta para cabeza', 'Cinta para cabeza', 'jpg', 35000),
        // Estos dos artículos usan nombres/extensiones de imagen distintos a la convención automática.
        { ...createProduct('Accesorios', 'Cinta para dedos', 'Cinta para dedos', 'avif', 30000), images: [`${staticRoot}/Img/Accesorios/Cinta para dedos/Cinta para dedos 1.png`, `${staticRoot}/Img/Accesorios/Cinta para dedos/Cinta para dedos 2.avif`, `${staticRoot}/Img/Accesorios/Cinta para dedos/Cinta para dedos 3.avif`] },
        createProduct('Accesorios', 'Mochila', 'Mochila', 'avif', 180000),
        createProduct('Accesorios', 'Guantes', 'Guantes', 'webp', 80000),
        { ...createProduct('Accesorios', 'Mangas de brazo', 'Mangas de brazo', 'webp', 95000), images: [`${staticRoot}/Img/Accesorios/Mangas de brazo/Mangas de brazo 1.webp`, `${staticRoot}/Img/Accesorios/Mangas de brazo/Mangas de brazo 2.webp`, `${staticRoot}/Img/Accesorios/Mangas de brazo/Mangas de brazo 3.webp`] },
        createProduct('Accesorios', 'Botella', 'Botella', 'avif', 55000),
        createProduct('Accesorios', 'Toalla', 'Toalla', 'webp', 50000),
        createProduct('Accesorios', 'Rodillera compresiva', 'Rodillera compresiva', 'jpg', 120000),
        createProduct('Accesorios', 'Bolso deportivo', 'Bolso deportivo', 'avif', 160000),

        // Balones: los objetos especiales sustituyen las rutas generadas porque los archivos reales tienen otros nombres.
        { ...createProduct('Balones', 'Balón adulto R100 talla 7', 'Balón de baloncesto adulto R100 talla 7 para niño y adulto naranja', 'webp', 229000), images: [`${staticRoot}/Img/Balones/Balón de baloncesto adulto R100 talla 7 para niño y adulto naranja/Balón adulto R100 talla 7 1.avif`, `${staticRoot}/Img/Balones/Balón de baloncesto adulto R100 talla 7 para niño y adulto naranja/Balón adulto R100 talla 7 2.avif`, `${staticRoot}/Img/Balones/Balón de baloncesto adulto R100 talla 7 para niño y adulto naranja/Balón adulto R100 talla 7 3.avif`] },
        { ...createProduct('Balones', 'Balón adulto BT100 talla 7', 'Balón de baloncesto para Adulto talla 7 BT100 Naranja', 'webp', 249000), images: [`${staticRoot}/Img/Balones/Balón de baloncesto para Adulto talla 7 BT100 Naranja/Balón adulto BT100 talla 7 1.avif`, `${staticRoot}/Img/Balones/Balón de baloncesto para Adulto talla 7 BT100 Naranja/Balón adulto BT100 talla 7 2.avif`, `${staticRoot}/Img/Balones/Balón de baloncesto para Adulto talla 7 BT100 Naranja/Balón adulto BT100 talla 7 3.avif`] },
        { ...createProduct('Balones', 'Balón exterior Resist talla 7', 'Balón de baloncesto exterior versátil talla 7 chico  hombre, Resist negro', 'webp', 279000), images: [`${staticRoot}/Img/Balones/Balón de baloncesto exterior versátil talla 7 chico  hombre, Resist negro/Balón exterior Resist talla 7 1.avif`, `${staticRoot}/Img/Balones/Balón de baloncesto exterior versátil talla 7 chico  hombre, Resist negro/Balón exterior Resist talla 7 2.avif`, `${staticRoot}/Img/Balones/Balón de baloncesto exterior versátil talla 7 chico  hombre, Resist negro/Balón exterior Resist talla 7 3.avif`] },

        { ...createProduct('Balones', 'Balón Wilson NBA DRV', 'Balón de Basket Wilson NBA DRV (NO.7)', 'jpg', 289000), images: [`${staticRoot}/Img/Balones/Balón de Basket Wilson NBA DRV (NO.7)/Balón de Basket Wilson NBA DRV (NO.7) 1.jpg`, `${staticRoot}/Img/Balones/Balón de Basket Wilson NBA DRV (NO.7)/Balón de Basket Wilson NBA DRV (NO.7) 2.jpg`, `${staticRoot}/Img/Balones/Balón de Basket Wilson NBA DRV (NO.7)/Balón de Basket Wilson NBA DRV (NO.7) 3.jpg`] },
        { ...createProduct('Balones', 'Balón Wilson 3x3 Replica', 'Balon De Baloncesto Para Juego 3x3 Replica Wilson', 'webp', 219000), images: [`${staticRoot}/Img/Balones/Balon De Baloncesto Para Juego 3x3 Replica Wilson/Balon De Baloncesto Para Juego 3x3 Replica Wilson 1.webp`, `${staticRoot}/Img/Balones/Balon De Baloncesto Para Juego 3x3 Replica Wilson/Balon De Baloncesto Para Juego 3x3 Replica Wilson 2.webp`, `${staticRoot}/Img/Balones/Balon De Baloncesto Para Juego 3x3 Replica Wilson/Balon De Baloncesto Para Juego 3x3 Replica Wilson 3.webp`] },
        { ...createProduct('Balones', 'Balón Golty Latir No.7', 'Balón de Baloncesto Profesional Golty Latir No.7', 'webp', 319000), images: [`${staticRoot}/Img/Balones/Balón de Baloncesto Profesional Golty Latir No.7/Balón de Baloncesto Profesional Golty Latir No.7 1.webp`, `${staticRoot}/Img/Balones/Balón de Baloncesto Profesional Golty Latir No.7/Balón de Baloncesto Profesional Golty Latir No.7 2.webp`, `${staticRoot}/Img/Balones/Balón de Baloncesto Profesional Golty Latir No.7/Balón de Baloncesto Profesional Golty Latir No.7 3.webp`] },
        createProduct('Balones', 'Balón clásico Z6004', 'BALON BASKETBALL CLASICO NO. 3 ZOOM Z6004', 'webp', 179000),
        createProduct('Balones', 'Balones NBA Wilson tamaño 7', 'Balones de baloncesto NBA Wilson tamaño 7-295', 'webp', 329000),
        { ...createProduct('Balones', 'Balón Wilson NBA All Team Retro', 'Balones de baloncesto NBA Wilson tamaño 7-295', 'jpg', 349000), images: [`${staticRoot}/Img/Balones/Balones de baloncesto NBA Wilson tamaño 7-295/Balon de Baloncesto Wilson NBA All Team Retro NO. 7 1.jpg`, `${staticRoot}/Img/Balones/Balones de baloncesto NBA Wilson tamaño 7-295/Balon de Baloncesto Wilson NBA All Team Retro NO. 7 2.jpg`, `${staticRoot}/Img/Balones/Balones de baloncesto NBA Wilson tamaño 7-295/Balon de Baloncesto Wilson NBA All Team Retro NO. 7 3.jpg`] },
        createProduct('Balones', 'Balón Wilson Graffiti Warriors', 'Balón de Basket Wilson NBA Graffiti GS Warriors NO.7', 'jpg', 319000),
        createProduct('Balones', 'Balón Wilson Graffiti Lakers', 'Balón de Basket Wilson NBA Graffiti LA Lakers NO.7', 'jpg', 319000),
        { ...createProduct('Balones', 'Balón Wilson Tribute Miami Heat', 'Balon de Baloncesto Wilson NBA Tribute Miami Heat (NO.7)', 'png', 359000), images: [`${staticRoot}/Img/Balones/Balon de Baloncesto Wilson NBA Tribute Miami Heat (NO.7)/Balon de Baloncesto Wilson NBA Tribute Miami Heat (NO.7) 1.png`, `${staticRoot}/Img/Balones/Balon de Baloncesto Wilson NBA Tribute Miami Heat (NO.7)/Balon de Baloncesto Wilson NBA Tribute Miami Heat (NO.7) 2.png`, `${staticRoot}/Img/Balones/Balon de Baloncesto Wilson NBA Tribute Miami Heat (NO.7)/Balon de Baloncesto Wilson NBA Tribute Miami Heat (NO.7) 3.webp`] },
        { ...createProduct('Balones', 'Balón Wilson Tribute Chicago Bulls', 'Balon de Baloncesto Wilson NBA Tribute Chicago Bulls (NO.7)', 'png', 359000), images: [`${staticRoot}/Img/Balones/Balon de Baloncesto Wilson NBA Tribute Chicago Bulls (NO.7)/Balon de Baloncesto Wilson NBA Tribute Chicago Bulls (NO.7) 1.png`, `${staticRoot}/Img/Balones/Balon de Baloncesto Wilson NBA Tribute Chicago Bulls (NO.7)/Balon de Baloncesto Wilson NBA Tribute Chicago Bulls (NO.7) 2.png`, `${staticRoot}/Img/Balones/Balon de Baloncesto Wilson NBA Tribute Chicago Bulls (NO.7)/Balon de Baloncesto Wilson NBA Tribute Chicago Bulls (NO.7) 3.webp`] },
        createProduct('Balones', 'Balón Wilson Graffiti Chicago Bulls', 'Balón de Basket Wilson NBA Graffiti Chicago Bulls NO.7', 'jpg', 319000),
        createProduct('Balones', 'Balón Wilson NBA All Team', 'balon de Baloncesto Wilson NBA All Team NO.7', 'jpg', 329000),

        // Camisetas: map crea una ficha por equipo usando la tabla de precios; Lakers tiene descuento inicial.
        ...['Lakers', 'Warriors', 'Celtics', 'Heat', 'Nets', 'Knicks', 'Nuggets', 'Suns', 'Thunder', 'Spurs', 'Clippers', 'Mavericks'].map((name) => createProduct('Camisetas', name, name, 'avif', jerseyPrices[name], name === 'Lakers' ? 10 : 0)),
        { ...createProduct('Camisetas', 'Bulls', 'Bulls', 'webp', jerseyPrices.Bulls), images: [`${staticRoot}/Img/Camisetas/Bulls/Bulls 1.webp`, `${staticRoot}/Img/Camisetas/Bulls/Bulls 2.webp`, `${staticRoot}/Img/Camisetas/Bulls/Bulls 3.webp`] },
        { ...createProduct('Camisetas', 'Bucks', 'Bucks', 'webp', jerseyPrices.Bucks), images: [`${staticRoot}/Img/Camisetas/Bucks/Bucks 1.webp`, `${staticRoot}/Img/Camisetas/Bucks/Bucks 2.webp`, `${staticRoot}/Img/Camisetas/Bucks/Bucks 3.webp`] },
        { ...createProduct('Camisetas', '76ers', '76ers', 'webp', jerseyPrices['76ers']), images: [`${staticRoot}/Img/Camisetas/76ers/76ers 1.webp`, `${staticRoot}/Img/Camisetas/76ers/76ers 2.webp`, `${staticRoot}/Img/Camisetas/76ers/76ers 3.webp`] },

        // Zapatillas: cada par contiene el nombre y extensión de sus archivos; LeBron 22 sale con descuento.
        ...[
            ['Nike LeBron 22', 'webp'], ['Jordan Luka 4', 'webp'], ['Adidas Harden Vol 9', 'webp'], ['Nike KD 18', 'jpg'], ['Under Armour Curry 12', 'webp'], ['Jordan Tatum 3', 'webp'], ['Adidas Dame 9', 'webp'], ['Nike Giannis Immortality 4', 'webp'], ['Puma All Pro Nitro', 'webp'], ['New Balance TWO WXY V5', 'webp'], ['Nike GT Cut 3', 'webp'], ['Adidas D.O.N. Issue 6', 'webp'], ['Jordan Zion 4', 'webp'], ['ANTA Kai 1', 'webp'], ['Nike Book 1', 'webp']
        ].map(([name, extension]) => createProduct('Zapatos', name, name, extension, shoePrices[name], name === 'Nike LeBron 22' ? 15 : 0))
    ];

    // Publica una única referencia global para que los scripts de cada página usen los mismos productos e ids.
    window.realProducts = products;
})();
