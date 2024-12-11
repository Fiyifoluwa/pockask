# Market App

## Installation

```bash

# Install dependencies - pods for iOS are automatically installed in the postinstall command
yarn install

# Start Metro
yarn start

# Run on iOS
yarn ios

# Run on Android
yarn android
```

## Architecture Decisions

### State Management

- Utilized Redux Toolkit with RTK Query for efficient server state management
- Implemented data persistence using redux-persist with AsyncStorage
- Separated concerns between server state (RTK Query) and client state (Redux slices)

### Performance Optimizations

1. **Image Loading**

   - Integrated FastImage for efficient image caching
   - Batch processed images in chunks to prevent UI blocking

2. **State Updates**

   - Batched related state updates
   - Implemented debounced search
   - Used performanceUtils for heavy computations

3. **List Rendering**

   - Optimized rendering with `removeClippedSubviews`
   - Configured batch rendering parameters (`maxToRenderPerBatch`, `windowSize`)
   - Used `memo` and `useCallback` for component memoization

### Data Flow

- Implemented data flow with Redux
- Utilized RTK Query for api request caching

## Implementation Challenges & Solutions

### Performance Optimization Challenges

The primary challenge was maintaining smooth performance while handling large product lists with images and complex filtering operations. This was addressed through:

1. **Image Processing**

   - Made UX improvements by employing the use of product thumbnails as placeholders where the ImageGallery component hadn't loaded product images
   - Solved UI blocking issues from image processing by implementing chunk-based processing and preloading

2. **ProductList collapsing header animation**

   - After completing this implementation on iOS, I ran the application on my android device and noticed a very different experience for what that set of users would be. I fixed that by adding a lastScroll value that helps facilitate the upward scroll after a previous downward scroll

### Other Technical Decisions

1. **RTK Query Integration**

   - Chose RTK Query over traditional REST clients for automatic caching
   - Implemented optimistic updates for cart operations
   - Set up tag-based cache invalidation for real-time updates

2. **Typescript Implementation**
   - Strict type checking across the application
   - Created comprehensive type definitions for API responses
   - Implemented proper generic types for reusable components
