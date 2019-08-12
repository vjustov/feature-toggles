import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import { FeatureFlags, Flag, AvailableFlags } from '../src/index';

describe('flagging content', () => {
  it('renders the content if the flag is set', () => {
    const { getByText } = render(
      <FeatureFlags values={{ [AvailableFlags.testFlag]: true }}>
        <Flag name={AvailableFlags.testFlag}>
          <p>This is a test text</p>
        </Flag>
      </FeatureFlags>
    );

    expect(getByText('This is a test text')).toBeInTheDocument();
  });

  it('doesnt render the content if the flag is false', () => {
    const { queryByText } = render(
      <FeatureFlags values={{ testFlag: false }}>
        <Flag name={AvailableFlags.testFlag}>
          <p>This is a test text</p>
        </Flag>
      </FeatureFlags>
    );

    expect(queryByText('This is a test text')).not.toBeInTheDocument();
  });

  it('doesnt render the content if the flag doesnt exist', () => {
    const { queryByText } = render(
      <FeatureFlags values={{ testFlag: false }}>
        <Flag name={"nonexistingFlag"}>
          <p>This is a test text</p>
        </Flag>
      </FeatureFlags>
    );

    expect(queryByText('This is a test text')).not.toBeInTheDocument();
  });

  it('renders the content if the flag name is provided as a string', () => {
    const { queryByText } = render(
      <FeatureFlags values={{ testFlag: true }}>
        <Flag name={"testFlag"}>
          <p>This is a test text</p>
        </Flag>
      </FeatureFlags>
    );

    expect(queryByText('This is a test text')).toBeInTheDocument();
  });
});
