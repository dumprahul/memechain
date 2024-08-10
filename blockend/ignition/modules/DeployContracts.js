const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DeployContracts", (m) => {
  
    const memecast = m.contract("Memecast",[])
    console.log("ADDRESS")
    console.log(memecast.address)
    const aura = m.contract("Aura", [memecast.address]);
    console.log("AURA")
    console.log(aura.address)

  m.call(memecast, "setAuraContract", [aura.address]);

  return { memecast, aura };
});