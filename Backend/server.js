import express from 'express';
import cors from 'cors';
import db from './db.js';

const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Test de base
app.get('/', (req, res) => {
  res.send("Serveur Backend opérationnel");
});

// Route pour Créer un laboratoire (Besoin Admin n°1 )
app.post('/ajouter-labo', (req, res) => {
  const { numero_labo, nom, lieu, capacite, config, type, id_resp } = req.body;
  const sql = `INSERT INTO laboratoires 
    (numero_labo, nom, lieu_geographique, capacite_initiale, capacite_fonctionnelle, configuration_generale, type_laboratoire, id_responsable) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [numero_labo, nom, lieu, capacite, capacite, config, type, id_resp], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Labo créé avec succès !", id: result.insertId });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(` Serveur lancé sur http://localhost:${PORT}`);
});

// ROUTE : Créer une demande de réservation (Action Enseignant)
app.post('/reserver', (req, res) => {
  const { id_enseignant, id_labo, date_tp, heure_debut, heure_fin, nb_etudiants, outils } = req.body;

  const sql = `INSERT INTO reservations 
    (id_enseignant, id_labo, date_tp, heure_debut, heure_fin, nb_etudiants, outils_necessaires, statut) 
    VALUES (?, ?, ?, ?, ?, ?, ?, 'en attente')`;

  db.query(sql, [id_enseignant, id_labo, date_tp, heure_debut, heure_fin, nb_etudiants, outils], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Demande de réservation envoyée !", id: result.insertId });
  });
});

// ROUTE : Valider une réservation et générer un Ticket (Action Responsable)
app.post('/valider-reservation', (req, res) => {
  const { id_reservation, capacite_actuelle, config_actuelle } = req.body;
  
  // 1. On génère un code de ticket unique (ex: TICKET-12345)
  const codeTicket = "TKT-" + Math.floor(Math.random() * 1000000);

  // 2. On met à jour la réservation
  db.query('UPDATE reservations SET statut = "validee" WHERE id_reservation = ?', [id_reservation], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    // 3. On crée le ticket numérique
    const sqlTicket = `INSERT INTO tickets 
      (id_reservation, code_ticket, capacite_au_moment_tp, config_au_moment_tp, statut_ticket) 
      VALUES (?, ?, ?, ?, 'actif')`;

    db.query(sqlTicket, [id_reservation, codeTicket, capacite_actuelle, config_actuelle], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ 
        message: "Réservation validée et Ticket généré !", 
        code: codeTicket 
      });
    });
  });
});

// ROUTE : Récupérer les réservations en attente (pour le Responsable)
app.get('/reservations/en-attente', (req, res) => {
  const sql = `
    SELECT r.*, u.nom as nom_enseignant, l.nom as nom_labo 
    FROM reservations r
    JOIN utilisateurs u ON r.id_enseignant = u.id_user
    JOIN laboratoires l ON r.id_labo = l.id_labo
    WHERE r.statut = 'en attente'`;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ROUTE : Historique des utilisations validées
app.get('/historique', (req, res) => {
  const sql = `SELECT * FROM reservations WHERE statut = 'validee' ORDER BY date_tp DESC`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ROUTE : Déclarer un incident après le TP
app.post('/incident', (req, res) => {
  const { id_ticket, id_auteur, description } = req.body;

  const sql = `INSERT INTO incidents (id_ticket, auteur_declaration, description_incident) VALUES (?, ?, ?)`;
  
  db.query(sql, [id_ticket, id_auteur, description], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Incident enregistré avec succès" });
  });
});

// ROUTE : Mettre à jour l'état d'un laboratoire (Action Responsable)
app.put('/labo/update-etat/:id', (req, res) => {
  const { id } = req.params;
  const { capacite_fonctionnelle, configuration_generale } = req.body;

  const sql = "UPDATE laboratoires SET capacite_fonctionnelle = ?, configuration_generale = ? WHERE id_labo = ?";
  
  db.query(sql, [capacite_fonctionnelle, configuration_generale, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "État du laboratoire mis à jour !" });
  });
});

// ROUTE : Connexion des utilisateurs
app.post('/login', (req, res) => {
  const { email, mot_de_passe } = req.body;

  const sql = "SELECT * FROM utilisateurs WHERE email = ? AND mot_de_passe = ?";
  
  db.query(sql, [email, mot_de_passe], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    
    if (results.length > 0) {
      const user = results[0];
      res.json({
        message: "Connexion réussie !",
        user: {
          id: user.id_user,
          nom: user.nom,
          role: user.role // C'est ici qu'on saura si c'est un admin ou autre
        }
      });
    } else {
      res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }
  });
});

