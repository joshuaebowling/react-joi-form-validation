# react-joi-form-validation

Created with CodeSandbox

# React Joi Form Validation

For both of the above reasons, I'd really like a means to apply Joi validations in a React context.

## Overview

[Joi](https://github.com/sideway/joi) is perhaps the most extensive validation library available in JS. It was originally baked into [hapi.js](https://hapi.dev/), a production-ready, api framework.
For both of the above reasons, I'd really like a means to apply Joi validations in a React context.

## There's already an library for that... why do this?

[here](https://github.com/greena13/react-joi-validation) is a link to the repo. It may work well, but I personally can't stand wrapping my components in this way. Its a hard pass for that reason. I'd much prefer to integrate the validation into a component to wrapping my components. That's just one issue I have with this.

The second issue applies more broadly to "form" validation. Having used 2 popular form validation options, [React Hook Form](https://react-hook-form.com/) and shitee... can't remember the name of the other. At any rate, they both feel "extra" -- too much of a learning curve and/or too much change in code flow/structure. Also, both of those options are _react specific_. While I love react, that doesn't help me with my server-side validations. I really don't want to write two sets of validation on my own dime. And don't get me started on controlled vs uncontrolled components...

## Challenges

### Joi is not designed for DOM

Specifically, it provides a single method, `validate` which will validate the whole schema -- meaning that that there's no good way to just validate a single field/property. To start, I'm going to **ignore** this problem and measure performance after I've built a decently complex form.

### Not all things that need to be validated are vanilla inputs.

In react-hook-form they have a concept of controlled vs uncontrolled components. Uncontrolled components require extra specification and code. While this is doable, I found the idea confusing at first and possibly unecessary -- this is what I hope to find out.

I plan to `useState` for every property that needs to be validated and use change events to update that state's value. I don't know ultimately what this will look like. To start, I'm going as simple as possible and after I fiddled with it for a while, I imagine some patterns will present themselves -- allowing for some elegance and genericsm. But I will not be sacrificing simplicity, even if it means the code is a bit repetive and not as `dry` as possible. While these things are good, they're not ultimately important.

## Plan

As of now, I'm trying a hook approach. the hook, `useValidate` requires 2 arguments: Schema (Joi Object), Model (object that represent the model to validate). See `./src/forms/CreateUser.tsx` for current approach
