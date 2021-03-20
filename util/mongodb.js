import mongoose from "mongoose";

const { MONGODB_URI, MONGODB_DB } = process.env;

console.log(MONGODB_URI, MONGODB_DB);
if (!process.env.MONGODB_URI) {
  console.log(
    "Veuillez définir la constante d'environnement MONGODB_URI dans .env.local"
  );
}

if (!process.env.MONGODB_DB) {
  console.log(
    "Veuillez définir la constante d'environnement MONGODB_DB dans .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((client) => {
      return {
        client,
        db: client.db(MONGODB_DB),
      };
    });
    mongoose.set("useFindAndModify", false);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
