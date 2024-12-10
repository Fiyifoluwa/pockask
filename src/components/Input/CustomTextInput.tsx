import React, {useRef} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {InputProps} from './Input.props';
import {useTheme} from '../../theme';
import {heightPixel} from '../../utils/responsiveDimensions';
import Box from '../Box';
import Text from '../Text';
import Pressable from '../Pressable';

interface CustomTextInputProps extends InputProps {
  required?: boolean;
  ignoreKeyboardSettings?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value,
  label,
  leftComponent,
  onBlur,
  inputStyle: inputStyleOverride,
  placeholder = label,
  onChangeText,
  altLabel,
  addedContainerStyle,
  hideError,
  hideLabel,
  outerContainerStyle,
  onInputPress,
  required,
  disabled,
  editable = !disabled,
  error,
  ...rest
}) => {
  const {colors} = useTheme();
  const textInputRef = useRef<TextInput>(null);

  const styles = StyleSheet.create({
    input: {
      backgroundColor: colors.transparent,
      color: colors?.mainText,
      fontSize: heightPixel(14),
      height: heightPixel(55),
      width: '100%',
      fontFamily: 'U8-Regular',
    },
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      height: heightPixel(48),
      paddingLeft: heightPixel(10),
      width: '100%',
      borderColor: disabled
        ? colors.fainterGrey
        : error
        ? colors.danger
        : colors.ash200,
      borderRadius: heightPixel(8),
      backgroundColor: disabled ? colors.fainterGrey : colors.transparent,
    },
    labelContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: heightPixel(8),
    },
    errorText: {
      color: colors.red,
      fontSize: heightPixel(10),
    },
  });

  const focusTextInput = () => textInputRef?.current?.focus();

  const renderLabel = () => {
    if (hideLabel) {
      return null;
    }

    return (
      <Box style={styles.labelContainer}>
        <Text color="mainText" variant="textInputLabel">
          {label}{' '}
          {required && (
            <Text color="red" variant="textInputLabel">
              *
            </Text>
          )}
        </Text>
        {altLabel && (
          <Text color="greyBlack" variant="regular12">
            {altLabel}
          </Text>
        )}
      </Box>
    );
  };

  const renderError = () => {
    if (hideError || !error) {
      return null;
    }

    return (
      <Text style={styles.errorText} numberOfLines={1}>
        {error}
      </Text>
    );
  };

  return (
    <Pressable
      marginTop={!hideLabel ? 'md' : 'none'}
      onPress={onInputPress ?? focusTextInput}
      style={outerContainerStyle}>
      {renderLabel()}
      <Box style={[styles.container, addedContainerStyle]}>
        {leftComponent}
        <TextInput
          autoCorrect={false}
          onBlur={onBlur}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholderTextColor}
          ref={textInputRef}
          editable={editable}
          style={[styles.input, inputStyleOverride]}
          value={value}
          testID={label ?? placeholder}
          accessibilityLabel={label ?? placeholder}
          {...rest}
        />
      </Box>
      {renderError()}
    </Pressable>
  );
};

export default CustomTextInput;
