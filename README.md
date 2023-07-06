# style-direct-club

Apply styles directly to your React Native components with props!

- 🛡️ Fully type-safe
- 🚀 Fast prototyping
- 🎭 Custom aliases
- 🎨 Default styles
- ⚡️ Custom props

## Installation

```sh
yarn add style-direct-club
```

## Usage

Style Direct Club allows you to style your components directly with style props. The `styled` function takes in a React Native component and returns the same component but with the style props hoisted up from the `style` prop.

```tsx
import { styled } from 'style-direct-club';
import { MyButton } from './MyButton';

// Create a styled component
const MyStyledButton = styled(MyButton);

// Or use the built-in components
const View = styled.View;
const Text = styled.Text;

// Use props to style your components directly
function App() {
  return (
    <View flex={1} rowGap={10} justifyContent="center" alignItems="center">
      <Text color="red" fontSize={24}>
        Hello World!
      </Text>
      <Text color="blue" fontSize={16}>
        Styling is so easy!
      </Text>
      <MyStyledButton backgroundColor="blue">
        <Text color="white">Press Me!</Text>
      </MyStyledButton>
    </View>
  );
}
```

## Options

Options allow you to customize your styling experience. Options can be passed to the `styled` function as an optional second argument, or with the `withOptions` function (for built-in components).

### Aliases

By default, the name of each style prop will match the name of the style attrubute. Custom aliases allow you to define alternative names for each style prop. This is useful if you want short and concise prop names. These are fully customizable, so you can agree upon standards with your team and stay consistent!

```tsx
import { styled } from 'style-direct-club';
import { View } from 'react-native';

const StyledView = styled(View, {
  aliases: {
    // Each key is your custom prop name and each value is the original style prop name
    bg: 'backgroundColor',
    p: 'padding',
    m: 'margin',
    mt: 'marginTop',
  },
});

function App() {
  return (
    <StyledView bg="blue" p={10} m={10} mt={20}>
      <Text color="white">Hello World!</Text>
    </StyledView>
  );
}
```

**Note:** This library comes with a set of default aliases for the built-in components.

```tsx
import {
  defaultTextStyleAliases,
  defaultViewStyleAliases,
} from 'style-direct-club';
```

### Default Styles

Use default styles to set common styles for your components. These styles will be applied to every instance of the component and can be overridden later on with props.

```tsx
import { styled } from 'style-direct-club';
import { TouchableOpacity } from 'react-native';

const StyledTouchableOpacity = styled(TouchableOpacity, {
  defaultStyles: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
  },
});

function App() {
  return (
    <StyledTouchableOpacity padding={5}>
      <Text color="white">Press Me!</Text>
    </StyledTouchableOpacity>
  );
}
```

### Custom Props

Custom props allow you to apply multiple reusable styles with a single prop.

```tsx
import { styled } from 'style-direct-club';
import { Text } from 'react-native';

const StyledText = styled(Text, {
  customProps: {
    sm: {
      fontSize: 12,
      marginBottom: 5,
    },
    xl: {
      fontSize: 36,
      marginBottom: 10,
      fontWeight: 'bold',
    },
  },
});

function App() {
  return <StyledText xl>Hello World!</StyledText>;
}
```

### Sharing Options

Often times you'll want to share options across multiple components. Since options rely heavily on the type of the component being styled, you won't be able to pass the same options to different components. For example, the style properties for a `View` component are different than the style properties for a `Text` component. To solve for this, you can create multiple options objects, and pass them to each styled component where appropriate.

```tsx
import { styled, Options } from 'style-direct-club';
import { View, Text } from 'react-native';

const viewOptions = {
  aliases: {
    bg: 'backgroundColor',
    p: 'padding',
    m: 'margin',
    mt: 'marginTop',
  },
} as const; // Use `as const` to preserve the type of the object

const textOptions = {
  aliases: {
    size: 'fontSize',
    weight: 'fontWeight',
  },
  customProps: {
    sm: {
      fontSize: 12,
      marginBottom: 5,
    },
    xl: {
      fontSize: 36,
      marginBottom: 10,
      fontWeight: 'bold',
    },
  },
} as const;

// These components will use the text options
const StyledText = styled(Text, textOptions);
const StyledTextInput = styled(TextInput, textOptions);

// These components will use the view options
const StyledView = styled(View, viewOptions);
const StyledPressable = styled(Pressable, viewOptions);
```

As an alterntative to the `as const` approach, you can type the options object with the `Options<T>` type. For example,

```tsx
import { styled, Options } from 'style-direct-club';
import { View } from 'react-native';

const viewOptions: Options<View> = {
  aliases: {
    bg: 'backgroundColor',
    p: 'padding',
    m: 'margin',
    mt: 'marginTop',
  },
};
```

## Built-in Components

Built-in components are provided for convenience. These components are the same as the original components (from `react-native`), but they have style props added to them. Here's a list of the built-in components:

- `styled.View`
- `styled.Text`
- `styled.TouchableOpacity`
- `styled.Pressable`
- `styled.TextInput`
- `styled.Image`

You can also choose to pass in options to built-in components via the `withOptions` function. For example, if you want to use the built-in `Text` component with custom options, you can do the following:

```tsx
import { styled } from 'style-direct-club';

const Text = styled.Text.withOptions(myOptions);
```

## Gotchas

- The `style` prop is still supported, but style props will take priority over the `style` prop object.
- If you want to add style props to a custom component, the component must pass its `style` prop to the underlying view.
- Default styles and custom props will not respect aliases, you must use the original style prop name.
