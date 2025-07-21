
# 📅 HrnetDatePicker

A modern, accessible, and customizable React DatePicker component for HRnet and any React project.

## ✨ Features

- 🎯 **Accessible**: Full keyboard navigation, screen reader support, and ARIA labels
- 🌍 **Internationalized**: French and English locale support
- 🎨 **Customizable**: Light/dark themes, modular CSS
- ⚡ **Performant**: Optimized with React hooks and memoization
- 📱 **Responsive**: Works on mobile and desktop
- 🔧 **TypeScript**: Full type definitions included


## 📦 Installation

```bash
npm install hrnet-datepicker
# or
yarn add hrnet-datepicker
```


## ⚙️ Technical Requirements

- **React**: version 18.0.0 or higher (React 19+ fully supported)
- **ReactDOM**: version 18.0.0 or higher
- **Node.js**: version 16 or higher recommended
- **Bundler**: Vite, Webpack, or compatible (ESM and UMD builds provided)


> Make sure `react` and `react-dom` are installed as dependencies in your project.

## 🚀 Basic Usage

```tsx
import { HrnetDatePicker } from 'hrnet-datepicker';
import { useState } from 'react';

function App() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <HrnetDatePicker
      value={date}
      onChange={setDate}
      label="Birth date"
      placeholder="MM/DD/YYYY"
    />
  );
}
```
}
\`\`\`


## 📋 Props API

| Prop               | Type                                 | Default         | Description                                                        |
|--------------------|--------------------------------------|-----------------|--------------------------------------------------------------------|
| `value`            | `Date \| null`                       | —               | The currently selected date.                                       |
| `onChange`         | `(date: Date \| null) => void`       | —               | Callback fired when a date is selected or cleared.                 |
| `label`            | `string`                             | —               | Label displayed above the input field.                             |
| `placeholder`      | `string`                             | Locale default   | Placeholder text for the input field.                              |
| `locale`           | `'fr' \| 'en'`                       | `'fr'`           | Locale for date display and calendar UI.                           |
| `variant`          | `'light' \| 'dark'`                  | `'light'`        | Visual theme of the component.                                     |
| `disabled`         | `boolean`                            | `false`          | Disables the date picker input and calendar.                       |
| `error`            | `string`                             | —               | Error message displayed below the input.                           |
| `minDate`          | `Date`                               | —               | Minimum selectable date (inclusive).                               |
| `maxDate`          | `Date`                               | —               | Maximum selectable date (inclusive).                               |
| `dateFormat`       | `string`                             | Locale default   | Custom date display format (overrides locale default).             |
| `className`        | `string`                             | —               | Custom CSS class for the input element.                            |
| `wrapperClassName` | `string`                             | —               | Custom CSS class for the main wrapper element.                     |
| `id`               | `string`                             | Auto-generated   | HTML id for the input (overrides auto-generated id).               |
| `name`             | `string`                             | —               | HTML name for the input.                                           |

## ♿ Accessibility

This component follows WCAG 2.1 accessibility standards:

- **Keyboard navigation**: Tab, Enter, Space, Escape, Arrow keys
- **Screen readers**: Complete ARIA labels and roles
- **Contrast**: Colors meet accessibility contrast requirements
- **Focus**: Clear visual focus indicators


## 🌍 Localization

### Supported Locales

- **French (`fr`)**: Date format DD/MM/YYYY, week starts on Monday
- **English (`en`)**: Date format MM/DD/YYYY, week starts on Sunday

### Fast Navigation

- **Month selector**: Dropdown with localized month names
- **Year selector**: Navigate ±10 years from current
- **Arrow buttons**: Previous/next month

### Adaptive Formats

Date formats, placeholders, and UI texts automatically adapt to the selected locale.

---

## 🛠️ Advanced Usage

- Pass any standard `<input>` props (except `type`, `value`, `onChange` which are managed by the component)
- Use `className` and `wrapperClassName` for custom styling
- Use `minDate` and `maxDate` to restrict selectable dates
- Use `dateFormat` to override the default display format

---

## 📄 License

MIT © Floriano Gomez