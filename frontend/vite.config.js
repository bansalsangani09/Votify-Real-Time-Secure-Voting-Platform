import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react()],
        server: {
            port: 5173,
            proxy: {
                '/api': {
                    target: env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000',
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
        build: {
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            if (id.includes('recharts') || id.includes('d3')) {
                                return 'vendor-charts';
                            }
                            if (id.includes('@dnd-kit')) {
                                return 'vendor-dnd';
                            }
                            if (id.includes('framer-motion')) {
                                return 'vendor-motion';
                            }
                        }
                    }
                }
            }
        }
    }
})
