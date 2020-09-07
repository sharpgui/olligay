import { join } from "path";

interface configIn {
    viewDir: string;
    staticDir: string;
    env: string | undefined;
    port?: number;
    memoryFlag?: string | boolean;
}

let config: configIn = {
    viewDir: join(__dirname, "..", "views"),
    staticDir: join(__dirname, "..", "assets"),
    env: process.env.NODE_ENV,
    port: 8080,
    memoryFlag: false
}

if(process.env.NODE_ENV === 'development') {
    config = {
        ...config,
        port: 8080
    }
} else if(process.env.NODE_ENV === 'production') {
    config = {
        ...config,
        port: 80,
        memoryFlag: 'memory'
    }
}

export default config;