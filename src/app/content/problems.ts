import problem1 from "../assets/problem_1.png";
import problem2 from "../assets/problem_2.png";
import problem3 from "../assets/problem_3.png";
import type { StaticImageData } from "next/image";

export interface ProblemItem {
  text: string;
  image: StaticImageData;
  category: string;
  number: string;
}

export const PROBLEMS: ProblemItem[] = [
  {
    text: "トレンドの移り変わりが早いのに、調査に時間がかかりすぎて追いつけない...",
    image: problem1,
    category: "スピード",
    number: "01",
  },
  {
    text: "施策を打ってみたけど、思ったような成果が出なかった...",
    image: problem2,
    category: "仮説検証",
    number: "02",
  },
  {
    text: "調査はしたけど、結局どう施策に繋げればいいかわからない...",
    image: problem3,
    category: "活用方法",
    number: "03",
  },
];
