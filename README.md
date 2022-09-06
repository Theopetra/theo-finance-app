## About

This is the source code for https://app.theopetralabs.com

It serves as the client for onboarding USDC and ETH into the project treasury.

Primary contributors are https://github.com/rojogorilla, https://github.com/GlassCloud, and  https://github.com/BowTiedAztec

## Getting Started

### Install fnm

https://github.com/Schniz/fnm

Run `fnm use` to install and switch to the project's nodejs version.

### Install yarn

`npm i -g yarn`

### Install dependencies

`yarn`

### Environment variables

Copy .env.example to .env and optionally supply values for your infura or alchemy nodes.

There is another variable for whitelist expiry you can set to simulate pre- and post-whitelist states.

### Run

`yarn dev`

### Switch to Goerli

In dev, the app currently only talks to Goerli.

If you get a gnarly error on startup, make sure you switch to Goerli.
