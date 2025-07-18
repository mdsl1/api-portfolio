const bcrypt = require('bcrypt');

const senha = '2023'; // a senha que você quer criptografar

bcrypt.hash(senha, 10, function(err, hash) {
  if (err) throw err;
  console.log('Hash gerado:', hash);
});
