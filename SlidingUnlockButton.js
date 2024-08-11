import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const buttonWidth = 80; // Width of the sliding button
const containerWidth = screenWidth * 0.8; // Width of the container
const slideDistance = containerWidth - buttonWidth; // Total distance the button can slide

export default function SlidingUnlockButton({ onUnlock }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const buttonPosition = useRef(new Animated.Value(0)).current;

  const unlockThreshold = slideDistance * 0.7; // Adjust this to set how far the button must slide to unlock (e.g., 90% of slideDistance)

  const resetButton = () => {
    Animated.timing(buttonPosition, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      setIsUnlocked(false);
    });
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      if (!isUnlocked) {
        let newValue = gestureState.dx;
        if (newValue > slideDistance) {
          newValue = slideDistance;
        }
        buttonPosition.setValue(newValue);
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dx >= unlockThreshold) {
        setIsUnlocked(true);
        Animated.timing(buttonPosition, {
          toValue: slideDistance,
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          if (onUnlock) onUnlock();
          resetButton(); // Reset the button position after unlocking
        });
      } else {
        resetButton(); // Reset the button position if not unlocked
      }
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Animated.View
          style={[
            styles.slider,
            {
              transform: [{ translateX: buttonPosition }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <Text style={styles.sliderText}>Slide to Unlock --></Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonContainer: {
    width: '80%',
    height: 50,
    backgroundColor: 'grey',
    borderRadius: 25,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  slider: {
    width: buttonWidth,
    height: '100%',
    backgroundColor: 'black',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  sliderText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
