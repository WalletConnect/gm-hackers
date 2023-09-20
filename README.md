# GM Hackers (React, Typescript, Next.js, wagmi)

🔗 Live dapp demo - https://hackers.gm.walletconnect.com/ <br />
📚 WalletConnect v2 Docs - https://docs.walletconnect.com/2.0

## Overview

This example aims to demonstrate dapp-facing use cases enabled by WalletConnect Notify API.

## Pre-requisites

A live deployment is required for this hacker guide.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/git?s=https://github.com/WalletConnect/gm-hackers) [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/WalletConnect/gm-hackers)

## Hacker guide

1. Use this repo as a template or clone it.
2. Set up your local environment variables by copying the example into your own `.env.local` file

   ```bash
   cp .env.local.example .env.local
   ```

3. Head over [WalletConnect Cloud](https://cloud.walletconnect.com) and Sign in or Sign up if you don't have an account.

   1. Create a project and copy the `projectId` and set it as the value of `NEXT_PUBLIC_PROJECT_ID` in your `.env.local`
   2. Copy the `notify_api_secret` generated in WalletConnect Cloud and set it as the value of `NOTIFY_PROJECT_SECRET` in your `.env.local`
   3. Enable Notify API by following the steps outlined in the API tab.
      1. Set your Vercel or Netlify dapp url.
      2. Download the two files and upload them under the `public/.well-known` folder.
      3. Commit your changes and deploy a new version containing the configuration files. If you didn't deploy yet, we suggest to [Deploy with Vercel](https://vercel.com/import/git?s=https://github.com/WalletConnect/gm-hackers) or [Deploy to Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/WalletConnect/gm-hackers).
      4. Toggle the Notify API switch on WalletConnect Cloud.
   4. Don't forget to update your environment variables on Vercel or Netlify.

4. Verify that your configuration was successful by subscribing to your dapp through [Web3Inbox](https://app.web3inbox.com). Head over settings and enable developer mode to get featured on the explorer. You can also subscribe right from the gm-hackers dapp.

5. Once you are subscribed, you can send notifications in multiple ways.

   1. Send test notification button in the gm-hackers dapp.
   2. Use [WalletConnect Cloud](https://cloud.walletconnect.com) broadcast feature.
   3. Make a request to Notify API. The example below showcases how to send a notification to all subscribers.

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
          type: "promotional",
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

## Hack ideas

- A DeFi app that sends notifications for positions being liquidated, claimable rewards, etc.
- A PWA that sends desktop notifications.
- Segment subscribers and send them notifications relevant to their on-chain activity.
- Use your own database and integrate with our [webhook](https://docs.walletconnect.com/2.0/specs/servers/notify/notify-server-api#register-webhook).
