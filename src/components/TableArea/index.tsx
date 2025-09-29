// src/components/TableArea/index.tsx
import * as C from './styles';
import { TableItem } from '../TableItem';

type Props = {
    list: any[];
    onDeleteItem: (id: number) => void;
    onEditItem: (item: any) => void;
}

export const TableArea = ({ list, onDeleteItem, onEditItem }: Props) => {
    return (
        <C.Table>
            <thead>
                <tr>
                    <C.TableHeadColumn width={100}>Data</C.TableHeadColumn>
                    <C.TableHeadColumn width={130}>Categoria</C.TableHeadColumn>
                    <C.TableHeadColumn>Título</C.TableHeadColumn>
                    <C.TableHeadColumn width={150}>Valor</C.TableHeadColumn>
                    <C.TableHeadColumn width={150}>Ações</C.TableHeadColumn>
                </tr>
            </thead>
            <tbody>
                {list.map((item, index) => (
                    <TableItem 
                        key={index} 
                        item={item} 
                        onDelete={onDeleteItem}
                        onEdit={onEditItem}
                    />
                ))}
            </tbody>
        </C.Table>
    );
}