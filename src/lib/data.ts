import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string): ImagePlaceholder => 
  PlaceHolderImages.find(img => img.id === id) || PlaceHolderImages[0];

// Note: The static user object is no longer the primary source of user data,
// as user information is now handled dynamically through Firebase Authentication.
// This data is kept for potential fallback or default display purposes.
export const user = {
  name: 'John Doe',
  avatar: getImage('user-avatar-1'),
};
