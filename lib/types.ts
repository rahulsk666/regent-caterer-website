export interface point {
  title: string;
  description: string;
}

export interface PointCardProps {
  point: point;
  index: number;
  activeIndex: number;
  total: number;
}
