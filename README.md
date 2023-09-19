# GM Hackers (React, Typescript, Next.js, wagmi)

🔗 Live dapp demo - https://hackers.gm.walletconnect.com/ <br />
📚 WalletConnect v2 Docs - https://docs.walletconnect.com/2.0

## Overview

This example aims to demonstrate dapp-facing use cases enabled by WalletConnect Notify API.

## Pre-requisites

1. Use this repo as a template or clone it.
2. Set up your local environment variables by copying the example into your own `.env.local` file

```bash
cp .env.local.example .env.local
```

3. Head over [WalletConnect Cloud](https://cloud.walletconnect.com) and Sign in or Sign up if you don't have an account.

   1. Create a project and copy the `projectId` and set it as the value of `NEXT_PUBLIC_PROJECT_ID` in your `.env.local`
   2. Enable Notify API by following the steps outlined in the API tab.
   3. Copy the `notify_api_secret` generated in WalletConnect Cloud and set it as the value of `NOTIFY_PROJECT_SECRET` in your `.env.local`

4. Verify that your configuration was successful by subscribing to your dapp through [Web3Inbox](https://app.web3inbox.com). Head over settings and enable developer mode to get featured on the explorer. You can also subscribe right from the gm-hackers dapp.

5. Once you are subscribed, you can send notifications in multiple ways.
   1. Send test notification button in the gm-hackers dapp.
   2. Use [WalletConnect Cloud](https://cloud.walletconnect.com) broadcast feature.
   3. Make a request to Notify API.

```js
const headers = {
  // Replace NOTIFY_PROJECT_SECRET with your notify_api_secret generated in WalletConnect Cloud.
  Authorization: "Bearer NOTIFY_PROJECT_SECRET",
};

// 1. Get the list of subscribers for your project
const subscribersRes = await fetch(
  // Replace PROJECT_ID with your projectId from WalletConnect Cloud.
  "https://notify.walletconnect.com/PROJECT_ID/subscribers",
  { headers }
);
const subscribers = await subscribersRes.json();

// 2. Send a notification to all your subscribers
const body = JSON.stringify({
  accounts: subscribers,
  notification: {
    title: "GM Hackers!",
    body: "Enjoy hacking on WalletConnect",
    icon: "https://avatars.githubusercontent.com/u/37784886?s=48&v=4",
    url: "https://hackers.gm.walletconnect.com/",
    type: "gm_hacker",
  },
});

fetch(
  // Replace PROJECT_ID with your projectId from WalletConnect Cloud.
  "https://notify.walletconnect.com/PROJECT_ID/notify",
  {
    method: "POST",
    headers,
    body,
  }
)
  .then((response) => response.json())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
```

## Running locally

Install the app's dependencies:

```bash
npm i
```

## Develop

```bash
npm run dev
```

## Build

```bash
npm run build
```
