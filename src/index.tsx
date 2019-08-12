import React from 'react';

export const FeatureFlagsContext = React.createContext({});

export enum AvailableFlags {
  testFlag = 'testFlag',
}

type Children = JSX.Element[] | JSX.Element | null | string;
export const FeatureFlags = (props: { children: Children; values: {} }) => (
  <FeatureFlagsContext.Provider value={props.values || flags}>
    {props.children}
  </FeatureFlagsContext.Provider>
);

interface Prop {
  name: AvailableFlags | string;
  children: Children;
}
export const Flag = (props: Prop) => {
  let name;
  if (typeof props.name === 'string' && props.name in AvailableFlags) {
    name = AvailableFlags[props.name as keyof typeof AvailableFlags];
  }

  return (
    <FeatureFlagsContext.Consumer>
      {(flagsObj: { [key: string]: boolean }) =>
        flagsObj[props.name] ? props.children : null
      }
    </FeatureFlagsContext.Consumer>
  );
};

type FlagsType = { [key in AvailableFlags]: boolean };
const flags: FlagsType = {
  [AvailableFlags.testFlag]: true,
};
