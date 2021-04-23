const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/acme_db'
);

const Movie = conn.define('movie', {
  title: STRING,
});

const Actor = conn.define('actor', {
  name: STRING,
});

const Role = conn.define('role', {
  character: STRING,
});

Role.belongsTo(Actor);
Role.belongsTo(Movie);
Movie.hasMany(Role);
Actor.hasMany(Role);

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [
    sully,
    catchMeIfYouCan,
    truman,
    devil,
    hanks,
    linney,
    harris,
    leo,
    meryl,
  ] = await Promise.all([
    Movie.create({ title: 'Sully' }),
    Movie.create({ title: 'Catch Me If You Can' }),
    Movie.create({ title: 'The Truman Show' }),
    Movie.create({ title: 'The Devil Wears Prada' }),
    Actor.create({ name: 'Tom Hanks' }),
    Actor.create({ name: 'Laura Linney' }),
    Actor.create({ name: 'Ed Harris' }),
    Actor.create({ name: 'Leo' }),
    Actor.create({ name: 'Meryl' }),
  ]);
  console.log(devil.get());

  await Promise.all([
    Role.create({ character: 'Sully', movieId: sully.id, actorId: hanks.id }),
    Role.create({
      character: 'Carl Hanratty',
      movieId: catchMeIfYouCan.id,
      actorId: hanks.id,
    }),
    Role.create({
      character: 'Loraine',
      movieId: sully.id,
      actorId: linney.id,
    }),
    Role.create({
      character: 'Hannah Gill',
      movieId: truman.id,
      actorId: linney.id,
    }),
    Role.create({
      character: 'Christoff',
      movieId: truman.id,
      actorId: harris.id,
    }),
    Role.create({
      character: 'Miranda Presly',
      movieId: devil.id,
      actorId: meryl.id,
    }),
  ]);
};

module.exports = {
  syncAndSeed,
  models: {
    Actor,
    Movie,
    Role,
  },
};
