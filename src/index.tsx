import React, { ReactChildren, ReactElement } from 'react';

export const FeatureFlagsContext = React.createContext({});

export enum AvailableFlags { }

export const FeatureFlags = (props: { children: ReactElement }) => (
  <FeatureFlagsContext.Provider value={flags}>
    {props.children}
  </FeatureFlagsContext.Provider>
);

interface Prop {
  name: AvailableFlags;
  children: ReactChildren | ReactElement;
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

const flags = {};
