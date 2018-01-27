export default function (time, forwardedParams) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(forwardedParams);
    }, time);
  });
}
