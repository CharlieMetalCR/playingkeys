import React, { useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

interface PianoKeyProps {
  note: string;
  isBlack?: boolean;
  onPress: (note: string) => void;
  width?: number;
  height?: number;
}

const PianoKey: React.FC<PianoKeyProps> = ({
  note,
  isBlack = false,
  onPress,
  width = 40,
  height = 120,
}) => {
  const handlePress = useCallback(() => {
    onPress(note);
  }, [note, onPress]);

  return (
    <TouchableOpacity
      style={[
        styles.key,
        isBlack ? styles.blackKey : styles.whiteKey,
        {
          width: isBlack ? width * 0.6 : width,
          height: isBlack ? height * 0.6 : height,
        },
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    />
  );
};

interface PianoKeyboardProps {
  octave?: number;
  onNotePress?: (note: string) => void;
}

const PianoKeyboard: React.FC<PianoKeyboardProps> = ({
  octave = 4,
  onNotePress,
}) => {
  const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const blackNotes = ['C#', 'D#', null, 'F#', 'G#', 'A#', null];

  const playSound = useCallback(async (note: string) => {
    try {
      // In a real implementation, you would load actual audio files
      // For now, we'll just log the note
      console.log(`Playing note: ${note}${octave}`);
      
      // Example of how to play sound with expo-av:
      // const { sound } = await Audio.Sound.createAsync(
      //   require(`../assets/sounds/${note}${octave}.mp3`)
      // );
      // await sound.playAsync();
      
      if (onNotePress) {
        onNotePress(`${note}${octave}`);
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }, [octave, onNotePress]);

  return (
    <View style={styles.keyboard}>
      {notes.map((note, index) => (
        <View key={note} style={styles.keyContainer}>
          <PianoKey
            note={`${note}${octave}`}
            onPress={playSound}
          />
          {blackNotes[index] && (
            <View style={styles.blackKeyContainer}>
              <PianoKey
                note={`${blackNotes[index]}${octave}`}
                isBlack
                onPress={playSound}
              />
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 10,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
  },
  keyContainer: {
    position: 'relative',
  },
  key: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
    borderRadius: '0 0 4 4',
  },
  whiteKey: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#000000',
    marginHorizontal: 1,
  },
  blackKeyContainer: {
    position: 'absolute',
    right: -8,
    zIndex: 1,
  },
  blackKey: {
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#333333',
  },
});

export default PianoKeyboard;