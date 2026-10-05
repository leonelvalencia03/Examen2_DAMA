import * as SQLite from 'expo-sqlite';

const DB_NAME = 'misgastos.db';

let dbPromise = null;

//Abre la base de datos y crea la tabla si no existe
const abrirDB = async () => {
    const db = await SQLite.openDatabaseAsync(DB_NAME);

    await db.execAsync(
        `CREATE TABLE IF NOT EXISTS gastos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario TEXT,
            concepto TEXT NOT NULL,
            descripcion TEXT,
            categoria TEXT NOT NULL,
            monto REAL NOT NULL,
            fecha TEXT NOT NULL
        );`
    );

    //Si la tabla ya existía desde antes, agregamos la columna usuario.
    //Esto evita romper la base de datos que ya teníamos.
    const columnas = await db.getAllAsync('PRAGMA table_info(gastos)');

    const existeUsuario = columnas.some(
        (columna) => columna.name === 'usuario'
    );

    if (!existeUsuario) {
        await db.execAsync(
            'ALTER TABLE gastos ADD COLUMN usuario TEXT;'
        );
    }

    return db;
};

//Devuelve la DB lista para usar
const getDB = () => {
    if (!dbPromise) {
        dbPromise = abrirDB().catch((error) => {
            console.error('Error al abrir la base de datos:', error);
            dbPromise = null;
            throw error;
        });
    }

    return dbPromise;
};

//Inicializa la base de datos
export const initDB = async () => {
    await getDB();
};

//Crear un gasto
export const createItem = async (
    { concepto, descripcion, categoria, monto, fecha },
    usuario
) => {
    const db = await getDB();

    const resultado = await db.runAsync(
        `INSERT INTO gastos
        (usuario, concepto, descripcion, categoria, monto, fecha)
        VALUES (?, ?, ?, ?, ?, ?)`,
        usuario,
        concepto,
        descripcion ?? '',
        categoria,
        monto,
        fecha
    );

    return resultado.lastInsertRowid;
};

//Obtener solamente los gastos del usuario
export const getItems = async (usuario) => {
    const db = await getDB();

    return db.getAllAsync(
        `SELECT * FROM gastos
         WHERE usuario = ?
         ORDER BY fecha DESC, id DESC`,
        usuario
    );
};

//Obtener un gasto específico del usuario
export const getItemById = async (id, usuario) => {
    const db = await getDB();

    const fila = await db.getFirstAsync(
        `SELECT * FROM gastos
         WHERE id = ? AND usuario = ?`,
        id,
        usuario
    );

    return fila ?? null;
};

//Actualizar un gasto del usuario
export const updateItem = async (
    id,
    { concepto, descripcion, categoria, monto, fecha },
    usuario
) => {
    const db = await getDB();

    const resultado = await db.runAsync(
        `UPDATE gastos
         SET concepto = ?,
             descripcion = ?,
             categoria = ?,
             monto = ?,
             fecha = ?
         WHERE id = ? AND usuario = ?`,
        concepto,
        descripcion ?? '',
        categoria,
        monto,
        fecha,
        id,
        usuario
    );

    return resultado.changes;
};

//Eliminar un gasto del usuario
export const deleteItem = async (id, usuario) => {
    const db = await getDB();

    const resultado = await db.runAsync(
        `DELETE FROM gastos
         WHERE id = ? AND usuario = ?`,
        id,
        usuario
    );

    return resultado.changes;
};