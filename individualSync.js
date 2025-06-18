const Test = require('./src/models/Test');

async function syncIndividualModel() {
  try {
    await Test.sync({ alter: true }); // Sincroniza apenas o modelo Test
    console.log('Modelo Test sincronizado.');
  } catch (error) {
    console.error('Erro ao sincronizar o modelo Test:', error);
  }
}

syncIndividualModel();