# Sovryn Node deployment guide

## What is a Sovryn Node?

A Sovryn Node is the part of the Sovryn dapp that monitors the continuous marginal trading on the platform. It's main functions are as follows:

**Liquidation of expired positions**
The Nodes are check if leveraged trading positions on the platform are above liquidation levels (the trade margin is in excess of the maintenance margin). The nodes automatically liquidate positions if they fail this check and the liquidation criteria is met. The node then contacts both the liquidator and the liquidated and reports the outcome.

**Rollover of open positions**
When the maximum loan duration has been exceeded, the position will need to be rolled over. The function "rollover" on the protocol contract extends the loan duration by the maximum term (currently 28 days for margin trades) and pays the interest to the lender. The callers reward is 0.1% of the position size and also receives 2x the gas cost (using the fast gas price as base for the calculation).

**Taking advantage of arbitrage opportunities on the AMM**
Earning money through arbitrage in situations where the expected price from the AMM deviates more than 2% from the oracle price for an asset. The node buys the side which is off.

## 1. Prepare new repo

1.1 Create new repo, copy files from https://github.com/DistributedCollective/Sovryn-Node
```shell script
git clone https://github.com/DistributedCollective/Sovryn-Node
```

## 2. Telegram bot and chat configuration

Sovryn node uses Telegram chat/bot to send notifications about new transactions and errors.

