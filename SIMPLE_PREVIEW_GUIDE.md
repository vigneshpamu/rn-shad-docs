# Simple Preview Guide - iOS & Android Side-by-Side

This guide shows you how to add **preview-only** iOS and Android simulators to your documentation (no code editing).

## ✅ What You Get

- **iOS simulator** on the left
- **Android simulator** on the right
- **No code editor** - just the visual previews
- **Fully interactive** - users can tap, scroll, and interact with components

## 🚀 Quick Setup (20 minutes)

### Step 1: Create a Snack

1. Go to [snack.expo.dev](https://snack.expo.dev)
2. Sign in with GitHub
3. Click "New Snack"
4. Name it: `rn-shad-button`

### Step 2: Add Your Component Files

Use the template from `snack-templates/button/`:

**Files to upload:**
- `App.js` - Entry point with GestureHandler wrapper
- `ButtonDemo.js` - Demo with all button examples
- `Button.js` - Your button component code
- `package.json` - Dependencies
- `babel.config.js` - Reanimated plugin config

**How to add files:**
- Click "+" next to "Files" in Snack
- Create each file
- Copy/paste content from templates

### Step 3: Test & Save

1. Wait for Snack to build (30-60 seconds)
2. Test in the preview - click buttons, see animations
3. Click "Save" (top right)
4. Copy your Snack URL: `https://snack.expo.dev/@YOUR_USERNAME/rn-shad-button`

### Step 4: Add to Documentation

**Edit** `pages/docs/components/button.mdx`:

```mdx
import { SnackEmbed } from '@/components/SnackEmbed';

# Button

A beautiful, animated button component...

## Interactive Preview

Try the Button component live on iOS and Android:

<SnackEmbed
  snackId="YOUR_USERNAME/rn-shad-button"
/>

## Installation

\`\`\`bash
npx rn-shad-cli add button
\`\`\`

...rest of documentation...
```

**That's it!** The component will automatically show iOS and Android previews side-by-side.

### Step 5: Test Locally

```bash
cd apps/docs
npm run dev
```

Visit http://localhost:3001/docs/components/button

You should see:
- iOS simulator on left
- Android simulator on right
- Both fully interactive
- No code editor visible

### Step 6: Deploy

```bash
git add .
git commit -m "feat: add iOS/Android preview for Button"
git push origin main
```

Vercel auto-deploys!

## 📋 Component Options

### Custom Height

```mdx
<SnackEmbed
  snackId="username/rn-shad-button"
  height="800px"
/>
```

### Dark Theme

```mdx
<SnackEmbed
  snackId="username/rn-shad-button"
  theme="dark"
/>
```

### Show Code Editor (if needed)

```mdx
<SnackEmbed
  snackId="username/rn-shad-button"
  previewOnly={false}
/>
```

## 🎯 Quick Creation for All Components

### Efficient Workflow:

1. **Create Button Snack** (20 min first time)
2. **Duplicate for next component**:
   - In Expo Snack, click "..." → "Duplicate"
   - Rename to `rn-shad-input`
   - Replace `Button.js` with `Input.js`
   - Update `ButtonDemo.js` → `InputDemo.js`
   - Update imports
   - Test & Save
3. **Repeat** - Each additional component takes ~10 minutes

### Priority Order:

**Week 1 - High Impact (8 components):**
1. Button ✓
2. Input
3. Switch
4. Slider
5. Sheet
6. Dialog
7. Toast
8. Tabs

**Week 2 - Forms (7 components):**
9-15. Checkbox, RadioGroup, Select, Combobox, Label, Form, SegmentedControl

**Week 3 - Display (8 components):**
16-23. Card, Badge, Avatar, Alert, Chip, Text, EmptyState, Table

**Week 4 - Utilities (13 components):**
24-36. Progress, Spinner, Skeleton, Separator, Divider, Accordion, Menu, Popover, Tooltip, DatePicker, Calendar, Command

## 💡 Tips

### Keep Snacks Simple
- 3-5 key examples per component
- Clear section titles
- Interactive elements (counters, toggles)
- Console.log for user feedback

### Performance
- Don't add too many examples
- Keep total Snack size < 500KB
- Test on both iOS and Android

### Good Demo Structure

```jsx
export default function ComponentDemo() {
  return (
    <ScrollView>
      <Text style={styles.title}>Component Name</Text>
      <Text style={styles.subtitle}>Tap to interact!</Text>

      <Section title="Variants">
        {/* 2-3 variant examples */}
      </Section>

      <Section title="Sizes">
        {/* Size examples */}
      </Section>

      <Section title="With Icons">
        {/* Icon examples */}
      </Section>

      <Section title="States">
        {/* Loading, disabled, etc */}
      </Section>
    </ScrollView>
  );
}
```

## 🐛 Troubleshooting

### Preview Not Loading
- Check Snack built successfully
- Verify dependencies are correct
- Refresh the page

### Component Not Rendering
- Check imports in Demo file
- Verify component file is correct
- Check console for errors

### Animations Not Working
- Ensure `babel.config.js` has Reanimated plugin
- Check `GestureHandlerRootView` wraps App
- Test in Snack first before embedding

## ✨ Result

Your documentation will have:
- **Live iOS preview** - See exactly how it looks on iPhone
- **Live Android preview** - See exactly how it looks on Android
- **Real interactions** - Users can tap, scroll, interact
- **No code clutter** - Just the visual previews
- **Fast loading** - Lazy-loaded iframes
- **Responsive** - Stacks on mobile, side-by-side on desktop

## 🎯 Goal

**Add previews to all 36 components!**

This creates the best React Native component documentation experience possible - users see real native behavior on both platforms without any setup.

---

**Ready to start?** Follow steps 1-6 above to add your first preview in 20 minutes!
