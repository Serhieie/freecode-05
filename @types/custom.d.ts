declare module "*.svg" {
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}

// Декларація типів для MP3
declare module "*.mp3" {
  const content: string;
  export default content;
}

// Декларація типів для PNG
declare module "*.png" {
  const content: string;
  export default content;
}
