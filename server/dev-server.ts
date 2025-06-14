import express from 'express';
import type { Express } from 'express';
import type { Server } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const log = (message: string) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${message}`);
};

export async function setupDevServer(app: Express, server: Server) {
  try {
    const vite = await import('vite');
    const devServer = await vite.createServer({
      server: { 
        middlewareMode: true,
        hmr: {
          server: server
        }
      },
      appType: 'custom',
      root: path.resolve(__dirname, '../client'),
      base: '/',
      optimizeDeps: {
        entries: [
          path.resolve(__dirname, '../client/index.html')
        ]
      },
      assetsInclude: ['**/*.html']
    });

    app.use(devServer.middlewares);

    // Обработка всех остальных маршрутов
    app.use('*', async (req, res, next) => {
      try {
        const url = req.originalUrl;
        
        if (!url.startsWith('/api')) {
          const indexHtml = await fs.readFile(
            path.resolve(__dirname, '../client/index.html'),
            'utf-8'
          );
          
          const transformedHtml = await devServer.transformIndexHtml(url, indexHtml);
          res.status(200).set({ 'Content-Type': 'text/html' }).end(transformedHtml);
        } else {
          next();
        }
      } catch (e) {
        const error = e as Error;
        console.error(error);
        next(error);
      }
    });

    return devServer;
  } catch (error) {
    console.error('Failed to start Vite dev server:', error);
    throw error;
  }
}

export function setupProdServer(app: Express) {
  const publicDir = path.resolve(__dirname, '../dist/public');
  app.use(express.static(publicDir));
  
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(publicDir, 'index.html'));
    }
  });
} 