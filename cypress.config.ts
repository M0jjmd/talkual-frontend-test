import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    defaultCommandTimeout: 5000,
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // Configuración adicional si es necesario
    },
  },
});
