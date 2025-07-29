# Migration Guide: From leader-line to react-native-leader-line

This guide helps you migrate from the original [leader-line](https://github.com/anseki/leader-line) library to react-native-leader-line for React Native applications.

## 📋 Quick Comparison

| Feature | Original leader-line | react-native-leader-line | Compatibility |
|---------|---------------------|---------------------------|---------------|
| **Target Platform** | Web/DOM | React Native | ❌ Different platforms |
| **API Style** | Imperative | Declarative + Imperative | ✅ Both supported |
| **Basic Usage** | `new LeaderLine(start, end)` | `<LeaderLine start={...} end={...} />` | ✅ Imperative API available |
| **Element References** | `document.getElementById()` | React refs (`useRef()`) | ⚠️ Different approach |
| **Color** | `color: 'coral'` | `color="#ff6b6b"` | ✅ Same property |
| **Line Width** | `size: 4` | `strokeWidth={4}` or `size={4}` | ✅ Both supported |
| **Path Types** | `path: 'straight'` | `path="straight"` | ✅ Same values |
| **Plugs/Arrows** | `endPlug: 'arrow1'` | `endPlug="arrow1"` | ✅ Same values |
| **Socket Position** | `startSocket: 'top'` | `startSocket="top"` | ✅ Same values |
| **Show/Hide** | `line.show()`, `line.hide()` | `line.show()`, `line.hide()` | ✅ Imperative API |
| **Labels** | `startLabel: 'Text'` | `startLabel="Text"` | ✅ Same approach |
| **Animation** | CSS-based | React Native Animated | ⚠️ Different implementation |

## 🚀 Migration Strategies

### Strategy 1: Declarative Migration (Recommended)

**Before (leader-line):**
```javascript
const line = new LeaderLine(
  document.getElementById('start'),
  document.getElementById('end'),
  {
    color: 'coral',
    size: 4,
    endPlug: 'arrow1',
    startSocket: 'top',
    endSocket: 'bottom'
  }
);
```

**After (react-native-leader-line):**
```tsx
import React, { useRef } from 'react';
import { LeaderLine } from 'react-native-leader-line';

const MyComponent = () => {
  const startRef = useRef(null);
  const endRef = useRef(null);

  return (
    <View>
      <View ref={startRef} style={styles.startElement} />
      <View ref={endRef} style={styles.endElement} />
      
      <LeaderLine
        start={{ element: startRef }}
        end={{ element: endRef }}
        color="coral"
        strokeWidth={4}
        endPlug="arrow1"
        startSocket="top"
        endSocket="bottom"
      />
    </View>
  );
};
```

### Strategy 2: Imperative Migration (Backward Compatibility)

**Before (leader-line):**
```javascript
const line = new LeaderLine(startElement, endElement, {
  color: 'blue',
  size: 3
});

line.setOptions({ color: 'red' });
line.hide();
setTimeout(() => line.show(), 1000);
```

**After (react-native-leader-line):**
```tsx
import { useLeaderLineCompatibility } from 'react-native-leader-line';

const MyComponent = () => {
  const { LeaderLine, LeaderLineContainer } = useLeaderLineCompatibility();
  
  const createLine = () => {
    const line = new LeaderLine(startRef, endRef, {
      color: 'blue',
      size: 3
    });

    line.setOptions({ color: 'red' });
    line.hide();
    setTimeout(() => line.show(), 1000);
  };

  return (
    <View>
      {/* Your elements */}
      <LeaderLineContainer />
    </View>
  );
};
```

## 📝 Detailed Migration Steps

### Step 1: Install Dependencies

```bash
# Remove original leader-line
npm uninstall leader-line

# Install react-native-leader-line
npm install react-native-leader-line react-native-svg

# iOS setup
cd ios && pod install
```

### Step 2: Update Element References

**Before:**
```javascript
const startElement = document.getElementById('start');
const endElement = document.getElementById('end');
```

**After:**
```tsx
const startRef = useRef(null);
const endRef = useRef(null);

<View ref={startRef} id="start" />
<View ref={endRef} id="end" />
```

### Step 3: Convert API Calls

#### Basic Line Creation

**Before:**
```javascript
const line = new LeaderLine(startElement, endElement);
```

**After (Declarative):**
```tsx
<LeaderLine 
  start={{ element: startRef }} 
  end={{ element: endRef }} 
/>
```

**After (Imperative):**
```tsx
const { createLine } = useImperativeLeaderLine();
const line = createLine(startRef, endRef);
```

#### Property Updates

**Before:**
```javascript
line.color = 'red';
line.size = 5;
```

**After:**
```tsx
// Declarative: use state
const [lineColor, setLineColor] = useState('red');
<LeaderLine color={lineColor} strokeWidth={5} />

// Imperative: same as before
line.setOptions({ color: 'red', size: 5 });
```

#### Show/Hide Animation

**Before:**
```javascript
line.show('draw');
line.hide('fade');
```

**After:**
```tsx
// Imperative API maintains same interface
line.show('draw');
line.hide('fade');

// Declarative: use conditional rendering or opacity
const [visible, setVisible] = useState(true);
<LeaderLine opacity={visible ? 1 : 0} />
```

## 🔧 Property Mapping

### Core Properties

| leader-line | react-native-leader-line | Notes |
|-------------|--------------------------|-------|
| `color` | `color` | ✅ Direct mapping |
| `size` | `size` or `strokeWidth` | ✅ Both supported for compatibility |
| `endPlug` | `endPlug` | ✅ Same values: arrow1, arrow2, arrow3, disc, square |
| `startPlug` | `startPlug` | ✅ Same values |
| `startSocket` | `startSocket` | ✅ Same values: auto, top, right, bottom, left |
| `endSocket` | `endSocket` | ✅ Same values |
| `path` | `path` | ✅ Same values: straight, arc, fluid, magnet, grid |

### Advanced Properties

| leader-line | react-native-leader-line | Notes |
|-------------|--------------------------|-------|
| `outline` | `outline` | ✅ Similar structure |
| `dash` | `dash` | ✅ Pattern and animation support |
| `gradient` | `color` with gradient | ⚠️ Use LinearGradient component |
| `dropShadow` | `dropShadow` | ✅ Similar options |
| `animation` | `animation` | ⚠️ Different animation system |

### Labels

| leader-line | react-native-leader-line | Notes |
|-------------|--------------------------|-------|
| `startLabel` | `startLabel` | ✅ String or object |
| `middleLabel` | `middleLabel` | ✅ String or object |
| `endLabel` | `endLabel` | ✅ String or object |

## 🎯 Common Migration Patterns

### Pattern 1: Dynamic Line Creation

**Before:**
```javascript
function createDynamicLine(start, end, config) {
  return new LeaderLine(start, end, {
    color: config.color,
    size: config.thickness,
    endPlug: config.arrow ? 'arrow1' : 'none'
  });
}
```

**After:**
```tsx
const useDynamicLine = (start, end, config) => {
  const { createLine } = useImperativeLeaderLine();
  
  return useCallback(() => {
    return createLine(start, end, {
      color: config.color,
      size: config.thickness,
      endPlug: config.arrow ? 'arrow1' : 'none'
    });
  }, [start, end, config]);
};
```

### Pattern 2: Line Management

**Before:**
```javascript
const lines = [];

function addLine(start, end) {
  const line = new LeaderLine(start, end);
  lines.push(line);
  return line;
}

function removeAllLines() {
  lines.forEach(line => line.remove());
  lines.length = 0;
}
```

**After:**
```tsx
const LineManager = () => {
  const { createLine, removeAllLines } = useImperativeLeaderLine();
  const [lines, setLines] = useState([]);
  
  const addLine = (start, end) => {
    const line = createLine(start, end);
    setLines(prev => [...prev, line]);
    return line;
  };
  
  return { addLine, removeAllLines };
};
```

### Pattern 3: Event-Driven Lines

**Before:**
```javascript
button.addEventListener('click', () => {
  const line = new LeaderLine(button, target);
  setTimeout(() => line.remove(), 2000);
});
```

**After:**
```tsx
const EventDrivenLine = () => {
  const { createLine } = useImperativeLeaderLine();
  
  const handlePress = () => {
    const line = createLine(buttonRef, targetRef);
    setTimeout(() => line.remove(), 2000);
  };
  
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text>Create Line</Text>
    </TouchableOpacity>
  );
};
```

## ⚠️ Breaking Changes & Limitations

### Breaking Changes

1. **Platform**: Only works on React Native, not web browsers
2. **Element Selection**: Must use React refs instead of DOM selectors
3. **CSS Styling**: Use React Native styling instead of CSS
4. **Animation System**: Different animation approach

### Current Limitations

1. **No DOM Events**: Mouse events not available in React Native
2. **Limited CSS Effects**: Some visual effects need alternative implementation
3. **No Direct DOM Manipulation**: Everything must go through React

### Workarounds

**For mouse events:**
```tsx
// Instead of mouse events, use touch events
<TouchableOpacity onPress={handleTouch}>
  <View ref={elementRef} />
</TouchableOpacity>
```

**For complex animations:**
```tsx
// Use React Native Animated API
const animatedValue = useRef(new Animated.Value(0)).current;

Animated.timing(animatedValue, {
  toValue: 1,
  duration: 1000,
  useNativeDriver: false
}).start();
```

## 🧪 Testing Your Migration

### Test Checklist

- [ ] Basic line creation works
- [ ] All property mappings are correct
- [ ] Show/hide functionality works
- [ ] Dynamic property updates work
- [ ] Line removal works properly
- [ ] Performance is acceptable
- [ ] No memory leaks

### Example Test

```tsx
const MigrationTest = () => {
  const startRef = useRef(null);
  const endRef = useRef(null);
  const { createLine } = useImperativeLeaderLine();
  
  const testMigration = () => {
    // Test basic creation
    const line = createLine(startRef, endRef, {
      color: 'coral',
      size: 4,
      endPlug: 'arrow1'
    });
    
    // Test property updates
    setTimeout(() => {
      line.setOptions({ color: 'blue', size: 6 });
    }, 1000);
    
    // Test show/hide
    setTimeout(() => line.hide(), 2000);
    setTimeout(() => line.show(), 3000);
    
    // Test removal
    setTimeout(() => line.remove(), 4000);
  };
  
  return (
    <View>
      <View ref={startRef} style={styles.element} />
      <View ref={endRef} style={styles.element} />
      <Button title="Test Migration" onPress={testMigration} />
    </View>
  );
};
```

## 🎉 Success!

Once you've completed the migration:

1. **Test thoroughly** on both iOS and Android
2. **Check performance** with multiple lines
3. **Verify memory usage** for line creation/removal
4. **Update documentation** to reflect React Native patterns

## 📞 Need Help?

- Check the [examples directory](./examples/) for working implementations
- Review the [API documentation](./README.md)
- Open an issue on GitHub for specific migration questions

Happy migrating! 🚀