const fs = require('fs');
const { Eth } = require('web3-eth');

const WALLET_ADDRESS = '0x1cfb8a2e4c2e849593882213b2468e369271dad2';

// Load BIP39 word list
const wordList = fs.readFileSync('bip39-english.txt', 'utf8').split('\n');

// Initialize Eth instance
const eth = new Eth();

// Define a function that generates a random recovery phrase
async function generateAndCheckRecoveryPhrase() {
  // Generate a random recovery phrase
  const recoveryPhrase = wordList.sort(() => Math.random() - 0.5).slice(0, 12).join(' ');
  
  // Check if the recovery phrase is valid for the given wallet address
  try {
    const recoveredAccount = await eth.accounts.recoverAccount(recoveryPhrase, null);
    const isValid = recoveredAccount.address.toLowerCase() === WALLET_ADDRESS.toLowerCase();
    if (isValid) {
      return recoveryPhrase;
    }
  } catch (error) {
    // Do nothing
  }
  
  return null;
}

async function main() {
  let recoveryPhrase;
  while (!(recoveryPhrase = await generateAndCheckRecoveryPhrase())) {
    // Keep generating and checking until a valid recovery phrase is found
  }

  console.log(`Valid recovery phrase found: ${recoveryPhrase}`);
}

main();
