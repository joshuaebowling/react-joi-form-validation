# react-joi-form-validation

Created with CodeSandbox

# React Joi Form Validation

For both of the above reasons, I'd really like a means to apply Joi validations in a React context.

## Most Recent Sandbox

I'm having trouble keeping sandboxes synced so I'm going to leave the latest link [here](https://codesandbox.io/s/youthful-allen-lh22k)

## Overview

[Joi](https://github.com/sideway/joi) is perhaps the most extensive validation library available in JS. It was originally baked into [hapi.js](https://hapi.dev/), a production-ready, api framework.
For both of the above reasons, I'd really like a means to apply Joi validations in a React context.

## There's already an library for that... why do this?

[here](https://github.com/greena13/react-joi-validation) is a link to the repo. It may work well, but I personally can't stand wrapping my components in this way. Its a hard pass for that reason. I'd much prefer to integrate the validation into a component to wrapping my components. That's just one issue I have with this.

The second issue applies more broadly to "form" validation. Having used 2 popular form validation options, [React Hook Form](https://react-hook-form.com/) and shitee... can't remember the name of the other. At any rate, they both feel "extra" -- too much of a learning curve and/or too much change in code flow/structure. Also, both of those options are _react specific_. While I love react, that doesn't help me with my server-side validations. I really don't want to write two sets of validation on my own dime. And don't get me started on controlled vs uncontrolled components...

## Challenges

### Joi was not designed for Client(DOM) initially

Specifically, it provides a single method, `validate` which will validate the whole schema -- meaning that that there's no good way to just validate a single field/property. To start, I'm going to **ignore** this problem and measure performance after I've built a decently complex form.

### Not all things that need to be validated are vanilla inputs.

In react-hook-form they have a concept of controlled vs uncontrolled components. Uncontrolled components require extra specification and code. While this is doable, I found the idea confusing at first and possibly unecessary -- this is what I hope to find out.

## Plan

~~I plan to `useState` for every property that needs to be validated and use change events to update that state's value. I don't know ultimately what this will look like. To start, I'm going as simple as possible and after I fiddled with it for a while, I imagine some patterns will present themselves -- allowing for some elegance and genericsm. But I will not be sacrificing simplicity, even if it means the code is a bit repetive and not as `dry` as possible. While these things are good, they're not ultimately important.~~
This was too convoluted because I'd have to place all those individual properties into and object to be validated against the schema. Instead, I've chosen to put the `model` in state `useState()` in the hook. Then when `update` is called (see below), the code will update the model in hook state `currentModel` by using the `property` argument as the key. See src/forms/CreateUser.tsx for example invocations.

2. From the `useValidate` call I'm returning (amongst other things) an `update` which requires two arguments; namely, `property` and `value`.
   While `value` should be obvious, `property` is worth a brief explanation: `property` should correspond to a property on the Joi `Schema` passed into `useValidate`. It doesn't have to be, indeed there are no limitations in this regard. In fact, the property doesn't even have to be on the inital model passed in to `useValidate`. It's my sincere goal to keep this as simple as possible and not bother with customization via the hook, but rather use patterns to implement complexity that can be passed thru/to the hook.

## API (However upstart)

### In

As of now, I'm trying a hook approach. the hook, `useValidate` requires 3 arguments: 1. schema (Joi Object)

2. model (object that represent the model to validate).
3. options: See joi validate options arguments [here](https://joi.dev/api/?v=17.3.0#anyvalidatevalue-options)
4. onSubmit: this function will be wrapped by `handleSubmit` (see Out section) and only execute when `isValid`. This is just a convenience wrapper.

- onSubmit should expect argument `model` which will be the `currentValue` from the hook. It should reflect all properties of the origally-set object when the hook was created + any that may have been added (for better or worse) -- in other words, the aggregate of the original and updates. See `useValidate.tsx.update` for code.

5. onInvalidSubmit: this function will be wrapped in the `handleSubmit` and will execute when status `isValid` = false. Should expect the arguments
1. `errors`: an object of { [propertyName]: [message] } structure.
1. `joiError`: the original joi error object
1. `model`: the latest `currentModel` from hook state.

See `./src/forms/CreateUser.tsx` for current approach. `useValidate` will return and object with the following properties.

### Out

1. update -- the method used to update values to be validated against the schema. See `forms/CreateUser.tsx` for example
2. isValid -- `true` if `.validate` returns `undefined`, otherwise `false`
3. currentModel -- the current state of the model originally passed in using `useValidate`. As mentioned above, using the `update` method any property could be added. Incidentally, after each `update` the model itself is replaced by way of `assign`. See `useValidate.ts` for relevant codes.
4. errors -- an object with keys for each property and values for each error. As of now, it appears that with my configuration that joi will stop validating after finding the first error. This is OK for now. But, it could obviously be made configurable via and `options` object passed to `useValidate`.
5. handleSubmit -- a function that will wrap `onSubmit` and `onInvalidSubmit` in a function will invoke each one based on their correspondence to the current validation state, the `isValid` value from `useValidate.tsx`
