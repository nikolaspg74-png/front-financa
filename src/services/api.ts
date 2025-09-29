// src/services/api.ts
const BASE_URL = 'https://financial-server-66as.onrender.com/api';

export const api = {
  // Buscar todas as transações
  getTransacoes: async (): Promise<any[]> => {
    try {
      console.log('🔄 Buscando transações da API...');
      const response = await fetch(`${BASE_URL}/transacoes`);
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Transações recebidas:', data);
      return data;
    } catch (error) {
      console.error('❌ Erro ao buscar transações:', error);
      return [];
    }
  },

  // Buscar resumo
  getResumo: async (): Promise<{receitas: number, despesas: number, balanco: number}> => {
    try {
      const response = await fetch(`${BASE_URL}/resumo`);
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('❌ Erro ao buscar resumo:', error);
      return { receitas: 0, despesas: 0, balanco: 0 };
    }
  },

  // Adicionar nova transação
  addTransacao: async (transacao: any): Promise<any> => {
    try {
      const response = await fetch(`${BASE_URL}/transacoes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transacao)
      });
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('❌ Erro ao adicionar transação:', error);
      throw error;
    }
  },

  // Deletar transação
  deleteTransacao: async (id: number): Promise<any> => {
    try {
      const response = await fetch(`${BASE_URL}/transacoes/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('❌ Erro ao deletar transação:', error);
      throw error;
    }
  }
};