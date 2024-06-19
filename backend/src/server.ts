interface ServerInfo {
  url: string;
  priority: number;
}

const SERVERS: ServerInfo[] = [
  {
    url: 'https://does-not-work.perfume.new',
    priority: 1,
  },
  {
    url: 'https://gitlab.com',
    priority: 4,
  },
  {
    url: 'http://app.scnt.me',
    priority: 3,
  },
  {
    url: 'https://offline.scentronix.com',
    priority: 2,
  },
];

const findServer = async (): Promise<ServerInfo> => {
  let onlineLowestPriorityServer: ServerInfo | undefined = undefined;

  const updateLowestPriorityServer = (server: ServerInfo) => {
    if (onlineLowestPriorityServer == undefined || server.priority < onlineLowestPriorityServer.priority) {
      onlineLowestPriorityServer = server;
    }
  };

  const promises = SERVERS.map(async (server) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    try {
      const response = await fetch(server.url, { signal: controller.signal });
      if (response.status >= 200 && response.status <= 299) {
        updateLowestPriorityServer(server);
      }
    } catch (error) {
      console.log('Error or timeout: ', server.url);
    } finally {
      clearTimeout(timeout);
    }
  });

  await Promise.all(promises);

  if (onlineLowestPriorityServer) {
    return onlineLowestPriorityServer;
  }

  return Promise.reject(new Error('No online server'));
};

export { findServer };
