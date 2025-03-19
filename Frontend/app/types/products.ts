export interface BaseProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  quantity: number;
  rating: number;
}

export interface Computer extends BaseProduct {
  category: 'computer';
  processor: string;
  ram: string;
  storage: string;
}

export interface Smartphone extends BaseProduct {
  category: 'smartphone';
  screen: string;
  camera: string;
  battery: string;
}

export interface TvMonitor extends BaseProduct {
  category: 'tvmonitor';
  screenSize: string;
  resolution: string;
  refreshRate: string;
}

export interface GamingEquipment extends BaseProduct {
  category: 'gaming';
  type: 'console' | 'controller' | 'accessory';
  compatibility: string[];
}

export interface Headphone extends BaseProduct {
  category: 'headphone';
  type: 'wireless' | 'wired';
  noiseCancel: boolean;
}

export interface Speaker extends BaseProduct {
  category: 'speaker';
  power: string;
  connectivity: string[];
}

export interface Accessory extends BaseProduct {
  category: 'accessory';
  compatibleWith: string[];
  type: string;
}