export function formatDateToDDMMYYYY(dateString: string): string {
    // Parse the ISO string into a Date object
    const date = new Date(dateString);

    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();

    // Return formatted date
    return `${day}-${month}-${year}`;
}
