let globalRouter = null;

export const setRouter = (router) => {
  globalRouter = router;
};

export const redirectTo = (path) => {
  if (globalRouter) {
    globalRouter.replace(path);
  } else {
    console.error("Router is not set");
  }
};
