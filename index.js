const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'TulenSMP.aternos.me', // Твой адрес Атерноса
  port: 25565,                // Порт (обычно стандартный)
  username: 'Tulen_Guardian',
  version: '1.21.1',          // Для 1.21.10 используй 1.21.1 (протокол совпадает)
  auth: 'offline'             // ОБЯЗАТЕЛЬНО для пиратского сервера
});

bot.on('spawn', () => {
  console.log('Тюлень заплыл на сервер!');
  bot.chat('Всем привет! Я охраняю шахматный дворец.');
});

bot.on('kicked', (reason) => console.log('Меня выкинули: ', reason));
bot.on('error', (err) => console.log('Ошибка: ', err));
