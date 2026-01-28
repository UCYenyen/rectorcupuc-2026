import Pusher from 'pusher-js';

export const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  wsHost: process.env.NEXT_PUBLIC_PUSHER_HOST!,
  wsPort: parseInt(process.env.NEXT_PUBLIC_PUSHER_PORT!),
  wssPort: parseInt(process.env.NEXT_PUBLIC_PUSHER_PORT!),
  forceTLS: process.env.NEXT_PUBLIC_PUSHER_TLS === 'true',
  disableStats: true,
  enabledTransports: ['ws', 'wss'],
});