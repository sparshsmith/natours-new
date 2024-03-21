const ping = require('ping');

const hosts = ['mailtrap.io', 'google.com'];

hosts.forEach(host => {
    ping.sys.probe(host, (isAlive) => {
        const msg = isAlive ? `${host} is alive` : `${host} is dead`;
        console.log(msg);
    });
});
