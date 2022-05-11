import { ExternalProvider } from "@ethersproject/providers";

declare global {
  interface Window {
    ethereum?: ExternalProvider;
  }
}

export type Character = {
  name: string;
  imageURI: string;
  hp: number;
  maxHp: number;
  attackDamage: number;
};

export {};
