import { renderHook, waitFor } from '@testing-library/react';
import { useCardList } from './ViewCard';
import { CardAdapter } from '../../infrastructure/adapters/CardAdapter';
import { Card, Category } from '../../domain/models/Card';
