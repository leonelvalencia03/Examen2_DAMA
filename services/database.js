   import * as SQLite from 'expo-sqlite';

const DB_NAME = 'misgastos.db';

// Guardamos la promesa de la base abierta para que aunque varias pantallas la llamen, no se abra varias veces
let dbPromise = null;

//Abrimos la db y crea la tabla si no existe (solo se ejecuta la primera vez que se abre la db)
const abrirDB = async () => {
    const db = await SQLite.openDatabaseAsync(DB_NAME);
    await db.execAsync(
        `CREATE TABLE IF NOT EXISTS gastos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            concepto TEXT NOT NULL,
            descripcion TEXT,
            categoria TEXT NOT NULL,
            monto REAL NOT NULL,
            fecha TEXT NOT NULL
        );`
    );
    return db;
};

// Devuelve la db lista para usarla y si falla reintenta abrirla
const getDB = () => {
    if (!dbPromise) {
        dbPromise = abrirDB().catch((error) => {
            console.error('Error al abrir la base de datos:', error);
            dbPromise = null; // Reiniciamos la promesa para que se pueda reintentar abrir la db
            throw error;
        });
    }
    return dbPromise;
};

// Creamos la tabla gastos
export const initDB = async () => {
    await getDB();
};

// Insertar un gasto en la base de datos, devuelve el id generado por SQLite
export const createItem = async ({ concepto, descripcion, categoria, monto, fecha }) => {
    const db = await getDB();
    const resultado = await db.runAsync(
    'INSERT INTO gastos (concepto, descripcion, categoria, monto, fecha) VALUES (?, ?, ?, ?, ?)',
    concepto,
    descripcion ?? '',
    categoria,
    monto,
    fecha
  );
  return resultado.lastInsertRowid;
};

// Devuelve todos los gastos, el mas reciente primero.
// Si dos gastsos tienen la misma fecha, el que se insertó de ultimo aparecerá primero.
export const getItems = async () => {
    const db = await getDB();
    return db.getAllAsync('SELECT * FROM gastos ORDER BY fecha DESC, id DESC');
};

// Devuelve ve un gasto por su id, o null si no existe
export const getItemById = async (id) => {
    const db = await getDB();
    const fila = await db.getFirstAsync('SELECT * FROM gastos WHERE id = ?', id);
    return fila ?? null;
};

// Actualiza los campos de un gasto, devuelve cuantas filas fueron afectadas (0 o 1)
export const updateItem = async (id, { concepto, descripcion, categoria, monto, fecha }) => {
  const db = await getDB();
  const resultado = await db.runAsync(
    'UPDATE gastos SET concepto = ?, descripcion = ?, categoria = ?, monto = ?, fecha = ? WHERE id = ?',
    concepto,
    descripcion ?? '',
    categoria,
    monto,
    fecha,
    id
  );
  return resultado.changes;
};

// Elimina un gasto por su id, devuelve cuantas filas fueron afectadas (0 o 1)
export const deleteItem = async (id) => {
  const db = await getDB();
  const resultado = await db.runAsync('DELETE FROM gastos WHERE id = ?', id);
  return resultado.changes;
};


