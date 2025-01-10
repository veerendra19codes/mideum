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

// Helper function to validate and format image URL
export const getValidImageUrl = (imageUrl: string | undefined): string => {
    if (!imageUrl) return '/images/default.jpg';
    
    try {
        // Check if it's already an absolute URL
        if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
            new URL(imageUrl); // This will throw if invalid
            return imageUrl;
        }
        
        // Add leading slash if missing for relative URLs
        return imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
    } catch {
        return '/images/default.jpg';
    }
};

