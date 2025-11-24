# Expo Snack Creation Guide for RN Shad Components

This guide explains how to create interactive Expo Snacks for all RN Shad UI components.

## Quick Start

1. Go to [snack.expo.dev](https://snack.expo.dev)
2. Sign in with your account
3. Use the templates below for each component
4. Save each Snack with naming convention: `rn-shad-[component-name]`
5. Copy the Snack URL and add to documentation

## Snack Configuration

### Dependencies to Add:

For all Snacks, add these dependencies in `package.json`:

```json
{
  "dependencies": {
    "react-native-reanimated": "~3.10.1",
    "react-native-gesture-handler": "~2.16.1",
    "react-native-safe-area-context": "4.10.5",
    "lucide-react-native": "latest",
    "expo": "~51.0.0",
    "react": "18.2.0",
    "react-native": "0.74.5"
  }
}
```

### Required Setup Files:

**babel.config.js:**
```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
```

**App.js:**
```jsx
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ComponentDemo from './ComponentDemo';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ComponentDemo />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
```

## Component Templates

### Template 1: Button Component

**ComponentDemo.js:**
```jsx
import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Button } from './components/Button';
import { Mail, Trash, Settings } from 'lucide-react-native';

export default function ComponentDemo() {
  const [loading, setLoading] = useState(false);

  const handlePress = () => {
    console.log('Button pressed!');
  };

  const handleLoadingTest = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Button Component</Text>

      <Section title="Variants">
        <Button variant="default" onPress={handlePress}>
          Default
        </Button>
        <Button variant="destructive" onPress={handlePress}>
          Destructive
        </Button>
        <Button variant="outline" onPress={handlePress}>
          Outline
        </Button>
        <Button variant="secondary" onPress={handlePress}>
          Secondary
        </Button>
        <Button variant="ghost" onPress={handlePress}>
          Ghost
        </Button>
      </Section>

      <Section title="Sizes">
        <Button size="sm" onPress={handlePress}>
          Small
        </Button>
        <Button size="default" onPress={handlePress}>
          Default
        </Button>
        <Button size="lg" onPress={handlePress}>
          Large
        </Button>
      </Section>

      <Section title="With Icons">
        <Button icon={Mail} iconPosition="left" onPress={handlePress}>
          Send Email
        </Button>
        <Button
          icon={Trash}
          iconPosition="right"
          variant="destructive"
          onPress={handlePress}
        >
          Delete
        </Button>
        <Button icon={Settings} size="icon" onPress={handlePress} />
      </Section>

      <Section title="States">
        <Button loading={loading} onPress={handleLoadingTest}>
          {loading ? 'Loading...' : 'Test Loading'}
        </Button>
        <Button disabled onPress={handlePress}>
          Disabled
        </Button>
      </Section>
    </ScrollView>
  );
}

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#09090B',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#18181B',
  },
  sectionContent: {
    gap: 12,
  },
});
```

**components/Button.js:** (Copy from your Button.tsx)

## Embedding in Documentation

Once you create a Snack, embed it in your MDX documentation:

```mdx
import { SnackEmbed } from '@/components/SnackEmbed';

# Button

Description of the button component...

## Interactive Preview

<SnackEmbed
  snackId="your-username/rn-shad-button"
  platform="mydevice"
  preview={true}
/>

Rest of documentation...
```

## Naming Convention

- Button: `@your-username/rn-shad-button`
- Input: `@your-username/rn-shad-input`
- Card: `@your-username/rn-shad-card`
- etc.

## Tips for Good Snacks

1. **Keep it Simple**: Show 3-5 key examples per component
2. **Label Sections**: Use clear section titles
3. **Add Console Logs**: Help users understand interactions
4. **Show All Variants**: Cover main variants, sizes, states
5. **Mobile First**: Test on both iOS and Android simulators
6. **Performance**: Keep Snack file size reasonable

## Priority Components to Create First

Create Snacks in this order for maximum impact:

### High Priority (Most Interactive):
1. Button - Variants, icons, loading states
2. Input - Icons, validation, password toggle
3. Switch - Toggle animation
4. Slider - Gesture interaction
5. Sheet - Drag gestures
6. Dialog - Modal interaction
7. Toast - Show notifications
8. Tabs - Tab switching

### Medium Priority:
9. Checkbox
10. Radio Group
11. Select
12. Card
13. Badge
14. Avatar
15. Alert

### Lower Priority (Less Interactive):
16. Text
17. Separator
18. Divider
19. Skeleton
20. Progress
21. Spinner

## Batch Creation Script

For efficiency, you can:

1. Create one template Snack with all setup
2. Duplicate it for each component
3. Replace component code and demo
4. Update name and save

This way you don't repeat the setup for each component.
