# CSS Modules Components

Automatically generate React components from CSS Modules.

## Installation

```bash
npm install css-modules-components
```

## Usage

Let's consider the following CSS module file.

```scss
// styles.module.css
.Card { }
.Title { }
.Text { }
```

### Create Components

```tsx
// YourComponent.tsx
import styles from './styles.module.scss';
import { cssComponents } from '@/src/css-components';

// Components with the className prop already set.
const { Card, Title, Text} = cssComponents(styles);

function Component() {
  return (
    <Card>
      <Title>Main Title</Title>
      <Text>Some paragraph text</Text>
    </Card>
  );
}
```

### Use Custom Element Types

You can specify the default HTML element for each component:

```tsx
const components = cssComponents(styles, {
  Title: 'h1',
  Text: 'p',
  Button: 'button',
  Image: 'img'
});
```

### Overriding Element Type

In case you need an exception, you can override the element type with the `as` prop:

```tsx
<Title as="h3">Smaller Title</Title>
```

### Combining with Additional Classes

Every created component will have the corresponding className from the CSS module file. If you need
to provide any **additional** classes, you can simply add the `className` prop.

```tsx
<Card className="additional-class">
  This component will have both `styles.Card` and the given class.
</Card>
```

## Feature Requests

If you have any feature requests, suggestions or comments about this library, feel free to open an
issue. I'll do my best to address any issues you may be having.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
