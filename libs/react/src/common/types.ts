type TReactInputs<TInputs> = TInputs;
type TReactOutputs<TOutputs> = Partial<Record<keyof TOutputs, (value: TOutputs[keyof TOutputs]) => void>>;

export type {
  TReactInputs,
  TReactOutputs,
}