# React GM dApp (React, Typescript, Next.js, wagmi)

🔗 Live dapp demo - https://hack.gm.walletconnect.com/ <br />
📚 WalletConnect v2 Docs - https://docs.walletconnect.com/2.0

## Overview

This example aims to demonstrate dapp-facing use cases enabled by WalletConnect Notify API.

## Pre-requisites

1. Use this repo as a template or clone it.
2. Set up your local environment variables by copying the example into your own `.env.local` file

```bash
cp .env.local.example .env.local
```

3. Head over [WalletConnect Cloud](https://cloud.walletconnect.com)

   1. Sign in or sign up if you don't have an account.
   2. Create a project and copy the `projectId` and set it as the value of `NEXT_PUBLIC_PROJECT_ID` in your `.env.local`
   3. Enable Notify API by following the steps outlined in the API tab.
   4. Copy the `notify_subscribe_topic_private_key` generated in WalletConnect Cloud and set it as the value of `NOTIFY_PROJECT_SECRET` in your `.env.local`

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
