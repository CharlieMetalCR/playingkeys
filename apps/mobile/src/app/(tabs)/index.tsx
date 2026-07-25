import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Music, BookOpen, Users, Settings } from 'lucide-react-native';
import PianoKeyboard from '../components/PianoKeyboard';

export default function HomeScreen() {
  const handleNotePress = (note: string) => {
    console.log('Note pressed:', note);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Music size={32} color="#3b82f6" />
        <Text style={styles.title}>PlayingKeys</Text>
        <Text style={styles.subtitle}>Learn Piano Interactive</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Practice Piano</Text>
        <PianoKeyboard octave={4} onNotePress={handleNotePress} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actions}>
          <View style={styles.actionItem}>
            <BookOpen size={24} color="#3b82f6" />
            <Text style={styles.actionText}>Lessons</Text>
          </View>
          <View style={styles.actionItem}>
            <Users size={24} color="#10b981" />
            <Text style={styles.actionText}>My Teacher</Text>
          </View>
          <View style={styles.actionItem}>
            <Settings size={24} color="#6b7280" />
            <Text style={styles.actionText}>Settings</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Progress</Text>
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Unit 1: Higher & Lower</Text>
          <Text style={styles.progressText}>3/10 lessons completed</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '30%' }]} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionItem: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minWidth: 100,
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    color: '#475569',
  },
  progressCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  progressText: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
});