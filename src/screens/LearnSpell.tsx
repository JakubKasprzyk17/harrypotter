import { StyleSheet, Text, Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Svg, { Line } from 'react-native-svg';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  clamp
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture
} from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import {
  CompositeNavigationProp,
  NavigationProp,
  RouteProp
} from '@react-navigation/native';
import {
  AppNavigatorParamsList,
  AppRoutes,
  BottomNavigatorParamsList,
  BottomRoutes
} from '@src/types/Navigation';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@src/constants/screen';
import IconButton from '@src/components/IconButton';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@src/styles/colors';
import { toast } from '@src/utils/toast';
import { useTranslation } from 'react-i18next';
import { getImage } from '@src/utils/getImage';
import { SpellToLearn } from '@src/data/spellsToLearn';

const tolerance = 20;

interface LearnSpellProps {
  route: RouteProp<AppNavigatorParamsList, AppRoutes.LearnSpell>;
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<
      BottomNavigatorParamsList,
      BottomRoutes.SpellsDictionary
    >,
    NavigationProp<AppNavigatorParamsList, AppRoutes>
  >;
}

const LearnSpell = ({ route, navigation }: LearnSpellProps) => {
  const { item } = route.params;
  const { t } = useTranslation();
  const timerLimit = item.pattern.length * 750;

  const translationX = useSharedValue<number>(0);
  const translationY = useSharedValue<number>(0);
  const prevTranslationX = useSharedValue<number>(0);
  const prevTranslationY = useSharedValue<number>(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: translationX.value },
      { translateY: translationY.value }
    ]
  }));

  const [currentSpell, setCurrentSpell] = useState<SpellToLearn | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [visitedSteps, setVisitedSteps] = useState<boolean[]>([]);
  const [gestureEnabled, setGestureEnabled] = useState<boolean>(true);
  const [timer, setTimer] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null
  );
  const [failed, setFailed] = useState<boolean>(false);

  useEffect(() => {
    setCurrentSpell(item);
    const initialVisitedSteps = new Array(item.pattern.length).fill(false);
    initialVisitedSteps[0] = true;
    setVisitedSteps(initialVisitedSteps);

    translationX.value = item.pattern[0].x;
    translationY.value = item.pattern[0].y;
  }, []);

  const startTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }

    setTimer(0);
    const newTimerInterval = setInterval(() => {
      setTimer(prevTime => {
        if (prevTime >= timerLimit) {
          clearInterval(newTimerInterval);
          toast.error(t('Errors.timeIsUp'));
          setFailed(true);
          setGestureEnabled(false);
        }
        return prevTime + 100;
      });
    }, 100);
    setTimerInterval(newTimerInterval);
  };

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
  };

  const animateToTarget = (x: number, y: number) => {
    translationX.value = withSpring(x, { damping: 10, stiffness: 100 });
    translationY.value = withSpring(y, { damping: 10, stiffness: 100 });
  };

  const resetSpell = () => {
    const initialVisitedSteps = new Array(item.pattern.length).fill(false);
    initialVisitedSteps[0] = true;

    setVisitedSteps(initialVisitedSteps);
    setCurrentStep(0);
    setTimer(0);
    setFailed(false);
    setGestureEnabled(true);
    translationX.value = item.pattern[0].x;
    translationY.value = item.pattern[0].y;
    startTimer();
  };

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
      startTimer();
    })
    .onUpdate(event => {
      if (!currentSpell || !gestureEnabled) return;

      const currentTarget = currentSpell.pattern[currentStep];

      const newX = prevTranslationX.value + event.translationX;
      const newY = prevTranslationY.value + event.translationY;

      if (
        Math.abs(newX - currentTarget.x) <= tolerance &&
        Math.abs(newY - currentTarget.y) <= tolerance
      ) {
        visitedSteps[currentStep] = true;
        setVisitedSteps([...visitedSteps]);

        animateToTarget(currentTarget.x, currentTarget.y);

        if (currentStep === currentSpell.pattern.length - 1) {
          stopTimer();
          setGestureEnabled(false);
          toast.success(t('spellLearnt'));
        } else {
          setCurrentStep(
            clamp(currentStep + 1, 0, currentSpell.pattern.length - 1)
          );
        }
      }
    })
    .runOnJS(true);

  const renderNeonLines = () => {
    if (!currentSpell) return null;

    return (
      <Svg
        height={SCREEN_HEIGHT}
        width={SCREEN_WIDTH}
        style={StyleSheet.absoluteFill}
      >
        {currentSpell.pattern.map((point, index) => {
          if (index === 0) return null;
          const prevPoint = currentSpell.pattern[index - 1];
          return (
            <Line
              key={index}
              x1={SCREEN_WIDTH / 2 + prevPoint.x}
              y1={SCREEN_HEIGHT / 2 + prevPoint.y}
              x2={SCREEN_WIDTH / 2 + point.x}
              y2={SCREEN_HEIGHT / 2 + point.y}
              stroke={visitedSteps[index] ? Colors.GREEN : Colors.RED}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="10, 5"
            />
          );
        })}
      </Svg>
    );
  };

  const renderTargetPoints = () => {
    return currentSpell?.pattern.map((point, index) => {
      const isVisited = visitedSteps[index];
      return (
        <Animated.View
          key={index}
          style={[
            s.targetPoint,
            {
              backgroundColor: isVisited ? Colors.GREEN : Colors.RED,
              left: SCREEN_WIDTH / 2 + point.x - 17.5,
              top: SCREEN_HEIGHT / 2 + point.y - 17.5
            }
          ]}
        />
      );
    });
  };

  return (
    <GestureHandlerRootView style={s.container}>
      <LinearGradient
        colors={[Colors.MAGIC_PURPLE, Colors.MAGIC_VIOLET]}
        style={s.background}
      />
      {renderNeonLines()}
      {renderTargetPoints()}
      <GestureDetector gesture={pan}>
        <Animated.View style={[animatedStyles, s.magicBall]} />
      </GestureDetector>

      <IconButton
        style={s.backButton}
        icon={<Ionicons name="chevron-back" size={30} color={Colors.BLACK} />}
        onPress={() => navigation.goBack()}
      />

      <Text style={s.spellName}>{currentSpell?.name}</Text>
      <Image source={getImage(item.image)} style={s.spellImage} />
      <Text style={s.timer}>{t('time', { time: timer / 1000 })}</Text>

      {failed && (
        <Pressable onPress={resetSpell} style={s.tryAgainButton}>
          <Text style={s.tryAgainText}>{t('Try Again')}</Text>
        </Pressable>
      )}
    </GestureHandlerRootView>
  );
};

export default LearnSpell;

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  background: {
    ...StyleSheet.absoluteFillObject
  },
  magicBall: {
    width: 60,
    height: 60,
    backgroundColor: Colors.BALL_BLUE,
    borderRadius: 30,
    shadowColor: 'cyan',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 15
  },
  spellName: {
    position: 'absolute',
    top: 50,
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.WHITE
  },
  spellImage: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 75
  },
  targetPoint: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    position: 'absolute',
    borderWidth: 2,
    borderColor: Colors.WHITE
  },
  timer: {
    position: 'absolute',
    bottom: 50,
    fontSize: 18,
    color: Colors.WHITE,
    fontWeight: 'bold'
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: Colors.SILVER,
    borderRadius: 5
  },
  backButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold'
  },
  tryAgainButton: {
    position: 'absolute',
    bottom: 150,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.RED,
    borderRadius: 5
  },
  tryAgainText: {
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: 'bold'
  }
});
