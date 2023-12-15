/**
 * Validates the form data.
 *
 * @param {FormData} formData - The form data to validate.
 * @returns {string|null} An error message if validation fails, or null if validation succeeds.
 */
export function validateForm(formData) {
    const title = formData.get('title');
    const description = formData.get('description');
    const tags = Array.from(document.querySelectorAll('.tag')).map(tag => tag.textContent);
    const endsAt = new Date(formData.get('endsAt'));

    if (!title) {
        return "Title is required.";
    }
    if (description.length < 10) {
        return "Description is too short.";
    }
    if (tags.length === 0) {
        return "At least one tag is required.";
    }
    if (endsAt < new Date()) {
        return "End date must be in the future.";
    }
    return null;
}