import {Suspense} from "react";

const LazyWrapper = (Component) => {
  return (
    <Suspense>
      <Component />
    </Suspense>
  )
};

export default LazyWrapper;