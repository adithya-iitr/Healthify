"use client"
import { ReactNode } from 'react';

import React from 'react';

interface ProviderProps {
  children: ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return <>{children}</>;
}
