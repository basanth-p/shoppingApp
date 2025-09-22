# Sweet Shop - React Native Shopping App 🛍️

A comprehensive e-commerce mobile application built with React Native, Expo, and TypeScript. This app provides a complete shopping experience with features like product browsing, cart management, favorites, user authentication, and multi-language support.

## 🚀 Features

### Core Features
- **User Authentication**: Login/Register with email and password
- **Product Catalog**: Browse products by categories with search and filter options
- **Shopping Cart**: Add, remove, and manage items in cart
- **Favorites**: Save favorite products for later
- **Product Details**: Detailed product information with reviews and ratings
- **Checkout Process**: Complete order placement with payment options
- **User Profile**: Manage personal information and preferences

### UI/UX Features
- **Multi-language Support**: English and Afrikaans
- **Dark/Light Theme**: Automatic theme switching
- **Responsive Design**: Works on all screen sizes
- **Smooth Animations**: Enhanced user experience with React Native Reanimated
- **Modern UI**: Clean and intuitive interface design

### Technical Features
- **TypeScript**: Full type safety throughout the app
- **Context API**: Global state management
- **File-based Routing**: Using Expo Router
- **API Integration**: Ready for backend integration
- **Mock Data**: Development-ready with sample data

## 📱 Screenshots

The app includes the following screens:
- Onboarding (3 screens with language toggle)
- Login/Register
- Home (Featured products, categories, stores)
- Categories (Expandable category list)
- Product Details (Images, reviews, related products)
- Search (Recent and popular searches)
- Shopping Cart (Item management, order summary)
- Favorites (Saved products with filters)
- Profile (User settings and preferences)
- Checkout (Address, payment, order summary)

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **State Management**: React Context API + useReducer
- **Styling**: StyleSheet with responsive design
- **Icons**: Expo Vector Icons (@expo/vector-icons)
- **Animations**: React Native Reanimated
- **Development**: Expo CLI

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shoppingApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device/simulator**
   - **iOS**: Press `i` to open iOS simulator
   - **Android**: Press `a` to open Android emulator
   - **Web**: Press `w` to open in web browser
   - **Physical Device**: Scan QR code with Expo Go app

## 📁 Project Structure

```
shoppingApp/
├── app/                          # App screens (file-based routing)
│   ├── (tabs)/                   # Tab navigation screens
│   │   ├── index.tsx            # Home screen
│   │   ├── categories.tsx       # Categories screen
│   │   ├── cart.tsx            # Shopping cart
│   │   ├── favorites.tsx       # Favorites screen
│   │   └── profile.tsx         # User profile
│   ├── _layout.tsx             # Root layout
│   ├── index.tsx               # App entry point
│   ├── onboarding.tsx          # Onboarding screens
│   ├── login.tsx               # Authentication
│   ├── product-details.tsx     # Product details
│   ├── search.tsx              # Search functionality
│   ├── checkout.tsx            # Checkout process
│   └── +not-found.tsx          # 404 screen
├── components/                   # Reusable components
├── constants/                    # App constants (colors, etc.)
├── contexts/                     # React Context providers
│   └── AppContext.tsx           # Global app state
├── hooks/                        # Custom React hooks
├── services/                     # API services
│   └── api.ts                   # API integration layer
├── assets/                       # Images, fonts, etc.
└── package.json                 # Dependencies and scripts
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563EB)
- **Secondary**: Orange (#FB923C)
- **Success**: Green (#4CAF50)
- **Error**: Red (#FF4444)
- **Background**: White/Dark based on theme
- **Text**: Adaptive based on theme

### Typography
- **Headers**: Bold, large sizes
- **Body**: Regular weight, readable sizes
- **Captions**: Smaller, secondary color

### Components
- **Cards**: Elevated with shadows
- **Buttons**: Rounded corners, consistent padding
- **Inputs**: Bordered with focus states
- **Icons**: Consistent sizing and colors

## 🌐 API Integration

The app is ready for backend integration with a complete API service layer:

### Available Endpoints
- Authentication (login, register, logout)
- Products (list, search, details, featured)
- Categories (list, products by category)
- Stores (list, store details, store products)
- Cart management (add, update, remove, clear)
- Favorites (add, remove, list)
- Orders (create, list, details, cancel)
- User profile (get, update)
- Search functionality

### Usage Example
```typescript
import { apiService } from '@/services/api';

// Get products
const products = await apiService.getProducts({
  category: 'groceries',
  page: 1,
  limit: 20
});

// Add to cart
await apiService.addToCart(userId, productId, quantity);
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```
API_BASE_URL=https://your-api-url.com
```

### App Configuration
Update `app.json` for your specific needs:
- App name and slug
- Icons and splash screen
- Build configurations
- Permissions

## 🚀 Deployment

### Development Build
```bash
npx expo install --fix
npx expo run:ios
npx expo run:android
```

### Production Build
```bash
# Build for iOS
npx expo build:ios

# Build for Android
npx expo build:android

# Or use EAS Build (recommended)
npx eas build --platform all
```

### Web Deployment
```bash
npx expo export:web
```

## 🧪 Testing

The app includes mock data for development and testing:

### Mock Data Available
- Products with categories and ratings
- User profiles and authentication
- Shopping cart functionality
- Favorites management
- Order history

### Running Tests
```bash
# Run unit tests (when implemented)
npm test

# Run linting
npm run lint
```

## 🌍 Internationalization

The app supports multiple languages:

### Supported Languages
- **English (en)**: Default language
- **Afrikaans (af)**: Secondary language

### Adding New Languages
1. Update `translations` object in `contexts/AppContext.tsx`
2. Add language option in profile settings
3. Update language toggle in onboarding

### Usage
```typescript
import { useApp, translations } from '@/contexts/AppContext';

const { state } = useApp();
const t = translations[state.language];

// Use translations
<Text>{t.addToCart}</Text>
```

## 🔒 Security Features

- Input validation and sanitization
- Secure authentication flow
- Protected routes
- Safe API communication
- User data protection

## 📱 Platform Support

- **iOS**: Full support with native features
- **Android**: Full support with Material Design
- **Web**: Responsive web version available

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the Expo documentation
- Visit the React Native community

## 🎯 Roadmap

### Upcoming Features
- [ ] Push notifications
- [ ] Social media integration
- [ ] Advanced search filters
- [ ] Wishlist sharing
- [ ] Order tracking
- [ ] Multiple payment gateways
- [ ] Offline support
- [ ] Voice search
- [ ] AR product preview
- [ ] Loyalty program

### Performance Improvements
- [ ] Image optimization
- [ ] Lazy loading
- [ ] Caching strategies
- [ ] Bundle size optimization

---

**Built with ❤️ using React Native and Expo**
