# Grid Overlay Script

This script creates a column grid overlay on top of all other elements in the body of an HTML document. The grid can be toggled on and off by pressing `Ctrl+G`. The grid adjusts between a mobile layout and a desktop layout based on a configurable breakpoint. Additionally, information about the grid is displayed on the second press of `Ctrl+G` and hidden on the third press.

## Features

- Toggles the grid overlay on and off with `Ctrl+G`.
- Configurable number of columns, gutter width, and margin width for both mobile and desktop views.
- Responsive grid that adapts based on a customizable breakpoint.
- Displays grid information (number of columns, gutter width, margin width, breakpoint, viewport type) on the second press of `Ctrl+G`.
- Hides the grid and information on the third press of `Ctrl+G`.

## Configuration

The script uses the following configuration settings:

```javascript
const settings = {
    mobile: {
        columns: 4,
        gutterWidth: 10, // in pixels
        marginWidth: 10, // in pixels
    },
    desktop: {
        columns: 12,
        gutterWidth: 20, // in pixels
        marginWidth: 20, // in pixels
    },
    breakpoint: 450, // Breakpoint in pixels
};
```

## Usage

Include the script in your HTML document:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grid Overlay Example</title>
</head>
<body>
    <!-- Your content here -->

    <script>
        // The script content goes here
    </script>
</body>
</html>
```
You can also copy/paste the script directly in the dev console if you wan to view the grid on online website.
