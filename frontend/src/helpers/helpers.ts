export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const handleLogin = (token: string) => {
  console.log(token);
};
