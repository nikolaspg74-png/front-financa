// src/components/TableItem/index.tsx
import { formatDate } from '../../helpers/dateFilter';
import * as C from './styles';

type Props = {
    item: any;
    onDelete: (id: number) => void;
    onEdit: (item: any) => void;
}

export const TableItem = ({ item, onDelete, onEdit }: Props) => {
    // Cores fixas baseadas no nome da categoria
    const getColor = (category: string) => {
        switch(category) {
            case 'Salário':
            case 'salary':
                return 'green';
            case 'Aluguel': 
            case 'rent':
                return 'brown';
            case 'Carro':
            case 'car':
                return 'orange';
            case 'Cartão':
            case 'creditCard':
                return 'red';
            default:
                return '#666';
        }
    };

    const isExpense = (category: string) => {
        return ['Aluguel', 'Carro', 'Cartão', 'rent', 'car', 'creditCard'].includes(category);
    };

    const categoryColor = getColor(item.category);
    const valueColor = isExpense(item.category) ? 'red' : 'green';

    const handleDelete = () => {
        if (window.confirm(`Tem certeza que deseja deletar "${item.title}"?`)) {
            onDelete(item.id);
        }
    };

    const handleEdit = () => {
        onEdit(item);
    };

    return (
        <C.TableLine>
            <C.TableColumn>{formatDate(item.date)}</C.TableColumn>
            <C.TableColumn>
                <C.Category color={categoryColor}>
                    {item.category}
                </C.Category>
            </C.TableColumn>
            <C.TableColumn>{item.title}</C.TableColumn>
            <C.TableColumn>
                <C.Value color={valueColor}>
                    R$ {item.value.toFixed(2)}
                </C.Value>
            </C.TableColumn>
            <C.TableColumn>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                        onClick={handleEdit}
                        style={{
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
                    >
                        ✏️ Editar
                    </button>
                    <button 
                        onClick={handleDelete}
                        style={{
                            backgroundColor: '#f44336',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#da190b'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f44336'}
                    >
                        🗑️ Deletar
                    </button>
                </div>
            </C.TableColumn>
        </C.TableLine>
    );
}