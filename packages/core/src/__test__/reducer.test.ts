import { createReducer } from '../reducer';
import fn = jest.fn;

describe('reducer', () => {
  it('calls event handler', () => {
    const expectedReturnValue = {};
    const actionValue = {};
    const state = {};
    const handler = fn().mockReturnValue(expectedReturnValue);
    const reducer = createReducer()({
      a: handler,
    });

    const actualReturnValue = reducer(state, 'a', actionValue);

    expect(handler).toBeCalledTimes(1);
    expect(handler).toBeCalledWith(state, actionValue);
    expect(actualReturnValue).toBe(expectedReturnValue);
  });

  it('does not call other events handlers', () => {
    const handlerB = fn();
    const handlerC = fn();
    const reducer = createReducer()({
      a: fn(),
      b: handlerB,
      c: handlerC,
    });

    reducer({}, 'a', undefined);

    expect(handlerB).not.toBeCalled();
    expect(handlerC).not.toBeCalled();
  });

  it('can use Symbol actions', () => {
    const action = Symbol('action');
    const handler = fn();
    const value = {};
    const state = {};
    const reducer = createReducer()({
      [action]: handler,
    });

    reducer(state, action, value);

    expect(handler).toBeCalledTimes(1);
    expect(handler).toBeCalledWith(state, value);
  });

  it('throws for unknown event', () => {
    const reducer = createReducer()({
      a: fn(),
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => reducer({}, 'b' as any, {})).toThrow();
  });

  it('throws for undefined handler', () => {
    const invalidHandlers = {
      a: undefined as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    };

    expect(() => createReducer()(invalidHandlers)).toThrow();
  });

  it('throws for undefined handler of a Symbol action', () => {
    const action = Symbol('action');
    const invalidHandlers = {
      [action]: undefined as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    };

    expect(() => createReducer()(invalidHandlers)).toThrow();
  });
});