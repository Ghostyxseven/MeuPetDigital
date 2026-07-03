import Database from 'better-sqlite3';
import path from 'path';

// Define o caminho para o arquivo do banco de dados na raiz do projeto
const dbPath = path.join(process.cwd(), 'database.db');

// Abre/Cria o banco de dados
const db = new Database(dbPath);

// Habilita as chaves estrangeiras no SQLite
db.pragma('foreign_keys = ON');

// Inicialização do Schema do banco de dados
export function initDb() {
  // 1. Tabela de Usuários (equivalente ao auth.users do Supabase)
  db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  // 2. Tabela de Vacinas (Catálogo público)
  db.prepare(`
    CREATE TABLE IF NOT EXISTS vacinas (
      id TEXT PRIMARY KEY,
      nome TEXT NOT NULL,
      descricao TEXT,
      intervalo_dias INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  // 3. Tabela de Pets (Privado ao usuário)
  db.prepare(`
    CREATE TABLE IF NOT EXISTS pets (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      nome TEXT NOT NULL,
      raca TEXT,
      data_nascimento TEXT,
      peso REAL,
      foto_url TEXT,
      rg_sinpatinhas TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
  `).run();

  // 4. Tabela de Registros vacinais (Histórico de vacinação, privado)
  db.prepare(`
    CREATE TABLE IF NOT EXISTS registros (
      id TEXT PRIMARY KEY,
      pet_id TEXT NOT NULL,
      vacina_id TEXT NOT NULL,
      data_aplicacao TEXT NOT NULL,
      proxima_dose TEXT,
      observacoes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (pet_id) REFERENCES pets (id) ON DELETE CASCADE,
      FOREIGN KEY (vacina_id) REFERENCES vacinas (id) ON DELETE CASCADE
    )
  `).run();

  // Seed inicial das vacinas se o catálogo estiver vazio
  const rowCount = db.prepare('SELECT COUNT(*) as count FROM vacinas').get() as { count: number };
  if (rowCount.count === 0) {
    const seedVacinas = [
      {
        id: 'vacina-v10-v8',
        nome: 'V10 / V8 (Múltipla)',
        descricao: 'Protege contra Cinomose, Parvovirose, Coronavirose, Adenovirose, Parainfluenza e Leptospirose.',
        intervalo_dias: 365,
      },
      {
        id: 'vacina-antirrabica',
        nome: 'Antirrábica',
        descricao: 'Protege contra a Raiva. Obrigatória anualmente.',
        intervalo_dias: 365,
      },
      {
        id: 'vacina-gripe',
        nome: 'Gripe Canina (Pneumodog)',
        descricao: 'Protege contra a Tosse dos Canis (Bordetella bronchiseptica e Parainfluenza).',
        intervalo_dias: 365,
      },
      {
        id: 'vacina-giardia',
        nome: 'Giárdia',
        descricao: 'Previne a Giardíase canina.',
        intervalo_dias: 365,
      },
      {
        id: 'vacina-leishmaniose',
        nome: 'Leishmaniose',
        descricao: 'Previne a Leishmaniose Visceral Canina.',
        intervalo_dias: 365,
      },
    ];

    const insertVacina = db.prepare(`
      INSERT INTO vacinas (id, nome, descricao, intervalo_dias)
      VALUES (@id, @nome, @descricao, @intervalo_dias)
    `);

    // Inserção em transação para eficiência e segurança
    const transaction = db.transaction((vacinasList) => {
      for (const vacina of vacinasList) {
        insertVacina.run(vacina);
      }
    });

    transaction(seedVacinas);
    console.log('Catálogo de vacinas pré-populado com sucesso!');
  }
}

// Inicializa o banco de dados imediatamente ao carregar o arquivo
initDb();

export default db;
