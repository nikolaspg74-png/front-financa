// src/components/InputArea/index.tsx
import { useState } from 'react';
import { categories } from '../../data/categories';
import * as C from './styles';

type Props = {
  onAdd: (item: any) => void;
}

export const InputArea = (props: Props) => {
  const { onAdd } = props;
  const [dateField, setDateField] = useState('');
  const [categoryField, setCategoryField] = useState('');
  const [titleField, setTitleField] = useState('');
  const [valueField, setValueField] = useState(0);

  let categoryKeys: string[] = Object.keys(categories);

  const handleAddEvent = () => {
    let errors: string[] = [];

    if(isNaN(new Date(dateField).getTime())) {
      errors.push('Data inválida!');
    }
    if(!categoryKeys.includes(categoryField)) {
      errors.push('Categoria inválida!');
    }
    if(titleField === '') {
      errors.push('Título vazio!');
    }
    if(valueField <= 0) {
      errors.push('Valor inválido!');
    }

    if(errors.length > 0) {
      alert(errors.join("\n"));
    } else {
      onAdd({
        id: Math.random(),
        date: new Date(dateField),
        category: categoryField,
        title: titleField,
        value: valueField
      });
      clearFields();
    }
  }

  const clearFields = () => {
    setDateField('');
    setCategoryField('');
    setTitleField('');
    setValueField(0);
  }

  return (
    <C.Container>
      <C.InputLabel>
        <C.InputTitle>Data</C.InputTitle>
        <C.Input 
          type="date" 
          value={dateField}
          onChange={e => setDateField(e.target.value)}
        />
      </C.InputLabel>
      
      <C.InputLabel>
        <C.InputTitle>Categoria</C.InputTitle>
        <C.Select 
          value={categoryField}
          onChange={e => setCategoryField(e.target.value)}
        >
          <option value="">Selecione uma categoria</option>
          {categoryKeys.map((key, index) => (
            <option key={index} value={key}>
              {categories[key].title}
            </option>
          ))}
        </C.Select>
      </C.InputLabel>
      
      <C.InputLabel>
        <C.InputTitle>Título</C.InputTitle>
        <C.Input 
          type="text" 
          value={titleField}
          onChange={e => setTitleField(e.target.value)}
          placeholder="Digite o título"
        />
      </C.InputLabel>
      
      <C.InputLabel>
        <C.InputTitle>Valor</C.InputTitle>
        <C.Input 
          type="number" 
          value={valueField || ''}
          onChange={e => setValueField(parseFloat(e.target.value) || 0)}
          placeholder="0.00"
          step="0.01"
        />
      </C.InputLabel>
      
      <C.InputLabel>
        <C.InputTitle>&nbsp;</C.InputTitle>
        <C.Button onClick={handleAddEvent}>Adicionar</C.Button>
      </C.InputLabel>
    </C.Container>
  );
}