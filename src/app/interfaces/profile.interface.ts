import {ProfileLogInterface} from "./profile-log.interface";

export interface ProfileInterface {
  charIndex: number;
  clan: string;
  logs: ProfileLogInterface[];
  name: string;
  powerScore: number;
  powerScores: number[];
  prevDayRanking: number;
  ranking: number;
  serverCategory: string;
  serverName: string;
  updatedAts: number[];
}
