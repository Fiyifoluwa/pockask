import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

interface StockLevelProps {
  quantity: number;
}

const THRESHOLDS = {
  FULL: 50,
  HIGH: 30,
  MEDIUM: 10,
  LOW: 0,
};

const COLORS = {
  INACTIVE: '#E5E7EB',
  FULL: '#10B981',
  HIGH: '#34D399',
  MEDIUM: '#FBBF24',
  LOW: '#EF4444',
};

const getBarColor = (barIndex: number, stockLevel: number): string => {
  'worklet';
  const isActive = barIndex < stockLevel;
  if (!isActive) {
    return COLORS.INACTIVE;
  }

  switch (stockLevel) {
    case 4:
      return COLORS.FULL;
    case 3:
      return COLORS.HIGH;
    case 2:
      return COLORS.MEDIUM;
    default:
      return COLORS.LOW;
  }
};

const AnimatedBar = ({
  index,
  stockLevel,
}: {
  index: number;
  stockLevel: number;
}) => {
  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(getBarColor(index, stockLevel), {
      duration: 300,
    }),
    transform: [
      {
        scale: withSpring(index < stockLevel ? 1 : 0.95, {
          damping: 12,
          stiffness: 100,
        }),
      },
    ],
  }));

  return <Animated.View style={[styles.bar, animatedStyle]} />;
};

export const StockLevel: React.FC<StockLevelProps> = ({quantity}) => {
  const stockLevel = useMemo(() => {
    if (quantity === 0) {
      return 0;
    }
    if (quantity >= THRESHOLDS.FULL) {
      return 4;
    }
    if (quantity >= THRESHOLDS.HIGH) {
      return 3;
    }
    if (quantity >= THRESHOLDS.MEDIUM) {
      return 2;
    }
    return 1;
  }, [quantity]);

  return (
    <View style={[styles.container]}>
      {Array.from({length: 4}).map((_, index) => (
        <AnimatedBar key={index} index={index} stockLevel={stockLevel} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 4,
  },
  bar: {
    width: 16,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
});

export default StockLevel;
