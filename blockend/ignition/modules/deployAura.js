const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DeployAura", (m) => {
  const memecast="0x16CBC6Cb38D19B73A3b545109c70b2031d20EA37"
  const aura = m.contract("Aura", [memecast]);

  return {  aura };
});