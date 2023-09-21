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
3. Deploy your app to a public URL. Note you will need to set the `NEXT_PUBLIC_PROJECT_ID` environment variable to your Project ID from step. Some options to create your repo and deploy to a public URL include:
   - If you have already used this Github template, deploy yourself to Vercel/Netlify
   - If you have NOT created a repo yet, one click deploy to [Vercel here]()
   - If you have NOT created a repo yet, one click deploy to [Netlify here]()
4. Back in the WalletConnect Cloud, navigate to your project's APIs tab. Under Notify API Step 1, provide your public URL as the dapp URL. Click Save.
6. Still on Notify API section, you should see a `Notify API Secret`. Copy this secret into your deployment as the `NOTIFY_API_SECRET` environment variable. Make sure to update the environment variables on your local environment as well as on your deployment platform.
7. Next, you will need to host the two files on this page at the `/.well-known/` directory of your public URL. You can do this by saving them to the `/public/.well-known/` directory of your fork of this template repo. Note that you will need to overwrite the two files that already exist.

   - Download `did.json` (Step 2: “Download did:web”) and place it at `/public/.well-known/did.json`
   - Download `wc-notify-config.json` (Step 3: “Download template”) to `/public/.well-known/wc-notify-config.json`
     - Update the `description` field in `wc-notify-config.json` to the description of your app.
   - Update your `pages/index.tsx` client initialization to include the hostname of your deployment.

     ```js
     const isW3iInitialized = useInitWeb3InboxClient({
       projectId,
       domain: "your-hack-project.vercel.app",
     });
     ```

   - Deploy your changes in `/public/.well-known/` to your public URL (e.g. by committing and pushing).

8. Once the new files are deployed, on the APIs tab in Cloud, find the toggle switch next to the Notify API section and switch it on. You should see a success toast: "Notify configuration successfully verified"

### Test and view notifications

Now you should have a fully functioning dapp that is capable of sending notifications with the Web3Inbox SDK.

First, test that you can subscribe to notifications by going to your dapp's public URL, connect your wallet, sign the SIWE message in your wallet, and press subscribe. Approximately every 12 seconds you should see a "New block" notification in the dapp's UI.

To quality for bounties, notifications must be visible [app.web3inbox.com](https://app.web3inbox.com) or one of our sample wallets that supports Web3Inbox notifications (TODO). Note that these automated notifications will only be sent to your account if you have the UI open and with the same account connected.

### Sending notifications

1.  Send test notification button in the gm-hackers dapp.
2.  Use [WalletConnect Cloud](https://cloud.walletconnect.com) broadcast feature.
3.  Make a request to Notify API. The example below showcases how to send a notification to all subscribers.

    ```js
    // Your project ID from WalletConnect Cloud
    const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
    // notify_api_secret generated in WalletConnect Cloud
    const notifyApiSecret = process.env.NOTIFY_API_SECRET;

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

    const notifyRes = await fetch(
      `https://notify.walletconnect.com/${projectId}/notify`,
      {
        method: "POST",
        headers,
        body,
      }
    );
    const result = await notifyRes.json();
    console.log(result);
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
