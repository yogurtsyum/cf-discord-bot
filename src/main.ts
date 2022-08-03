import { Router } from 'itty-router';
import { verifyKey } from 'discord-interactions';
import { InteractionType, APIInteractionResponse, InteractionResponseType } from 'discord-api-types/v10';
import { RawInteractionData } from 'discord.js/typings/rawDataTypes';
const router = Router();

declare global {
  const DISCORD_PUBLIC_KEY: string;
}

router.post('/', async (request) => {
  const message = await (request as any).json() as RawInteractionData;

  if (message.type === InteractionType.Ping) {
    return new Response(JSON.stringify({ type: 1 }), { status: 200 });
  } else if (message.type === InteractionType.ApplicationCommand) {
    if (message.data.name === 'hello') {
      const response: APIInteractionResponse = {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          content: 'Hello world!'
        }
      }

      return new Response(JSON.stringify(response), {
        status: 200, headers: {
          'Content-Type':
            'application/json'
        }
      });
    }
  }
});

const handlePost = async (e: any) => {
  const signature = e.request.headers.get('x-signature-ed25519');
  const timestamp = e.request.headers.get('x-signature-timestamp');
  if (!signature || !timestamp) {
    return new Response(JSON.stringify({ error: 'Failed to verify request' }), {
      status: 401
    });
  } else {
    const body = await e.request.clone().arrayBuffer();
    const isValidRequest = verifyKey(body, signature, timestamp, DISCORD_PUBLIC_KEY);
    if (!isValidRequest) {
      return new Response(JSON.stringify({ error: 'Failed to verify request' }), {
        status:
          401
      });
    } else {
      return await router.handle(e.request);
    }
  }
}

addEventListener('fetch', (e: any) => {
  if (e.request.method === 'POST') {
    e.respondWith(handlePost(e));
  } else {
    e.respondWith(router.handle(e.request));
  }
});