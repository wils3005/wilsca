declare module '*.pem' {
  const value: Buffer;
  export = value;
}

declare module '*.png' {
  const value: string;
  export = value;
}
