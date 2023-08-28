import bcrypt from 'bcrypt';

const testPassword = "claradeg";
const BCRYPT_SALT_ROUNDS = 10;

const testBcrypt = async () => {
  try {
    const hashedPassword = await bcrypt.hash(testPassword, BCRYPT_SALT_ROUNDS);
    console.log(`Mot de passe haché: ${hashedPassword}`);

    const isMatch = await bcrypt.compare(testPassword, hashedPassword);
    console.log(`Les mots de passe correspondent-ils ? ${isMatch}`);
  } catch (error) {
    console.error(`Une erreur est survenue: ${error}`);
  }
};

testBcrypt();