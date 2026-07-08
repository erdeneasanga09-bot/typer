export type VehicleType = 'car' | 'rocket' | 'horse';

export interface Vehicle {
  id: VehicleType;
  name: string;
  emoji: string;
  color: string;
  speedMultiplier: number;
}

export interface Racer {
  id: string;
  name: string;
  emoji: string;
  progress: number; // 0 to 100
  isBot: boolean;
  color: string;
  wpm?: number;
}

export interface RaceStats {
  wpm: number;
  accuracy: number;
  errors: number;
  timeElapsed: number; // in seconds
  typedChars: number;
  isCompleted: boolean;
  isPaused?: boolean;
}

export interface HistoryItem {
  id: string;
  date: string;
  wpm: number;
  accuracy: number;
  errors: number;
  duration: number;
  textSnippet: string;
  vehicleEmoji: string;
}

export interface TextCategory {
  id: string;
  name: string;
  icon: string;
}

export interface TyperacerText {
  id: string;
  text: string;
  category: string;
  title: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}
