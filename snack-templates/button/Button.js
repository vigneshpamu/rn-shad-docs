import React from 'react';
import { Pressable, Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// Default color palette (Zinc Light theme)
const defaultColors = {
  primary: '#18181B',
  primaryForeground: '#FAFAFA',
  secondary: '#F4F4F5',
  secondaryForeground: '#18181B',
  destructive: '#EF4444',
  destructiveForeground: '#FAFAFA',
  border: '#E4E4E7',
  foreground: '#09090B',
};

export const Button = React.forwardRef((props, ref) => {
  const {
    children,
    variant = 'default',
    size = 'default',
    disabled = false,
    loading = false,
    icon: Icon,
    iconPosition = 'left',
    onPress,
    onLongPress,
    style,
    textStyle,
  } = props;

  const colors = defaultColors;
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, {
      damping: 15,
      stiffness: 300,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 300,
    });
  };

  const handlePress = () => {
    if (onPress) onPress();
  };

  const variantStyles = {
    default: { backgroundColor: colors.primary },
    destructive: { backgroundColor: colors.destructive },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.border,
    },
    secondary: { backgroundColor: colors.secondary },
    ghost: { backgroundColor: 'transparent' },
    link: { backgroundColor: 'transparent' },
  };

  const sizeStyles = {
    default: styles.sizeDefault,
    sm: styles.sizeSm,
    lg: styles.sizeLg,
    icon: styles.sizeIcon,
  };

  const textVariantStyles = {
    default: { color: colors.primaryForeground },
    destructive: { color: colors.destructiveForeground },
    outline: { color: colors.foreground },
    secondary: { color: colors.secondaryForeground },
    ghost: { color: colors.foreground },
    link: { color: colors.foreground, textDecorationLine: 'underline' },
  };

  const textSizeStyles = {
    default: styles.textSizeDefault,
    sm: styles.textSizeSm,
    lg: styles.textSizeLg,
    icon: styles.textSizeDefault,
  };

  const iconSizes = {
    default: 20,
    sm: 16,
    lg: 24,
    icon: 24,
  };

  const iconColors = {
    default: colors.primaryForeground,
    destructive: colors.destructiveForeground,
    outline: colors.foreground,
    secondary: colors.secondaryForeground,
    ghost: colors.foreground,
    link: colors.foreground,
  };

  const isDisabled = disabled || loading;

  return (
    <AnimatedPressable
      ref={ref}
      onPress={handlePress}
      onLongPress={onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      style={[
        animatedStyle,
        styles.base,
        variantStyles[variant],
        sizeStyles[size],
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={iconColors[variant]} />
      ) : (
        <>
          {Icon && iconPosition === 'left' && (
            <Icon
              size={iconSizes[size]}
              color={iconColors[variant]}
              style={{ marginRight: children ? 8 : 0 }}
            />
          )}
          {children && (
            <Text
              style={[
                styles.text,
                textVariantStyles[variant],
                textSizeStyles[size],
                textStyle,
              ]}
            >
              {children}
            </Text>
          )}
          {Icon && iconPosition === 'right' && (
            <Icon
              size={iconSizes[size]}
              color={iconColors[variant]}
              style={{ marginLeft: children ? 8 : 0 }}
            />
          )}
        </>
      )}
    </AnimatedPressable>
  );
});

Button.displayName = 'Button';

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  // Size styles
  sizeDefault: {
    height: 48,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  sizeSm: {
    height: 36,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sizeLg: {
    height: 56,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  sizeIcon: {
    height: 48,
    width: 48,
  },
  // Text base
  text: {
    fontWeight: '600',
  },
  // Text size styles
  textSizeDefault: {
    fontSize: 16,
    lineHeight: 20,
  },
  textSizeSm: {
    fontSize: 14,
    lineHeight: 18,
  },
  textSizeLg: {
    fontSize: 18,
    lineHeight: 22,
  },
  // Disabled state
  disabled: {
    opacity: 0.5,
  },
});
