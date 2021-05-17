export default function stopPropagation(
  event: React.MouseEvent<HTMLUListElement, MouseEvent>
): void {
  event.stopPropagation();
};