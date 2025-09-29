// src/App.tsx
import { useState, useEffect } from 'react';
import * as C from './App.styles';
import { categories } from './data/categories';
import { getCurrentMonth, filterListByMonth, formatDate } from './helpers/dateFilter';
import { TableArea } from './components/TableArea';
import { InfoArea } from './components/InfoArea';
import { InputArea } from './components/InputArea';
import { api } from './services/api';

const App = () => {
  const [list, setList] = useState<any[]>([]);
  const [filteredList, setFilteredList] = useState<any[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [loading, setLoading] = useState(true);

  // Converter dados da API para Item
  const convertApiToItem = (apiData: any) => {
    const [day, month, year] = apiData.data.split('/');
    return {
      id: apiData.id,
      date: new Date(parseInt(year), parseInt(month) - 1, parseInt(day)),
      category: apiData.categoria,
      title: apiData.titulo,
      value: apiData.valor
    };
  };

  // Converter Item para dados da API
  const convertItemToApi = (item: any) => {
    const dateStr = `${item.date.getDate().toString().padStart(2, '0')}/${(item.date.getMonth() + 1).toString().padStart(2, '0')}/${item.date.getFullYear()}`;
    
    // Determinar tipo baseado na categoria
    const categoryConfig = categories[item.category];
    const tipo = categoryConfig && categoryConfig.expense ? 'despesa' : 'receita';

    return {
      data: dateStr,
      categoria: item.category,
      titulo: item.title,
      valor: item.value,
      tipo: tipo
    };
  };

  // Carregar dados da API
  const loadData = async () => {
    try {
      setLoading(true);
      const transacoesData = await api.getTransacoes();
      
      const convertedList = transacoesData.map(convertApiToItem);
      setList(convertedList);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setFilteredList(filterListByMonth(list, currentMonth));
    
    // Debug: verificar categorias
    console.log('Lista de itens:', list);
    console.log('Categorias disponíveis:', Object.keys(categories));
    list.forEach((item: any) => {
      if (!categories[item.category]) {
        console.warn(`Categoria não encontrada: "${item.category}"`);
      }
    });
  }, [list, currentMonth]);

  useEffect(() => {
    let incomeCount = 0;
    let expenseCount = 0;

    for(let i in filteredList) {
      if(categories[filteredList[i].category]?.expense) {
        expenseCount += filteredList[i].value;
      } else {
        incomeCount += filteredList[i].value;
      }
    }

    setIncome(incomeCount);
    setExpense(expenseCount);
  }, [filteredList]);

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
  }

  const handleAddItem = async (item: any) => {
    try {
      const apiItem = convertItemToApi(item);
      await api.addTransacao(apiItem);
      await loadData();
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      alert('Erro ao adicionar transação. Tente novamente.');
    }
  }
  // No seu App.tsx, adicione estas funções:

const handleDeleteItem = async (id: number) => {
    try {
        await api.deleteTransacao(id);
        await loadData(); // Recarrega os dados
        alert('Item deletado com sucesso!');
    } catch (error) {
        console.error('Erro ao deletar item:', error);
        alert('Erro ao deletar transação. Tente novamente.');
    }
};

const handleEditItem = (item: any) => {
    console.log('Editando item:', item);
    alert(`Editando: ${item.title}\nValor: R$ ${item.value}\nCategoria: ${item.category}\nData: ${formatDate(item.date)}\n\nVocê pode implementar um modal de edição aqui!`);
};


  if (loading) {
    return (
      <C.Container>
        <C.Header>
          <C.HeaderText>Sistema Financeiro</C.HeaderText>
        </C.Header>
        <C.Body>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            Carregando seus dados financeiros...
          </div>
        </C.Body>
      </C.Container>
    );
  }

  return (
    <C.Container>
      <C.Header>
        <C.HeaderText>Sistema Financeiro</C.HeaderText>
      </C.Header>
      <C.Body>
        <InfoArea
          currentMonth={currentMonth}
          onMonthChange={handleMonthChange}
          income={income}
          expense={expense}
        />

        <InputArea onAdd={handleAddItem} />

        <TableArea  list={filteredList} 
    onDeleteItem={handleDeleteItem}
    onEditItem={handleEditItem} />
      </C.Body>
    </C.Container>
  );
}

export default App;