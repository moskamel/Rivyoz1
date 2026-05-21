// Patched version of react-native-screens/lib/module/components/Screen.js
// Fix: sheetAllowedDetents='large' (string) crashes Expo Go SDK 54's Fabric renderer
// because iOS expects Float and Android expects ReadableArray.
// Solution: only pass sheet-related props for formSheet presentations.

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { Animated, Platform } from 'react-native';
import TransitionProgressContext from 'react-native-screens/lib/module/TransitionProgressContext';
import DelayedFreeze from 'react-native-screens/lib/module/components/helpers/DelayedFreeze';
import { freezeEnabled, isNativePlatformSupported, screensEnabled } from 'react-native-screens/lib/module/core';
import ScreenNativeComponent from 'react-native-screens/lib/module/fabric/ScreenNativeComponent';
import ModalScreenNativeComponent from 'react-native-screens/lib/module/fabric/ModalScreenNativeComponent';

export const NativeScreen = ScreenNativeComponent;
const AnimatedNativeScreen = Animated.createAnimatedComponent(NativeScreen);
const AnimatedNativeModalScreen = Animated.createAnimatedComponent(ModalScreenNativeComponent);

export const InnerScreen = /*#__PURE__*/React.forwardRef(function InnerScreen(props, ref) {
  const innerRef = React.useRef(null);
  React.useImperativeHandle(ref, () => innerRef.current, []);
  const setRef = ref => {
    innerRef.current = ref;
    props.onComponentRef?.(ref);
  };
  const closing = React.useRef(new Animated.Value(0)).current;
  const progress = React.useRef(new Animated.Value(0)).current;
  const goingForward = React.useRef(new Animated.Value(0)).current;
  const {
    enabled = screensEnabled(),
    freezeOnBlur = freezeEnabled(),
    ...rest
  } = props;

  const {
    sheetAllowedDetents = 'large',
    sheetLargestUndimmedDetent = 'all',
    sheetGrabberVisible = false,
    sheetCornerRadius = -1.0,
    sheetExpandsWhenScrolledToEdge = true,
    stackPresentation
  } = rest;

  if (enabled && isNativePlatformSupported) {
    const AnimatedScreen = Platform.OS === 'android' || stackPresentation === undefined || stackPresentation === 'push' || stackPresentation === 'containedModal' || stackPresentation === 'containedTransparentModal' ? AnimatedNativeScreen : AnimatedNativeModalScreen;
    let {
      active,
      activityState,
      children,
      isNativeStack,
      gestureResponseDistance,
      onGestureCancel,
      ...props
    } = rest;
    if (active !== undefined && activityState === undefined) {
      console.warn('It appears that you are using old version of react-navigation library. Please update @react-navigation/bottom-tabs, @react-navigation/stack and @react-navigation/drawer to version 5.10.0 or above to take full advantage of new functionality added to react-native-screens');
      activityState = active !== 0 ? 2 : 0;
    }

    const handleRef = ref => {
      if (ref?.viewConfig?.validAttributes?.style) {
        ref.viewConfig.validAttributes.style = {
          ...ref.viewConfig.validAttributes.style,
          display: false
        };
        setRef(ref);
      } else if (ref?._viewConfig?.validAttributes?.style) {
        ref._viewConfig.validAttributes.style = {
          ...ref._viewConfig.validAttributes.style,
          display: false
        };
        setRef(ref);
      }
    };

    // Only pass sheet props for formSheet; omitting them entirely for other
    // presentations avoids a Fabric type crash in Expo Go SDK 54 where iOS
    // expects Float and Android expects ReadableArray for sheetAllowedDetents.
    const sheetProps = stackPresentation === 'formSheet' ? {
      sheetAllowedDetents,
      sheetLargestUndimmedDetent,
      sheetGrabberVisible,
      sheetCornerRadius,
      sheetExpandsWhenScrolledToEdge,
    } : {};

    return /*#__PURE__*/React.createElement(DelayedFreeze, {
      freeze: freezeOnBlur && activityState === 0
    }, /*#__PURE__*/React.createElement(AnimatedScreen, _extends({}, props, {
      activityState: activityState,
    }, sheetProps, {
      gestureResponseDistance: {
        start: gestureResponseDistance?.start ?? -1,
        end: gestureResponseDistance?.end ?? -1,
        top: gestureResponseDistance?.top ?? -1,
        bottom: gestureResponseDistance?.bottom ?? -1
      },
      ref: handleRef,
      onTransitionProgress: !isNativeStack ? undefined : Animated.event([{
        nativeEvent: {
          progress,
          closing,
          goingForward
        }
      }], {
        useNativeDriver: true
      }),
      onGestureCancel: onGestureCancel ?? (() => {
        // for internal use
      })
    }), !isNativeStack ?
    children : /*#__PURE__*/React.createElement(TransitionProgressContext.Provider, {
      value: {
        progress,
        closing,
        goingForward
      }
    }, children)));
  } else {
    let {
      active,
      activityState,
      style,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onComponentRef,
      ...props
    } = rest;
    if (active !== undefined && activityState === undefined) {
      activityState = active !== 0 ? 2 : 0;
    }
    return /*#__PURE__*/React.createElement(Animated.View, _extends({
      style: [style, {
        display: activityState !== 0 ? 'flex' : 'none'
      }],
      ref: setRef
    }, props));
  }
});

export const ScreenContext = /*#__PURE__*/React.createContext(InnerScreen);
const Screen = props => {
  const ScreenWrapper = React.useContext(ScreenContext) || InnerScreen;
  return /*#__PURE__*/React.createElement(ScreenWrapper, props);
};
export default Screen;
