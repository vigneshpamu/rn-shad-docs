import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Button } from './Button';
import { Mail, Trash, Settings, Download, Heart } from 'lucide-react-native';

export default function ButtonDemo() {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const handleLoadingTest = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Button Component</Text>
      <Text style={styles.subtitle}>
        Tap buttons to see smooth animations and interactions
      </Text>

      <Section title="Variants">
        <Button variant="default" onPress={() => console.log('Default pressed')}>
          Default Button
        </Button>
        <Button
          variant="destructive"
          onPress={() => console.log('Destructive pressed')}
        >
          Destructive
        </Button>
        <Button variant="outline" onPress={() => console.log('Outline pressed')}>
          Outline
        </Button>
        <Button
          variant="secondary"
          onPress={() => console.log('Secondary pressed')}
        >
          Secondary
        </Button>
        <Button variant="ghost" onPress={() => console.log('Ghost pressed')}>
          Ghost
        </Button>
      </Section>

      <Section title="Sizes">
        <Button size="sm" onPress={() => console.log('Small pressed')}>
          Small
        </Button>
        <Button size="default" onPress={() => console.log('Default pressed')}>
          Default
        </Button>
        <Button size="lg" onPress={() => console.log('Large pressed')}>
          Large
        </Button>
      </Section>

      <Section title="With Icons">
        <Button
          icon={Mail}
          iconPosition="left"
          onPress={() => console.log('Send email')}
        >
          Send Email
        </Button>
        <Button
          icon={Download}
          iconPosition="right"
          variant="secondary"
          onPress={() => console.log('Download')}
        >
          Download
        </Button>
        <Button
          icon={Trash}
          variant="destructive"
          onPress={() => console.log('Delete')}
        >
          Delete
        </Button>
      </Section>

      <Section title="Icon Only">
        <View style={styles.row}>
          <Button
            icon={Settings}
            size="icon"
            onPress={() => console.log('Settings')}
          />
          <Button
            icon={Heart}
            size="icon"
            variant="outline"
            onPress={() => setCount(count + 1)}
          />
          <Button
            icon={Trash}
            size="icon"
            variant="destructive"
            onPress={() => console.log('Delete')}
          />
        </View>
        {count > 0 && (
          <Text style={styles.hint}>❤️ Liked {count} times!</Text>
        )}
      </Section>

      <Section title="States">
        <Button loading={loading} onPress={handleLoadingTest}>
          {loading ? 'Loading...' : 'Test Loading State'}
        </Button>
        <Button disabled onPress={() => console.log('Should not fire')}>
          Disabled Button
        </Button>
      </Section>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          💡 Try pressing buttons on both iOS and Android simulators to see the
          smooth spring animations!
        </Text>
      </View>
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
    marginBottom: 8,
    color: '#09090B',
  },
  subtitle: {
    fontSize: 16,
    color: '#71717A',
    marginBottom: 24,
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
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  hint: {
    marginTop: 8,
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '500',
  },
  footer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#F4F4F5',
    borderRadius: 8,
  },
  footerText: {
    fontSize: 14,
    color: '#52525B',
    lineHeight: 20,
  },
});