2.1 Use https://t.me/BotFather  to create new bot (`/newbot` command).
Also you can use `/help` for more specified options to your bot and [official telegram helps](https://core.telegram.org/bots#6-botfather)

![Create Telegram Bot!](/images/telegram01.png "Create Telegram Bot")


2.2 Get API token.
`id:apiToken`
for i.e. `1876066462:AAF1nDRouq1rOqhjrJIo5eCWuC3-ktQ8iSI`

![Get API token!](/images/telegram02.png "Get API token")

2.3 Create new chat and add created telegram bot. Send some messages to newly created chat.

2.4 Use following URL to get Chat ID starting with ("-") symbol: https://api.telegram.org/bot[токен_бота]/getUpdates

for i.e. ` curl https://api.telegram.org/bot1876066462:AAF1nDRouq1rOqhjrJIo5eCWuC3-ktQ8iSI/getUpdates`
and you'll get response `{"ok":true,"result":[]}`

![Get API token!](/images/telegram03.png "Get API token")

2.5 To receive notifications on telegram write API token in a file **/secrets/telegram.js**

```
export default "[telegram-bot-token]";
```

and write Chat ID to **/config/config_mainnet.js and /config/config_testnet.js** files.

```
sovrynInternalTelegramId: -492690059,
```

## 3. Create wallet in RSK blockchain and export keys

To trade on Sovryn, you will need to set up a Web3 wallet that is compatible with the RSK chain (Rootstock).

### Testnet Wallet setup

3.1 Go to the **Metamask** website and download the latest version of the Metamask Wallet extension.

3.2 Install and have the Metamask extension active in your browser.

3.3 Open Metamask and register on it. (Do not forget to save your recovery phrase!)

3.4 Click the circle in the upper right of the wallet **→ Settings → Networks →** click the **Add Network** button and enter the following **RSK Network** settings.

* **Network Name:** RSK Testnet
* **New RPC URL:** https://public-node.testnet.rsk.co
* **Chain ID:** 31
* **Currency Symbol:** tRBTC
* **Block Explorer URL:** https://explorer.testnet.rsk.co

3.5 Hit Save and make sure you are switched to the RSK Mainnet. 

3.6 Request some tRBTC from https://faucet.rsk.co

3.7 Save your public key from Metamask and export your private key: **→ Account → Account Details → Export private key**. That will be your credentials of the liquidator/rollover/arbitrage wallets credentials

### Useful links
https://wiki.sovryn.app/en/getting-started/wallet-setup

## 4. Convert keys to Keystore v3 format

Update **accounts.js** file with the credentials of the liquidator/rollover/arbitrage wallets.
You have 2 options
* \[Insecure\] you can specify pKey instead of ks to just use the private key
* \[Secure\] ks = encrypted keystore file in v3 standard. (Do not forget to save your keystore password!)

```
export default {
    "liquidator": [{
        adr: "",
        ks: ""
    }],
    "rollover": [{
        adr: "",
        ks: ""
    }],
    "arbitrage": [{
        adr: "",
        ks: ""
    }],
}
```

## 5. Create Docker image and publish to repository

5.1 Review and update **Dockerfile** \[Update ENV section\].

5.2 Create new public DockerHub repo.

5.3 Build your image:

```
docker build -t [DockerHub account name]/[DockerHub repo name] . --no-cache
```

5.4 \[Optional\] Run your container in local Docker

```
docker run -p 3000:3000 [DockerHub account name]/[DockerHub repo name]:latest
```

5.5 Login to DockerHub with AccessKey and push your image

```
docker login --username [DockerHub account name]/[DockerHub repo name]
docker push [DockerHub account name]/[DockerHub repo name]:latest
```

## 6. Install Akash and create account

6.1 Use following guide to install Akash

https://docs.akash.network/start/install

6.2 Create new Akash account

Consider using following bash script (update **akash** binary path or update **PATH** env variable).

```
#!/bin/bash

AKASH_KEY_NAME="[YOUR KEY NAME HERE"
AKASH_KEYRING_BACKEND="os"

/opt/homebrew/bin/akash --keyring-backend "$AKASH_KEYRING_BACKEND" keys add "$AKASH_KEY_NAME"
```

\[IMPORTANT!!!\] Save your account address and mnemonic phrase.

Useful links:
https://docs.akash.network/start/wallet

## 7. Akash deployment instructions

Consider using following bash script. Properly update \[VARIABLE VALUES\]. Run commands one by one.
```
#!/bin/bash 

AKASH_NET="https://raw.githubusercontent.com/ovrclk/net/master/mainnet"
AKASH_VERSION="$(curl -s "$AKASH_NET/version.txt")"
export AKASH_CHAIN_ID="$(curl -s "$AKASH_NET/chain-id.txt")"
curl -s "$AKASH_NET/api-nodes.txt" 
AKASH_NODE="http://rpc.mainnet.akash.dual.systems:80"

AKASH_KEY_NAME="[AKASH ACCOUNT NAME]"
AKASH_KEYRING_BACKEND="os"
ACCOUNT_ADDRESS="[AKASH ACCOUNT ADDRESS]"

#STEP 0 - Create Certificate
#/opt/homebrew/bin/akash tx cert create client --chain-id $AKASH_CHAIN_ID --keyring-backend $AKASH_KEYRING_BACKEND --from $AKASH_KEY_NAME --node "http://rpc.mainnet.akash.dual.systems:80" --fees 5000uakt

#STEP 1
#/opt/homebrew/bin/akash tx deployment create akash-sovryn-deploy.yml --from $AKASH_KEY_NAME --keyring-backend $AKASH_KEYRING_BACKEND --node "http://rpc.mainnet.akash.dual.systems:80" --chain-id $AKASH_CHAIN_ID -y --fees 5000uakt

# STEP 2
DSEQ=[DSEQ from previous STEP]
#/opt/homebrew/bin/akash query market bid list --owner=$ACCOUNT_ADDRESS --node $AKASH_NODE --dseq $DSEQ

# STEP 3
DSEQ=[DSEQ from previous STEP]
GSEQ=[QSEQ from previous STEP]
OSEQ=[OSEQ from previous STEP]
PROVIDER="[PROVIDER from previous STEP]"
#/opt/homebrew/bin/akash tx market lease create --chain-id $AKASH_CHAIN_ID --node $AKASH_NODE --owner $ACCOUNT_ADDRESS --dseq $DSEQ --gseq $GSEQ --oseq $OSEQ --provider $PROVIDER --from $AKASH_KEY_NAME --fees 5000uakt --keyring-backend $AKASH_KEYRING_BACKEND

# STEP 4
#/opt/homebrew/bin/akash query market lease list --owner $ACCOUNT_ADDRESS --node $AKASH_NODE --dseq $DSEQ

# STEP 5
#/opt/homebrew/bin/akash provider send-manifest akash-sovryn-deploy.yml --keyring-backend $AKASH_KEYRING_BACKEND --node $AKASH_NODE --from=$AKASH_KEY_NAME --provider=$PROVIDER --dseq $DSEQ --log_level=info --home ~/.akash

#STEP 6
#/opt/homebrew/bin/akash provider lease-status --node $AKASH_NODE --home ~/.akash --dseq $DSEQ --from $AKASH_KEY_NAME --provider $PROVIDER --keyring-backend $AKASH_KEYRING_BACKEND

#STEP 7 - check logs
#/opt/homebrew/bin/akash provider lease-logs --dseq=$DSEQ --from=$ACCOUNT_ADDRESS --provider=$PROVIDER

#STEP 9 - close deployment
#/opt/homebrew/bin/akash tx deployment close --node $AKASH_NODE --chain-id $AKASH_CHAIN_ID --dseq $DSEQ --owner $ACCOUNT_ADDRESS --from $AKASH_KEY_NAME --keyring-backend $AKASH_KEYRING_BACKEND -y --fees 5000uakt
```

## Security. Hardening Sovryn Node

## Security. Securing private keys

## Security. Securing Akash deployment

## Troubleshooting

1. Consider test docker image, secrets and telegram chat in local Docker

2. Use Telegram chat to make sure that Sovryn Node is active

