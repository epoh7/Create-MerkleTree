const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const tokens = require("./tokens.json");

async function main() {
  let tab = [];
  tokens.map((token) => {
    tab.push(token.address);
  });
  const leaves = tab.map((address) => keccak256(address));
  const tree = new MerkleTree(leaves, keccak256, { sort: true });
  const root = tree.getHexRoot();
  //tokens[0].address = First_WL_address
  const leaf = keccak256(tokens[0].address);
  const proof = tree.getHexProof(leaf);
  //And just copy and paste the root to Remix
  console.log("root : " + root);
  console.log("proof : " + proof);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});