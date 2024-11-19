import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Para navegação

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string; // Data da transação
}

export default function IndexScreen(): JSX.Element {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const navigation = useNavigation(); // Instanciando a navegação

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async (): Promise<void> => {
    try {
      const data = await AsyncStorage.getItem('transactions');
      if (data) setTransactions(JSON.parse(data));
    } catch (error) {
      console.error('Erro ao carregar transações:', error);
      Alert.alert('Erro', 'Não foi possível carregar as transações.');
    }
  };

  const calculateBalance = (): string => {
    const total = transactions.reduce(
      (total, item) => total + (isNaN(item.amount) ? 0 : item.amount),
      0
    );
    return total ? total.toFixed(2) : '0.00';
  };

  const removeTransaction = async (id: string): Promise<void> => {
    const updatedTransactions = transactions.filter((item) => item.id !== id);
    try {
      await AsyncStorage.setItem('transactions', JSON.stringify(updatedTransactions));
      setTransactions(updatedTransactions);
      Alert.alert('Sucesso', 'Transação removida com sucesso!');
    } catch (error) {
      console.error('Erro ao remover transação:', error);
      Alert.alert('Erro', 'Não foi possível remover a transação.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fluxo de Caixa</Text>
      <Text style={styles.balance}>R$ {calculateBalance()}</Text>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.transaction, item.amount < 0 ? styles.expense : styles.income]}>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionDescription}>{item.description}</Text>
              <Text style={[styles.transactionAmount, item.amount < 0 ? styles.expenseText : styles.incomeText]}>
                R$ {item.amount.toFixed(2)}
              </Text>
              <Text style={styles.transactionDate}>{new Date(item.date).toLocaleDateString()}</Text>
            </View>
            <TouchableOpacity onPress={() => removeTransaction(item.id)} style={styles.removeButton}>
              <Text style={styles.removeText}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
      />

    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  balance: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f8b75',
    marginBottom: 20,
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5, // shadow for Android
    shadowColor: '#000', // shadow for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 18,
    color: '#555',
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  transactionDate: {
    fontSize: 14,
    color: '#888',
  },
  expenseText: {
    color: '#e74c3c', // Red for expenses
  },
  incomeText: {
    color: '#2ecc71', // Green for income
  },
  expense: {
    backgroundColor: '#f8d7da', // Light red background for expenses
  },
  income: {
    backgroundColor: '#d4edda', // Light green background for income
  },
  removeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e74c3c',
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
  removeText: {
    fontSize: 18,
    color: '#fff',
  },
  addButton: {
    marginTop: 30,
    backgroundColor: '#1f8b75',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});
