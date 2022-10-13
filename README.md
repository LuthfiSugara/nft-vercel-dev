# LegionSwap

## Deployment

- [main](https://legionswap.vercel.app)

![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=legionswap&style=for-the-badge)

- [dev](https://legionswap-ashalfarhan8.vercel.app)

![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=legionswap-ashalfarhan8&style=for-the-badge)

## Todo

## Notes:

- Dai Testnet: 0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867
- Legion Testnet: 0x34eEAC145a661e44F07e4E60afe5DFa066be1c92
- Legion Testnet: 0xCdefEc2ba233D5B639535a4bbA3B9E4eBe91550E

## Set Up Swap Feature :

1. Change Factory Address and Router Address at 'src/config/constants/index.ts'
2. Change INIT_CODE_HASH in SDK
3. Change Token Address at 'src/config/constants/tokens.ts'

## Set Up Farm Feature :

1. Change Masterchef Address at 'src/config/constants/contracts.ts'
2. Change LP Address at 'src/config/constants/farms.ts'
3. Adjust Legion-BNB LP PID and BUSD-BNB LP PID at 'src/state/farms/hooks.ts'
4. Adjust BUSD-BNB LP PID at 'src/state/farms/fetchFarmsPrices.ts'
