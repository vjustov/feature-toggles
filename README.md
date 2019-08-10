# Feature Flags ts

A simple package that implements feature toggles for JS and React using Typescript.

## Using the Feature Flags

in `src/config/FeatureFlags.tsx` you will see that there is an object with all the flags, you just add a new flag to the AvailableFlags and to the flags object. Like so:

```js
export enum AvailableFlags {
  resubmitButton = 'resubmitButton'
}
// ...
const flags = {
  resubmitButton: true
};
```

Then you are free to use the Flag Component passing it a name to flag that is protecting the childrens

```jsx
<Flag name={AvailableFlags.resubmitButton}>
  <button>Resubmit</button>
</Flag>
```
