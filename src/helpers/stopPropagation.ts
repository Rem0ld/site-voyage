export default function stopPropa(
  event: React.MouseEvent<HTMLUListElement, MouseEvent>
): void {
  event.stopPropagation();
};