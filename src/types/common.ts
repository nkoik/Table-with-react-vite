export type ComponentProps<T> = T extends
  | React.ComponentType<infer P>
  | React.Component<infer P>
  ? React.JSX.LibraryManagedAttributes<T, P>
  : never;