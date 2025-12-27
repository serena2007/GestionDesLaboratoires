import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gestion_laboratoires'
});

db.connect((err) => {
  if (err) {
    console.error('Erreur MySQL :', err.message);
    return;
  }
  console.log('Connecté à phpMyAdmin !');
});

export default db; 