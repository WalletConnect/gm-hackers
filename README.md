# GM Hackers (Web3Inbox, Next.js, wagmi, React, TypeScript)

🔗 Live dapp demo - https://hackers.gm.walletconnect.com/  
📚 WalletConnect Web3Inbox Docs - https://docs.walletconnect.com/2.0/web3inbox/core-components/usage

## Overview

<img width="1552" alt="Screenshot 2023-09-22 at 7 29 48 PM" src="https://github.com/WalletConnect/gm-hackers/assets/26746725/7a024b35-f5c6-490d-b5a5-ba7b918514bf">

Send notifications to a blockchain account using WalletConnect's Web3Inbox SDK.

This example dapp shows basic dapp usage of the Web3Inbox SDK to send a notification whenever there is a new Ethereum block.

Subscriptions to dapp notifications are synced across all devices that use the same blockchain account.

## Hacker guide

### Watch the tutorial guide 🖥️

https://www.loom.com/share/a7001711b8a94500b827a9d2655c8654?sid=1a36ccfa-9ee8-42a5-a882-9b78ac6e846a

### Deploy the example dapp

1. Head over [WalletConnect Cloud](https://cloud.walletconnect.com) and Sign in or Sign up if you don't have an account.
2. Create a project and take note of your Project ID.
3. Deploy your app to a public URL. Note you will need to set the `NEXT_PUBLIC_PROJECT_ID` environment variable to your Project ID from step #2. Some options to create your repo and deploy to a public URL include:
   - [Create repo & Deploy to Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FWalletConnect%2Fgm-hackers&env=NEXT_PUBLIC_PROJECT_ID&envDescription=Get%20your%20Project%20ID%20on%20WalletConnect%20Cloud.&envLink=https%3A%2F%2Fcloud.walletconnect.com%2F)
   - [Create repo & Deploy to Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/WalletConnect/gm-hackers)
   - Fork/clone this repo and deploy yourself
4. Back in the WalletConnect Cloud, navigate to your project's APIs tab. Under Notify API Step 1, provide your public URL as the dapp URL. Click Save.
5. Still on Notify API section, you should see a `Notify API Secret`. Copy this secret into your deployment as the `NOTIFY_API_SECRET` environment variable. Make sure to update the environment variables on your local environment as well as on your deployment platform.
6. Next, you will need to host the two files on this page at the `/.well-known/` directory of your public URL. You can do this by saving them to the `/public/.well-known/` directory of your fork of this template repo. Note that you will need to overwrite the two files that already exist.

   - Download `did.json` (Step 2: “Download did:web”) and place it at `/public/.well-known/did.json`
   - Download `wc-notify-config.json` (Step 3: “Download template”) to `/public/.well-known/wc-notify-config.json`
     - Update the `description` field in `wc-notify-config.json` to the description of your app.
   - Update your `NEXT_PUBLIC_APP_DOMAIN` environment variable to include the hostname of your deployment.
   - Deploy your changes in `/public/.well-known/` to your public URL (e.g. by committing and pushing).

7. Once the new files are deployed, on the APIs tab in Cloud, find the toggle switch next to the Notify API section and switch it on. You should see a success toast: "Notify configuration successfully verified"

### Managing environment variables

- [Vercel Environment variables](https://vercel.com/docs/projects/environment-variables)
- [Netlify Environment variables](https://docs.netlify.com/environment-variables/overview/)

### Test and view notifications

Now you should have a fully functioning dapp that is capable of sending notifications with the Web3Inbox SDK.

First, test that you can subscribe to notifications by going to your dapp's public URL, connect your wallet, sign the SIWE message in your wallet, and press subscribe. Approximately every 12 seconds you should see a "New block" notification in the dapp's UI.

To quality for bounties, notifications must be visible [app.web3inbox.com](https://app.web3inbox.com) or one of our sample wallets that supports Web3Inbox notifications. Note that these automated notifications will only be sent to your account if you have the UI open and with the same account connected.

Sample wallets to test notifications:

- [iOS](https://testflight.apple.com/join/09bTAryp)
- [Android](https://appdistribution.firebase.google.com/testerapps/1:1056012215045:android:1c076c984136751211cd6c/releases/410ohp8retc9o?utm_source=firebase-console)

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
