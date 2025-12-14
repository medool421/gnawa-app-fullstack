# 🎭 La Grande Soirée Gnawa - Backend API

API REST pour la gestion d'événements culturels Gnawa à Agadir.

## 🚀 Technologies

- **Node.js** + **Express.js**
- **PostgreSQL** + **Sequelize ORM**
- **CORS** - Sécurité cross-origin
- **dotenv** - Variables d'environnement

## 📦 Installation
```bash
# Cloner le repo
git clone <votre-repo>
cd backend

# Installer les dépendances
npm install

# Configurer .env
cp .env.example .env
# Éditer .env avec vos credentials PostgreSQL

# Créer la base de données
createdb gnawa_event_db

# Seed la base
npm run seed
```

## 🎯 Scripts
```bash
npm start          # Démarre le serveur
npm run dev        # Mode développement (nodemon)
npm run seed       # Remplit la base avec des données
```

## 📡 Endpoints API

### Event
- `GET /api/event` - Info de l'événement + artistes

### Artists
- `GET /api/artists?page=1&limit=10&search=maalem` - Liste paginée
- `GET /api/artists/:id` - Détails d'un artiste

### Bookings
- `POST /api/bookings` - Créer une réservation
- `GET /api/bookings/email/:email` - Réservations par email
- `GET /api/bookings/:code` - Réservation par code
- `DELETE /api/bookings/:code` - Annuler une réservation
- `GET /api/bookings?search=ahmed` - Toutes les réservations (admin)

## 📊 Modèle de Données
```
Event (event_info)
├── id
├── title
├── date
├── location
├── description
└── banner_url

Artist (artists)
├── id
├── name
├── bio
├── image_url
├── performance_time
└── event_id → Event

Booking (bookings)
├── id
├── name
├── email
├── phone
├── tickets_count
├── confirmation_code (auto-généré)
└── event_id → Event
```

## 🔒 Sécurité

- Validation des entrées
- Gestion des erreurs centralisée
- CORS configuré
- Requêtes SQL paramétrées (Sequelize ORM)

## 📝 Exemple de Requête
```bash
# Créer une réservation
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ahmed El Mansouri",
    "email": "ahmed@example.com",
    "phone": "+212612345678",
    "tickets_count": 2,
    "event_id": 1
  }'

# Réponse
{
  "success": true,
  "data": { ... },
  "message": "Booking confirmed! Your code: ABC12345"
}
```