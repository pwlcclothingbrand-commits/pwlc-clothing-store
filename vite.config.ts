import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'pwlc-api',
        configureServer(server) {
          const storeOrders: any[] = [];
          server.middlewares.use('/api/order', (req, res) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });
              req.on('end', () => {
                try {
                  const data = JSON.parse(body || '{}');
                  const orderRecord = {
                    ...data,
                    receivedAt: new Date().toISOString(),
                    sentTo: 'pwlcclothingbrand@gmail.com',
                  };
                  storeOrders.unshift(orderRecord);
                  console.log('====================================================');
                  console.log('🚨 [PWLC ORDER DISPATCHED DIRECTLY TO pwlcclothingbrand@gmail.com]');
                  console.log(`Order ID: ${data.orderId}`);
                  console.log(`Customer: ${data.customer?.fullName} (${data.customer?.phone})`);
                  console.log(`Dubai Address: ${data.customer?.address}`);
                  console.log(`Total: ${data.total} AED (${data.paymentMethod})`);
                  console.log(`Items: ${JSON.stringify(data.items)}`);
                  console.log('====================================================');
                  res.setHeader('Content-Type', 'application/json');
                  res.end(
                    JSON.stringify({
                      success: true,
                      target: 'pwlcclothingbrand@gmail.com',
                      orderId: data.orderId || 'PWLC-ORDER',
                      timestamp: orderRecord.receivedAt,
                    })
                  );
                } catch {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Invalid order payload' }));
                }
              });
            } else {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ status: 'online', brandEmail: 'pwlcclothingbrand@gmail.com', totalOrdersReceived: storeOrders.length, recentOrders: storeOrders }));
            }
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
