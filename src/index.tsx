import React from 'react';

export const FeatureFlagsContext = React.createContext({});

export enum AvailableFlags { }

type Children = JSX.Element[] | JSX.Element | null | string;
export const FeatureFlags = (props: { children: Children }) => (
  <FeatureFlagsContext.Provider value={flags}>
    {props.children}
  </FeatureFlagsContext.Provider>
);

interface Prop {
  name: AvailableFlags;
  children: Children;
}
export const Flag = (props: Prop) => {
  return (
    <FeatureFlagsContext.Consumer>
      {(flagsObj: { [key: string]: boolean }) =>
        flagsObj[props.name] ? props.children : null
      }
    </FeatureFlagsContext.Consumer>
  );
};

type FlagsType = { [key in AvailableFlags]: boolean };
const flags: FlagsType = {};
