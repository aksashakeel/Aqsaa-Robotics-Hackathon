import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import {Urdu, Beginner, Advanced} from '../components/MDX/ContextAwareBlocks';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map the "<Urdu>" tag to our Urdu component
  // `Urdu` will receive all props that were passed to `<Urdu>` in MDX
  Urdu,
  Beginner,
  Advanced,
};
