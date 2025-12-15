require('dotenv').config();
const sequelize = require('../src/config/database');
const { Event, Artist, Booking } = require('../src/models');


 async function seed () {
  try {
    console.log('Starting database seeding...');

    // Sync database (force: true efface et recrée les tables)
    await sequelize.sync({ force: true });
    console.log('Database synced');

    // Créer l'événement
    console.log('Creating event...');
    const event = await Event.create({
      title: 'La Grande Soirée Gnawa',
      date: '2025-12-20',
      location: 'Place Al Amal, Agadir, Morocco',
      description: 'Une soirée exceptionnelle célébrant le riche patrimoine musical Gnawa. Venez découvrir des maîtres Gnawa reconnus internationalement et plonger dans cette tradition ancestrale qui allie spiritualité, rythmes envoûtants et chants sacrés. Une expérience musicale unique sous les étoiles d\'Agadir.',
      banner_url: 'https://legueulard.fr/web/wp-content/uploads/2020/02/13.03.20.20h30-min.jpg'
    });
    console.log('Event created with ID:', event.id);
    
    // Créer les artistes
    console.log('Creating artists...');
    const artists = await Artist.bulkCreate([
      {
        name: 'Maâlem Hassan Boussou',
        bio: 'Maître Gnawa de renommée internationale, Hassan Boussou perpétue la tradition Gnawa avec passion et authenticité. Virtuose du guembri, il a su faire rayonner la culture Gnawa au-delà des frontières du Maroc.',
        image_url: 'https://mawazine.ma/wp-content/uploads/2018/04/HAssan-boussou.jpg',
        performance_time: '20:00:00',
        event_id: event.id
      },
      {
        name: 'Maâlem Hamid El Kasri',
        bio: 'Figure emblématique de la musique Gnawa, Hamid El Kasri mêle tradition et modernité dans ses performances captivantes. Son style unique a influencé toute une génération de musiciens.',
        image_url: 'https://mawazine.ma/wp-content/uploads/2019/05/Ph-MAALEM-HAMID-EL-KASRI-GUESTS.jpg',
        performance_time: '21:30:00',
        event_id: event.id
      },
      {
        name: 'Maâlem Mustapha Baqbou',
        bio: 'Maître légendaire de la tradition Gnawa de Marrakech, Mustapha Baqbou a formé des générations de musiciens. Son guembri résonne avec la sagesse de décennies d\'expérience spirituelle et musicale.',
        image_url: 'https://www.festival-gnaoua.net/wp-content/uploads/2024/03/Maalem-Mustapha-Baqbou-Photo-4--scaled.jpg',
        performance_time: '19:15:00',
        event_id: event.id
      },
      {
        name: 'Maalem Abdelkebir Merchane',
        bio: 'Virtuose du guembri, Abdelkebir Merchane transmet l\'héritage Gnawa avec une énergie incomparable. Ses performances hypnotiques transportent le public dans un voyage spirituel intense.',
        image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-gGRXCmeQE-2z3U2pRiYOvwWhRpcXCKUHbw&s',
        performance_time: '23:00:00',
        event_id: event.id
      },
      {
        name: 'Maâlem Mahmoud Guinea',
        bio: 'Icône vivante de la musique Gnawa, Mahmoud Guinea a consacré sa vie à préserver et enrichir cet art ancestral. Son jeu subtil et profond émeut les audiences du monde entier.',
        image_url: 'https://aujourdhui.ma/wp-content/uploads/2016/02/402785483.jpg',
        performance_time: '20:45:00',
        event_id: event.id
      },
      {
        name: 'Maalem Said Oughessal',
        bio: 'Gardien de la tradition orale Gnawa, Said Oughessal possède un répertoire impressionnant de chants sacrés. Sa voix puissante et son charisme scénique captivent tous les publics.',
        image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtNcGcF1zUODAOQo1M3brESYiyWXbe2YXWCg&s',
        performance_time: '22:15:00',
        event_id: event.id
      },
      {
        name: 'Gnawa Njoum Experience',
        bio: 'Collectif de jeunes musiciens Gnawa qui réinventent la tradition avec une touche contemporaine. Leur fusion audacieuse entre sons traditionnels et influences modernes crée une atmosphère unique.',
        image_url: 'https://i0.wp.com/worldmusiccentral.org/wp-content/uploads/Gnawa_Njoum_Boom.jpg?fit=250%2C249&ssl=1',
        performance_time: '19:00:00',
        event_id: event.id
      },
      {
        name: 'Maâlem Houssam Guinia',
        bio: 'Fils spirituel de la tradition Gnawa, Houssam Guinia porte fièrement l\'héritage de ses maîtres. Sa maîtrise technique et sa présence scénique en font l\'un des artistes les plus prometteurs de sa génération.',
        image_url: 'https://i.ytimg.com/vi/w38yZy9DGSE/maxresdefault.jpg',
        performance_time: '21:00:00',
        event_id: event.id
      },
      {
        name: 'Maâlem Abdellah El Gourd',
        bio: 'Virtuose du guembri originaire de Casablanca, Abdellah El Gourd enchante les foules avec son style énergique. Il a participé à de nombreux festivals internationaux et collaboré avec des artistes de jazz.',
        image_url: 'https://mawazine.ma/wp-content/uploads/2019/05/Ph-MAALEM-HAMID-EL-KASRI-GUESTS.jpg',
        performance_time: '19:45:00',
        event_id: event.id
      },
      {
        name: 'Maâlem Abdenbi El Gadari',
        bio: 'Gardien des rituels Gnawa authentiques, Abdenbi El Gadari perpétue les cérémonies de lila avec un profond respect des traditions ancestrales. Sa présence scénique est magnétique et spirituelle.',
        image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-gGRXCmeQE-2z3U2pRiYOvwWhRpcXCKUHbw&s',
        performance_time: '20:15:00',
        event_id: event.id
      },

      {
        name: 'Maâlem Omar Hayat',
        bio: 'Maître Gnawa de Fès, Omar Hayat est reconnu pour sa voix profonde et envoûtante. Il incarne la tradition Gnawa du nord du Maroc avec une authenticité remarquable.',
        image_url: 'https://www.festival-gnaoua.net/wp-content/uploads/2025/05/Maalem-Omar-hayat-1024x760.jpg',
        performance_time: '21:15:00',
        event_id: event.id
      },
      {
        name: 'Les Daqqa de Marrakech',
        bio: 'Ensemble spécialisé dans les percussions traditionnelles Gnawa, les Daqqa de Marrakech créent des polyrythmes hypnotiques. Leur maîtrise des qarqabous est absolument exceptionnelle.',
        image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX90AfgHJDvwxlwdORZ1I-mxm10za6jY3FDA&s',
        performance_time: '21:45:00',
        event_id: event.id
      },
      {
        name: 'Maâlem Rachid Zeroual',
        bio: 'Jeune prodige du guembri, Rachid Zeroual représente la nouvelle génération de maîtres Gnawa. Son énergie débordante et sa technique impeccable impressionnent les connaisseurs.',
        image_url: 'https://www.festival-gnaoua.net/wp-content/uploads/2025/05/Maalem-Majid-Bekkas-1-1.jpg',
        performance_time: '22:00:00',
        event_id: event.id
      },
      {
        name: 'Maâlem Sadiq Bel Abbès',
        bio: 'Originaire de Meknès, Sadiq Bel Abbès est un maître respecté qui a préservé les chants Gnawa les plus rares. Son répertoire inclut des pièces que peu de musiciens connaissent encore.',
        image_url: 'https://i.ytimg.com/vi/SPNb_OwjJAM/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGHIgRigsMA8=&rs=AOn4CLANF4_4qs-e8qdLCosHWq-VP9z5Jw',
        performance_time: '22:30:00',
        event_id: event.id
      }
    ]);
    console.log(`${artists.length} artists created`);

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

// Exécuter le seed
seed();