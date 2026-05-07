export function validateReview(data) {
  if (!data.title || !data.comment) return false;

  const rating = Number(data.rating);
  if (rating < 1 || rating > 5) return false;

  return true;
}
