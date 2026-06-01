import Animated from 'react-native-reanimated';
import { Hand } from 'lucide-react-native';
import { Colors } from '@/constants/Theme';

export function HelloWave() {
  return (
    <Animated.View
      style={{
        marginTop: -6,
        animationName: {
          '50%': { transform: [{ rotate: '25deg' }] },
        },
        animationIterationCount: 4,
        animationDuration: '300ms',
      }}>
      <Hand size={28} color={Colors.accent1} />
    </Animated.View>
  );
}
