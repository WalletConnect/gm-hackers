# GM Hackers (Web3Inbox, Next.js, wagmi, React, TypeScript)

🔗 Live dapp demo - https://hackers.gm.walletconnect.com/  
📚 WalletConnect Web3Inbox Docs - https://docs.walletconnect.com/2.0/web3inbox/core-components/usage

## Overview

Send notifications to a blockchain account using WalletConnect's Web3Inbox SDK.

This example dapp shows basic dapp usage of the Web3Inbox SDK to send a notification whenever there is a new Ethereum block.

Subscriptions to dapp notifications are synced across all devices that use the same blockchain account.

## Hacker guide

### Deploy the example dapp

1. Head over [WalletConnect Cloud](https://cloud.walletconnect.com) and Sign in or Sign up if you don't have an account.
2. Create a project and take note of your Project ID.
3. Deploy your app to a public URL. Note you will need to set the `NEXT_PUBLIC_PROJECT_ID` environment variable to your Project ID from step #2. Some options to deploy to a public URL include:
    - [Deploy to Vercel](https://vercel.com/import/git?s=https://github.com/WalletConnect/gm-hackers)
    - [Deploy to Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/WalletConnect/gm-hackers)
    - Fork/clone this repo and deploy yourself
4. Back in the WalletConnect Cloud, navigate to your project's APIs tab. Under Notify API Step 1, provide your public URL as the dapp URL. Click Save.
5. Next you will need to host the two files on this page at the `/.well-known/` directory of your public URL. You can do this by saving them to the `/public/.well-known/` directory of your fork of this template repo. Note that you will need to overwrite the two files that already exist.
    - Download `did.json` (Step 2: “Download did:web”) and place it at `/public/.well-known/did.json`
    - Download `wc-notify-config.json` (Step 3: “Download template”) to `/public/.well-known/wc-notify-config.json`
      - Update the `description` field in `wc-notify-config.json` to the description of your app.
    - Deploy your changes in `/public/.well-known/` to your public URL (e.g. by commiting and pushing).
6. Once the new files are deployed, on the APIs tab in Cloud, find the toggle switch under the Notify API and switch it on. You should see a success toast: "Notify configuration successfully verified"
7. Navigate to your project's Settings tab. Under Secrets you should see a new `notify_api_key` secret created. Note you may need to refresh the page a few times to see this. Copy this secret into your deployment as the `NOTIFY_API_SECRET` environment variable. Deploy again.

### Test and view notifications

Now you should have a fully functioning dapp that is capable of sending notifications with the Web3Inbox SDK.

First, test that you can subscribe to notifications by going to your dapp's public URL, connect your wallet, sign the SIWE message in your wallet, and press subscribe. Approximately every 12 seconds you should see a "New block" notification in the dapp's UI.

To quality for bounties, notifications must be visible [app.web3inbox.com](https://app.web3inbox.com) or one of our sample wallets that supports Web3Inbox notifications (TODO).

### Sending notifications

   1. Send test notification button in the gm-hackers dapp.
   2. Use [WalletConnect Cloud](https://cloud.walletconnect.com) broadcast feature.
   3. Make a request to Notify API. The example below showcases how to send a notification to all subscribers.

      ```js
      // Replace NEXT_PUBLIC_PROJECT_ID with your project ID from WalletConnect Cloud
      const projectId = "NEXT_PUBLIC_PROJECT_ID";
      // Replace NOTIFY_API_SECRET with your notify_api_secret generated in WalletConnect Cloud
      const notifyApiSecret = "NOTIFY_API_SECRET";

      const headers = {
        Authorization: `Bearer ${notifyApiSecret}`,
      };

      // 1. Get the list of subscribers for your project
      const subscribersRes = await fetch(
        `https://notify.walletconnect.com/${projectId}/subscribers`,
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
        `https://notify.walletconnect.com/${projectId}/notify`,
        {
          method: "POST",
          headers,
          body,
        }
      )
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.error("error", error));
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
