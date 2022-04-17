import { useState } from "react";

export default function useAsyncForm(asyncFn) {
  let [isProcessing, setIsProcessing] = useState();

  return [runner, isProcessing];

  async function runner(...args) {
    try {
      setIsProcessing(true);
      return await asyncFn(...args);
    } catch (e) {
      throw e;
    } finally {
      setIsProcessing(false);
    }
  }
}
