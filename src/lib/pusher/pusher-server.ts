import Pusher from 'pusher';

export const pusherServer = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'mt1',
  useTLS: process.env.NEXT_PUBLIC_PUSHER_TLS === 'true',
  host: process.env.NEXT_PUBLIC_PUSHER_HOST!,
  port: process.env.NEXT_PUBLIC_PUSHER_PORT || '6001',
});