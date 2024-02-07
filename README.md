## AnimatedWave

This React component brings life to your applications with stunning, customizable animated waves.

### Installation

Simply install it using npm:

```bash
npm install animated-wave-react
```

### Usage

1. Import the component:

```javascript
import React from 'react';
import AnimatedWave from 'animated-wave-react';
```

2. Use it in your component:

```javascript
const MyComponent = () => {
  return (
    <div>
      <h1>My Component</h1>
      <AnimatedWave
        phase={10}
        amplitude={60}
        speed={10}
        frequency={0.0005}
        className="wave"
      />
    </div>
  );
};

export default MyComponent;
```

3. Apply CSS styles to customize the look:

```css
.wave {
  bottom: 0;
  width: 100%;
  height: 40%;
  overflow: hidden;
}

.wave polygon {
  fill: rgb(69, 132, 140);
}
```

### Props

- **phase (number, optional):** Controls the starting point of the wave (default: 10).
- **amplitude (number, optional):** Adjusts the wave's height (default: 60).
- **speed (number, optional):** Sets the animation speed (default: 10).
- **frequency (number, optional):** Defines the wave's shape (default: 0.0005).
- **color (string, optional):** Chooses the wave's color (default: '#00ffff').
- **className (string, optional):** Allows custom CSS styling.

### License

This project is licensed under the GPL-3.0 License. See the `LICENSE` file for details.

### Make it Yours

This README provides a starting point. Remember to replace placeholders like `animated-wave-react` and `MyComponent` with your actual package details. Feel free to add more sections like "Examples" or "Contributing" to enhance your documentation!
