import React from 'react';
import { mount } from 'enzyme';
import PlacesAutocomplete from '../index';
import { setupGoogleMock } from './helpers/setup';

beforeAll(() => {
  setupGoogleMock();
});

test('loading prop check', () => {
  const childProp = jest.fn();
  childProp.mockReturnValue(
    <div>
      <input />
      Test Render
    </div>
  );
  const component = mount(
    <PlacesAutocomplete
      highlightFirstSuggestion={false}
      onChange={() => {}}
      onSelect={() => {}}
      shouldFetchSuggestions={true}
      value="test"
    >
      {childProp}
    </PlacesAutocomplete>
  );

  // simulate fetching predictions
  const el = component.find(PlacesAutocomplete);
  el.instance().fetchPredictions();

  // there is 1 setState in the callback, so we end up with 3 renders
  expect(childProp).toHaveBeenCalledTimes(3);
  const expected = [false, true, false];
  childProp.mock.calls.forEach((call, i) => {
    expect(call[0]).toMatchObject({ loading: expected[i] });
  });
});
