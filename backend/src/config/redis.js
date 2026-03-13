const { createClient }  = require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-17770.c83.us-east-1-2.ec2.cloud.redislabs.com',
        port: 17770
    }
});

redisClient.on("error", (err) => {
    console.log("Redis Error:", err);
});
module.exports = redisClient;