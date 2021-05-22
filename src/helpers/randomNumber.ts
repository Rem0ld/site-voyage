const random = (max: number | undefined, min: number): number | undefined =>
  max ? Math.floor(Math.random() * (max - min)) + min : undefined;


export default random;