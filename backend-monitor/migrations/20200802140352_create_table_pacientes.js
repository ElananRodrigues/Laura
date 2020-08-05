
exports.up = function (knex) {
    knex.schema.hasTable('pacientes').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('pacientes', function (t) {
                t.increments('id').primary();
                t.string('prontuario', 100);
                t.string('nome', 100);
                t.string('nivel', 100);
                t.string('atendimento', 100);
                t.string('data', 100);
                t.string('cabeca', 100);
                t.string('perna', 100);
                t.string('braco', 100);
                t.string('tosse', 100);
                t.string('fraqueza', 100);
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('pacientes')
};
