import {useEffect, useRef} from 'react';

const useInterval = (handler: () => void, DT: number) => {
  const savedCallback = useRef<() => void>(handler);

  useEffect(() => {
    savedCallback.current = handler;
  }, [handler]);

  useEffect(() => {
    const id = setInterval(() => {
      savedCallback.current();
    }, DT);
    return () => clearInterval(id);
  }, [DT]);
};

export default useInterval;
