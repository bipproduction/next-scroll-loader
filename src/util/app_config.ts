
// this file is generated by next-dev, optionally you can edit it
const port = process.env.PORT || 3005;
const localhost = `http://localhost:${port}`;
const serverHost = 'https://wibu-server.wibudev.com';
const isLocal = process.env.NODE_ENV === 'development';
const app_config = {
    title: 'Wibu Server',
    description: 'Server Untuk Wibu',
    host:  isLocal ? localhost : serverHost,
    isLocal
}

export default app_config;
