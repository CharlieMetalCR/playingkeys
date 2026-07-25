import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { CheckCircle, Circle, Clock, ChevronRight } from 'lucide-react-native';

type LessonStatus = 'completed' | 'in-progress' | 'not-started';

interface Lesson {
  id: string;
  title: string;
  unit: string;
  status: LessonStatus;
  difficulty: number;
}

const SAMPLE_LESSONS: Lesson[] = [
  { id: '1', title: 'Take Off', unit: 'Unit 1: Higher & Lower', status: 'completed', difficulty: 1 },
  { id: '2', title: 'Landing', unit: 'Unit 1: Higher & Lower', status: 'completed', difficulty: 1 },
  { id: '3', title: 'In a Canoe', unit: 'Unit 1: Higher & Lower', status: 'in-progress', difficulty: 1 },
  { id: '4', title: 'Space Ship', unit: 'Unit 1: Higher & Lower', status: 'not-started', difficulty: 1 },
  { id: '5', title: 'A Secret', unit: 'Unit 2: Dynamics', status: 'not-started', difficulty: 2 },
  { id: '6', title: 'Rock Band', unit: 'Unit 2: Dynamics', status: 'not-started', difficulty: 2 },
];

function StatusIcon({ status }: { status: LessonStatus }) {
  switch (status) {
    case 'completed':
      return <CheckCircle size={20} color="#10b981" />;
    case 'in-progress':
      return <Clock size={20} color="#f59e0b" />;
    default:
      return <Circle size={20} color="#cbd5e1" />;
  }
}

export default function LessonsScreen() {
  const router = useRouter();

  const grouped = SAMPLE_LESSONS.reduce<Record<string, Lesson[]>>((acc, lesson) => {
    if (!acc[lesson.unit]) acc[lesson.unit] = [];
    acc[lesson.unit].push(lesson);
    return acc;
  }, {});

  return (
    <ScrollView style={styles.container}>
      {Object.entries(grouped).map(([unit, lessons]) => (
        <View key={unit} style={styles.unitSection}>
          <Text style={styles.unitTitle}>{unit}</Text>
          {lessons.map((lesson) => (
            <Pressable
              key={lesson.id}
              style={styles.lessonCard}
              onPress={() => router.push(`/lesson/${lesson.id}`)}
            >
              <StatusIcon status={lesson.status} />
              <View style={styles.lessonInfo}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <Text style={styles.difficulty}>
                  {'★'.repeat(lesson.difficulty)}{'☆'.repeat(3 - lesson.difficulty)}
                </Text>
              </View>
              <ChevronRight size={18} color="#94a3b8" />
            </Pressable>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  unitSection: { padding: 16 },
  unitTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  lessonInfo: { flex: 1, marginLeft: 12 },
  lessonTitle: { fontSize: 16, fontWeight: '600', color: '#1e293b' },
  difficulty: { fontSize: 12, color: '#f59e0b', marginTop: 2 },
});