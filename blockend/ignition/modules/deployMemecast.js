const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DeployMemecast", (m) => {
    const memecast = m.contract("Memecast",[])

    return { memecast };
});