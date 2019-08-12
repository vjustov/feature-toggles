import React from 'react';

type FlagsType = { [key in AvailableFlags | string]: boolean };
export const FeatureFlagsContext = React.createContext({});

export enum AvailableFlags {
  testFlag = 'testFlag',
}

let _flags: FlagsType = {
  [AvailableFlags.testFlag]: true,
};

export const loadFlags = (flags: FlagsType) => {
  _flags = flags;
};

type Children = JSX.Element[] | JSX.Element | null | string;
export const FeatureFlags = (props: { children: Children; values: {} }) => (
  <FeatureFlagsContext.Provider value={props.values || _flags}>
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

export const flag = (
  name: AvailableFlags | string,
  onFlagTrue: () => void,
  // tslint:disable-next-line:no-empty
  onFlagFalse: () => void = () => {},
) => {
  if (_flags[name as keyof typeof AvailableFlags]) {
    onFlagTrue();
  } else {
    onFlagFalse();
  }
};
