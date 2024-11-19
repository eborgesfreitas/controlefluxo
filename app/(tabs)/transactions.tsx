import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddTransactionScreen() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleConfirmDate = (selectedDate: Date) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleAddTransaction = async () => {
    if (!description || !amount || isNaN(Number(amount))) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente.');
      return;
    }

    const newTransaction = {
      id: new Date().toString(),
      description,
      amount: parseFloat(amount),
      date,
    };

    try {
      // Carregar transações existentes do AsyncStorage
      const data = await AsyncStorage.getItem('transactions');
      let transactions = data ? JSON.parse(data) : [];

      // Adicionar nova transação
      transactions.push(newTransaction);

      // Salvar transações de volta no AsyncStorage
      await AsyncStorage.setItem('transactions', JSON.stringify(transactions));

      // Limpar os campos
      setDescription('');
      setAmount('');
      setDate(new Date());

      Alert.alert('Sucesso', 'Transação adicionada com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
      Alert.alert('Erro', 'Não foi possível adicionar a transação.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Transação</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Valor"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      
      <Text style={styles.dateText}>
        Data: {date.toLocaleDateString()}
      </Text>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={date}
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />

      <Button title="Adicionar Transação" onPress={handleAddTransaction} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
});
