# Lesson 1 Screens Integration Guide

This guide explains how to integrate the new Lesson1Screens component flow into your skill challenge navigation.

## What's Been Set Up

1. **New Component**: `components/Lesson1Screens.tsx` - Contains 10 reusable lesson screens
2. **Package**: `@react-native-community/slider` - Installed for the slider interaction
3. **Assets Folder**: `assets/LESSON_IMAGES_README.md` - Instructions for adding lesson images

## Integration Options

### Option 1: Replace Current Implementation (Recommended)

Replace the current hardcoded Day 1, Lesson 1 implementation in `app/lesson-content.tsx` with the new screens.

**Steps:**

1. The imports have already been added to `lesson-content.tsx`:
```typescript
import {
  Lesson1Screen1,
  Lesson1Screen2,
  Lesson1Screen3,
  Lesson1Screen4,
  Lesson1Screen5,
  Lesson1Screen6,
  Lesson1Screen7,
  Lesson1Screen8,
  Lesson1Screen9,
  Lesson1Screen10,
} from '../components/Lesson1Screens';
```

2. Update the `renderContent()` function to use the new screens when `day === 1 && lesson === 1`:

```typescript
const renderContent = () => {
  // For Day 1, Lesson 1, use the new screen components
  if (day === 1 && lesson === 1) {
    switch (step) {
      case 1:
        return <Lesson1Screen1 />;
      case 2:
        return <Lesson1Screen2 />;
      case 3:
        return <Lesson1Screen3 />;
      case 4:
        return <Lesson1Screen4 />;
      case 5:
        return <Lesson1Screen5 />;
      case 6:
        return <Lesson1Screen6 />;
      case 7:
        return <Lesson1Screen7 />;
      case 8:
        return <Lesson1Screen8 />;
      case 9:
        return <Lesson1Screen9 />;
      case 10:
        return <Lesson1Screen10 onFinish={() => router.push('/qchat')} />;
      default:
        return <Lesson1Screen1 />;
    }
  }

  // Keep existing Day 1, Lesson 2 implementation
  if (day === 1 && lesson === 2 && step === 1) {
    // ... existing code
  }

  // ... rest of existing code
}
```

3. Update the `handleTap()` function to support 10 steps:

```typescript
const handleTap = () => {
  if (day === 1 && lesson === 1) {
    // For lesson 1, go through all 10 steps
    if (step < 10) {
      setStep(step + 1);
    }
  } else {
    // Existing tap logic for other lessons
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
    // ... rest of existing code
  }
};
```

### Option 2: Create Separate Lesson Route

Create a new route specifically for the lesson flow using the cleaner implementation.

Use the file `app/lesson-content-new.tsx` that has been created, which provides:
- Screen-based navigation with prev/next buttons
- Progress indicator
- Clean separation of concerns
- Easy to extend for more lessons

**To activate this:**

1. Rename `app/lesson-content-new.tsx` to `app/lesson-flow.tsx`
2. Update `components/LearningChallenge.tsx` to use the new route:

```typescript
const handleLessonPress = (dayNumber: number, lessonId: number) => {
  if (dayNumber === 1 && lessonId === 1) {
    router.push(`/lesson-flow?day=${dayNumber}&lesson=${lessonId}`);
  } else {
    router.push(`/lesson-content?day=${dayNumber}&lesson=${lessonId}`);
  }
};
```

## Required Assets

Before the screens will display properly, add these image files to the `/assets` folder:

- `lesson1-screen1.jpeg` - Ben's introduction
- `lesson1-screen2.jpeg` - Trading definition
- `lesson1-screen3.jpeg` - Coin flip game
- `lesson1-screen4.jpeg` - Probability question
- `lesson1-screen5.jpeg` - Mindset shift
- `lesson1-screen6.jpeg` - 28-day roadmap
- `lesson1-screen7.jpeg` - Capital question
- `lesson1-screen8.jpeg` - Slider interaction
- `lesson1-screen9.jpeg` - Simulator explanation
- `lesson1-screen10.jpeg` - Lesson recap

## Navigation Flow

```
LearningChallenge Component (qchat.tsx)
  ↓ (User taps Day 1, Lesson 1)
  ↓
Lesson Content Screen (lesson-content.tsx or lesson-flow.tsx)
  ↓ (Shows 10 screens with tap-to-continue or prev/next)
  ↓
  ↓ (User completes all screens)
  ↓
Back to Challenge Tab (qchat.tsx)
```

## Component Features

Each Lesson1Screen component:
- Uses a consistent dark theme
- Includes hero images
- Has responsive text and styling
- Screen 8 includes an interactive slider
- Screen 10 has a finish button callback

## Styling

The screens use a dark theme that matches your provided design:
- Background: `#0b1020`
- Card background: `rgba(10, 14, 30, 0.95)`
- Text colors: Various shades of white/blue
- Accent color: `#ffd166` (highlight)

## Next Steps

1. Choose your integration option (Option 1 or Option 2)
2. Add the required image assets to `/assets` folder
3. Test the navigation flow
4. Extend the pattern for Day 1 Lessons 2-4
5. Create similar screen components for other days

## Testing

After integration, test:
1. Navigate from qchat tab → Day 1, Lesson 1
2. Tap through all 10 screens
3. Verify slider interaction on Screen 8
4. Confirm finish button returns to qchat tab
5. Check progress indicator updates correctly
