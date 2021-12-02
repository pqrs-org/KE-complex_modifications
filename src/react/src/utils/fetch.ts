export const baseUrl = () => {
  switch (process.env.NODE_ENV) {
    case "development":
      return "https://ke-complex-modifications.pqrs.org";
  }

  return `${window.location.protocol}//${window.location.host}${window.location.pathname}`.replace(
    /\/$/,
    ""
  );
};
