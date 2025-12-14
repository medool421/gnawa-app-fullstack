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
      banner_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800'
    });
    console.log('Event created with ID:', event.id);

    // Créer les artistes
    console.log('Creating artists...');
    const artists = await Artist.bulkCreate([
      {
        name: 'Maâlem Hassan Boussou',
        bio: 'Maître Gnawa de renommée internationale, Hassan Boussou perpétue la tradition Gnawa avec passion et authenticité. Virtuose du guembri, il a su faire rayonner la culture Gnawa au-delà des frontières du Maroc.',
        image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400',
        performance_time: '20:00:00',
        event_id: event.id
      },
      {
        name: 'Maâlem Hamid El Kasri',
        bio: 'Figure emblématique de la musique Gnawa, Hamid El Kasri mêle tradition et modernité dans ses performances captivantes. Son style unique a influencé toute une génération de musiciens.',
        image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
        performance_time: '21:30:00',
        event_id: event.id
      },
      {
        name: 'Maalem Abdelkebir Merchane',
        bio: 'Virtuose du guembri, Abdelkebir Merchane transmet l\'héritage Gnawa avec une énergie incomparable. Ses performances hypnotiques transportent le public dans un voyage spirituel intense.',
        image_url: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400',
        performance_time: '23:00:00',
        event_id: event.id
      },
      {
        name: 'Maâlem Mahmoud Guinea',
        bio: 'Icône vivante de la musique Gnawa, Mahmoud Guinea a consacré sa vie à préserver et enrichir cet art ancestral. Son jeu subtil et profond émeut les audiences du monde entier.',
        image_url: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=400',
        performance_time: '20:45:00',
        event_id: event.id
      },
      {
        name: 'Maalem Said Oughessal',
        bio: 'Gardien de la tradition orale Gnawa, Said Oughessal possède un répertoire impressionnant de chants sacrés. Sa voix puissante et son charisme scénique captivent tous les publics.',
        image_url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400',
        performance_time: '22:15:00',
        event_id: event.id
      },
      {
        name: 'Gnawa Njoum Experience',
        bio: 'Collectif de jeunes musiciens Gnawa qui réinventent la tradition avec une touche contemporaine. Leur fusion audacieuse entre sons traditionnels et influences modernes crée une atmosphère unique.',
        image_url: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400',
        performance_time: '19:00:00',
        event_id: event.id
      },
      {
        name: 'Maâlem Houssam Guinia',
        bio: 'Fils spirituel de la tradition Gnawa, Houssam Guinia porte fièrement l\'héritage de ses maîtres. Sa maîtrise technique et sa présence scénique en font l\'un des artistes les plus prometteurs de sa génération.',
        image_url: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400',
        performance_time: '21:00:00',
        event_id: event.id
      },
      {
        name: 'Les Maîtres du Guembri',
        bio: 'Ensemble de maîtres Gnawa réunis pour célébrer la richesse des rythmes et chants traditionnels. Leur synergie sur scène crée une expérience musicale transcendantale.',
        image_url: 'https://images.unsplash.com/photo-1598387846573-bfb8edec5433?w=400',
        performance_time: '22:45:00',
        event_id: event.id
      },
      {
        name: 'Maâlem Aziz Arradi',
        bio: 'Musicien accompli et pédagogue passionné, Aziz Arradi se consacre à la transmission de la culture Gnawa aux nouvelles générations. Son approche innovante respecte profondément la tradition.',
        image_url: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?w=400',
        performance_time: '19:30:00',
        event_id: event.id
      },
      {
        name: 'Troupe Gnawa d\'Essaouira',
        bio: 'Ambassadeurs de la ville d\'Essaouira, berceau du Gnawa, cette troupe perpétue l\'authenticité des cérémonies traditionnelles. Leur performance est un voyage dans le temps et l\'espace.',
        image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        performance_time: '23:30:00',
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