
exports.up = function (knex) {
    knex.schema.hasTable('users').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('users', function (t) {
                t.increments('id').primary();
                t.string('user', 100);
                t.string('email', 100);
                t.string('password', 100);
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users')
};
