# Interactive Preview Setup Guide

This guide will help you add interactive Expo Snack previews to your RN Shad UI documentation.

## ✅ What's Already Done

1. **SnackEmbed Component** - Created at `components/SnackEmbed.tsx`
2. **Button Template** - Ready-to-use template in `snack-templates/button/`
3. **Documentation** - Comprehensive guide in `SNACK_CREATION_GUIDE.md`

## 🚀 Quick Start (30 minutes for first component)

### Step 1: Create Your First Snack (Button)

1. **Go to Expo Snack**
   - Visit [snack.expo.dev](https://snack.expo.dev)
   - Click "Sign in" (use GitHub or create account)

2. **Create New Snack**
   - Click "New Snack" or go to [snack.expo.dev/@me](https://snack.expo.dev/@me)
   - Name it: `rn-shad-button`

3. **Upload Template Files**

   Copy these files from `snack-templates/button/` to your Snack:

   - `App.js` → Root file
   - `ButtonDemo.js` → Demo component
   - `Button.js` → Button component (from Button.tsx)
   - `package.json` → Dependencies
   - `babel.config.js` → Babel configuration

   **How to add files in Snack:**
   - Click the "+" button next to "Files"
   - Choose "Create a file"
   - Paste content from template files

4. **Wait for Build**
   - Snack will automatically install dependencies
   - Wait for "Device" preview to load (30-60 seconds)
   - You should see the Button demo working!

5. **Test Both Platforms**
   - Click "My Device" dropdown in preview
   - Select "iOS" to see iOS simulator
   - Select "Android" to see Android simulator
   - Test button interactions on both

6. **Save & Get URL**
   - Click "Save" (top right)
   - Your Snack URL will be: `https://snack.expo.dev/@YOUR_USERNAME/rn-shad-button`
   - Copy this URL!

### Step 2: Add to Documentation

1. **Open Button Documentation**
   ```bash
   cd apps/docs
   # Edit: pages/docs/components/button.mdx
   ```

2. **Add Import at Top**
   ```mdx
   import { SnackEmbed } from '@/components/SnackEmbed';
   ```

3. **Add Interactive Preview Section**

   Add this after the main description, before "## Installation":

   ```mdx
   ## Interactive Preview

   Try the Button component live on iOS and Android:

   <SnackEmbed
     snackId="YOUR_USERNAME/rn-shad-button"
     platform="mydevice"
     preview={true}
   />
   ```

4. **Test Locally**
   ```bash
   npm run dev
   ```
   Visit http://localhost:3001/docs/components/button

5. **Verify**
   - Snack iframe loads
   - Both iOS and Android previews visible
   - Code is editable
   - Interactions work

### Step 3: Deploy

```bash
git add .
git commit -m "feat: add interactive Button preview with Expo Snack"
git push origin main
```

Vercel will auto-deploy. Visit your live docs to see it!

## 📋 Component Priority List

Create Snacks in this order for maximum impact:

### Week 1: High-Impact Components (8 components)
1. ✅ **Button** - Template ready!
2. **Input** - Text input with icons
3. **Switch** - Toggle animations
4. **Slider** - Gesture interactions
5. **Sheet** - Bottom sheet with drag
6. **Dialog** - Modal interactions
7. **Toast** - Notification system
8. **Tabs** - Tab switching

### Week 2: Form Components (7 components)
9. Checkbox
10. Radio Group
11. Select
12. Combobox
13. Label
14. Form
15. Segmented Control

### Week 3: Display Components (8 components)
16. Card
17. Badge
18. Avatar
19. Alert
20. Chip
21. Text
22. Empty State
23. Table

### Week 4: Utility Components (13 components)
24. Progress
25. Spinner
26. Skeleton
27. Separator
28. Divider
29. Accordion
30. Menu
31. Popover
32. Tooltip
33. DatePicker
34. Calendar
35. Command

## 🎨 Customization Options

### Change Preview Size

```mdx
<SnackEmbed
  snackId="username/rn-shad-button"
  platform="mydevice"
  preview={true}
  height="600px"  <!-- Add custom height -->
/>
```

### Show Only iOS or Android

```mdx
<!-- iOS only -->
<SnackEmbed
  snackId="username/rn-shad-button"
  platform="ios"
  preview={true}
/>

<!-- Android only -->
<SnackEmbed
  snackId="username/rn-shad-button"
  platform="android"
  preview={true}
/>
```

### Dark Theme

```mdx
<SnackEmbed
  snackId="username/rn-shad-button"
  platform="mydevice"
  theme="dark"
  preview={true}
/>
```

## 🛠️ Batch Creation Tips

### Template Duplication Strategy

Once you have Button working:

1. **In Expo Snack Dashboard**
   - Go to your Snacks list
   - Find "rn-shad-button"
   - Click "..." → "Duplicate"
   - Rename to next component (e.g., "rn-shad-input")

2. **Replace Files**
   - Keep: `App.js`, `package.json`, `babel.config.js`
   - Replace: Component file and Demo file
   - Update imports in Demo

3. **Test & Save**
   - Verify it works
   - Save
   - Copy URL

This way you create each new Snack in ~10 minutes instead of 30!

## 📝 Snack Best Practices

### DO:
- ✅ Show 3-5 clear examples
- ✅ Add section titles
- ✅ Include console.log() for feedback
- ✅ Test on both iOS and Android
- ✅ Keep component code in separate file
- ✅ Add helpful comments

### DON'T:
- ❌ Add too many examples (keeps it slow)
- ❌ Use external images (use emojis instead)
- ❌ Add complex navigation
- ❌ Include unused dependencies
- ❌ Make Snack over 500KB

## 🐛 Troubleshooting

### Snack Won't Load
- **Check dependencies** - Make sure versions match
- **Check syntax** - Look for JS errors in console
- **Refresh** - Sometimes Snack needs a refresh

### Component Not Rendering
- **Check imports** - Verify component path
- **Check Reanimated** - Ensure babel plugin is configured
- **Check platform** - Some features are platform-specific

### Slow Performance
- **Reduce examples** - Fewer is faster
- **Remove console.logs** - In production Snacks
- **Optimize images** - Use smaller sizes or remove

### Gestures Not Working
- **Check GestureHandler** - Ensure it wraps the app
- **Check Reanimated plugin** - Must be in babel.config.js
- **Test on device** - Some gestures work better on real devices

## 📊 Progress Tracking

Keep track of completed Snacks:

```markdown
- [x] Button
- [ ] Input
- [ ] Switch
- [ ] Slider
...
```

Update the documentation page as you complete each one!

## 🎯 Goal

**Complete all 36 components with interactive previews!**

This will make your documentation:
- ✨ Most interactive React Native component library docs
- 🚀 Help users understand components immediately
- 💪 Show real iOS and Android behavior
- 🎨 Let users experiment with code live

## Need Help?

- **Expo Snack Docs**: https://docs.expo.dev/workflow/snack/
- **Reanimated Docs**: https://docs.swmansion.com/react-native-reanimated/
- **Gesture Handler**: https://docs.swmansion.com/react-native-gesture-handler/

Good luck! 🚀
