import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "node:path"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        sourcemap: true,
        rollupOptions: {
            onLog(level, log, handler) {
                if (log.cause && log.cause.message === `Can't resolve original location of error.`) {
                    return
                }
                handler(level, log)
            }
        }
    },
})