// ROUTE : Mettre à jour l'état d'un laboratoire (Action Responsable)
app.put('/labo/update-etat/:id', (req, res) => {
  const { id } = req.params;
  const { capacite_fonctionnelle, configuration_generale } = req.body;

  const sql = "UPDATE laboratoires SET capacite_fonctionnelle = ?, configuration_generale = ? WHERE id_labo = ?";
  
  db.query(sql, [capacite_fonctionnelle, configuration_generale, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "État du laboratoire mis à jour !" });
  });
});

// ROUTE : Récupérer un ticket spécifique par son code (pour l'Enseignant)
app.get('/ticket/:code', (req, res) => {
  const { code } = req.params;

  const sql = `
    SELECT t.*, r.date_tp, r.heure_debut, r.heure_fin, l.nom as nom_labo, l.lieu_geographique
    FROM tickets t
    JOIN reservations r ON t.id_reservation = r.id_reservation
    JOIN laboratoires l ON r.id_labo = l.id_labo
    WHERE t.code_ticket = ?`;

  db.query(sql, [code], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ message: "Ticket non trouvé" });
    }
  });
});

// ROUTE : Voir les détails d'un labo spécifique
app.get('/laboratoire/:id', (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM laboratoires WHERE id_labo = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0]);
  });
});

// ROUTE : Supprimer un laboratoire (Action Admin)
app.delete('/supprimer-labo/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM laboratoires WHERE id_labo = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Laboratoire supprimé avec succès !" });
  });
});

// ROUTE : Annuler une réservation (Action Enseignant ou Admin)
app.delete('/annuler-reservation/:id', (req, res) => {
  const { id } = req.params;
  
  // On ne peut annuler que si elle est encore 'en attente'
  const sql = "DELETE FROM reservations WHERE id_reservation = ? AND statut = 'en attente'";

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    
    if (result.affectedRows > 0) {
      res.json({ message: "Réservation annulée avec succès." });
    } else {
      res.status(400).json({ message: "Impossible d'annuler une réservation déjà validée ou inexistante." });
    }
  });
});

// ROUTE : Valider une réservation et générer un ticket
app.post('/valider-reservation', (req, res) => {
    const { id_reservation, id_responsable } = req.body;

    // 1. Mettre à jour le statut de la réservation
    const sqlUpdate = "UPDATE reservations SET statut = 'validee' WHERE id_reservation = ?";
    
    db.query(sqlUpdate, [id_reservation], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        // 2. Générer un code de ticket unique (ex: TICK-8429)
        const codeTicket = `TICK-${Math.floor(1000 + Math.random() * 9000)}`;

        // 3. Insérer dans la table 'tickets'
        const sqlTicket = "INSERT INTO tickets (id_reservation, code_ticket, id_responsable, date_emission) VALUES (?, ?, ?, NOW())";
        
        db.query(sqlTicket, [id_reservation, codeTicket, id_responsable], (err, ticketResult) => {
            if (err) return res.status(500).json({ error: err.message });

            res.json({ 
                message: "Réservation validée et Ticket généré !", 
                code_ticket: codeTicket 
            });
        });
    });
});

// ROUTE : Déclarer un incident (Point 13 du sujet)
app.post('/incident', (req, res) => {
    const { id_ticket, description_incident, type_materiel_touche } = req.body;

    const sql = `
        INSERT INTO incidents (id_ticket, description_incident, type_materiel_touche, date_declaration, statut_reparation) 
        VALUES (?, ?, ?, NOW(), 'en_attente')
    `;

    db.query(sql, [id_ticket, description_incident, type_materiel_touche], (err, result) => {
        if (err) {
            console.error("Erreur SQL incident:", err);
            return res.status(500).json({ error: "Erreur lors de l'enregistrement de l'incident" });
        }
        res.json({ 
            message: "Incident déclaré avec succès", 
            id_incident: result.insertId 
        });
    });
});

// ROUTE : Liste des incidents pour le Responsable
app.get('/incidents-liste', (req, res) => {
    const sql = "SELECT * FROM incidents ORDER BY date_declaration DESC";
    
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});