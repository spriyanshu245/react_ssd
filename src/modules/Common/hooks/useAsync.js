import { useEffect, useCallback, useState } from "react";

export default function useAsync(asyncFn, immediate) {
  let [isLoading, setIsLoading] = useState(immediate ? true : false);

  const memoizedRunner = useCallback(runner, []);

  useEffect(() => {
    immediate && memoizedRunner();
  }, [memoizedRunner, immediate]);

  return [isLoading, memoizedRunner];

  async function runner() {
    try {
      setIsLoading(true);
      return await asyncFn();
    } catch (e) {
      throw e;
    } finally {
      setIsLoading(false);
    }
  }
}
