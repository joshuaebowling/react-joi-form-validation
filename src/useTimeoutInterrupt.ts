import { useState } from "react";

const useTimeoutInterrupt: () => (
  todo: () => void,
  waitFor: number
) => void = () => {
  const [currentTO, setCurrentTO] = useState<number | null>(null);
  const timeoutInterrupt = (todo, waitFor) => {
    if (currentTO) {
      clearTimeout(currentTO);
    }
    let timeout = setTimeout(() => {
      todo();
    }, waitFor);
    setCurrentTO(timeout);
  };
  return timeoutInterrupt;
};

// export class TimeoutInterrupt {
//   TO: number | null = null;
//   todo: () => void | null = null;
//   waitFor: number | null = null;
//   timeoutInterrupt = () => {
//     if (this.TO) clearTimeout(this.TO);
//     let timeout = setTimeout(() => {
//       this.todo();
//     }, this.waitFor);
//     this.TO = timeout;
//   };
//   constructor(todo: () => void, waitFor: number) {
//     this.todo = todo;
//     this.waitFor = waitFor;
//     this.timeoutInterrupt = this.timeoutInterrupt.bind(this);
//   }
// }

export default useTimeoutInterrupt;
