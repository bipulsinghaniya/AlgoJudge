const { createClient }  = require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-12260.crce300.ap-south-1-2.ec2.cloud.redislabs.com',
        port: 12260
    }
});

redisClient.on("error", (err) => {
    console.log("Redis Error:", err);
});
module.exports = redisClient;