export function validateRating(rating) {
  const num = Number(rating);
  return num >= 1 && num <= 5;
}
