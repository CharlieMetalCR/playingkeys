import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { BookOpen, CheckCircle, Circle, Clock } from 'lucide-react-native';

interface Lesson {
  id: string;
  title: string;
  unit: string;
  status: 'completed' | 'in-progress' | 'not-started';
  difficulty: number;
}

const lessons: Lesson[] = [
  {
    id: '1',
    title: 'Take Off',
    unit: 'Unit 1: Higher & Lower',
    status: 'completed',
    difficulty: 1,
  },
  {
    id: '2',
    title: 'Landing',
    unit: 'Unit 1: Higher & Lower',
    status: 'completed',
    difficulty: 1,
  },
  {
    id: '3',
    title: 'In a Canoe',
    unit: 'Unit 1: Higher & Lower',
    status: 'in-progress',
    difficulty: 1,
  },
  {
    id: '4',
    title: 'Space Ship',
    unit: 'Unit 1: Higher & Lower',
    status: 'not-started',
    difficulty: 1,
  },
  {
    id: '5',
    title: 'A Secret',
    unit: 'Unit 2: p, f, Repeated Notes',
    status: 'not-started',
    difficulty: 2,
  },
];

export default function LessonsScreen() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={20} color="#10b981" />;
      case 'in-progress':
        return <Clock size={20} color="#f59e0b" />;
      default:
        return <Circle size={20} color="#94a3b8" />;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <BookOpen size={32} color="#3b82f6" />
        <Text style={styles.title}>Lessons</Text>
      </View>

      <View style={styles.content}>
        {lessons.map((lesson) => (
          <TouchableOpacity key={lesson.id} style={styles.lessonCard}>
            <View style={styles.lessonHeader}>
              <View style={styles.lessonInfo}>
                {getStatusIcon(lesson.status)}
                <View style={styles.lessonDetails}>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <Text style={styles.lessonUnit}>{lesson.unit}</Text>
                </View>
              </View>
              <View style={styles.difficulty}>
                <Text style={styles.difficultyText}>
                  {'★'.repeat(lesson.difficulty)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginLeft: 12,
  },
  content: {
    padding: 20,
  },
  lessonCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lessonInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  lessonDetails: {
    marginLeft: 12,
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  lessonUnit: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  difficulty: {
    marginLeft: 12,
  },
  difficultyText: {
    fontSize: 14,
    color: '#f59e0b',
  },
});