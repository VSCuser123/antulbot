const mineflayer = require('mineflayer');
const http = require('http');

// 1. "Заплатка", чтобы Replit не выключался (порт 8080)
http.createServer((req, res) => {
  res.write("Server is running!");
  res.end();
}).listen(8080);

// 2. Настройки твоего сервера
const botArgs = {
    host: 'TulenSMP.aternos.me',
    port: 25565,
    username: 'Tulen_Guardian', // Сделал имя в стиле тюленя :)
    version: '1.17.1'            // Твоя версия Fabric 1.17.1
};

function createBot() {
    const bot = mineflayer.createBot(botArgs);

    bot.on('spawn', () => {
        console.log('--- Бот успешно зашел на TulenSMP! ---');
        
        // Anti-AFK цикл: прыжок и поворот раз в 20 секунд
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
                
                const yaw = bot.entity.yaw + 0.8;
                bot.look(yaw, 0);
                console.log('Выполнено Anti-AFK действие');
            }
        }, 20000);
    });

    // Авто-реконнект при вылете
    bot.on('end', () => {
        console.log('Связь потеряна. Переподключение через 40 секунд...');
        setTimeout(createBot, 40000);
    });

    bot.on('error', (err) => {
        if (err.code === 'ECONNREFUSED') {
            console.log('Ошибка: Сервер Aternos выключен. Бот ждет включения...');
        } else {
            console.log('Ошибка:', err);
        }
    });
}

createBot();