import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

const cloudSyncStore = new Map<string, any>();

function cloudSyncPlugin(): Plugin {
  return {
    name: 'cloud-sync-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url || '', 'http://localhost:3000');

        if (url.pathname === '/api/sync/save' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const parsed = JSON.parse(body);
              if (parsed.syncCode && parsed.data) {
                cloudSyncStore.set(parsed.syncCode.toUpperCase(), parsed.data);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, syncCode: parsed.syncCode, savedAt: new Date().toISOString() }));
                return;
              }
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Missing syncCode or data' }));
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
            }
          });
          return;
        }

        if (url.pathname === '/api/sync/load' && req.method === 'GET') {
          const code = url.searchParams.get('code')?.toUpperCase();
          if (code && cloudSyncStore.has(code)) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, data: cloudSyncStore.get(code) }));
            return;
          }
          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Sync code not found' }));
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), cloudSyncPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
