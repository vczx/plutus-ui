import * as React from 'react';
import { LoadingOverlay } from './LoadingOverlay';
import { LoadingOverlayInner } from './LoadingOverlayInner';
import { LoadingSpinner } from './LoadingSpinner';

export const LoadingOverlaySpinner: React.FC = () => (
  <LoadingOverlay>
    <LoadingOverlayInner>
      <LoadingSpinner />
    </LoadingOverlayInner>
  </LoadingOverlay>
);
