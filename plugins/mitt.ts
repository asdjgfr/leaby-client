import mitt from "mitt";
import type { ApplicationEvents } from "~/types/mitt";

export default defineNuxtPlugin(() => {
  const emitter = mitt<ApplicationEvents>();

  return {
    provide: {
      ...emitter,
    },
  };
});
