export interface Character {
  id: string;
  name: string;
  sanskritName: string;
  alliance: 'Pandava' | 'Kaurava' | 'Neutral' | 'Divine';
  role: string;
  avatar: string;
  biography: string;
  powers: string[];
  weapons: string[];
  relationships: {
    father?: string;
    mother?: string;
    spouse?: string;
    siblings?: string[];
    mentor?: string;
    rival?: string;
    nephews?: string[];
    children?: string[];
  };
  importance: string;
  stats: {
    strength: number;
    wisdom: number;
    skill: number;
    divinity: number;
    dharma: number;
  };
}

export interface TimelineEvent {
  id: string;
  title: string;
  subTitle: string;
  year: string;
  description: string;
  importance: string;
  characters: string[];
  image: string;
}

export interface Weapon {
  id: string;
  name: string;
  sanskritName: string;
  owner: string;
  description: string;
  origin: string;
  capabilities: string[];
  astralType: boolean; // Is it an Astra (divine weapon invoked by mantras)
}

export interface Kingdom {
  id: string;
  name: string;
  modernLocation: string;
  history: string;
  ruler: string;
  importance: string;
  coordinate: { x: number; y: number }; // Percentage coords on our visual map
}

export interface FamilyNode {
  id: string;
  name: string;
  spouse?: string;
  generation: number;
  children?: string[];
  alliance: 'Pandava' | 'Kaurava' | 'Neutral' | 'Divine';
}
