# EXECUTION ORDER


## Deploy Memecast
npx hardhat ignition deploy ignition/modules/deployMemecast.js --network auraChain
npx hardhat verify --network auraChain 0x16CBC6Cb38D19B73A3b545109c70b2031d20EA37


## Deploy Aura

npx hardhat ignition deploy ignition/modules/deployAura.js --network auraChain
npx hardhat verify --network auraChain 0xd37ca03a13bD2725306Fec4071855EE556037e2e "0x16CBC6Cb38D19B73A3b545109c70b2031d20EA37"

## Set aura address in memecast

# Tasks

1. Deploy Aurachain contracts - DONE
2. Rendering composer actions and integrate Aurachain Contract calls in the frontend - PENDING 
3. Setup Supabase - PENDING
5. Rendering farcaster frames - PENDING
6. Test whole flow - PENDING


