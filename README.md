# style-direct-club

Apply styles directly to your React Native components via props!

- Fully typed
- No more `StyleSheet.create` or `styles={{ ... }}
- Same naming conventions as the style object
- Faster development

## Installation

```sh
yarn add style-direct-club
```

## Usage

```js
import { TouchableOpacity } from 'react-native';
import { styled } from 'style-direct-club';

// Create a styled component
const StyledTouchableOpacity = styled(TouchableOpacity);
// Or use the out of the box components
const View = styled.View;
const Text = styled.Text;

function App() {
  return (
    <View flex={1} rowGap={10} justifyContent="center" alignItems="center">
      <Text color="red" fontSize={24}>
        Hello World!
      </Text>
      <Text color="blue" fontSize={16}>
        Styling is so easy!
      </Text>
      <StyledTouchableOpacity backgroundColor="blue">
        <Text color="white">Press Me!</Text>
      </StyledTouchableOpacity>
    </View>
  );
}
```

## Gotchas

- The `style` prop is still supported, but styles passed in as props will take precedence over the `style` prop object.
- If you want to add these props to a custom component, the component must pass its props to the underlying view.

## To Do

- [x] Add out of the box components
- [ ] Add support for aliases (e.g. `backgroundColor` -> `bg`)
