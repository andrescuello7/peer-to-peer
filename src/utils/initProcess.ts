import { initFactory } from "../factory/initFactory";

export const InitProcess = () => {
  const init: initFactory = initFactory.Initial();
  const client = process.argv.slice(2)[0]?.split(":") ?? null;

  init.setInit({
    host: "127.0.0.1",
    port: Number(process.env.PORT),
  });

  if (client !== null) {
    init.setInit({
      host: client[0]?.toString(),
      port: Number(client[1]),
    });
  }
};
