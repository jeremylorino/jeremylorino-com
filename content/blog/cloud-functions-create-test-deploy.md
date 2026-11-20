---
title: "Cloud Functions — Create, Test, Deploy"
subtitle: "How to setup, test, and continuously deploy Firebase Cloud Functions v1.0"
summary: "So Firebase recently released version 1 of their Cloud Functions. This came with some breaking changes; for those of you that were using Firebase Cloud Functions prior to v1."
publishedAt: "2018-04-17"
readingTime: "3 min read"
category: "Engineering & Makers"
tags:
  - "Node.js"
  - "Google Cloud Platform"
  - "Firebase Cloud Functions"
  - "Continuous Deployment"
  - "Cloud Firestore"
relatedProjectTitle: "Cloud Functions & BigQuery Data Pipelines"
mediumUrl: "https://medium.com/google-cloud/cloud-functions-create-test-deploy-dc2e725778b9"
---

> All code show is available in [this](https://github.com/jeremylorino/firebase-functions-unittest-cd) git repository. As always feel free to contribute, steal, or do nothing; your choice ;)

So Firebase recently [released version 1](https://firebase.googleblog.com/2018/04/launching-cloud-functions-for-firebase-1-0.html) of their [Cloud Functions](https://firebase.google.com/docs/functions/beta-v1-diff). This came with some breaking changes; for those of you that were using Firebase Cloud Functions prior to v1.

It also came with a nice little [unit test suite](https://firebase.google.com/docs/functions/unit-testing); which *totally* beats copying and pasting the unit test mocks from the [Google Cloud](https://medium.com/u/4f3f4ee0f977) [GitHub](https://github.com/googleapis/nodejs-firestore/tree/master/test) ;) So lets dive in…

## What’s on tap…

- Two — [Firebase Authentication Triggers](https://firebase.google.com/docs/functions/auth-events)
- One — [Cloud Pub/Sub Trigger](https://firebase.google.com/docs/functions/pubsub-events)
- Five — [Firebase Cloud Function Unit Tests](https://firebase.google.com/docs/functions/unit-testing)
- One — [Google Cloud Automated Build Trigger](https://cloud.google.com/container-builder/docs/running-builds/automate-builds)

## Setup

> [Firebase suggests](https://firebase.google.com/docs/functions/get-started?#set_up_and_initialize) you develop locally with Node.js v.6.11.5, but since we are going to write everything in TypeScript and let the transpiler do magic we will use Node.js LTS v8.10.0. It works…no worries :)

### Clone the git repo:

```bash
git clone git@github.com:jeremylorino/firebase-functions-unittest-cd.git
```

### Install Node.js dependencies

```bash
npm install
```

### Get some Google Cloud service account credentials

- Go to **API Manager → Credentials**
- Click **New Credentials** and create a service account (or [create one directly](https://console.cloud.google.com/project/_/apiui/credential/serviceaccount))
- Download the JSON key file for this service account, and set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to point to that file:

```bash title="Set credentials (Linux / macOS / Windows)"
# Linux / macOS
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service_account_file.json

# Windows (CMD)
set GOOGLE_APPLICATION_CREDENTIALS=/path/to/service_account_file.json

# Windows (PowerShell)
$env:GOOGLE_APPLICATION_CREDENTIALS="/path/to/service_account_file.json"
```

Read more about [Google Cloud Platform Authentication](https://cloud.google.com/docs/authentication#projects_and_resources).

### Authenticate with [Firebase CLI](https://firebase.google.com/docs/cli/)

```bash title="firebase-cli-login"
$ npm run firebase:login

> firebase-functions-unittest-cd@1.0.0 firebase:login /home/ubuntu/workspace/firebase-functions-unittest-cd
> npm run firebase -- login --no-localhost

> firebase-functions-unittest-cd@1.0.0 firebase /home/ubuntu/workspace/firebase-functions-unittest-cd
> firebase "login" "--no-localhost"

? Allow Firebase to collect anonymous CLI usage and error reporting information? Yes

Visit this URL on any device to log in:
https://accounts.google.com/o/oauth2/auth?client_id=...

? Paste authorization code here: 4/my-auth-code

✔  Success! Logged in as jeremylorino@gmail.com
```

### Initialize the project directory

> Be sure to select your Firebase project from the list

- Select TypeScript from the language prompt
- Yes to TSLint
- **NO** to all the “Overwrite” questions
- Yes to install dependencies

```bash title="init-firebase"
$ npm run firebase:init:functions

> firebase-functions-unittest-cd@1.0.0 firebase:init:funcs /home/ubuntu/workspace/firebase-functions-unittest-cd
> npm run firebase -- init functions

> firebase-functions-unittest-cd@1.0.0 firebase /home/ubuntu/workspace/firebase-functions-unittest-cd
> firebase "init" "functions"


     ######## #### ########  ######## ########     ###     ######  ########
     ##        ##  ##     ## ##       ##     ##  ##   ##  ##       ##
     ######    ##  ########  ######   ########  #########  ######  ######
     ##        ##  ##    ##  ##       ##     ## ##     ##       ## ##
     ##       #### ##     ## ######## ########  ##     ##  ######  ########

You're about to initialize a Firebase project in this directory:

  /home/ubuntu/workspace/firebase-functions-unittest-cd


=== Project Setup

First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add,
but for now we'll just set up a default project.

? Select a default Firebase project for this directory: (Use arrow keys)
  [don't setup a default project]
❯ My Firebase Project (myproject-198914)
  [create a new project]
```

### Then test it!

```bash
npm test
```

```text title="firebase-func-setup"
=== Functions Setup

A functions directory will be created in your project with a Node.js
package pre-configured. Functions can be deployed with firebase deploy.

? What language would you like to use to write Cloud Functions?
  JavaScript
❯ TypeScript

? Do you want to use TSLint to catch probable bugs and enforce style? Yes
? File functions/package.json already exists. Overwrite? No
i  Skipping write of functions/package.json
? File functions/tslint.json already exists. Overwrite? No
i  Skipping write of functions/tslint.json
i  Skipping write of functions/tsconfig.json
? File functions/src/index.ts already exists. Overwrite? No
i  Skipping write of functions/src/index.ts
? Do you want to install dependencies with npm now? No

npm notice created a lockfile as package-lock.json. You should commit this file.
added 570 packages from 469 contributors in 29.528s

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...

✔  Firebase initialization complete!
```

## Now what did we just do?

Lets dig into one of the function definitions…

```typescript title="firebaseUserCreate.ts"
export const userCreate = functions.auth.user()
  .onCreate((user, context) => {
    const db = admin.firestore();
    return db.runTransaction(async (transaction) => {
      const userId = db.doc(`user/${user.uid}`);
      transaction.set(userId, {
        displayName: user.displayName,
        email: user.email,
        phone: user.phoneNumber || ''
      });

      const uacId = db.doc(`user_access_control/${user.uid}`);
      transaction.set(uacId, {
        permissions: {}
      });

      return {
        userId,
        uacId
      };
    });
  });
```
*Cloud Function triggered by the creation of a Firebase Authentication User*


This little snippet is one of the two Firebase Authentication Triggers. When a new Firebase User is created it writes the user’s info to a Firestore document along with a document that will hold the effective permissions for user access control.

Then we have its associated unit test.

```typescript title="user.test.ts"
describe('onCreate', () => {
  it('should create firestore user documents', async () => {
    const fakeUser = faker.helpers.userCard();
    const userInfo: UserRecord = test.auth.exampleUserRecord();
    userInfo.metadata.lastSignInTime = null;
    userInfo.displayName = fakeUser.name;
    userInfo.email = fakeUser.email;
    userInfo.disabled = false;
    userInfo.emailVerified = false;

    const wrapped = test.wrap(myFunctions.userCreate);
    const result = await wrapped(userInfo);

    const { userId, uacId } = result;
    createdDocuments.push(userId, uacId);

    const user = await userId.get();
    should(user.data()).have.properties({
      // id: userId.id,
      email: userInfo.email,
      phone: userInfo.phoneNumber || '',
      displayName: userInfo.displayName,
    });

    const uac = await uacId.get();
    should(uac.data()).have.properties({
      permissions: {}
    });
  });
});
```

- Line 3–9: mock Firebase *UserRecord*
- Line 11–12: execute the *userCreate* function with the mock *UserRecord*
- Line 17–28: assert the function executed as expected

## Now for some continuous deployment

First we will need a Firebase CI token

```bash
npm run firebase:citoken
```

- Navigate to [Build Triggers](https://console.cloud.google.com/project/_/gcr/triggers)
- Connect to git repo
- Set ‘Build Configuration’ to use the *cloudbuild.yaml*
- Set the value of *_FIREBASE_TOKEN* to what was received from the above command

> **Video Demo:** [Home - events](https://www.useloom.com/share/3e4b3946c28b4227bc5ede4d9cefab14)

## The End
