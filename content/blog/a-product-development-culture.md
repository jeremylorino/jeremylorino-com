---
title: "A Product Development Culture"
summary: "For me the answer is simple — the environment in which people develop a product with a common ethos. But what are the primitives that make up this culture."
publishedAt: "2017-12-17"
readingTime: "3 min read"
category: "Leadership & Strategy"
tags:
  - "Software Development"
  - "Product Development"
mediumUrl: "https://medium.com/@jeremylorino/a-product-development-culture-e160ab8ec226"
---

> What is a product development culture?

For me the answer is simple — the environment in which people develop a product with a common ethos. But what are the primitives that make up this culture.

### What is the Product?

This is easy right? The product is what we are all working so hard to deliver to a customer or a user.

Wait, so is it that slide deck we presented? Or is it the outcome of my last sprint? Or better yet, is the product my little piece of code I just checked in?

I would say the product is none of the above. The slide deck, sprint deliverable, code; these are just “things” we produced in an effort to deliver an *experience.*

### The Experience

A feature should be pleasantly surprising or even a choice.

To achieve this every member of a team should respect the delivery pipeline. The reality of delivering is that most of the time something **will** go wrong. Being aware of this eventuality allows the team to become prepared and even proactive in these situations rather than being disruptively reactive.

Without a doubt the most important part of delivery is rollback process. And I implore anyone to challenge that statement.

Removing the stigma associated with rolling back a release is a large part of becoming proactive towards failures or incidents of any kind. But before that can happen a team must have a delivery and release process that can be trusted and predictable.


Feature flag driven development is one method teams employ and allows for a “dark deployment”. Releases are deployed in an *inactive* state with the rollout controlled by feature flags. When the feature is enabled for users then the associated release becomes live. Disabling the feature flag is all that is required to rollback the release. This becomes extremely powerful when these features can be enabled/disabled by the product owner or even the user.

> “We expect this feature to affect this metric. If it doesn’t, it’s gone.”

### All Together Now

Earlier I defined a Product Development Culture as the environment in which people develop a product with a common *ethos.*

> ethos (noun)the characteristic spirit of a culture, era, or community as manifested in its beliefs and aspirations.

I will paraphrase to emphasize my point:

*the characteristic spirit of a community’s beliefs and aspirations*

Cohesion is paramount to a healthy product development culture.

> We are all in the same boat. It does not matter what type, color, or size of your oar; just that we are all rowing in the same direction.

*Inspired by*

[Google Cloud](https://medium.com/u/4f3f4ee0f977) — Adrian Hilton

## Reliable releases and rollbacks - CRE life lessons

### Editor's note: One of the most common causes of service outages is releasing a new version of the service binaries; no…

cloudplatform.googleblog.com

[Kent Beck](https://medium.com/u/db2690bcb10e)

## Taming Complexity with Reversibility

### If you intend to scale, you are going to have to draw your sword and sever one of the heads of the Complexity Beast. To…

m.facebook.com
